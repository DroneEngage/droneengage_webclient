const CONST_TEST_MODE = true;
const CONST_PROD_MODE_IP = 'cloud.ardupilot.org'; 
const CONST_TEST_MODE_IP = "192.168.1.144";
const CONST_TEST_MODE_ENABLE_LOG = false; 
const CONST_TITLE = "Drone Engage";

const CONST_HOME_URL = "https://cloud.ardupilot.org/";
const CONST_MANUAL_URL = "https://cloud.ardupilot.org/";
const CONST_FAQ_URL = "https://cloud.ardupilot.org/de-faq.html";
const CONST_CONTACT_URL = "https://droneengage.com/contact.html";


/**
 * This is for disable experimental features.
 * If a feature is not explicitly mentioned or has a value of true, it is considered to be enabled.
 */
const CONST_FEATURE = 
{
    DISABLE_UNIT_NAMING: false
};

const CONST_ICE_SERVERS =  [
    {urls: 'turn:airgap.droneengage.com' , 'credential':'1234', 'username':'airgap' },
    {urls: "stun:stun1.l.google.com:19302"},
    ];