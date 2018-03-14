// app.js
var http = require('http'),
	util = require('util'),
	fs = require('fs'),
	formidable = require('formidable');

// ファイル保存場所
var submitpath = "./submit/upload";
// ポート番号
var port = 1337;
var hostname = '127.0.0.1';
var url = 'http://' + hostname + ':' + port + '';
var cnt = 0;
var path = "";

http.createServer(function (req, res) {
	if (req.url == '/') {
		// show a file upload form
		fs.readFile('./top.html', 'utf-8', function (err, text) {
			res.writeHead(200, { 'content-type': 'text/html' });
			text = text.replace("count", cnt);
			res.end(text);
		});
	} else if (req.url == '/setting') {
		fs.readFile('./setting.css', 'utf-8', function (err, text) {
			res.writeHead(200, { 'content-type': 'text/css' });
			text = text.replace("count", cnt);
			res.end(text);
		});
	} else if (req.url == '/upload' && req.method == 'POST') {
		res.writeHead(200, { 'content-type': 'text/html' });
		// parse a file upload
		var form = new formidable.IncomingForm();
		form.uploadDir = submitpath;


		form.parse(req, function (err, fields, files) {
			res.writeHead(200, { 'background-color': 'red' });
			res.end('<a href ="' + url + '">Complete!</a>');
		});

		form.on('fileBegin', function (name, file) {
			path = file.path;
			console.log(path);
			file.path = submitpath + "/" + cnt + ".jpg";
			console.log("Your file was submitted as \n" + submitpath + "/" + (cnt) + ".jpg");
			cnt++;
		});
	}
}).listen(port);

console.log("Server is running at " + url);