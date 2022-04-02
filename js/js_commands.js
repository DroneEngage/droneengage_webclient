class CLSS_AndruavResala
{
    constructor ()
    {
        this.m_Command = {};
    }


    fn_toJSON() 
    {
        return this.m_Command;
    }

    fn_toString ()
    {
        return JSON.stringify (this.m_Command);
    }
}

class CLSS_AndruavResala_WayPoints extends CLSS_AndruavResala
{
	//TYPE_AndruavResala_WayPoints
    static fn_parse (p_jobj)
    {
        this.m_Command          = p_jobj;
        var numberOfRecords     = p_jobj.n;
		var wayPoint = [];
								
		for (var i = 0; i< numberOfRecords ; ++i)
		{
			const p_rec = p_jobj[i];
			if (p_rec != null)
			{
				var wayPointStep = {};
				wayPointStep.waypointType 	= p_rec.t;
											
				switch (wayPointStep.waypointType)
				{
					case CONST_WayPoint_TYPE_WAYPOINTSTEP:
						wayPointStep.m_Sequence 		= p_rec.s;
						wayPointStep.Longitude 		= p_rec.g;
						wayPointStep.Latitude 		= p_rec.a;
						wayPointStep.Altitude 		= p_rec.l;
						wayPointStep.Heading 		= p_rec.h;
						wayPointStep.TimeToStay 	= p_rec.y;
					break;

					case CONST_WayPoint_TYPE_SPLINE:
						wayPointStep.m_Sequence 		= p_rec.s;
						wayPointStep.Longitude 		= p_rec.g;
						wayPointStep.Latitude 		= p_rec.a;
						wayPointStep.Altitude 		= p_rec.l;
						wayPointStep.TimeToStay 	= p_rec.y;
					break;

					case CONST_WayPoint_TYPE_EKLA3:
						wayPointStep.m_Sequence 		= p_rec.s;
						wayPointStep.Altitude 		= p_rec.l;
						wayPointStep.Pitch 			= p_rec.p;
					break;
                    
                    case CONST_WayPoint_TYPE_HOBOOT:
						wayPointStep.m_Sequence 		= p_rec.s;
						if (p_rec.hasOwnProperty('g')) // backward compatibility
						{
							wayPointStep.Longitude 		= p_rec.g;
							wayPointStep.Latitude 		= p_rec.a;
							wayPointStep.Altitude 		= p_rec.l;
						}
								
					break;
                    
                    case CONST_WayPoint_TYPE_RTL:
						wayPointStep.m_Sequence 			= p_rec.s;
					break;

					case CONST_WayPoint_TYPE_CIRCLE:
						wayPointStep.m_Sequence 			= p_rec.s;
						wayPointStep.Longitude 			= p_rec.g;
						wayPointStep.Latitude 			= p_rec.a;
						wayPointStep.Altitude 			= p_rec.l;
						wayPointStep.m_Radius 			= p_rec.r;
						wayPointStep.m_Turns 				= p_rec.n;
					break;

					case CONST_WayPoint_TYPE_SPEED:
						wayPointStep.m_Sequence 				= p_rec.s;
						if (p_rec.hasOwnProperty("t"))
						{
							wayPointStep.SpeedType			= p_rec.t;
						}
						else
						{
							wayPointStep.SpeedType			= 1; // ground speed
						}
						wayPointStep.Speed				= p_rec.p;
					break;

					case CONST_WayPoint_TYPE_FIRE_EVENT:
						wayPointStep.m_Sequence 			= p_rec.s;
						wayPointStep.EventID			= p_rec.e;
					break;


					case CONST_WayPoint_TYPE_WAIT_EVENT:
						wayPointStep.m_Sequence 			= p_rec.s;
						wayPointStep.EventID			= p_rec.e;
					break;


					case CONST_WayPoint_TYPE_YAW:
						wayPointStep.m_Sequence 			= p_rec.s;
						wayPointStep.Angle 				= p_rec.b;
						wayPointStep.AngularSpeed		= p_rec.c;
						wayPointStep.IsAbsoluteAngle	= p_rec.d;
						if (wayPointStep.hasOwnProperty("e"))
						{
							wayPointStep.IsClockwise	= p_rec.e;
						}
						else
						{
							wayPointStep.IsClockwise	= true;
						}
					break;
							
				}
						
				wayPoint.push (wayPointStep);
			}
		}
		return wayPoint;
	}
	
	/**
	 * Converts mission to Andruav JSON commands.
	 */
	static fn_toJSON (p_markers)
    {
		var v_cmd = {};
		var skip = false;
		var seq =0;
		const v_len = p_markers.length;
		var missionSteps = [];
		for (var i =0;i<v_len;++i)
		{
			var step = {};
			var currentWayPoint = null;
			var marker = p_markers[i];
			switch (marker.m_missionItem.m_missionType)
			{
				case CONST_WayPoint_TYPE_WAYPOINTSTEP:
					step = {};
					step.t = CONST_WayPoint_TYPE_WAYPOINTSTEP;
					step.s = seq;
					step.a = (/*String.format(Locale.US, "%4.6f", */marker.getLatLng().lat);
					step.g = (/*String.format(Locale.US, "%4.6f", */marker.getLatLng().lng);
					step.l = (/*String.format(Locale.US, "%4.6f", */marker.m_missionItem.alt);
					step.h = (/*String.format(Locale.US, "%4.6f", */0);
					step.y = (/*String.format(Locale.US, "%4.6f", */0);
					currentWayPoint = step;
					v_cmd[seq.toString()]= step;
								/*step.id = missionCounter;
								step.v_cmd = 16;
								step.param1 = 0; // Hold time in decimal seconds. (ignored by fixed wing, time to stay at waypoint for rotary wing)
								step.param2 = 5; // Acceptance radius in meters (if the sphere with this radius is hit, the waypoint counts as reached)
								step.param3 = 0; // 0 to pass through the WP, if > 0 radius in meters to pass by WP. Positive value for clockwise orbit, negative value for counter-clockwise orbit. Allows trajectory control.
								step.param4 = 0.0; 
								step.param5 = marker.getLatLng().lat;
								step.param6 = marker.getLatLng().lng;
								step.param7 = marker.m_missionItem.alt;
								*/
					seq +=1;
					break;
				case CONST_WayPoint_TYPE_EKLA3:
								//fn_addMissionItem(22,[0.0,0.0,0.0,0.0,marker.getLatLng().lat,marker.getLatLng().lng,marker.m_missionItem.alt]);
								//fn_addMissionItem(16,[0,5,0,0.0,marker.getLatLng().lat,marker.getLatLng().lng,marker.m_missionItem.alt]);
					step = {};
					step.t = CONST_WayPoint_TYPE_EKLA3;
					step.s = seq;
					step.p = 0; //pitch
					step.l = (/*String.format(Locale.US, "%4.6f", */marker.m_missionItem.alt);
					v_cmd[seq.toString()]= step;
					seq +=1;
					
					step = {};
					step.t = CONST_WayPoint_TYPE_WAYPOINTSTEP;
					step.s = seq;
					step.a = (/*String.format(Locale.US, "%4.6f", */marker.getLatLng().lat);
					step.g = (/*String.format(Locale.US, "%4.6f", */marker.getLatLng().lng);
					step.l = (/*String.format(Locale.US, "%4.6f", */marker.m_missionItem.alt);
					step.h = (/*String.format(Locale.US, "%4.6f", */0);
					step.y = (/*String.format(Locale.US, "%4.6f", */0);
			
					v_cmd[seq.toString()]= step;
					
					/*step.id = missionCounter;
					step.v_cmd = 22;
					step.param1 = 0.0;
					step.param2 = 0.0;
					step.param3 = 0.0;
					step.param4 = 0.0;
					step.param5 = marker.getLatLng().lat;
					step.param6 = marker.getLatLng().lng;
					step.param7 = marker.m_missionItem.alt;
					*/
					seq +=1;
					break;
				
				case CONST_WayPoint_TYPE_HOBOOT:
					//fn_addMissionItem(21,[0.0,0.0,0.0,0.0,marker.getLatLng().lat,marker.getLatLng().lng,marker.m_missionItem.alt]);
					step = {};
					step.t = CONST_WayPoint_TYPE_HOBOOT;
					step.s = seq;
					step.a = (/*String.format(Locale.US, "%4.6f", */marker.getLatLng().lat);
					step.g = (/*String.format(Locale.US, "%4.6f", */marker.getLatLng().lng);
					step.l = (/*String.format(Locale.US, "%4.6f", */marker.m_missionItem.alt);
					v_cmd[seq.toString()]= step;
					
					/*step.id = missionCounter;
					step.v_cmd = 21;
					step.param1 = 0.0;
					step.param2 = 0.0;
					step.param3 = 0.0;
					step.param4 = 0.0;
					step.param5 = marker.getLatLng().lat;
					step.param6 = marker.getLatLng().lng;
					step.param7 = marker.m_missionItem.alt;
					*/
					seq +=1;
					break;
				
				case CONST_WayPoint_TYPE_RTL:
					//fn_addMissionItem(16,[0,5,0,0.0,marker.getLatLng().lat,marker.getLatLng().lng,marker.m_missionItem.alt]);
					//fn_addMissionItem(20,[0,0,0.0,0.0,0.0,0.0,0.0]);
					step = {};
					step.t = CONST_WayPoint_TYPE_RTL;
					step.s = seq;
					v_cmd[seq.toString()]= step;
					seq +=1;
					
					/*step.id = missionCounter;
					step.v_cmd = 16;
					step.param1 = 0; // Hold time in decimal seconds. (ignored by fixed wing, time to stay at waypoint for rotary wing)
					step.param2 = 5; // Acceptance radius in meters (if the sphere with this radius is hit, the waypoint counts as reached)
					step.param3 = 0; // 0 to pass through the WP, if > 0 radius in meters to pass by WP. Positive value for clockwise orbit, negative value for counter-clockwise orbit. Allows trajectory control.
					step.param4 = 0.0; 
					step.param5 = marker.getLatLng().lat;
					step.param6 = marker.getLatLng().lng;
					step.param7 = marker.m_missionItem.alt;

					nextstep.id = missionCounter;
					nextstep.v_cmd = 20;
					nextstep.param1 = 0.0;
					nextstep.param2 = 0.0;
					nextstep.param3 = 0.0;
					nextstep.param4 = 0.0;
					nextstep.param5 = 0.0;
					nextstep.param6 = 0.0;
					nextstep.param7 = 0.0; 							
					*/
					break;
				
				case CONST_WayPoint_TYPE_CIRCLE:
					break;
				
				default:
					skip = true;
					break;
				}
				if (skip != true) 
				{
					if (marker.m_missionItem.eventFireRequired)
					{
						step = {};
						step.t = CONST_WayPoint_TYPE_FIRE_EVENT; //
						step.s = seq;
						step.e = marker.m_missionItem.eventFire;
						v_cmd[seq.toString()]= step;
						seq +=1;
					}

					if (marker.m_missionItem.eventWaitRequired)
					{
						step = {};
						step.t = CONST_WayPoint_TYPE_WAIT_EVENT; //
						step.s = seq;
						step.e = marker.m_missionItem.eventWait;
						v_cmd[seq.toString()]= step;
						seq +=1;

						if (currentWayPoint != null)
						{
							currentWayPoint.y = 1; // add wait to slow down.
						}
					}

					if (marker.m_missionItem.m_speedRequired == true)
					{
						// add speed command
						/*
						MAV_CMD_DO_CHANGE_SPEED	Change speed and/or throttle set points.
						Mission Param #1	Speed type (0=Airspeed, 1=Ground Speed)
						Mission Param #2	Speed (m/s, -1 indicates no change)
						Mission Param #3	Throttle ( Percent, -1 indicates no change)
						Mission Param #4	absolute or relative [0,1]
						Mission Param #5	Empty
						Mission Param #6	Empty
						Mission Param #7	Empty
								
						fn_addMissionItem(178,[1,
							marker.m_missionItem.speed,
							-1,
							0.0,
							0,0,0]);
						*/
						step = {};
						step.t = CONST_WayPoint_TYPE_SPEED; //
						step.s = seq;
						step.p = marker.m_missionItem.speed;
						v_cmd[seq.toString()]= step;
						seq +=1;
					}

					if (marker.m_missionItem.m_yawRequired == true)
					{
									// add speed command
									/*
									MAV_CMD_CONDITION_YAW	Reach a certain target angle.
									Mission Param #1	target angle: [0-360], 0 is north
									Mission Param #2	speed during yaw change:[deg per second]
									Mission Param #3	direction: negative: counter clockwise, positive: clockwise [-1,1]
									Mission Param #4	relative offset or absolute angle: [ 1,0]
									Mission Param #5	Empty
									Mission Param #6	Empty
									Mission Param #7	Empty
									*/
									/*
									fn_addMissionItem(115,[0,
										marker.m_missionItem.yaw, // param1
										0, // defalt speed [AUTO_YAW_SLEW_RATE]
							0, // direction is not effectve in absolute degree
							0, // absolute heading
							0,0]);
						*/
						step = {};
						step.t = CONST_WayPoint_TYPE_YAW; //
						step.s = seq;
						step.b = marker.m_missionItem.yaw;
						step.c = 0;
						step.d = true;
						v_cmd[seq.toString()]= step;
						seq +=1;
						
						/*yawstep.id = missionCounter;
						yawstep.v_cmd = 115;  //MAV_CMD_CONDITION_YAW
						yawstep.startWith = 0;
						yawstep.param1 = marker.m_missionItem.yaw;
						yawstep.param2 = 0; 
						yawstep.param3 = 0; 
						yawstep.param4 = 0; 
						yawstep.param5 = 0.0; 
						yawstep.param6 = 0.0; 
						yawstep.param7 = 0.0; 
						missionSteps.push (yawstep);
						missionCounter +=1;
						*/
					}
				}
			}
		
		if (seq ==0 ) return null;

		v_cmd.n = seq;
		
		return v_cmd;
	}
}

class CLSS_AndruavResala_GeoFence extends CLSS_AndruavResala
{
    static fn_parse (p_jobj)
    {
        var v_geo = {};
        v_geo.m_Command           = p_jobj;
        v_geo.m_IsEditable        = false;
        v_geo.m_GeoFenceName      = p_jobj.n;
        v_geo.m_MaximumDistance   = p_jobj.hasOwnProperty('r')?p_jobj.r:0;   //optional
        v_geo.m_HardFenceAction   = p_jobj.hasOwnProperty('a')?p_jobj.a:0;
        v_geo.m_ShouldKeepOutside = p_jobj.hasOwnProperty('o')?p_jobj.o==1:0;   //optional
        
        // CONST_TYPE_LinearFence
        // CONST_TYPE_PolygonFence
        // CONST_TYPE_CylinderFence
        v_geo.m_Fencetype = p_jobj.t;
	    

        var p_LngLatPoints = [];
				
        const  count =  (v_geo.m_Fencetype==CONST_TYPE_CylinderFence)?1:p_jobj.c; 
				
		for (var i=0; i< count; ++ i)
		{
		    var lnglat ={};
			lnglat.lat = parseFloat(p_jobj[i].a);
			lnglat.lng = parseFloat(p_jobj[i].g);
			if (p_jobj[i].hasOwnProperty('l')) lnglat.alt = parseFloat(p_jobj[i].l); else lnglat.alt  = 0;// altitude
			p_LngLatPoints.push(lnglat);
        }
        v_geo.m_LngLatPoints      = p_LngLatPoints; 
        
        return v_geo;
    }

    /**
     * 
     * @param {*} p_shape shape object from mapmission.
     */
    static fn_toJSON (p_shape)
    {
        var v_cmd = {};
        v_cmd.n = p_shape.m_GeofenceInfo.m_GeoFenceName;
        v_cmd.r = p_shape.m_GeofenceInfo.m_MaximumDistance;
        v_cmd.a = p_shape.m_GeofenceInfo.m_HardFenceAction;
        v_cmd.o = p_shape.m_GeofenceInfo.m_ShouldKeepOutside;
        v_cmd.m = p_shape.m_GeofenceInfo.m_Fencetype;


        switch (p_shape.shapetype)
		{
			case google.maps.drawing.OverlayType.POLYGON:
			case google.maps.drawing.OverlayType.RECTANGLE:
				v_cmd.t = FENCETYPE_PolygonFence;
				for (var i=0; i< p_shape.latlngArray.length;++i)
				{
					var v_lnglat = {};
					v_lnglat.a = p_shape.latlngArray[i].lat;
					v_lnglat.g = p_shape.latlngArray[i].lng;
					v_cmd[i] = lnglat;
				}
				v_cmd.c = p_shape.latlngArray.length;
				break;
						
            case google.maps.drawing.OverlayType.POLYLINE:
				v_cmd.t = FENCETYPE_LinearFence;
				for (var i=0; i<p_shape.latlngArray.length;++i)
				{
					var v_lnglat = {};
					v_lnglat.a = p_shape.latlngArray[i].lat;
					v_lnglat.g = p_shape.latlngArray[i].lng;
					v_cmd[i] = lnglat;
				}
				v_cmd.c = shape.latlngArray.length;
				break;
                
            case google.maps.drawing.OverlayType.CIRCLE:
				v_cmd.t = FENCETYPE_CylindersFence;
							
				var v_lnglat = {};
				v_lnglat.a = p_shape.centerlatlng.lat;
				v_lnglat.g = p_shape.centerlatlng.lng;
				v_cmd["0"] = v_lnglat;
				v_cmd.c=1;
                break;
            
            case google.maps.drawing.OverlayType.MARKER:
            // keep it as markers data may be called here :(
                break;
		}
        return v_cmd;
    }
}

