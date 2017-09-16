import express from 'express'
import bodyParser from 'body-parser'
import mongo from './mongo'
import formidable from 'formidable'
import path from 'path'
import cors from 'cors'
import graphQLHTTP from 'express-graphql'
import schema from './schema'
import DataLoader from 'dataloader'
import md5 from 'md5'

import jwt from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

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
  // usually this would be a database call:
  // var user = users[_.findIndex(users, {id: jwt_payload.id})];
  // if (user) {
  //   next(null, user);
  // } else {
  //   next(null, false);
  // }
  mongo.getUserById(jwt_payload.id)
  .then(user => {
    console.log('user', user)
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

app.use(function(req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    req.user = user;
    next();
  })(req, res, next);
})

app.use(function(req,res,next){
  console.log("user", req.user);
  next();
})


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
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    mongo.createUser(name, email, password)
    .then(() => { // user was created successfully
      res.sendStatus(200);
    })
    .catch(error => { // error occurred while creating the user
      if (error.name === 'ValidationError') {
        res.status(409); // Conflict
        console.log("Error 409: ");
        console.log(error.errors)
        res.send(error.message);
      } else {
        res.statusCode = 500;
        console.log("Error occurred while creating user");
        console.log(error);
        res.send('Server Error');
      }
    })

  }
});

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

// image upload
app.post('/upload', function(req, res) {
	let form = new formidable.IncomingForm();
	let imgId;

	form.parse(req);

	form.on('field', function(name, value) {
    console.log('field: ',name,value)
	});

	form.on('fileBegin', function(name, file) {
    console.log('fileBegin')
    // generate img id
    imgId  = md5(file.name+new Date().toString());
    file.path = __dirname + '/public/uploads/images/' + imgId+'.png';
	});

	form.on('file', function(name, file) {
    console.log('file')
	});

	form.on('end', function() {
    console.log('end')
		res.json({
			imageId: imgId
		});
	});

	form.on('error', function () {
    console.log('error')
		res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
	});
});

// serve the index page if nothing else fits (fix for client side routing)
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(resolve('dist/index.html')));
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
