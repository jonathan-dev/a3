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
app.use('/images', passport.authenticate('jwt', { session: false }), express.static(resolve(IMAGES_URL)))
app.use('/', express.static(resolve('dist')))


app.post("/login", function(req, res) {
  console.log('login', name, password)
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
    mongo.getAuthenticated(name, password)
    .then(data => {
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

  // // usually this would be a database call:
  // var user = users[_.findIndex(users, {name: name})];
  // if( ! user ){
  //   res.status(401).json({message:"no such user found"});
  // }

  // if(user.password === req.body.password) {
  //   // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
  //   var payload = {id: user.id};
  //   var token = jwt.sign(payload, jwtOptions.secretOrKey);
  //   res.json({message: "ok", token: token});
  // } else {
  //   res.status(401).json({message:"passwords did not match"});
  // }
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
