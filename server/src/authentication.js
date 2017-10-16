import jwt from 'jsonwebtoken'
import passport from 'passport'
import crypto from 'crypto'
import {
    ExtractJwt,
    Strategy as JwtStrategy
} from 'passport-jwt'
import mailgunConfig from '../config/mailgun'
import key from '../config/key'

import mongo from './database/mongo'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  key
};

export function authApp(app) {

    const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
        //Authorization: Bearer <Token>
        const {
            id,
            isAdmin
        } = jwt_payload;

        const user = {
            id,
            isAdmin
        };

        done(null, user);
    });

    passport.use(strategy);

    app.use(passport.initialize());

    // makes user object available on request if a user is logged in
    app.use(function (req, res, next) {
        passport.authenticate('jwt', function (err, user, info) {
            req.user = user;
            next();
        })(req, res, next);
    });

    app.post('/validateRegistration', (req, res) => {
        const {
            email,
            username
        } = req.body;
        let promises = [];
        promises.push(mongo.isUsernameAvailable(username));
        promises.push(mongo.isEmailAvailable(email));
        Promise.all(promises)
        .then(e => {
            res.json({
                username: e[0].length? "taken": "available",
                email: e[1].length? "taken": "available",
            })
        })
        .catch(err => console.log(err))

    });

    app.post('/login', (req, res) => {
        let { username, password } = req.body;

        if (username && password) {
            //Checks user/pw against database, returns user if valid
            mongo.getAuthenticated(username, password)
                .then(data => {
                    if (data.user) {
                        //Prepare token payload from user
                        let payload = {
                            id: data.user._id,
                            isAdmin: data.user.isAdmin
                        };
                        let token = jwt.sign(payload, jwtOptions.secretOrKey);
                        //Return success with token inside
                        res.statusCode = 200;
                        res.json({
                            message: "login succeeded",
                            username: username,
                            isAdmin: data.user.isAdmin,
                            token: token
                        });
                    } else if (data.reason === 2) {
                        // user is blocked
                        res.status(401).json({
                            reason: "User currently blocked"
                        });
                    } else {
                        res.status(401).json({
                            reason: "Username or password is incorrect!"
                        });
                    }
                })
                .catch(err => console.log(err))
        }
    });

    app.post('/register', (req, res) => {
        let {
            username,
            password,
            email
        } = req.body;
        if (username && password && email) {
            mongo.createUser(username, email, password)
                .then(() => {
                    res.statusCode = 200;
                    res.json({
                        username: username
                    });
                })
                .catch(error => {
                    if (error._message === 'User validation failed') {
                        let errors = [];
                        Object.keys(error.errors).forEach(key => errors.push(key + " " + error.errors[key].kind));
                        res.statusCode = 401;
                        res.json({
                            errors: errors.slice(0)
                        });
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
        const { email } = req.body;

        if (email) {
            const buf = crypto.randomBytes(20);
            const token = buf.toString('hex');

            const resetPasswordToken = token;
            const resetPasswordExpires = Date.now() + 3600000; // 1 hour

            mongo.setResetToken(email, resetPasswordToken, resetPasswordExpires)
                .then(() => {
                    const text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n';
                    sendMail(email, text);
                    res.send('send')
                })
                .catch(err => console.log(err))
        }
    });

    app.post('/reset', (req, res) => {
        const { token, password } = req.body;

        if (token) {
            if (password) {
                mongo.resetPassword(token, password)
                    .then(user => {
                        const text = 'password reset successfully!';
                        sendMail(user.email, text)
                        res.send()
                    })
                    .catch(err => res.status(401).send('Unauthorized'))
            }

            mongo.isValidResetToken(token)
                .then(user => {
                    user ? res.json(user) : res.status(401).send('Unauthorized')
                })
                .catch(err => res.status(500).send('Internal Error'))
        }
    })

    function sendMail(email, text) {
        const api_key = mailgunConfig.key;
        const domain = 'sandboxa9461c2dc5d64c618caaec296ca33955.mailgun.org';
        const mailgun = require('mailgun-js')({
            apiKey: api_key,
            domain: domain
        });

        const data = {
            from: 'no reply<am@am.com>',
            to: email,
            subject: 'Password reset',
            text: text
        };

        mailgun.messages().send(data, function (error) {
            if (error) {
                console.log(error)
            }
        });
    }
}
