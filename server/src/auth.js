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
        console.log('login', req.body.name, req.body.password);
        if (req.body.name && req.body.password) {
            var name = req.body.name;
            var password = req.body.password;
            mongo.getAuthenticated(name, password)
                .then(data => {
                    console.log(data)
                    if (data.user) {
                        console.log('user', data.user)
                        var payload = {
                            id: data.user._id
                        };
                        var token = jwt.sign(payload, jwtOptions.secretOrKey);
                        res.json({
                            message: "ok",
                            token: token
                        });
                    }
                    switch (data.reason) {

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
        const buf = crypto.randomBytes(20);
        const token = buf.toString('hex');

        const resetPasswordToken = token;
        const resetPasswordExpires = Date.now() + 3600000; // 1 hour

        mongo.setResetToken(req.body.email,resetPasswordToken, resetPasswordExpires)
            .then(e => res.send('send'))
            .catch(err => console.log(err))
    })


    var api_key = mailgunConfig.key;
    var domain = 'sandboxa9461c2dc5d64c618caaec296ca33955.mailgun.org';
    var mailgun = require('mailgun-js')({
        apiKey: api_key,
        domain: domain
    });

    var data = {
        from: 'Excited User <jonathan.drude@gmail.com>',
        to: 'jonathan.drude@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
    };

    // mailgun.messages().send(data, function (error, body) {
    //   console.log(body);
    // });

}
