const express   = require('express');
const v_https   = require('https');
const v_path    = require('path');


const c_app   = express();


c_app.use(function(req, res, next) {
    //res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});

const c_webport = 8001;
c_app.set('port',c_webport);
c_app.use(express.static(__dirname + '/'));

const v_fs = require('fs');
const v_keyFile = v_fs.readFileSync(v_path.join(__dirname, "./ssl-keys/privatekey.pem"));
const v_certFile = v_fs.readFileSync(v_path.join(__dirname, "./ssl-keys/certificate.pem"));

const v_options = {
    key: v_keyFile,
    cert: v_certFile
};
v_https.createServer(v_options, c_app).listen(c_app.get('port'));
console.log ("Andruav Web running on port " + c_webport);