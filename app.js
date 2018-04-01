// app.js
var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    formidable = require('formidable'),
    crypto = require('crypto'),
    querystring = require('querystring'),
    async = require('async'),
    timers = require('timers');

// ファイル保存場所
var submitpath = "./upload";
// ポート番号
var port = 1337;
var hostname = '127.0.0.1';
var url = 'http://' + hostname + ':' + port + '';
var cnt = 0;
var path = "";
//var flag = false;

http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(
            '<form action = "/check" enctype="text/plain" method="post"> \n' +
            '<p><input type="password" name="pass"></p>\n' +
            '<p><input type="submit"></p>\n' +
            '<br><br><br><br><br><br><a href = "/screen"></a>'
        );
    }
    if (req.url == "/screen") {
        fs.readFile('./screen/index.html', 'utf-8', function (err, text) {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(text);
        });
    }
    if (req.url == "/check") {

        var postString = "";
        req.on("data", data => {
            postString += data;
        });

        req.on("end", () => {
            var hash = crypto.createHash(*);
            var postData = querystring.parse(postString);
            hash.update(postData["pass"]);
            hashed = hash.digest("base64");
            console.log(hashed);
            res.setHeader('Set-Cookie', ["check=" + hashed]);

            res.writeHead(200, { "content-type": "text/html" });

            res.write("<script> location.href = './submit' </script>");

            res.end();
        });

    }
    else if (req.url == '/submit') {

        var pass = "" + req.headers.cookie;
        console.log(pass);
        // show a file submit form

        if (*) {
            fs.readFile('./index.html', 'utf-8', function (err, text) {
                res.writeHead(200, { 'content-type': 'text/html' });
                res.end(text);
            });
        } else { res.writeHead(200, { "content-type": "text/html" }); res.write("<a href=\"/\">Access denied."); res.end(); }
    } else if (req.url == '/setting') {
        fs.readFile('./setting.css', 'utf-8', function (err, text) {
            res.writeHead(200, { 'content-type': 'text/css' });
            res.end(text);
        });
    } else if (req.url == '/upload' && req.method == 'POST') {
        var tmpurl;
        res.writeHead(200, { 'content-type': 'text/html' });
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = submitpath;


        form.parse(req, function (err, fields, files) {
            res.writeHead(200, { 'background-color': 'red' });
            res.end('<a href ="/submit">Complete!</a>');
            tmpurl = files.upload.path;
        });

        form.on('end', () => {

            console.log("Start Submission -------------");
            async.series([

                function (callback) {

                    timers.setTimeout(() => {
                        console.log(tmpurl);
                        callback(null, 'one');
                    }, 1000)
                },
                function (callback) {

                    timers.setTimeout(() => {
                        fs.rename(tmpurl, submitpath + "/" + cnt++ + ".jpg", function (err) {
                            console.log("success : your file was submitted as \n" + submitpath + "" + (cnt - 1) + ".jpg");
                            if (err) {
                                res.end("failed :" + err);
                            }
                        });
                        callback(null, 'one');
                    }, 1000)
                },
                function (callback) {
                    timers.setTimeout(() => {
                        console.log()
                        callback(null, 'one');
                    }, 1000)
                },
            ], function (err, results) {
                if (err) {
                    console.log("err[" + err + "]");
                }
                console.log("Submission complete--------------")

            });
        });
    }
}).listen(port);

console.log("Server is running at " + url);
