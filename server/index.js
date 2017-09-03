import express from 'express'
import mongo from './mongo'
import formidable from 'formidable'
import path from 'path'
import cors from 'cors'
import graphQLHTTP from 'express-graphql'
import schema from './schema'
import DataLoader from 'dataloader'
import md5 from 'md5'

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

// POST
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
			imgId: imgId
		});
	});

	form.on('error', function () {
    console.log('error')
		res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
	});
});

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(resolve('dist/index.html')));
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
