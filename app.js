//app.js
var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    formidable = require('formidable');

//ファイル保存場所
var submitpath = "./submit/upload";
//ポート番号
var port = 1337;
var hostname = "127.0.0.1";
var cnt = 0;

http.createServer(function (req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write ('<meta charset= "utf-8"><script>alert("後ろの画面が変わるまでお待ちください")</script>');
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = submitpath;



        form.parse(req, function (err, fields, files) {
            //res.writeHead(200, { 'content-type': 'text/html' });
            res.write('<a href ="http://' + hostname + ':' + port + '">Complete!</a>\n\n');
            res.end();
            cnt++;
        });
        form.on('fileBegin', function (name, file) {
            console.log(file.path);
            file.path = submitpath + "/" + cnt + ".jpg";
            console.log("your file was submitted as \n" + submitpath + "/" + (cnt) + ".jpg");
        });

        return;
    }
    // show a file upload form
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<br>' +
        '<meta charset = "utf-8">' +
        '<label for="file_photo">' +
        '＋写真を撮影 ' +
        '</label>' +
        '<input type="file" id="file_photo" style="display:none;" name="upload" accept= "image/*" capture="camera"><br><br><br>' +
        '<style>' +
        'label {' +
        'color: white;' +
        'background-color: red;' +
        ' padding: 6px;' +
        'border-radius: 12px;' +
        '}' +
        '</style>' +
        '<div id ="thumb">' +
        '<input type="submit" value="Upload"style="display:none;">' +
        '</form>' +

        '<script>' +
        'if (window.File) {' +
        'var thumb = document.getElementById("thumb");' +
        'var select = document.getElementById("file_photo");' +
        'select.addEventListener("change", function (e) {' +
        'var fileData = e.target.files[0];' +
        'var imgType = fileData.type;' +


        'var reader = new FileReader();' +
        'reader.onload = function () {' +
        'var insert = "<input type = \'image\' src=" + reader.result + " alt = \'撮影してください\'><br>";' +
        'thumb.innerHTML = insert;' +
        '};' +
        'reader.readAsDataURL(fileData);' +
        '}, false);' +
        '}</script >'
    );
}).listen(port);
console.log("server is running at http://" + hostname + ":" + port + "");
