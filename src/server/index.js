import express from 'express'
import graphQLHTTP from 'express-graphql'
import mongo from './mongo'
import schema from './schema'
import DataLoader from 'dataloader'
import formidable from 'express-formidable'

const PORT = 8000;
const app = express();

// serve all the files in the public folder statically
app.use('/public', express.static('public'));

/*
// graphql endpoin
app.use(graphQLHTTP(req => {
  const postLoader = new DataLoader(
    keys => Promise.all(keys.map(mongo.getPosts))
  );
  const loaders = {
    person: postLoader,
  };
  return {
    context: {
      loaders
    },
    schema,
    graphiql: true
  }
}));*/

// apply middleware for handling file uploads
app.use(formidable({
  uploadDir: __dirname + '/public/uploads/images'
}));

app.get('/create/post', function (req, res) {
  res.sendFile(__dirname + '../client/views/create_post_page.html');
});


// upload post functionality
app.post('/create/post', (req, res) => {
  // NOTE: req.fields contains all data except file data, req.file contains all file related data
  // store image data in variable
  var image = {
    title: req.fields.title, // title defined in corresponding form, see /views/upload_page.html for further reference
    path: req.files.upload.path
  };
  console.log(image);
  // TODO: save image infos in database
  res.redirect('/'); // go back to home
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
