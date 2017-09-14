import jwt from 'jsonwebtoken'
import passport from 'passport'
import {
  ExtractJwt,
  Strategy as JwtStrategy
} from 'passport-jwt'

import mongo from './mongo'

module.exports = function (app) {
  var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tasmanianDevil'
  }

  //Authorization: Bearer <Token>

  var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
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
app.use(function(req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    req.user = user;
    next();
  })(req, res, next);
})

// log user to console
// app.use(function(req,res,next){
//   console.log("user", req.user);
//   next();
// })

app.post("/login", function(req, res) {
  console.log('login', req.body.name, req.body.password);
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
    mongo.getAuthenticated(name, password)
    .then(data => {
      console.log(data)
      if(data.user){
        console.log('user', data.user)
        var payload = {id: data.user._id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
      }
      switch(data.reason){

      }
    })
    .catch(err => console.log(err))
  }
});

app.post("/register", function(req, res){
  console.log('register', req.body.name, req.body.email, req.body.password);
  if(
    req.body.name &&
    req.body.email &&
    req.body.password){
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


}
