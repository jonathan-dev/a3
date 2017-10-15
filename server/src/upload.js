import formidable from 'formidable'
import md5 from 'md5'

module.exports = function (app) {

    // image upload
    app.post('/upload', function (req, res) {
        let form = new formidable.IncomingForm();
        let imgId;

        form.parse(req);

        form.on('fileBegin', function (name, file) {
            // generate img id
            imgId = md5(file.name + new Date().toString());
            file.path = __dirname + '/../public/uploads/images/' + imgId + '.png';
        });

        form.on('end', function () {
            res.json({
                imageId: imgId
            });
        });

        form.on('error', function () {
            res.end('Something went wrong on there server side. Your file may not have yet uploaded.');
        });
    });
}
