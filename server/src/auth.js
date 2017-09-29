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

module.exports = function (app) {
    var jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'tasmanianDevil' // TODO: change put in config
    }

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

    app.post('/login', (req, res) => {
        let {username, password} = req.body;

        if (username && password) {
            mongo.getAuthenticated(username, password)
                .then(data => {
                    if (data.user) {
                        var payload = {
                            id: data.user._id
                        };
                        var token = jwt.sign(payload, jwtOptions.secretOrKey);
                        res.statusCode = 200;
                        res.json({
                            message: "ok",
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
        console.log('register', req.body.name, req.body.email, req.body.password);
        if (
            req.body.name &&
            req.body.email &&
            req.body.password) {
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;

            mongo.createUser(name, email, password)
                .then(e => {
                    res.statusCode = 200
                    res.send('OK')
                })
                .catch(err => {
                    res.statusCode = 500
                    res.send('err')
                })

        }
    })

    app.post('/forgot', (req, res) => {
        const {
            email
        } = req.body;
        if (email) {
            const buf = crypto.randomBytes(20);
            const token = buf.toString('hex');

            const resetPasswordToken = token;
            const resetPasswordExpires = Date.now() + 3600000; // 1 hour

            mongo.setResetToken(email, resetPasswordToken, resetPasswordExpires)
                .then(e => {
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
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };

                    mailgun.messages().send(data, function (error, body) {
                        console.log(body);
                    });
                    res.send('send')
                })
                .catch(err => console.log(err))
        }
    })

    app.post('/reset', (req, res) => {
        const {token, password} = req.body
        if (token) {
            if (password) {
                mongo.resetPassword(token, password)
                .then(user => res.send(user))
                .catch(err => res.status(401).send('Unauthorized'))
            }

            mongo.isValidResetToken(token)
                .then(user => {user?res.json(user):res.status(401).send('Unauthorized')})
                .catch(err => res.status(500).send('Internal Error'))
        }
    })
}
