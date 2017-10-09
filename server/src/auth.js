import jwt from 'jsonwebtoken'
import passport from 'passport'
import crypto from 'crypto'
import {
    ExtractJwt,
    Strategy as JwtStrategy
} from 'passport-jwt'
import mailgun from 'mailgun-js'
import mailgunConfig from '../config/mailgun'

import mongo from './database/mongo'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tasmanianDevil' // TODO: change put in config
}

/**
 * Returns a verified, decoded token if valid
 * Returns error if not verified
 */
// module.exports.verifyToken = function (token){
export function verifyToken(token) {
    //TODO - handle error if not valid token
    try {
        var decodedToken = jwt.verify(token, jwtOptions.secretOrKey);
        return decodedToken;
    } catch (error) {
        return null;
    }
};

// module.exports.authApp = function (app) {
export function authApp(app) {
    //Authorization: Bearer <Token>

    var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        // console.log('payload received', jwt_payload);
        mongo.getUserById(jwt_payload.id)
            .then(user => {
                // console.log('user', user)
                next(null, user)
            })
            .catch(err => next(null, false))
    });

    passport.use(strategy);

    app.use(passport.initialize());

    // makes user object available on request if a user is logged in
    app.use(function (req, res, next) {
        passport.authenticate('jwt', function (err, user, info) {
            req.user = user;
            next();
        })(req, res, next);
    })

    //Takes a token & checks if admin true in token
    //Does this every time user visits admin route
    // app.get('/admin', function checkIfAdmin(userToken) {
    //     //TODO - handle error if not valid token
    //     var decodedToken = jwt.verify(userToken, jwtOptions.secretOrKey);
    //     console.log("(REMOVE LATER) Decoded token ", decodedToken);
    //     //Can simplify to 'return decodedToken.isAdmin';
    //     //TODO - remove second thing here
    //     if (decodedToken.isAdmin || userToken == "iamanadmin") {
    //         console.log("User verified as admin");
    //         return true;
    //     } else {
    //         console.log("User not an admin");
    //         return false;
    //     }
    // });

    app.post('/login', (req, res) => {
        let {username, password} = req.body;

        if (username && password) {
            //Checks user/pw against database, returns user if valid
            mongo.getAuthenticated(username, password)
                .then(data => {
                    if (data.user) {
                        //Prepare token payload from user
                        var payload = {
                            id: data.user._id,
                            isAdmin: data.user.isAdmin
                        };
                        var token = jwt.sign(payload, jwtOptions.secretOrKey);
                        //Return success with token inside
                        res.statusCode = 200;
                        res.json({
                            message: "login succeeded",
                            username: username,
                            token: token
                        });
                    }
                    else {
                        res.sendStatus(401);
                    }
                })
                .catch(err => console.log(err))
        }
    });

    app.post('/register', (req, res) => {
        let {username, password, email} = req.body;
        if (username && password && email) {
            mongo.createUser(username, email, password)
                .then(() => {
                    res.statusCode = 200;
                    res.json({username: username});
                })
                .catch(error => {
                    if (error._message === 'User validation failed') {
                        let errors = [];
                        Object.keys(error.errors).forEach(key => errors.push(key + " " + error.errors[key].kind));
                        res.statusCode = 401;
                        res.json({errors: errors.slice(0)});
                    } else {
                        res.statusCode = 500;
                        // send error as array of strings to be able to add additional error messages
                        let serverError = `Server error, please try again later ${500}`;
                        res.json([serverError].slice(0));
                    }
                });
        }
    });

    app.post('/forgot', (req, res) => {
        const {
            email
        } = req.body;
        if (email) {
            console.log('reset request received for ', email);
            const buf = crypto.randomBytes(20);
            const token = buf.toString('hex');

            const resetPasswordToken = token;
            const resetPasswordExpires = Date.now() + 3600000; // 1 hour

            mongo.setResetToken(email, resetPasswordToken, resetPasswordExpires)
                .then(e => {
                    const text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    sendMail(email, text);
                    res.send('send')
                })
                .catch(err => console.log(err))
        }
    })

    app.post('/reset', (req, res) => {
        const {token, password} = req.body
        if (token) {
            if (password) {
                console.log('reset password',password)
                mongo.resetPassword(token, password)
                .then(user => {
                    const text = 'password reset successfully!'
                    sendMail(user.email, text)
                    res.send()
                })
                .catch(err => res.status(401).send('Unauthorized'))
            }

            mongo.isValidResetToken(token)
                .then(user => {user?res.json(user):res.status(401).send('Unauthorized')})
                .catch(err => res.status(500).send('Internal Error'))
        }
    })

    function sendMail(email, text) {
        var api_key = mailgunConfig.key;
        var domain = 'sandboxa9461c2dc5d64c618caaec296ca33955.mailgun.org';
        var mailgun = require('mailgun-js')({
            apiKey: api_key,
            domain: domain
        });

        var data = {
            from: 'no reply<am@am.com>',
            to: email,
            subject: 'Password reset',
            text: text
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
}
