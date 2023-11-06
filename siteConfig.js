/**
 * 
 * SITE Configuration File
 * 
 * Auth: Mohammad Hefny
 * 
 */


/**
 * Communication Server
 */

<<<<<<< Updated upstream
const CONST_TEST_MODE = true;
const CONST_PROD_MODE_IP = 'simpleunmanned.droneextend.com'; 
const CONST_TEST_MODE_IP =  "127.0.0.1";
=======
const CONST_TEST_MODE = false;
const CONST_PROD_MODE_IP = 'simpleunmanned.droneextend.com'; 
const CONST_TEST_MODE_IP =  'simpleunmanned.droneextend.com';  //"192.168.1.144";
>>>>>>> Stashed changes
const CONST_TEST_MODE_ENABLE_LOG = false; 
const CONST_TITLE = "Drone Extend";

/**
 * Links that are used in Header
 */
/*
const CONST_HOME_URL = "https://cloud.ardupilot.org/";
const CONST_MANUAL_URL = "https://cloud.ardupilot.org/";
const CONST_FAQ_URL = "https://cloud.ardupilot.org/de-faq.html";
const CONST_CONTACT_URL = "https://droneengage.com/contact.html";
*/

const CONST_HOME_URL = "";
const CONST_MANUAL_URL = "https://www.droneextend.com";
const CONST_FAQ_URL = "https://simpleunmanned.droneextend.com";
const CONST_CONTACT_URL = "https://simpleunmanned.droneextend.com";

/**
 * Location of GCS are not sent over network. Only The existence of connected GCS are shared.
 */
const CONST_DONT_BROADCAST_TO_GCSs = false;


/**
 * This is for disable experimental features.
 * If a feature is not explicitly mentioned or has a value of true, it is considered to be enabled.
 */
const CONST_FEATURE = 
{
    DISABLE_UNIT_NAMING: false,
    DISABLE_UDPPROXY_UPDATE: true,
    DISABLE_SWARM: true,
    DISABLE_SWARM_DESTINATION_PONTS: true,

};

const CONST_ICE_SERVERS =  [
    {urls: 'turn:simpleunmanned.droneextend.com' , 'credential':'1234', 'username':'airgap' },
    {urls: "stun:stun1.l.google.com:19302"},
    ];
