import express from 'express' // express webserver framework
import formidable from 'express-formidable' // middleware for handling file uploads

const PORT = 8000 // port express is running on
const app = express() // init express

// apply middleware for handling file uploads
app.use(formidable({
    uploadDir: __dirname + '/public/uploads'
}))

// ---- ROUTES ----

// serve all files in the public folder statically
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
    // NOTE: req.fields contains all data except file data
    // NOTE: req.file contains all file related data
    // store image data in variable
    var image = {
        title: req.fields.title,
        path: req.files.upload.path
    };
    // TODO: save image infos in database
    res.redirect('/'); // go back to home
})

// make the server listen on the specified port
app.listen(
    PORT,
    () => console.log(`server listening on http://localhost:${PORT}`)
)