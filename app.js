// app.js
var http = require('http'),
	util = require('util'),
	fs = require('fs'),
	formidable = require('formidable');

// ファイル保存場所
var submitpath = "./submit/upload";
// ポート番号
var port = 1337;
var url = 'http://' + '127.0.0.1' + ':' + port + '';
var cnt = 0;

http.createServer(function (req, res) {
	if (req.url == '/upload' && req.method == 'POST') {
		res.writeHead(200, { 'content-type': 'text/html' });
		// parse a file upload
		var form = new formidable.IncomingForm();
		form.uploadDir = submitpath;


		form.parse(req, function (err, fields, files) {
			res.writeHead(200, { 'background-color': 'red' });
			res.end('<a href ="' + url + '">Complete!</a>');
			cnt++;
		});

		form.on('fileBegin', function (name, file) {
			console.log(file.path);
			file.path = submitpath + "/" + cnt + ".jpg";
			console.log("Your file was submitted as \n" + submitpath + "/" + (cnt) + ".jpg");
		});
	} else {
		// show a file upload form
		fs.readFile('./top.html', 'utf-8', function (err, text) {
			res.writeHead(200, { 'content-type': 'text/html' });
			res.end(text);
		});
	}
}).listen(port);

console.log("Server is running at " + url);