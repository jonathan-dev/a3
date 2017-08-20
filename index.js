import express from 'express'
import graphQLHTTP from 'express-graphql'

import schema from './schema'


const PORT = 8000
const app = express()

app.use(graphQLHTTP({
    schema,
    graphiql: true
}))

app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)