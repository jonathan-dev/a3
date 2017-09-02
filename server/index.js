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
app.use('/', express.static(resolve('dist')))

// main page (hot page) server route
app.get('/', function (req, res) {
  res.sendFile(path.resolve(resolve('dist')));
});


// create post get request route
app.get('/create/post', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/public/views/create_post_page.html'));
});

// upload post functionality
// app.post('/create/post', function (req, res) {
//   console.log('post')
//   let form = new formidable.IncomingForm();
//   let postTitle;
//   let imagePath;

//   // parse the incoming node.js request containing form data
//   form.parse(req,function (error, fields, files) {
//     // TODO: catch error
//     postTitle = fields.title;
//     console.log(fields, files)
//     if(error){
//       console.error(error);
//     }
//   });

//   // When new file is detected in upload stream, set the storage path
//   form.on('fileBegin', function (name, file) {
//     console.log('fileBegin');
//     imagePath = IMAGES_URLS + file.name;
//     file.path = __dirname + "/public/uploads/images/" + file.name;
//   });

//   // when entire request has been received store the post in the database
//   form.on('end', function () {
//     console.log('end')
//     let post = {
//       title: postTitle,
//       imagePath: imagePath
//     };
//     mongo.createPost(post);
//   });

//   // res.redirect('/');
// });

// POST
app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	var index, filename;

	form.parse(req);

	form.on('field', function(name, value) {
    console.log('field: ',name,value)
		if (name == 'index') index = value;
	});

	form.on('fileBegin', function(name, file) {
    console.log('fileBegin')
		file.path = __dirname + '/public/uploads/images/' + file.name;
	});

	form.on('file', function(name, file) {
    console.log('file')
		filename = file.name;
	});

	form.on('end', function() {
    console.log('end')
		res.json({
      index: index,
			filename: filename
		});
	});

	form.on('error', function () {
    console.log('error')
		res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
	});
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

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
