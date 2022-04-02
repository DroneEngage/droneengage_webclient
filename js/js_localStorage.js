/*jshint esversion: 6 */


class C_LocalStorage {

    constructor() {
        if (this.isSupported()) { // reset defaults with saved values if exist
            v_useMetricSystem = this.fn_getMetricSystem();
            v_gamePadMode = this.fn_getGamePadMode();
            CONST_DEFAULT_ALTITUDE = this.fn_getDefaultAltitude();
            CONST_DEFAULT_RADIUS = this.fn_getDefaultRadius();
        }
    }


    isSupported() {
        return(typeof(Storage) !== "undefined")
    }

    getDefaultAttribute(name, defaultValue) {
        if (!this.isSupported()) 
            return defaultValue;
        

        if (localStorage[name] != null) {
            return localStorage[name];
        } else {
            return defaultValue;
        }
    }


    fn_setLanguage = function (value) {
        localStorage._vLang = value;
    }

    fn_getLanguage = function () {
        return this.getDefaultAttribute('_vLang', "en");
    }


    fn_setEmail = function (value) {
        localStorage._vEmail = value;
    }

    fn_getEmail = function () {
        return this.getDefaultAttribute('_vEmail', "");
    }

    fn_setAccessCode = function (value) {
        localStorage._vAccessCode = value;
    }

    fn_getAccessCode = function () {
        return this.getDefaultAttribute('_vAccessCode', "");
    }


    fn_setUnitID = function (bool) {
        localStorage._vUnitID = bool;
    }

    fn_getUnitID = function () {
        return this.getDefaultAttribute('_vUnitID', "WebGCS1");
    }

    fn_setGroupName = function (value) {
        localStorage._vGroupName = value;
    }

    fn_getGroupName = function () {
        return this.getDefaultAttribute('_vGroupName', "1");
    }


    fn_setMetricSystem = function (p_bool) {
        localStorage._vv_useMetricSystem = p_bool;
    }

    fn_getMetricSystem = function () {
        return(this.getDefaultAttribute('_vv_useMetricSystem', v_useMetricSystem) == 'true');
    }

    fn_getGamePadMode = function () {
        return parseInt(this.getDefaultAttribute('_vv_gamePadMode', 2));
    }

    fn_setGamePadMode = function (p_mode) {
        localStorage._vv_gamePadMode = p_mode;
    }

    fn_setDefaultAltitude = function (value) {
        if (!this.isSupported) {
            CONST_DEFAULT_ALTITUDE = value;
        }
        localStorage._vDefaultAltitude = value;
    }

    fn_getDefaultAltitude = function (value) {
        return parseInt(this.getDefaultAttribute('_vDefaultAltitude', CONST_DEFAULT_ALTITUDE));
    }

    fn_setDefaultRadius = function (value) {
        localStorage._vDefaultRadius = value;
    }

    fn_getDefaultRadius = function (value) {
        return parseInt(this.getDefaultAttribute('_vDefaultRadius', CONST_DEFAULT_RADIUS));
    }


    fn_setSpeechEnabled = function (p_enabled) {
        localStorage._vv_speechEnabled = p_enabled;
    }

    fn_getSpeechEnabled = function () {
        return  this.getDefaultAttribute('_vv_speechEnabled', true);
    }

    fn_setVolume = function (value) {
        localStorage._vDefaultVolume = value;
    }

    fn_getVolume = function () {
        return parseInt(this.getDefaultAttribute('_vDefaultVolume', CONST_DEFAULT_VOLUME));
    }

    fn_setAdvancedOptionsEnabled = function (value) {
        localStorage._vAdvancedOptionsEnabled = value;
    }

    fn_getAdvancedOptionsEnabled = function () {
        return this.getDefaultAttribute('_vAdvancedOptionsEnabled', true);
    }
    
}


window.AndruavLibs = window.AndruavLibs || {
    REVISION: 'BETA'
};


(function (lib) {
    "use strict";
    if (typeof module === "undefined" || typeof module.exports === "undefined") {
        window.AndruavLibs.LocalStorage = lib; // in ordinary browser attach library to window
    } else {
        module.exports = lib; // in nodejs
    }
})(new C_LocalStorage());
