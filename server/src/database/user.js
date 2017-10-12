import mongoose from 'mongoose' // connection to the mongodb
import uniqueValidator from 'mongoose-unique-validator' // pre save validation plugin for unique fields
import bcrypt from 'bcryptjs'

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;
const BAN_TIME = 86400000; //default ban time of a day

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: 0
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: {
        type: Number
    },
    //If null, not banned
    bannedUntil: {
        type: Number
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    pendingTransactions: {
        type: String
    },
    up: {
        type: String
    },
    down: {
        type: String
    }
});

userSchema.plugin(uniqueValidator, {type: 'already in use'});

/**
 * Checks if the user is currently locked out
 */
userSchema.virtual('isLocked').get(
    // check for a future lockUntil timestamp
    function () {
        return (this.lockUntil && this.lockUntil > Date.now());
    }
);

// expose enum on the model, and provide an internal convenience reference
var reasons = userSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

userSchema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10)
        .then(salt => {
            // hash the password along with our new salt
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    // override the cleartext password with the hashed one
                    user.password = hash;
                    next();
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password)
            .then(isMatch => resolve(isMatch))
            .catch(err => reject(err))
    })
};

userSchema.methods.incLoginAttempts = function () {
    return new Promise((resolve, reject) => {
        // if we have a previous lock that has expired, restart at 1
        console.log('Checking login lock, current time ', Date.now());
        console.log('   This object is locked until ', this.lockUntil);
        if (this.lockUntil && this.lockUntil < Date.now()) {
            console.log("lock expired")
            this.update({
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        } else {
            // otherwise we're incrementing
            var updates = {
                $inc: {
                    loginAttempts: 1
                }
            };
            // lock the account if we've reached max attempts and it's not locked already
            console.log("attempts", this.loginAttempts)
            if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                updates.$set = {
                    lockUntil: Date.now() + LOCK_TIME
                };
                console.log('lock')
            }
            this.update(updates)
                .then(res => resolve(res))
                .catch(err => reject(err))
        }
    });

};

/**
 * Locks user from logging in (until unbanned)
 */
userSchema.statics.banUser = function (userid) {
    var bantime = Number.MAX_SAFE_INTEGER;
    return this.updateUser(userid, {
        $set: {
            lockUntil: bantime
        }
    });
}

/**
 * Unbans a user by finding them in DB, and then clearing 'lock until' value
 */
userSchema.statics.unbanUser = function (userid) {
    return this.updateUser(userid, {
        $unset: {
            lockUntil: 1
        }
    });
}

userSchema.statics.promoteUser = function (userid) {
    return this.updateUser(userid, {
        $set: {
            isAdmin: true
        }
    });
}

/**
 * Gets user and updates it with the given update details
 */
userSchema.statics.updateUser = function (userid, updates) {
    return new Promise((resolve, reject) => {
        this.findOne({
            _id: userid
        }).then(user => {
            // make sure the user exists
            if (!user) resolve({
                reason: reasons.NOT_FOUND
            });
            console.log('=====Updating user details ', user);
            //Set ban time on user to be almost nothing
            //Update db
            user.update(updates)
                .then(() => resolve(user))
                .catch(err => function(error) {
                    console.log("Couldn't update the db to remove the ban :( ");
                    reject(err);
                })
        });
    });
}

userSchema.statics.getAuthenticated = function (username, password) {
    return new Promise((resolve, reject) => {
        this.findOne({
                username: username
            })
            .then(user => {
                // make sure the user exists
                if (!user) resolve({
                    reason: reasons.NOT_FOUND
                });

                // check if account is locked to prevent login
                if (user.isLocked) {
                    //if lock not expired, prevent login
                    if (user.lockUntil < Date.now()) {
                        //account still locked, just increment login attempts
                        console.log('This account is locked, dont log them in');
                        user.incLoginAttempts()
                            .then(() => resolve({
                                reason: reasons.MAX_ATTEMPTS
                            }))
                            .catch(err => reject(err))
                    } else {
                        //unlock them?
                    }
                }

                // test for a matching password
                user.comparePassword(password)
                    .then(isMatch => {
                        // check if the password was a match
                        if (isMatch) {
                            // if there's no lock or failed attempts, just return the user
                            if (!user.loginAttempts && !user.lockUntil) {
                                console.log('Authenticated successfully, not user locked = ', !user.lockUntil);
                                resolve({
                                    user: user
                                });
                            }
                            // reset attempts and lock info
                            //if their password matches then reset lock
                            var updates = {
                                $set: {
                                    loginAttempts: 0
                                },
                                $unset: {
                                    lockUntil: 1
                                }
                            };
                            user.update(updates)
                                .then(() => resolve(user))
                                .catch(err => reject(err))
                        } else {
                            // password is incorrect, so increment login attempts before responding
                            user.incLoginAttempts()
                                .then(() => resolve({
                                    reason: reasons.PASSWORD_INCORRECT
                                }))
                                .catch(err => reject(err))
                        }
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
};

export default mongoose.model('User', userSchema);
