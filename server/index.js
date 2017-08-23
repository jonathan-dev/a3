import express from 'express'
import graphQLHTTP from 'express-graphql'
import mongo from './mongo'
import schema from './schema'
import DataLoader from 'dataloader'


const PORT = 8000
const app = express()

// serve the Vue single page app
app.use('/public', express.static('dist'));

// graphql endpoint
app.use(graphQLHTTP(req => {
    const postLoader = new DataLoader(
        keys => Promise.all(keys.map(mongo.getPosts))
    )
    const loaders = {
        person: postLoader,
    }
    return {
        context: {loaders},
        schema,
        graphiql: true
    }
}))

app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)