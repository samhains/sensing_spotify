var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
// var camera = require('camera-vc0706').use(tessel.port['D']);

var fs = require('fs');
var ambient = require('ambient-attx4').use(tessel.port['D']);
// var ambient = ambientlib;
var ambientdata = require('./ambientdata');



server.on('request', function(req, res) {
    console.log(req.url);
    if (req.url === '/') {
        fs.readFile('./public/index.html', function(err, html) {
            if (err) {
                return console.error(err);
            }
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write(html);
            // res.write(sdata);
            // res.write(ldata);
            res.end();

        });

    }
    if (req.url === '/getData') {
        console.log("hitting route");
        ambientdata.getData(function(err, sdata, ldata) {
            console.log("getting data");
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            console.log(typeof sdata);
            console.log(typeof ldata)
            res.write(sdata + " " + ldata);
            res.end();
        });
    }
});

ambient.on('ready', function() {

    server.listen(1337, function() {
        console.log('Server is listening on port 1337');
    });
});