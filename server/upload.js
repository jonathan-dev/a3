import formidable from 'formidable'
import md5 from 'md5'

module.exports = function (app) {

  // image upload
  app.post('/upload', function (req, res) {
    let form = new formidable.IncomingForm();
    let imgId;

    form.parse(req);

    form.on('field', function (name, value) {
      console.log('field: ', name, value)
    });

    form.on('fileBegin', function (name, file) {
      console.log('fileBegin')
      // generate img id
      imgId = md5(file.name + new Date().toString());
      file.path = __dirname + '/public/uploads/images/' + imgId + '.png';
    });

    form.on('file', function (name, file) {
      console.log('file')
    });

    form.on('end', function () {
      console.log('end')
      res.json({
        imageId: imgId
      });
    });

    form.on('error', function () {
      console.log('error')
      res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
    });
  });
}
