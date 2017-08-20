import express from 'express'
import formidable from 'express-formidable'

const PORT = 8000
const app = express()

app.use(formidable({
    uploadDir: __dirname + '/public/uploads'
}))

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/views/hot_page.html");
})

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + "/public/views/upload_page.html");
})

app.get('/edit', (req, res) => {
    res.sendFile(__dirname + "/public/views/edit_post_page.html");
})

app.get('/post/id', (req, res) => {
    res.sendFile(__dirname + '/public/views/post_detail_page.html');
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
    res.redirect('/');
})

app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)