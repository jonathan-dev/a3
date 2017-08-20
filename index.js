import express from 'express'
import formidable from 'express-formidable'

const PORT = 8000
const app = express()

app.use(formidable())

app.post('/upload', (req, res) => {
    req.fields; // contains non-file fields
    req.files; // contains files
})

app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)