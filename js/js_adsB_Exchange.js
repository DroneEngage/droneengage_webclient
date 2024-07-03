

var AndruavLibs = AndruavLibs || { REVISION: 'BETA' };

(function (){

    var v_adsbObject = function ()
    {   
        var _Me_adsbObject = this;
        this.update = function (_obj)
        {
            if (_obj.PosTime != _Me_adsbObject.PosTime)
            {   // sometimes data is chached at the site itself.
                // if so then dont update our timer monitor.
            _Me_adsbObject.m_lastActiveTime = _obj.m_lastActiveTime;
            }
            else
            {
                fn_console_log ("Repeated");
            }
            _Me_adsbObject.Id = _obj.Id;
            _Me_adsbObject.Icao = _obj.Icao;
            //A description of the aircraft’s model
            _Me_adsbObject.ModelDescription = _obj.Mdl;
            //The manufacturer’s name. This is looked up via a database based on the ICAO code. 
            _Me_adsbObject.Manufacturer = _obj.Man;
            // https://en.wikipedia.org/wiki/Transponder_(aeronautics)
            if (_obj.hasOwnProperty('Sqk'))
            {
                _Me_adsbObject.Sqk = _obj.Sqk;
            }
            else
            {
                _Me_adsbObject.Sqk = "";
            }
            if (_obj.hasOwnProperty('Spd'))
            {
                _Me_adsbObject.Speed = _obj.Spd * CONST_KNOT_TO_KM_HOUR;
            }
            else
            {
                _Me_adsbObject.Speed = 0;
            }
            if (_obj.hasOwnProperty('Gnd'))
            {
                _Me_adsbObject.Ground = _obj.Gnd;
            }
            else
            {
                _Me_adsbObject.Ground = false;
            }
            if (_obj.hasOwnProperty('Help'))
            {
                // serious issue
                _Me_adsbObject.Help = _obj.Help;
            }
            else
            {
                _Me_adsbObject.Help = false;
            }
            _Me_adsbObject.Longitude = _obj.Long;
            _Me_adsbObject.Latitude = _obj.Lat;
            if (_obj.hasOwnProperty('Alt'))
            {
                // The altitude in feet at standard pressure. (broadcast by the aircraft)
                _Me_adsbObject.Altitude = _obj.Alt * CONST_FEET_TO_METER;
            }
            else
            {
                _Me_adsbObject.Altitude = 0.0;
            }

            // Vertical speed in feet per minute. Broadcast by the aircraft.
            if (_obj.hasOwnProperty('Vsi'))
            {
                _Me_adsbObject.VerticalSpd = _obj.Vsi * CONST_FEET_TO_METER / 60;
                // vertical speed is barometric, 1 = vertical speed is geometric. Default to barometric until told otherwise.
                _Me_adsbObject.IsVerticalSpeedGeometric = _obj.VsiT;
            }
            else
            {
                _Me_adsbObject.VerticalSpd = 0;
            }

            if (_obj.hasOwnProperty('Trak'))
            {
                _Me_adsbObject.Heading = _obj.Trak;
            }
            else
            {
                _Me_adsbObject.Heading = 0;
            }
        }

    } 



    var v_ADSB_Exchange = function (){
        
        this.ADSB_UpdateTimeOut = 10000;
        this.ADSB_RefreshRate = 8000; 
        this.ADSB_DroneRefreshRate = 8000;
        var Me = this;
        var v_url = "https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?";
        var lng=0;
        var lat=0;
        var radius=0;

        var __callsTimeTable = {};

        this.adsbObjectList = {};

        function _parseData (_data,_droneAlt)
        {
            const now = Date.now();
            
            var len = _data.acList.length;
            for (var i=0;i<len;++i)
            {
                _data.acList[i].m_lastActiveTime = now;
                if (Me.adsbObjectList.hasOwnProperty(_data.acList[i].Id))
                {
                    Me.adsbObjectList[_data.acList[i].Id].update(_data.acList[i]);
                }
                else
                {
                    var _obj = new v_adsbObject ();
                    _obj.update(_data.acList[i]);
                    Me.adsbObjectList[_data.acList[i].Id] = _obj;
                }
            }
        }

        setInterval(function () {
            // dont call 
            if ((Me.lat== null) || (Me.radius ==0)) return ;

			Me.fn_getADSBData(Me.lat,Me.lng,undefined,Me.radius);
			
         }, Me.ADSB_RefreshRate);
        
        this.fn_changeDefaultLocation = function(lat,lng,radius)
        {
            Me.lng = lng;
            Me.lat = lat;
            Me.radius = radius;
        }

        this.fn_getADSBDataForUnit = function (p_andruavUnit)
        {
            if (v_EnableADSB == false) return ;

            const now = Date.now();
            if (__callsTimeTable.hasOwnProperty (p_andruavUnit.partyID) == false)
            {
                __callsTimeTable[p_andruavUnit.partyID] = now;
            }

            if ((now - __callsTimeTable[p_andruavUnit.partyID] ) > this.ADSB_DroneRefreshRate)
            {
                Me.fn_getADSBData (p_andruavUnit.m_Nav_Info.p_Location.lat,p_andruavUnit.m_Nav_Info.p_Location.lng,p_andruavUnit.m_Nav_Info.p_Location.alt,10);
            }
        }

        this.fn_getADSBData = function (p_lat,p_lng,p_alt,p_radius)
        {
          
            if (v_EnableADSB == false) return ;
            
            var _v_url =  v_url + 'lat=' + p_lat.toString() + '&lng=' + p_lng.toString() + '&fDstL=0' + '&fDstU=' + p_radius.toString();
            fn_console_log ("ADSB URL: %s", _v_url);
            var res=null;
			$.ajax({
				url: _v_url,
                type: 'GET',
                crossDomain: true,
                dataType: 'JSONP',
                
				success: function(p_res) {
                    _parseData (p_res,p_alt);
                    window.AndruavLibs.EventEmitter.fn_dispatch(EE_adsbExchangeReady,window.AndruavLibs.ADSB_Exchange.adsbObjectList);
                },
                error: function ( jqXHR, textStatus, errorThrown)
				{
                    Me.v_logined = false;
                },
                async: false
			});
			
        };

        this.fn_onPreferenceChanged = function  (p_caller,p_params)
        {
            if (v_EnableADSB == false)
            {
                window.AndruavLibs.EventEmitter.fn_dispatch(EE_adsbExchangeReady,window.AndruavLibs.ADSB_Exchange.adsbObjectList);
            }
        }
        
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onPreferenceChanged, this, this.fn_onPreferenceChanged);
        
        
    };

    if (CONST_DISABLE_ADSG == false)
    {
        AndruavLibs.ADSB_Exchange = new v_ADSB_Exchange ();
    }

}) ();

(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.AndruavLibs = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(AndruavLibs);