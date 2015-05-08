var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['D']);
var fs = require('fs');

server.on('request', function (req, res) {
    if (req.url === '/') {
        fs.readFile('./public/index.html', function (err, html) {
            if (err) {
                return console.error(err); 
            }
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();
        });
    }
});

server.listen(1337, function () {
    console.log('Server is listening on port 1337');
});
