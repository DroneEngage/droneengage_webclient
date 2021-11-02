/*************************************************************************************
 * 
 *   A N D R U A V - C L I E N T       JAVASCRIPT  LIB
 * 
 *   Author: Mohammad S. Hefny
 * 
 *   Date:   09 December 2015
 * 
 *   Update: Date:   23 Jul 2016
 * 
 * 
 * 
 * 
 * 
 *************************************************************************************/
/*jshint esversion: 6 */

// Vehicle Types
const VEHICLE_UNKNOWN 				= 0;
const VEHICLE_TRI 					= 1;
const VEHICLE_QUAD 					= 2;
const VEHICLE_PLANE 				= 3;
const VEHICLE_ROVER 				= 4;
const VEHICLE_HELI 					= 5;
const VEHICLE_SUBMARINE    			= 12;

const VEHICLE_GIMBAL 				= 15;
const VEHICLE_BUS 					= 997;
const VEHICLE_PERSON 				= 998;
const CONST_VEHICLE_GCS 			= 999;


//m_enum_userStatus
const CONST_ALIVE 					= 1;
const CONST_SUSPECTED 				= 2;
const CONST_DISCONNECTED 			= 3;

// VIDEORECORDING
const CONST_VIDEORECORDING_OFF 		= 0;
const CONST_VIDEORECORDING_ON 		= 1;
const CONST_VIDEOSTREAMING_OFF 		= 0;
const CONST_VIDEOSTREAMING_ON 		= 1;



// ENUM_TelemetryProtocol
const CONST_No_Telemetry			= 0;
const CONST_Andruav_Telemetry		= 1;
const CONST_Mavlink_Telemetry		= 2;
const CONST_MW_Telemetry			= 3;
const CONST_Unknown_Telemetry		= 999;	





    // Flight Control Modes
const CONST_FLIGHT_CONTROL_RTL                =2;
    // Flight Follow Me
const CONST_FLIGHT_CONTROL_FOLLOW_ME          =3;
            // param1:  Longitude:  Master position
            // param2:  Latitude
            // param3(opt):  Radius:             minimum approach to master.
            // param4(opt):  Offset_Longitude:   used to make a fleet formation
            // param5(opt):  Offset_Latitude:    used to make a fleet formation


    // Flight Follow A Unit... The message is sent to the Master Unit
    // and forwarded to the secondary one as a Follow_ME command.
const CONST_FLIGHT_CONTROL_FOLLOW_UNITED       =4;
            // UNIT_ID: unit to follow.
            // Below commands are forwarded to Slave
            // param1:  Longitude:  Master position
            // param2:  Latitude
            // param3(opt):  Radius:             minimum approach to master.
            // param4(opt):  Offset_Longitude:   used to make a fleet formation
            // param5(opt):  Offset_Latitude:    used to make a fleet formation

    // Flight Auto [Mission UAV]
const CONST_FLIGHT_CONTROL_AUTO               	= 5;
const CONST_FLIGHT_CONTROL_STABILIZE          	= 6;
const CONST_FLIGHT_CONTROL_ALT_HOLD           	= 7;
const CONST_FLIGHT_CONTROL_MANUAL             	= 8;  // Manual , Acro
const CONST_FLIGHT_CONTROL_GUIDED             	= 9;
const CONST_FLIGHT_CONTROL_LOITER             	= 10;
const CONST_FLIGHT_CONTROL_POSTION_HOLD       	= 11;
const CONST_FLIGHT_CONTROL_LAND               	= 12;
const CONST_FLIGHT_CONTROL_CIRCLE             	= 13;
const CONST_FLIGHT_CONTROL_FBWA               	= 14;
const CONST_FLIGHT_CONTROL_CRUISE             	= 15;
const CONST_FLIGHT_CONTROL_FBWB             	= 16;
const CONST_FLIGHT_CONTROL_BREAK			 	= 17;
const CONST_FLIGHT_CONTROL_SMART_RTL		  	= 21;
const CONST_FLIGHT_CONTROL_TAKEOFF			  	= 22;
const CONST_FLIGHT_CONTROL_INITIALIZE		  	= 99;
const CONST_FLIGHT_CONTROL_HOLD		  		  	= 100;
const CONST_FLIGHT_CONTROL_SURFACE            	= 101;
const CONST_FLIGHT_MOTOR_DETECT               	= 102;
const CONST_FLIGHT_CONTROL_UNKNOWN            	= 999;




function fn_getFullName(m_groupName, p_partyID)
{
	//return m_groupName.replace(" ","_") + "_X_" + partyID.replace(" ","_");
	
	return p_partyID;   // partyID is unique
}



AndruavUnitObject.prototype.m_IsMe 					= false;
AndruavUnitObject.prototype.m_IsGCS 					= true;
AndruavUnitObject.prototype.m_IsShutdown 				= false;
AndruavUnitObject.prototype.Description 				= "";
AndruavUnitObject.prototype.m_inZone 					= null;  // name of A ZONE  that the unit is IN. 
AndruavUnitObject.prototype.m_unitName;
AndruavUnitObject.prototype.partyID					= null;
AndruavUnitObject.prototype.m_groupName;
AndruavUnitObject.prototype.m_isFlying				= false; 
AndruavUnitObject.prototype.m_FlyingLastStartTime		= 0; 
AndruavUnitObject.prototype.m_FlyingTotalDuration		= 0; 
AndruavUnitObject.prototype.m_flightMode				= CONST_FLIGHT_CONTROL_UNKNOWN;
AndruavUnitObject.prototype.m_isArmed					= false;
AndruavUnitObject.prototype.m_useFCBIMU				= false;
AndruavUnitObject.prototype.m_VehicleType 			= VEHICLE_UNKNOWN;
AndruavUnitObject.prototype.m_lastActiveTime 			= 0;
AndruavUnitObject.prototype.m_telemetry_protocol 		= CONST_No_Telemetry;
AndruavUnitObject.prototype.m_enum_userStatus 		= 0;


AndruavUnitObject.prototype.fn_getFullName 		= function () 
{
	return fn_getFullName (this.m_groupName , this.m_unitName);
};


function AndruavUnitList ()
{
	this.List = {};
	this.count = 0;
}

AndruavUnitList.prototype.Add = function (unitFullName,andruavUnit)
{
	this.List[unitFullName] = andruavUnit;
	this.count = this.count + 1;
};


AndruavUnitList.prototype.Del = function (unitFullName)
{
	if (this.hasOwnProperty(unitFullName))
	{
	   delete this.List[unitFullName];
	   this.count = this.count -1;
	}
	
};


AndruavUnitList.prototype.fn_getUnit = function (unitFullName)
{
	if (this.List.hasOwnProperty(unitFullName))
	{
		return this.List[unitFullName];
	}
	return null;
	
};


AndruavUnitList.prototype.fn_getUnitKeys = function ()
{
	if (v_andruavClient==null) return undefined;
	return Object.keys(v_andruavClient.m_andruavUnitList.List);
};


AndruavUnitList.prototype.fn_getUnitValues = function ()
{
	if (v_andruavClient==null) return undefined;
	return Object.values(v_andruavClient.m_andruavUnitList.List);
};


AndruavUnitList.prototype.fn_getUnitCount = function ()
{
	if (v_andruavClient==null) return 0;
	if (v_andruavClient.m_andruavUnitList == null) return 0;
	return Object.keys(v_andruavClient.m_andruavUnitList.List).length; 
};


AndruavUnitList.prototype.putUnit = function (unitFullName,andruavUnit)
{
	for (var name in this.List)
	{
		if (name == unitFullName)
		{
			this.List[name] = andruavUnit;
			return ;
		}
	}

	this.List[name] = andruavUnit;

};

AndruavUnitObject.prototype.fn_canCamera = function ()
{
	if (this.m_Permissions[10] == 'C')
	{
		return true;
	}

	return false;
}


AndruavUnitObject.prototype.fn_canVideo = function ()
{
	if (this.m_Permissions[8] == 'V')
	{
		return true;
	}

	return false;
}



AndruavUnitObject.prototype.init = function ()
{
	var me = this;
	this.m_Permissions           	= 'X0X0X0X0X0X0';
	this.m_IsShutdown				= false;	
	this.m_Power					= {_Mobile : {p_hasPowerInfo:false, p_Battery:{}},_FCB:{p_hasPowerInfo:false,p_Battery:{
		FCB_BatteryVoltage: 0.0,
		FCB_BatteryCurrent: 0.0,
		FCB_BatteryRemaining: 0.0,
		FCB_BatteryTemprature: 0.0,
		FCB_TotalCurrentConsumed: 0.0
	}}};
	this.m_GPS_Info					= {m_isValid:false};
	this.m_Nav_Info 				= {
								p_Location:{
									alt: null,
									abs_alt: null
								},
								p_Orientation:{
										nav_roll:0.0, // ATTITUDE NOT NAV
										nav_pitch:0.0,
										nav_yaw:0.0
									},
								p_Desired:{
										nav_roll:0.0, // Desired
										nav_pitch:0.0,
										nav_yaw:0.0,
										nav_bearing:0.0
									},
								_Target: {
									target_bearing:0.0,
									m_NavSpeed: 0.0
								},
								m_FlightPath:[]
								};
	Object.seal(this.m_Nav_Info);
	this.m_Geo_Tags 				= {p_HomePoint:{m_isValid:false},p_DestinationPoint:{m_isValid:false}};
	this.m_Telemetry				= new function ()
									{ 
										this._isActive = false;
										this.m_isGCSBlocked = false;
										var manualTXBlockedSubAction =0;
										this.m_rxEngaged = false; // defined locally

										this.fn_getManualTXBlockedSubAction = function()
										{
											return manualTXBlockedSubAction; // defined by remote unit
										};
										this.fn_updateTelemetry = function (p_manualTXBlockedSubAction)
										{
											manualTXBlockedSubAction = p_manualTXBlockedSubAction;
											// if (manualTXBlockedSubAction == CONST_RC_SUB_ACTION_RELEASED)
											// {   // release rx if engaged
											// 	//this.m_rxEngaged = false;
											// }
											// NOTICE STATUS MIGHT BE:
											// CONST_RC_SUB_ACTION_JOYSTICK_CHANNELS but it could be controlled by another channel.
											
										};
									};
	this.m_Servo 					= {m_values:{}};
	this.m_Gimbal 					= {m_pitch:0, m_roll:0, m_yaw:0};
	this.m_Video					= {m_videoactiveTracks:{},m_videoTracks:[]};
	this.m_DetectedTargets			= {m_targets:{
											m_list: []
										},m_searchable_targets:{}};
										
	this.m_Swarm 				= {m_isLeader:false,m_formation:0,m_following:null};
	this.m_SignalStatus			= {m_wifi:false, m_mobile:false, m_mobileSignalLevel:0, m_mobileNetworkType:0, m_mobileNetworkTypeRank:0};
	
										
	// returns CONST_VIDEOSTREAMING_OFF is ALL tracks are OFF
	this.m_Video.fn_getVideoStreaming = function ()
	{
		const c_activeTracks = Object.keys(me.m_Video.m_videoactiveTracks);
		if (c_activeTracks.length ==0 )
		{	// NO ACTIVE VIDEOS ARE DEFINED
			return CONST_VIDEOSTREAMING_OFF;
		}
		var len = c_activeTracks.length;
		for (var i=0;i<len;++i)
		{	
			if (me.m_Video.m_videoactiveTracks[c_activeTracks[i]].VideoStreaming == CONST_VIDEOSTREAMING_ON)
			{  // ONE TRACK IS ACTIVE
				return CONST_VIDEOSTREAMING_ON;
				
			}
		}

		return CONST_VIDEOSTREAMING_OFF;
	}
	
	

	this.m_Video.isAllActive = function ()
	{
		const c_activeTracks = Object.keys(me.m_Video.m_videoactiveTracks);
		if ((c_activeTracks.length ==0 )
		||  (me.m_Video.m_videoTracks.length > c_activeTracks.length))
		{	// NO ACTIVE VIDEOS ARE DEFINED OR NOT ALL ARE ACTIVE
			return false;
		}
		
		var len = c_activeTracks.length;
		var j=0;
		for (var i=0;i<len;++i)
		{	
			if (me.m_Video.m_videoactiveTracks[c_activeTracks[i]].VideoStreaming == CONST_VIDEOSTREAMING_ON)
			{  // ON TRACK IS ACTIVE
				j+=1;
			}
		}

		return (j==i);
	}



	this.m_Video.fn_getVideoRecording = function ()
	{
		const c_activeTracks = Object.keys(me.m_Video.m_videoactiveTracks);

		if (me.m_Video.VideoRecording == CONST_VIDEOSTREAMING_ON)
		{
			return CONST_VIDEOSTREAMING_ON;
		}

		if (c_activeTracks.length ==0 )
		{	// NO ACTIVE VIDEOS ARE DEFINED
			return CONST_VIDEOSTREAMING_OFF;
		}
		var len = c_activeTracks.length;
		for (var i=0;i<len;++i)
		{	
			if (me.m_Video.m_videoactiveTracks[c_activeTracks[i]].VideoRecording == CONST_VIDEOSTREAMING_OFF)
			{  // ON TRACK IS ACTIVE
				return CONST_VIDEOSTREAMING_ON;
			}
		}

		return CONST_VIDEOSTREAMING_OFF;
	}
};


function AndruavUnitObject ()
{
	this.init();
}

AndruavUnitObject.prototype.fullName = function ()
{
	return fn_getFullName(this.m_groupName,this.partyID);
};


