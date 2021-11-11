#!/bin/bash


ROOTDIR=$PWD
pushd $ROOTDIR/andruav_webclient

#http-server -p 8000  -S -C ./ssl-keys/certificate.pem  -K ./ssl-keys/privatekey.pem 
node server.js
popd
