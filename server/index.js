import express from 'express'
import mongo from './mongo'
import formidable from 'formidable'
import path from 'path'
import cors from 'cors'
import graphQLHTTP from 'express-graphql'
import schema from './schema'
import DataLoader from 'dataloader'

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

// allow Cross-Origin Resource Sharing (CORS)
// required when using webpack dev server to serve the client
app.use(cors())

// serve images statically
app.use('/images', express.static(resolve(IMAGES_URL)))

// main page (hot page) server route
app.get('/', function (req, res) {
  res.sendFile(path.resolve(resolve('dist')));
});


// create post get request route
app.get('/create/post', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/public/views/create_post_page.html'));
});

// upload post functionality
app.post('/create/post', function (req, res) {
  let form = new formidable.IncomingForm();
  let postTitle;
  let imagePath;

  // parse the incoming node.js request containing form data
  form.parse(req,function (error, fields, files) {
    // TODO: catch error
    postTitle = fields.title;
  });

  // When new file is detected in upload stream, set the storage path
  form.on('fileBegin', function (name, file) {
    imagePath = IMAGES_URLS + file.name;
    file.path = __dirname + "/public/uploads/images/" + file.name;
  });

  // when entire request has been received store the post in the database
  form.on('end', function () {
    let post = {
      title: postTitle,
      imagePath: imagePath
    };
    mongo.createPost(post);
  });

  res.redirect('/');
});

// GraphqQL server route
app.use(graphQLHTTP(req => {
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

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
