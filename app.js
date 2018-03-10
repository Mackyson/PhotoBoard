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
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = submitpath;
        form.parse(req, function (err, fields, files) {
            console.log(files.upload.path);
            fs.rename(files.upload.path, submitpath + "/" + cnt++ + ".jpg", function (err) {
                console.log("your file was submitted as \n" + submitpath + "" + (cnt-1) + ".jpg");
                if (err) {
                    res.end(err);
                }
            });
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
        });

        return;
    }
    // show a file upload form
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<br>' +
        '<input type="file" name="upload"  accept= "image/*" capture="camera"><br><br><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(port);
console.log("server is running at http://localhost:" + port + "");