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


class C_Video
{

	constructor(p_parent)
	{
		this.m_parent = p_parent;
		this.m_videoactiveTracks = {};
		this.m_videoTracks=[];
	};

	// returns CONST_VIDEOSTREAMING_OFF is ALL tracks are OFF
	fn_getVideoStreaming ()
	{
		const c_activeTracks = Object.keys(this.m_videoactiveTracks);
		if (c_activeTracks.length ==0 )
		{	// NO ACTIVE VIDEOS ARE DEFINED
			return CONST_VIDEOSTREAMING_OFF;
		}
		var len = c_activeTracks.length;
		for (var i=0;i<len;++i)
		{	
			if (this.m_videoactiveTracks[c_activeTracks[i]].VideoStreaming == CONST_VIDEOSTREAMING_ON)
			{  // ONE TRACK IS ACTIVE
				return CONST_VIDEOSTREAMING_ON;
				
			}
		}

		return CONST_VIDEOSTREAMING_OFF;
	}


	isAllActive ()
	{
		const c_activeTracks = Object.keys(this.m_videoactiveTracks);
		if ((c_activeTracks.length ==0 )
		||  (this.m_videoTracks.length > c_activeTracks.length))
		{	// NO ACTIVE VIDEOS ARE DEFINED OR NOT ALL ARE ACTIVE
			return false;
		}
		
		var len = c_activeTracks.length;
		var j=0;
		for (var i=0;i<len;++i)
		{	
			if (this.m_videoactiveTracks[c_activeTracks[i]].VideoStreaming == CONST_VIDEOSTREAMING_ON)
			{  // ON TRACK IS ACTIVE
				j+=1;
			}
		}

		return (j==i);
	}



	fn_getVideoRecording ()
	{
		const c_activeTracks = Object.keys(this.m_videoactiveTracks);

		if (this.VideoRecording == CONST_VIDEOSTREAMING_ON)
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
			if (this.m_videoactiveTracks[c_activeTracks[i]].VideoRecording == CONST_VIDEOSTREAMING_OFF)
			{  // ON TRACK IS ACTIVE
				return CONST_VIDEOSTREAMING_ON;
			}
		}

		return CONST_VIDEOSTREAMING_OFF;
	};
}

class C_NavInfo 
{
	constructor (p_parent)
	{
		this.m_parent = p_parent;
		this.p_Location={
			alt: null,
			abs_alt: null
		};
		this.p_Orientation={
			nav_roll:0.0, // ATTITUDE NOT NAV
			nav_pitch:0.0,
			nav_yaw:0.0
		};
		
		this.p_Desired={
			nav_roll:0.0, // Desired
			nav_pitch:0.0,
			nav_yaw:0.0,
			nav_bearing:0.0
		};
		
		this._Target= {
			target_bearing:0.0,
			m_NavSpeed: 0.0
		};
		
		this.m_FlightPath=[];
	};
}


class C_GeoTags 
{
	constructor (p_parent)
	{
		this.m_parent = p_parent;
		this.p_HomePoint = {m_isValid:false};
		this.p_DestinationPoint={m_isValid:false};
	};
}


class C_DetectedTargets
{
	constructor (p_parent)
	{
		this.m_parent 				= p_parent;
		this.m_targets 				= { m_list: [] };
		this.m_searchable_targets	= {};
	};
}


class C_FCBParameters
{
	constructor (p_parent)
	{
		this.m_parent = p_parent;
		this.m_systemID = 0;
		this.m_componentID = 0;
		this.m_list = {};
		this.m_list_by_index = {};
		this.m_list_by_index_shadow = {};
	}
}
class C_Swarm
{
	constructor (p_parent)
	{
		this.m_parent = p_parent;
		this.m_isLeader = false;
		this.m_formation = 0;
		this.m_following = null;
	};
}


class C_Servo
{
	constructor (p_parent)
	{
		this.m_parent = p_parent;
		this.m_values = {};
	};
}


class C_Power
{
	constructor (p_parent)
	{
		this.m_parent = p_parent;
		this._Mobile = 
					{
						p_hasPowerInfo:false, 
						p_Battery:{}
					};

		this._FCB = 
					{
						p_hasPowerInfo:false,
						p_Battery:
						{
							FCB_BatteryVoltage: 0.0,
							FCB_BatteryCurrent: 0.0,
							FCB_BatteryRemaining: 0.0,
							FCB_BatteryTemprature: 0.0,
							FCB_TotalCurrentConsumed: 0.0
						}
					}
	};
}

class C_Telemetry 
{
	constructor (p_parent)
	{
		this.m_parent 				= p_parent;
		this._isActive = false;
		this.m_isGCSBlocked = false;
		this.manualTXBlockedSubAction =0;
		this.m_rxEngaged = false; // defined locally
	};


	fn_getManualTXBlockedSubAction (){
		return this.manualTXBlockedSubAction; // defined by remote unit
	};
	
	fn_updateTelemetry (p_manualTXBlockedSubAction)
	{
		this.manualTXBlockedSubAction = p_manualTXBlockedSubAction;
		// if (manualTXBlockedSubAction == CONST_RC_SUB_ACTION_RELEASED)
		// {   // release rx if engaged
											// 	//this.m_rxEngaged = false;
		// }
		// NOTICE STATUS MIGHT BE:
		// CONST_RC_SUB_ACTION_JOYSTICK_CHANNELS but it could be controlled by another channel.
	}											
};

class CAndruavUnitObject 
{
	
	constructor()
	{
		this.m_IsMe 					= false;
		this.m_IsGCS 					= true;
		this.m_IsShutdown 				= false;
		this.Description 				= "";
		this.m_inZone 					= null;  // name of A ZONE  that the unit is IN. 
		this.m_unitName;
		this.partyID					= null;
		this.m_groupName;
		this.m_isFlying					= false; 
		this.m_FlyingLastStartTime		= 0; // flight duration of latest or current flight.
		this.m_FlyingTotalDuration		= 0; 
		this.m_flightMode				= CONST_FLIGHT_CONTROL_UNKNOWN;
		this.m_isArmed					= false;
		this.m_useFCBIMU				= false;
		this.m_VehicleType 			= VEHICLE_UNKNOWN;
		this.m_lastActiveTime 			= 0;
		this.m_telemetry_protocol 		= CONST_No_Telemetry;
		this.m_enum_userStatus 		= 0;	
		this.init();
	}

	fn_getFullName ()
	{
		return fn_getFullName (this.m_groupName , this.m_unitName);
	};


	fn_canCamera ()
	{
		if (this.m_Permissions[10] == 'C')
		{
			return true;
		}

		return false;
	}


	fn_canVideo ()
	{
		if (this.m_Permissions[8] == 'V')
		{
			return true;
		}

		return false;
	}



	init ()
	{
		var me = this;
		this.m_Permissions           	= 'X0X0X0X0X0X0';
		this.m_IsShutdown				= false;	
		this.m_Power = new C_Power (this);
		this.m_GPS_Info	= {m_isValid:false};
		this.m_Nav_Info = new C_NavInfo(this);

	Object.seal(this.m_Nav_Info);
	this.m_Geo_Tags 				= new C_GeoTags(this);
	this.m_Telemetry				= new C_Telemetry(this);
	this.m_Servo 					= new C_Servo(this);
	this.m_Gimbal 					= {m_pitch:0, m_roll:0, m_yaw:0};
	this.m_Video					= new C_Video(this);
	this.m_DetectedTargets			= new C_DetectedTargets(this);
										
	this.m_Swarm 				= new C_Swarm(this);
	this.m_SignalStatus			= {m_wifi:false, m_mobile:false, m_mobileSignalLevel:0, m_mobileNetworkType:0, m_mobileNetworkTypeRank:0};
	
	this.m_FCBParameters 		= new C_FCBParameters(this);
	};
	

	fullName  ()
	{
		return this.fn_getFullName(this.m_groupName,this.partyID);
	};


};




class CAndruavUnitList 
{

	constructor ()
	{
		this.List = {};
		this.count = 0;
	}


	Add (partyID,andruavUnit)
	{
		this.List[partyID] = andruavUnit;
		this.count = this.count + 1;
	};


	Del (partyID)
	{
		if (this.hasOwnProperty(partyID))
		{
			delete this.List[partyID];
			this.count = this.count -1;
		}
		
	};


	fn_getUnit (partyID)
	{
		if (this.List.hasOwnProperty(partyID))
		{
			return this.List[partyID];
		}
		return null;
		
	};


	fn_getUnitKeys ()
	{
		if (v_andruavClient==null) return undefined;
		return Object.keys(v_andruavClient.m_andruavUnitList.List);
	};


	fn_getUnitValues ()
	{
		if (v_andruavClient==null) return undefined;
		return Object.values(v_andruavClient.m_andruavUnitList.List);
	};


	fn_getUnitCount ()
	{
		if (v_andruavClient==null) return 0;
		if (v_andruavClient.m_andruavUnitList == null) return 0;
		return Object.keys(v_andruavClient.m_andruavUnitList.List).length; 
	};


	putUnit (unitFullName,andruavUnit)
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
}









