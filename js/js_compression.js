/* ********************************************************************************
*   Mohammad Hefny
*
*   22 Feb 2021
*
*********************************************************************************** */
"use strict";

/*jshint esversion: 6 */

// https://stackoverflow.com/questions/294297/javascript-implementation-of-gzip

class CCompression { // LZW-compress a string
    fn_lzw_encode(s) {
        var dict = {};
        var data = (s + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict[phrase + currChar] != null) {
                phrase += currChar;
            } else {
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                dict[phrase + currChar] = code;
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        for (var i = 0; i < out.length; i++) {
            out[i] = String.fromCharCode(out[i]);
        }
        return out.join("");
    }

    // Decompress an LZW-encoded string
    fn_lzw_decode(s) {
        var dict = {};
        var data = (s + "").split("");
        var currChar = data[0];
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i = 1; i < data.length; i++) {
            var currCode = data[i].charCodeAt(0);
            if (currCode < 256) {
                phrase = data[i];
            } else {
                phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
            } out.push(phrase);
            currChar = phrase.charAt(0);
            dict[code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out.join("");
    }

};

var AndruavLibs = AndruavLibs || {
    REVISION: 'BETA'
};


(function(lib) {
	"use strict";
	if (typeof module === "undefined" || typeof module.exports === "undefined") {
	  window.AndruavLibs.AndruavCompression = lib; // in ordinary browser attach library to window
	} else {
	  module.exports = lib; // in nodejs
	}
  })(new CCompression());
  
  
