import mongoose from 'mongoose' // connection to the mongodb
import bcrypt from 'bcryptjs'

const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000;

let userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number }
})

userSchema.virtual('isLocked').get(
  // check for a future lockUntil timestamp
  function(){return !!(this.lockUntil && this.lockUntil > Date.now())}
);

// expose enum on the model, and provide an internal convenience reference
var reasons = userSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};

userSchema.pre('save', function(next) {
  var user = this;

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

userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
  bcrypt.compare(candidatePassword, this.password)
  .then(isMatch => resolve(isMatch))
  .catch(err => reject(err))
  })
};

userSchema.methods.incLoginAttempts = function() {
  return new Promise((resolve, reject) => {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
      console.log("lock expired")
      this.update({
          $set: { loginAttempts: 1 },
          $unset: { lockUntil: 1 }
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
    }else{
      // otherwise we're incrementing
      var updates = { $inc: { loginAttempts: 1 } };
      // lock the account if we've reached max attempts and it's not locked already
      console.log("attempts",this.loginAttempts)
      if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = { lockUntil: Date.now() + LOCK_TIME };
          console.log('lock')
      }
      this.update(updates)
      .then(res => resolve(res))
      .catch(err => reject(err))
    }
  })

};


userSchema.statics.getAuthenticated = function(username, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ username: username })
    .then(user => {
      // make sure the user exists
      if (!user) resolve({reason: reasons.NOT_FOUND})

      // check if the account is currently locked
      if (user.isLocked) {
          // just increment login attempts if account is already locked
          user.incLoginAttempts()
          .then(()=>resolve({reason: reasons.MAX_ATTEMPTS}))
          .catch(err => reject(err))
      }

      // test for a matching password
      user.comparePassword(password)
      .then(isMatch => {
        // check if the password was a match
        if (isMatch) {
          // if there's no lock or failed attempts, just return the user
          if (!user.loginAttempts && !user.lockUntil) resolve({user:user});
          // reset attempts and lock info
          var updates = {
              $set: { loginAttempts: 0 },
              $unset: { lockUntil: 1 }
          };
          user.update(updates)
          .then(()=> resolve(user))
          .catch(err => reject(err))
        }else{
          // password is incorrect, so increment login attempts before responding
          user.incLoginAttempts()
          .then(()=>resolve({reason: reasons.PASSWORD_INCORRECT}))
          .catch(err => reject(err))
        }
      })
      .catch(err => reject(err))
    })
    .catch(err => reject(err))
  })
}

export default mongoose.model('User', userSchema);
