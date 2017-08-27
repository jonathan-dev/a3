import express from 'express'
import mongo from './mongo'
import formidable from 'express-formidable'
import path from 'path'

const PORT = 8000;
const app = express();

// serve all the files in the public folder statically
app.use('/server/public', express.static(__dirname + '/public'));
app.use('/client/public', express.static(path.resolve(__dirname + '/../client/public')));

// apply middleware for handling file uploads
app.use(formidable({
  uploadDir: __dirname + '/public/uploads/images'
}));

app.get('/', function (req, res) {
  res.send("Hello you are at the /");
})

app.get('/create/post', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/public/views/create_post_page.html'));
});

// upload post functionality
app.post('/create/post', function (req, res) {
  mongo.createPost({
    title: req.fields.title,
    imagePath: req.files.upload.path
  });

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
