import express from 'express'
import bodyParser from 'body-parser'
import mongo from './mongo'

import path from 'path'
import cors from 'cors'
import graphQLHTTP from 'express-graphql'
import schema from './schema'
import DataLoader from 'dataloader'

import upload from './upload'
import auth from './auth'

function resolve (dir) {
  return path.join(__dirname, dir)
}

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

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// allow Cross-Origin Resource Sharing (CORS)
// required when using webpack dev server to serve the client
app.use(cors())

// serve images statically
app.use('/images', express.static(resolve(IMAGES_URL)))
app.use('/', express.static(resolve('dist')))

auth(app)
upload(app);

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


// serve the index page if nothing else fits (fix for client side routing)
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(resolve('dist/index.html')));
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
