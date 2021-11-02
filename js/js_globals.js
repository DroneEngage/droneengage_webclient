
// auto connect variables
var v_connectState 	= false;  	
var v_connectRetries  = 0;  	



const CONST_DFM_FAR                 = 3000; // more than 10 Km is far.
const CONST_DFM_SAFE                = 1000; // less than 1 Km is safe.


// Metric System        
var v_useMetricSystem               = true;

var CONST_DEFAULT_ALTITUDE          = 100; // 100 m
var CONST_DEFAULT_RADIUS            = 50; // 50 m
var CONST_DEFAULT_ALTITUDE_min      = 1; //m		
var CONST_DEFAULT_ALTITUDE_STEP     = 3; //m		
var CONST_DEFAULT_RADIUS_min        = 5;
var CONST_DEFAULT_SPEED_MIN         = 5;  //m/s
var CONST_DEFAULT_SPEED_STEP        = 1; //m/s
// GUI 
const CONST_DEFAULT_FLIGHTPATH_STEPS_COUNT = 40;


var v_EnableADSB  = false;
var v_en_Drone = true;
var v_en_GCS   = true;

var v_gamePadMode = 2;

// speak
var v_enable_speak = true;

// map Color Selection
const v_colorDrawPathes = ['#D9524F', '#337AB7', '#62D284', '#F0AD4E'];

//////////////////////////////////
//LOCAL EVENTS

const EE_onPreferenceChanged        = "_E_96A4ED6B1E4_";
const EE_unitAdded                  = "_E_96D4ED6B3E4_";
const EE_unitUpdated                = "_E_96A4ED6B2E4_";
const EE_unitNavUpdated             = "_E_96E4ED6B3E4_";
const EE_onSocketStatus             = "_E_964FED6B3E4_";
const EE_updateLogin                = "_E_964CED6B1E4_";
const EE_videoStreamStarted         = "_E_964CXD6B1E4_";
const EE_videoStreamRedraw          = "_E_964CXD6B1E3_";
const EE_videoStreamStopped         = "_E_964CWD6B1E4_";
const EE_unitTelemetryOn            = "_E_96ADED6B3E4_";
const EE_unitTelemetryOff           = "_E_9642ED6B4E4_";
const EE_adsbExchangeReady          = "_E_9642ED6B4Z4_";
const EE_displayGeoForm             = "_E_9642FD6B4E4_";
const EE_mapMissionUpdate           = "_E_A642FD6B4E4_";
const EE_displayServoForm           = "_E_96A4XD6B1E4_";
const EE_servoOutputUpdate          = "_E_96ADDD6B3E4_";
const EE_SearchableTarget           = "_E_9XAZQD6B3E4_";
const EE_cameraZoomChanged          = "_E_8XAZQD6B3E4_";
const EE_cameraFlashChanged         = "_E_8YAZQD6B3E4_";

const EE_requestGamePad             = "__E_8ZAZQD6B3E4_";
const EE_releaseGamePad             = "__E_AZAZQD6B3E4_";

const EE_GamePad_Connected           = "_EG_96A4ED6B1E1_";
const EE_GamePad_Disconnected        = "_EG_96A4ED6B1E2_";
const EE_GamePad_Axes_Updated		 = "_EG_96A4ED6B1E3_";
const EE_GamePad_Button_Updated		 = "_EG_96A4ED6B1E4_";

const EE_displayStreamDlgForm        = "_EG_96AZZD6B1E4_";
const EE_hideStreamDlgForm           = "_EG_96AZZZ6B1E4_";

const EE_displayCameraDlgForm        = "_EG_66AZZD6B1E4_";
const EE_hideCameraDlgForm           = "_EG_66AZZZ6B1E4_";

const EE_onMissionItemToggle         = "_MS_96A4ED6B1E4_";

const EE_ErrorMessage                = "_E_A642XYZB4E4_";
// EOF LOCAL EVENTS



var v_smart_Telemetry_Level     = -1;
var v_security_key              = "dynamic_event";


var CONST_THIS_IS_PUBLIC_VERSION;


CONST_THIS_IS_PUBLIC_VERSION = true; 


const CONST_TEST_MODE = true;
const CONST_TEST_MODE_IP = "192.168.1.144";// "192.168.3.139";
const CONST_TEST_MODE_ENABLE_LOG = true;

//"www.andruav.com"._fn_hexEncode();  
//const CONST_PROD_MODE_IP = "www.andruav.com";

// const CONST_MAP_GOOLE   = true;
// const CONST_MAP_LEAFLET = false;




const CONST_MAP_GOOLE   = false; 


var VAR_MAP_LEAFLET_URL;

// IMPORTANT DO NOT COMMENT BELOW LINE.
VAR_MAP_LEAFLET_URL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHNhYWQiLCJhIjoiY2tqZnIwNXRuMndvdTJ4cnV0ODQ4djZ3NiJ9.LKojA3YMrG34L93jRThEGQ"._fn_hexEncode();


//CODEBLOCK_START
//"http://192.168.1.139:88/tile/{z}/{x}/{y}.png"._fn_hexEncode()
//const VAR_MAP_LEAFLET_URL = "2a403490349031000d2408a108a109610cb109c4084409610b640c4008440961084409610a290cb10d240c400c4008a134902b112d9027d908a13b193a243d0908a13b1938403d0908a13b1939313d09084431002f442971";
//const VAR_MAP_LEAFLET_URL = "http://127.0.0.1:88/tile/{z}/{x}/{y}.png"._fn_hexEncode();
//"http://192.168.1.139:88/tile/{z}/{x}/{y}.png"._fn_hexEncode()
//const VAR_MAP_LEAFLET_URL = "2a403490349031000d2408a108a109610cb109c4084409610b640c4008440961084409610a290cb10d240c400c4008a134902b112d9027d908a13b193a243d0908a13b1938403d0908a13b1939313d09084431002f442971";
/*
https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}
The available styles ({id}) are
streets-v9
satellite-streets-v9
light-v9
dark-v9
outdoors-v9
*/
//https://api.mapbox.com/v4/mapbox.terrain-rgb
//https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles
// mapbox map Sat VAR_MAP_LEAFLET_URL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWhlZm55IiwiYSI6ImNrZW84Nm9rYTA2ZWgycm9mdmNscmFxYzcifQ.c-zxDjXCthXmRsErPzKhbQ"._fn_hexEncode();
// mapbox CONTOUR HeatMap  const VAR_MAP_LEAFLET_URL = "https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}@2x.pngraw?access_token=pk.eyJ1IjoibWhlZm55IiwiYSI6ImNrZW84Nm9rYTA2ZWgycm9mdmNscmFxYzcifQ.c-zxDjXCthXmRsErPzKhbQ"._fn_hexEncode();
 //const VAR_MAP_LEAFLET_URL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWhlZm55IiwiYSI6ImNrZW84Nm9rYTA2ZWgycm9mdmNscmFxYzcifQ.c-zxDjXCthXmRsErPzKhbQ"._fn_hexEncode();
// hoda 

// local cached satellite
// VAR_MAP_LEAFLET_URL = "http://127.0.0.1:9991/{x}_{y}_{z}.jpeg"._fn_hexEncode();
//CODEBLOCK_END

const CONST_PRO_VERSION = false;
const CONST_DISABLE_ADSG = true;

const CONST_DONT_BROADCAST_TO_GCSs = true;

function fn_isOnANdruavSite ()
{
    if (window.location.toString().indexOf("andruav.com") != -1)
    {
        return true;
    }

    return false;
}


function fn_console_log(p_txt)
{
   
}

function fn_date_now()
{
    return Date.now();
}
