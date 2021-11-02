#!/usr/bin/env node

'use strict';

var pjson = require('./package.json');
let program = require('commander');

function fn_doNothing ()
{
	return "";
}



var isUseHTTPs = !(!!process.env.PORT || !!process.env.IP);

var server = require(isUseHTTPs ? 'https' : 'http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

function serverHandler(request, response) {
    var uri = url.parse(request.url).pathname,
        //filename = path.join(process.cwd(), uri);
        filename = path.join(__dirname, uri);

    var stats;

    try {
        stats = fs.lstatSync(filename);
    } catch (e) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('404 Not Found: ' + path.join('/', uri) + '\n');
        response.end();
        return;
    }

   


    fs.readFile(filename, 'binary', function(err, file) {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write('404 Not Found: ' + path.join('/', uri) + '\n');
            response.end();
            return;
        }

        response.writeHead(200);
        response.write(file, 'binary');
        response.end(); 
    });
}

var app;

if (isUseHTTPs) {
    var options = {
        key: fs.readFileSync(path.join(__dirname, 'ssl-keys/privatekey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'ssl-keys/certificate.pem'))
    };
    app = server.createServer(options, serverHandler);
} else app = server.createServer(serverHandler);

program
  .version(pjson.version)
  //.option('-h --html_port <port>', 'port number that your html code will connect to',8811)
  .option('-p --port <port number>', 'Mission Planner UDP Port', 8181)
  .parse(process.argv);



app = app.listen(program.port, "127.0.0.1", function() {
    var addr = app.address();
    fn_console_log('Open Browser at: https://127.0.0.1:' + program.port + '/andruavweb.html');
});
