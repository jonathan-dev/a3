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
// graphql endpoint
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

app.get('/', function (req, res) {
  res.send("Hello, you are at /");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
