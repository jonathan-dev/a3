import express from 'express'
import mongo from './mongo'
import formidable from 'formidable'
import path from 'path'

import graphQLHTTP from 'express-graphql'
import schema from './schema'

const PORT = 8000;
const app = express();
const IMAGES_URLS = "http://localhost:8000/server/public/uploads/images/";

//------------------------------------------
// Configuration
//------------------------------------------

// serve all the files in the public folder statically
app.use('/server/public', express.static(__dirname + '/public'));
app.use('/client/public', express.static(path.resolve(__dirname + '/../client/public')));

// GraphqQL server route
app.use('/graphql', graphQLHTTP(req => ({
  schema,
  pretty: true
})));

// main page (hot page) server route
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/public/views/index.html'));
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



app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
