const express = require('express');
const multer  = require('multer');
const fs      = require('fs');
const rimraf  = require('rimraf');

const app = express();

const storage = multer.diskStorage({
  destination: './src/files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(txt)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

const upload = multer({ storage }).single('file');

app.post('/api/file/:id', upload, (req, res) => {
    const readStream = fs.createReadStream(__dirname + '/files/' + req.file.filename, 'utf8');
    readStream.on('data', function(chunk) {
        if (chunk) {
            res.json({ text: chunk, status: 'success', params: req.params.id });
        } else {
            res.json({ status: 'error', message: 'Error!!!' });
        }
    });
});

app.use('*', (req, res) => {
    res.json({ status: 'error', message: 'Something went wrong!!!' })
});

app.listen(7777, function() {
    rimraf(__dirname + '/files/', function() {
        fs.mkdirSync(__dirname + '/files/');
    })
    console.log('SERVER START ON PORT 7777')
});