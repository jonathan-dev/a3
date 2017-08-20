import express from 'express'
import formidable from 'express-formidable'

const PORT = 8000
const app = express()

app.use(formidable({
    uploadDir: __dirname + '/public/uploads',
    filename: "1"
}))

app.use('/public', express.static('public'));

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + "/public/views/upload_page.html");
})

app.post('/upload', (req, res) => {
    req.fields; // contains non-file fields
    req.files; // contains files
    var image = {
        title: req.fields.title,
        path: req.files.upload.path
    };

    console.log("Image saved!:");
    console.log(image);
    // TODO save in database
    res.end("Done!");
})

app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)