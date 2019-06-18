var express = require('express');
var app = express();

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'images');
const pickRandomNumber = (max) => Math.floor(Math.random() * max);

const allowedFileTypes = [".jpg", ".png"];
const hasAllowedEnding = file => allowedFileTypes.some(ending => file.toLowerCase().endsWith(ending));

app.get('/image', function (req, res) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        const images = files.filter(hasAllowedEnding);
        const pickedIndex = pickRandomNumber(images.length);
        const imageName = images[pickedIndex];
        res.sendFile(path.join(directoryPath, imageName));
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});