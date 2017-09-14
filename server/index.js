import express from 'express'
import bodyParser from 'body-parser'
import mongo from './mongo'

import path from 'path'
import cors from 'cors'
import graphQLHTTP from 'express-graphql'
import schema from './schema'
import DataLoader from 'dataloader'


import jwt from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import upload from './upload'

function resolve (dir) {
  return path.join(__dirname, dir)
}

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'tasmanianDevil'
}

//Authorization: Bearer <Token>

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  mongo.getUserById(jwt_payload.id)
  .then(user => {
    // console.log('user', user)
    next(null, user)
  })
  .catch(err => next(null,false))
});

passport.use(strategy);

//------------------------------------------
// Constants
//------------------------------------------
const PORT = 8000;
const IMAGES_URL = 'public/uploads/images/';
//------------------------------------------

const app = express();

//------------------------------------------
// Configuration
//------------------------------------------

app.use(passport.initialize());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// allow Cross-Origin Resource Sharing (CORS)
// required when using webpack dev server to serve the client
app.use(cors())

// serve images statically
app.use('/images', express.static(resolve(IMAGES_URL)))
app.use('/', express.static(resolve('dist')))

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

// GraphqQL server route
app.use('/graphql', graphQLHTTP(req => {
  const postLoader = new DataLoader(
    keys => Promise.all(keys.map(mongo.getPosts))
  )
  const loaders = {
    person: postLoader,
  }
  return {
    context: {
      loaders
    },
    schema,
    graphiql: true
  }
}))

upload(app);

// serve the index page if nothing else fits (fix for client side routing)
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(resolve('dist/index.html')));
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
