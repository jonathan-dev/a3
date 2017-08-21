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

// serve the main page (hot page) to the client
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/views/hot_page.html");
})

// serve the post upload page to the client
app.get('/upload', (req, res) => {
    res.sendFile(__dirname + "/public/views/upload_page.html");
})

// serve the edit post page to the client
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + "/public/views/edit_post_page.html");
})

// serve the post detail page to the client TODO serve specified file from database
app.get('/post/id', (req, res) => {
    res.sendFile(__dirname + '/public/views/post_detail_page.html');
})

// upload post functionality
app.post('/upload', (req, res) => {
    // NOTE: req.fields contains all data except file data, req.file contains all file related data
    // store image data in variable
    var image = {
        title: req.fields.title, // title defined in corresponding form, see /views/upload_page.html for further reference
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