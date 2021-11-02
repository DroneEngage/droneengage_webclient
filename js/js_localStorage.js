var AndruavLibs = AndruavLibs || { REVISION: 'BETA' };

(function (global)
{

    var Me = this;
	
    this.isSupported = function ()
    {
        return (typeof(Storage) !== "undefined")
    }

    function init()
    {
        if (Me.isSupported())
        {
            // reset defaults with saved values if exist
            v_useMetricSystem               = Me.fn_getMetricSystem();
            v_gamePadMode                   = Me.fn_getGamePadMode();
            CONST_DEFAULT_ALTITUDE          = Me.fn_getDefaultAltitude();
            CONST_DEFAULT_RADIUS            = Me.fn_getDefaultRadius();
        }
    }




    function getDefaultAttribute (name,defaultValue)
    {
        if (!Me.isSupported()) return defaultValue;

        if (localStorage[name] != null)
        {
            return localStorage[name];     
        }
        else
        {
            return defaultValue;
        }
    }



    this.fn_setLanguage = function (value)
    {
        localStorage._vLang = value;
    }

    this.fn_getLanguage = function ()
    {
        return getDefaultAttribute ('_vLang',"en");
    }


    this.fn_setEmail = function (value)
    {
        localStorage._vEmail = value;
    }

    this.fn_getEmail = function ()
    {
        return getDefaultAttribute ('_vEmail',"");
    }

    this.fn_setAccessCode = function (value)
    {
        localStorage._vAccessCode = value;
    }

    this.fn_getAccessCode= function ()
    {
        return getDefaultAttribute ('_vAccessCode',"");
    }


    this.fn_setUnitID = function (bool)
    {
        localStorage._vUnitID = bool;
    }

    this.fn_getUnitID = function ()
    {
        return getDefaultAttribute ('_vUnitID',"WebGCS1");
    }

    this.fn_setGroupName = function (value)
    {
        localStorage._vGroupName = value;
    }

    this.fn_getGroupName = function ()
    {
        return getDefaultAttribute ('_vGroupName',"1");
    }

   

    this.fn_setMetricSystem = function (p_bool)
    {
        localStorage._vv_useMetricSystem = p_bool;
    }

    this.fn_getMetricSystem = function ()
    {
        return (getDefaultAttribute ('_vv_useMetricSystem',v_useMetricSystem) == 'true');
    }

    this.fn_getGamePadMode = function ()
    {
        return parseInt(getDefaultAttribute ('_vv_gamePadMode',2));
    }

    this.fn_setGamePadMode = function (p_mode)
    {
        localStorage._vv_gamePadMode = p_mode;
    }

    this.fn_setDefaultAltitude = function (value)
    {
        if (!this.isSupported)
        {
             CONST_DEFAULT_ALTITUDE = value;    
        }
        localStorage._vDefaultAltitude = value;
    }

    this.fn_getDefaultAltitude = function (value)
    {
        return parseInt(getDefaultAttribute ('_vDefaultAltitude',CONST_DEFAULT_ALTITUDE));
    }

    this.fn_setDefaultRadius = function (value)
    {
        localStorage._vDefaultRadius = value;
    }

    this.fn_getDefaultRadius = function (value)
    {
        return parseInt(getDefaultAttribute ('_vDefaultRadius',CONST_DEFAULT_RADIUS));
    }

    
    init();
	
    global.LocalStorage = this;
    
}) (AndruavLibs);


   


(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.AndruavLibs = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(AndruavLibs);
