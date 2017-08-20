import express from 'express'
import formidable from 'express-formidable'

const PORT = 8000
const app = express()

app.use(formidable({
    uploadDir: __dirname + '/public/uploads'
}))

app.use('/public', express.static('public'));

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + "/public/views/upload_page.html");
})

app.post('/upload', (req, res) => {
    req.fields; // contains non-file fields
    req.files; // contains files
    console.log(req.files);
})

app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)