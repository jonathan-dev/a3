/**
 * This file creates an express server, applies all middleware and starts the server on the specified port
 * */

import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import cors from 'cors';
import graphQLHTTP from 'express-graphql';
import schema from './graphqlSchema'

import upload from './upload';
import { authApp } from './authentication';

function resolve(dir) {
    return path.join(__dirname, dir)
}

//------------------------------------------
// Constants
//------------------------------------------
const PORT = 8000;
const IMAGES_URL = '../public/uploads/images/';
//------------------------------------------

const app = express();

//------------------------------------------
// Configuration
//------------------------------------------

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
// allow Cross-Origin Resource Sharing (CORS)
// required when using webpack dev server to serve the client
app.use(cors());

// serve images statically
app.use('/images', express.static(resolve(IMAGES_URL)));
app.use('/', express.static(resolve('../dist')));

authApp(app);
upload(app);

// GraphqQL server route
app.use('/graphql', graphQLHTTP(req => {
    return {
        context: {
            req
        },
        schema,
        graphiql: true
    }
}));

// serve the index page if nothing else fits (fix for client side routing)
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(resolve('../dist/index.html')));
});

// start the server on the specified port
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
