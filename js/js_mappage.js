function fn_copyToClipboard(text) 
    {
	    window.prompt("URL For Direct Setup [KEEP IT SAFE]\r\nCopy to clipboard: Ctrl+C, Enter", text);
	}
	
	
	//var map;
	
const FENCETYPE_LinearFence         = 1;
const FENCETYPE_PolygonFence        = 2;
const FENCETYPE_CylindersFence      = 3;
    
var v_andruavClient = null;
var counter =0;


var QueryString = function () {
    // This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
		} 
		return query_string;
	}();  

    function fn_gps_getLocation(p_callback) {
			
			var v_updatecallback = p_callback;
			function setPosition (p_position)
			{
				v_updatecallback(p_position.coords.latitude,p_position.coords.longitude,8);
			}

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(setPosition, gps_showError);
			} else {
				// "Geolocation is not supported by this browser.";
			}
		}
		
	function fn_gps_showPosition (lat,lng,zoom)
	{
			var latlng = new google.maps.LatLng(lat,lng);
			window.v_map.setCenter(latlng);
			window.v_map.setZoom(parseInt(zoom));
	}

	function gps_showError (p_error)
	{
			switch(p_error.code) {
			case p_error.PERMISSION_DENIED:
				//x.innerHTML = "User denied the request for Geolocation."
				break;
			case p_error.POSITION_UNAVAILABLE:
				//x.innerHTML = "Location information is unavailable."
				break;
			case p_error.TIMEOUT:
				//x.innerHTML = "The request to get user location timed out."
				break;
			case p_error.UNKNOWN_ERROR:
				//x.innerHTML = "An unknown error occurred."
				break;
			}
	}
	
    function fn_do_modal (title,message)
    {
		$('#modal_AlertConfirmation').children().find('h4.modal-title').html(title);
		$('#modal_AlertConfirmation').children().find('div.modal-body').html(message);
	    $('#modal_AlertConfirmation').modal('show');
    }

    function fn_do_modal_confirmation (title,message,callback,yesCaption)
    {
		$('#modal_saveConfirmation').children().find('h4.modal-title').html(title);
		$('#modal_saveConfirmation').children().find('div.modal-body').html(message);
		$('#modal_saveConfirmation').children().find('button#geo_btn_confirm').off('click');
		$('#modal_saveConfirmation').children().find('button#geo_btn_confirm').unbind("click");
		$('#modal_saveConfirmation').children().find('button#geo_btn_confirm').click(callback);
		if (yesCaption!= null)
		{
			$('#modal_saveConfirmation').children().find('button#geo_btn_confirm').html(yesCaption);
		}
		$('#modal_saveConfirmation').modal('show');
    }
   
	
	

	
	
	/////////////////////////////////////Andruav Unit
	
	 /**
		  * called when Connection status Changed
				const CONST_SOCKET_STATUS_FREASH 			=		1;   // socket is new
				const CONST_SOCKET_STATUS_CONNECTING    	=		2;	 // connecting to WS
				const CONST_SOCKET_STATUS_DISCONNECTING 	=		3;   // disconnecting from WS
				const CONST_SOCKET_STATUS_DISCONNECTED 	=		4;   // disconnected  from WS
				const CONST_SOCKET_STATUS_CONNECTED 		=		5;   // connected to WS
				const CONST_SOCKET_STATUS_REGISTERED 		=		6;   // connected and executed AddMe
				const CONST_SOCKET_STATUS_UNREGISTERED 	=		7;   // connected but not registred
				const CONST_SOCKET_STATUS_ERROR 		    =		8;   // Error

				c_SOCKET_STATUS = ['Fresh','Connecting','Disconnecting','Disconnected','Connected','Registered','Error'];
				
				param status: index of status in c_SOCKET_STATUS
				param name: string name of status
		 */
	// function fn_onSocketStatus (status,name)
	// {
	// 	window.AndruavLibs.EventEmitter.fn_dispatch(EE_onSocketStatus,{status:status,name:name});
	// 	counter +=1;
	// 	$('#message_log').append("<div class=\"log_ctrl\">" + counter + "- Socket Status:" + name + "</div>");
		
	// 	if (status == CONST_SOCKET_STATUS_REGISTERED)
	// 	{
	// 		//v_SpeakEngine.fn_speak ('Connected');
	// 		window.AndruavLibs.GoogleDraw.deleteAllShapes();
	// 		v_andruavClient.API_loadGeoFence (window.AndruavLibs.AndruavAuth.m_username,v_andruavClient.m_groupName,null,'_drone_',1);

	// 	}
		
	// }
	
	// function EVT_onOpen()
	// {
		
	// 	$('#andruavUnitGlobals').show();
				
	// 	v_connectState = true;
	// 	v_connectRetries =0;

	// 	//$('#geo_main').show();
	// }
	
	
	// function EVT_onClose ()
	// {
	// 	//$('#geo_main').hide();

	// 	counter +=1;
	// 	$('#message_log').append("<div class='log_ctrl'>" + counter + "- Connection Closed</div>");


	// 	if (v_andruavClient != null)
	// 	{
	// 		v_andruavClient.fn_disconnect();
	// 		v_andruavClient = null;
	// 	}
				
	// 	if (v_connectState == true)
	// 	{
	// 		v_connectRetries = v_connectRetries + 1;
	// 		if (v_connectRetries >= 5)
	// 		{
	// 			v_SpeakEngine.fn_speak (CONST_Global_resources.en[8]);
	// 		}
			
	// 		setTimeout(fn_connect, 4000);
	// 	}
	// 	else
	// 	{
	// 		v_SpeakEngine.fn_speak (CONST_Global_resources.en[8]);
	// 	}
	// }


	// var EVT_msgFromUnit_WayPointsUpdated = function (andruavUnit,missionIndexReached, status)
	// 	{
	// 		if (andruavUnit.m_wayPoint == null)
	// 		{
	// 			//no waypoint attached ... send asking for update
	// 			v_andruavClient.API_requestWayPoints(andruavUnit);
				
	// 			return ;
	// 		}
			
	// 		if (andruavUnit.m_wayPoint.markers != null)
	// 		{
	// 			var marker = andruavUnit.m_wayPoint.markers[missionIndexReached-1];
	// 			if (marker != null) 
	// 			{
	// 				marker.waypoint_status = status;
					
	// 				switch (status)
	// 				{
	// 					case Report_NAV_ItemReached:
	// 						marker.setIcon({url:'./images/location_gy_32x32.png',origin: new google.maps.Point(0, 0),anchor: new google.maps.Point(16, 23),scaledSize: new google.maps.Size(32, 32)});
	// 					break;
	// 					case Report_NAV_ItemUnknown: 
	// 						marker.setIcon({url:'./images/location_bb_32x32.png',origin: new google.maps.Point(0, 0),anchor: new google.maps.Point(16, 23),scaledSize: new google.maps.Size(32, 32)});
	// 					break;
	// 					case Report_NAV_ItemExecuting:
	// 						marker.setIcon({url:'./images/location_bg_32x32.png',origin: new google.maps.Point(0, 0),anchor: new google.maps.Point(16, 23),scaledSize: new google.maps.Size(32, 32)});
	// 					break;

	// 				}
	// 				//marker.setIcon('./images/location_bg_32x32.png');
					
							
	// 			}
	// 		}
	// 	}
		
		/***
		* Show/Hide but does not delete 
		***/ 
		function hlp_setVisibleOldWayPointOfDrone (p_andruavUnit,p_map)
		{
			 if (p_andruavUnit.m_wayPoint == null) return ;

			 var markers = p_andruavUnit.m_wayPoint.markers;
			 if (markers == null) return ;
			 
			 var count = markers.length;
			 for (var i=0;i<count; i++)
			 {
				 var marker = markers[i];
				 marker.setMap(p_map);
			 }

			 var p_polygons = p_andruavUnit.m_gui.m_wayPoint_polygons;
			 if (p_polygons != null)
			 {
			 	count = p_polygons.length;
				for (var i=0;i<count; i++)
				{
					var polygon = p_polygons[i];
					p_polygon.setMap(p_map);
				}
			 }
			 
			 var p_polylines = p_andruavUnit.m_wayPoint.polylines;
			 if (p_polylines!=null)
			 {
				p_polylines.setMap(p_map);
			 }
		}


		// var EVT_msgFromUnit_WayPoints = function (andruavUnit,wayPointArray)
		// {
		// 	// TODO HERE >>> DELETE OLD WAYPOINTS AND HIDE THEM FROM MAP
		// 	var LngLatPoints =[];
		// 	hlp_setVisibleOldWayPointOfDrone (andruavUnit,null);
			
		// 	andruavUnit.m_wayPoint = {};
		// 	andruavUnit.m_wayPoint.wayPointPath = wayPointArray;
		// 	andruavUnit.m_wayPoint.markers=[];
		// 	andruavUnit.m_gui.m_wayPoint_polygons=[];
			
		// 	if ((wayPointArray == null) || (wayPointArray.length ==0)) return ;
		// 	var lastValidlatlng 	= null;
		// 	var lastWayPoint 		= null;
		// 	for (var i =0 ; i < wayPointArray.length; ++ i)
		// 	{
			
		// 		var skip = false;
		// 		var wayPointStep 	= wayPointArray[i];
		// 		var latlng 			= null;
		// 		var icon_img 		= "";
		// 		var noMarker 		= false;
		// 		switch (wayPointStep.waypointType)
		// 		{
		// 			case CONST_WayPoint_TYPE_WAYPOINTSTEP:
		// 				latlng = new google.maps.LatLng(wayPointStep.Latitude, wayPointStep.Longitude);
		// 				icon_img = './images/location_bb_32x32.png';
		// 				break;
		// 			case CONST_WayPoint_TYPE_SPLINE:
		// 				latlng = new google.maps.LatLng(wayPointStep.Latitude, wayPointStep.Longitude);
		// 				icon_img = './images/location_bb_32x32.png';
		// 				break;
		// 			case CONST_WayPoint_TYPE_EKLA3:
		// 				latlng = new google.maps.LatLng(wayPointStep.Latitude, wayPointStep.Longitude);
		// 				icon_img = './images/takeoff_bb_32x32.png';
		// 				break;
		// 			case CONST_WayPoint_TYPE_HOBOOT:
		// 				latlng = new google.maps.LatLng(wayPointStep.Latitude, wayPointStep.Longitude);
		// 				icon_img = './images/landing_bb_32x32.png';
		// 				break;
		// 			case CONST_WayPoint_TYPE_RTL:
		// 				latlng = new google.maps.LatLng(wayPointStep.Latitude, wayPointStep.Longitude);
		// 				icon_img = './images/rtl_bb_32x32.png';
		// 				break;
		// 			case CONST_WayPoint_TYPE_SPEED:
		// 				icon_img = './images/speed_b_32x32.png';
		// 				if (lastWayPoint != null)
		// 				{
		// 					lastWayPoint.commands.push (wayPointStep) ;
		// 					noMarker = true;
		// 				}
		// 				break;
		// 			case CONST_WayPoint_TYPE_YAW:
		// 				icon_img = './images/change_yaw_bg_32x32.png';
		// 				if (lastWayPoint != null)
		// 				{
		// 					lastWayPoint.commands.push (wayPointStep) ;
		// 					noMarker = true;
		// 				}
		// 				break;
		// 			case CONST_WayPoint_TYPE_FIRE_EVENT:
		// 				icon_img = './images/event_fire_b_32x32.png';
		// 				if (lastWayPoint != null)
		// 				{
		// 					lastWayPoint.commands.push (wayPointStep) ;
		// 					noMarker = true;
		// 				}
		// 				break;
		// 			case  CONST_WayPoint_TYPE_WAIT_EVENT:
		// 				icon_img = './images/event_wait_g_32x32.png';
		// 				if (lastWayPoint != null)
		// 				{
		// 					lastWayPoint.commands.push (wayPointStep) ;
		// 					noMarker = true;
		// 				}
		// 				break;
		// 			case CONST_WayPoint_TYPE_CIRCLE:
		// 				latlng = new google.maps.LatLng(wayPointStep.Latitude, wayPointStep.Longitude);
		// 				icon_img = './images/circle_bb_32x32.png';

		// 				var circleMission = new google.maps.Circle({
		// 					fillColor: '#3232CD',
		// 					strokeOpacity: 1.0,
		// 					strokeWeight: 0,
		// 					map: map,
		// 					fillOpacity: 0.25,
		// 					center: latlng,
		// 					radius: parseInt(wayPointStep.m_Radius)
		// 					});
		// 					circleMission.setMap(map);
		// 				andruavUnit.m_gui..m_wayPoint_polygons.push (circleMission);		 
		// 				break;			
		// 		}

				
		// 		if ((latlng != null) && (isNaN(latlng.lat()) == false))
		// 		{
		// 			lastValidlatlng = latlng;
					
		// 		}
		// 		else
		// 		{
		// 			if (lastValidlatlng != null)
		// 			{
		// 				latlng = new google.maps.LatLng(lastValidlatlng.lat()+0.00001, lastValidlatlng.lng()+0.00001);	
		// 				lastValidlatlng = latlng; // there might be a second command
		// 				skip = true;
		// 			}	
		// 		}

		// 		if ((latlng != null) && (!noMarker))
		// 		{
		// 			var mark = new google.maps.Marker({
		// 						position:latlng,
		// 						map: p_map,
		// 						icon: {
		// 							url:icon_img,
		// 							origin: new google.maps.Point(0, 0),
		// 							anchor: new google.maps.Point(16, 23),
		// 							scaledSize: new google.maps.Size(32, 32),
		// 							labelOrigin: new google.maps.Point(16,40)
		// 						},
		// 						label: {
		// 							text: String(wayPointStep.m_Sequence),
		// 							color: "#8888a8",
		// 							fontSize: "12px",
		// 						}
		// 						//anchor: new google.maps.Point(16, 32), // bottom middle
		// 					});
					
		// 			andruavUnit.m_wayPoint.markers.push (mark);		  
		// 			mark.wayPointStep = wayPointStep;
		// 			wayPointStep.commands = []; // link a waystep of type waypoint with waystep commands.
		// 			lastWayPoint  = wayPointStep;
		// 			function clickHandler (w,u)
		// 			{
		// 				google.maps.event.addListener(mark, 'click', function(event) {
		// 								showWaypointInfo(event,w,u);
		// 							});
		// 			}
		// 			clickHandler (wayPointStep,andruavUnit);
					
		// 			if (!skip) 
		// 			{
		// 				LngLatPoints.push(latlng);
		// 			}
		// 		}
				

		// 	}
			
		// 	if (LngLatPoints.length > 0)
		// 	{
		// 		andruavUnit.m_wayPoint.polylines = new google.maps.Polyline({
		// 						path: LngLatPoints,
		// 						geodesic: true,
		// 						strokeColor: andruavUnit.m_gui.m_waypointColor?andruavUnit.m_gui.m_waypointColor:c_Default_WayPoint_Path_Color,
		// 						strokeOpacity: 0.9,
		// 						strokeWeight: 2,
		// 						icons: [{
		// 								icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
		// 								offset: '100%'
		// 							}]
		// 						});
							
		// 		andruavUnit.m_wayPoint.polylines.setMap(map);
		// 	}		   
		// }
		

		// function EVT_msgFromUnit_NavInfo  (andruavUnit)
		// {
		// 	window.AndruavLibs.EventEmitter.fn_dispatch(EE_unitNavUpdated,andruavUnit);
		// }
	
	var EVT_onDeleted = function ()
	{
		v_andruavClient.fn_disconnect();
		v_andruavClient = null;
			
	}
	

	function EVT_onShapeDeleteRequest  (shapeId,event)
	{
			fn_do_modal_confirmation ('<strong>Attention:</strong> Delete Operation',
			'<p>Are you sure you want to delete current Geo-Fence from Graph?</p>'
			+'<p>You need save "Submit GeoFences" to make this permanent</p>',
			function () {window.AndruavLibs.GoogleDraw.deleteShape(shapeId)},'yes');
		
	}

	/////////////////////////////////////EOAU

	
	function fn_deleteShapesinDB()
	{
		window.AndruavLibs.GoogleDraw.deleteAllShapes();
		v_andruavClient.API_disableGeoFenceTasks(window.AndruavLibs.AndruavAuth.m_username,v_andruavClient.m_groupName,null,'_drone_',1);
		
		v_andruavClient.API_requestDeleteGeoFences(null,null); // deattach drones from all fences in the group
		setTimeout (function ()
			{
				// because it can take time to update database so an early relead in vehicle will be false.
				v_andruavClient.API_requestReloadLocalGroupGeoFenceTasks (null);
			}, 3000);
	}
	
	
	// function fn_submitShapes () {
	// 		var cmdtxt = "";
	// 		var cmds=[];
			
			
	// 		// validate Shapes Data - 1
	// 		if (window.AndruavLibs.GoogleDraw.getShapesCounts() == 0 ) return ;
	// 		// validate Shapes Data - 2 
	// 		window.AndruavLibs.GoogleDraw.getShapes ( function (shape) 
	// 		{
	// 			if (shape.m_geofenceInfo == null) 
	// 				{
	// 					window.AndruavLibs.GoogleDraw.fn_setShapeColor(shape,'#FF8C00');
	// 					fn_do_modal('Missing Information','Please enter missing fence data.');
	// 					return ;  // shape is not configured
	// 				}
	// 		});
			
	// 		// Delete Old Shapes
	// 		v_andruavClient.API_requestDeleteGeoFences(null,null); // deattach drones from all fences in the group
	// 		v_andruavClient.API_disableGeoFenceTasks(window.AndruavLibs.AndruavAuth.m_username,v_andruavClient.m_groupName,null,'_drone_',1);
						
	// 		window.AndruavLibs.GoogleDraw.getShapes ( function (shape) 
	// 			{
	// 				var cmd={};
	// 				if (!shape.valid) 
	// 				{
	// 					window.AndruavLibs.GoogleDraw.fn_setShapeColor(shape,'#FF8C00');
	// 					return ;  // shape is not configured
	// 				}
					
	// 				cmd.n = shape.m_geofenceInfo.m_geoFenceName;
	// 				//cmd.h = shape.m_geofenceInfo.isHardFence>0?true:false;
	// 				//cmd.i = shape.m_geofenceInfo.isHardFence;
	// 				cmd.a = shape.m_geofenceInfo.isHardFence;
	// 				cmd.o = shape.m_geofenceInfo.m_shouldKeepOutside?1:0;
	// 				cmd.r = shape.m_geofenceInfo.m_maximumDistance;
	// 				switch (shape.shapetype)
	// 				{
	// 					case google.maps.drawing.OverlayType.MARKER:
	// 					break;
						
	// 					case google.maps.drawing.OverlayType.POLYGON:
	// 					case google.maps.drawing.OverlayType.RECTANGLE:
	// 						cmd.t = FENCETYPE_PolygonFence;
	// 						for (var i=0; i<shape.latlngArray.length;++i)
	// 						{
	// 							var lnglat = {};
	// 							lnglat.a = shape.latlngArray[i].lat;
	// 							lnglat.g = shape.latlngArray[i].lng;
	// 							cmd[i] = lnglat;
	// 						}
	// 						cmd.c = shape.latlngArray.length;
	// 					break;
						
	// 					case google.maps.drawing.OverlayType.POLYLINE:
	// 						cmd.t = FENCETYPE_LinearFence;
	// 						for (var i=0; i<shape.latlngArray.length;++i)
	// 						{
	// 							var lnglat = {};
	// 							lnglat.a = shape.latlngArray[i].lat;
	// 							lnglat.g = shape.latlngArray[i].lng;
	// 							cmd[i] = lnglat;
	// 						}
	// 						cmd.c = shape.latlngArray.length;
	// 					break;
	// 					case google.maps.drawing.OverlayType.CIRCLE:
	// 						cmd.t = FENCETYPE_CylindersFence;
							
	// 						var lnglat = {};
	// 						lnglat.a = shape.centerlatlng.lat;
	// 						lnglat.g = shape.centerlatlng.lng;
	// 						cmd["0"] = lnglat;
	// 						cmd.c=1;
	// 					break;
	// 				}
	// 				if ((v_andruavClient != null) && (v_andruavClient.fn_isRegistered()==true))
	// 				{
	// 					v_andruavClient.API_saveGeoFenceTasks(window.AndruavLibs.AndruavAuth.m_username,v_andruavClient.m_groupName,null,'_drone_',1,cmd);
	// 				}
	// 				cmds.push (cmd);
	// 				cmdtxt = cmdtxt + JSON.stringify(cmd);
	// 				//$('#geo_msg').val(cmdtxt);
	// 			});
				
	// 			setTimeout (function ()
	// 					{
	// 						v_andruavClient.API_requestReloadLocalGroupGeoFenceTasks (null);
	// 					}, 3000);
	// 	}
		
		
	
	/**
	* Activate GEO Form corresponds to selected shape 
	*/
	function fn_displayGeoForm (shape)
	{
		window.AndruavLibs.EventEmitter.fn_dispatch(EE_displayGeoForm,shape);
		
		
	}
	
	
	function EVT_andruavUnitGeoFenceUpdated(p_andruavUnit,p_geoFenceInfo)
	{
		

		if (p_geoFenceInfo.isEditable == false)  return ;
		
			   switch (p_geoFenceInfo.fencetype)
			   {
				   case CONST_TYPE_LinearFence:
					   var geoFence = new google.maps.Polyline({
							path: p_geoFenceInfo.LngLatPoints,
							geodesic: true,
							strokeColor: p_geoFenceInfo.m_shouldKeepOutside==false?'#32CD32':'#FF1493',  
							strokeOpacity: 0.6,
							strokeWeight: 5,
							fillOpacity: 0.6,
							});
							
							
							geoFence.m_geofenceInfo= p_geoFenceInfo;
							geoFence.latlngArray = p_geoFenceInfo.LngLatPoints; 
							geoFence.setEditable (true);
							geoFence.setDraggable (true);
							
							geoFence.shapetype = google.maps.drawing.OverlayType.POLYLINE;
							window.AndruavLibs.GoogleDraw.addShape(geoFence);
							geoFence.valid = true;
							geoFence.setMap(window.v_map);
							
				   break;
				  
				   case CONST_TYPE_PolygonFence:
						// this includes rectaangles
						var geoFence = new google.maps.Polygon({
							path: p_geoFenceInfo.LngLatPoints,
							geodesic: true,
							fillColor: p_geoFenceInfo.m_shouldKeepOutside==false?'#32CD32':'#FF1493',
							strokeColor: p_geoFenceInfo.m_shouldKeepOutside==false?'#FFFFFF':'#FFFFFF',
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillOpacity: 0.6,
							});
							
							
							geoFence.m_geofenceInfo= p_geoFenceInfo;
							
							
							
							geoFence.latlngArray= p_geoFenceInfo.LngLatPoints; 
							geoFence.setEditable (true);
							geoFence.setDraggable (true);
							
							
							geoFence.shapetype = google.maps.drawing.OverlayType.POLYGON;
							geoFence.valid = true;
							window.AndruavLibs.GoogleDraw.addShape(geoFence);
							geoFence.setMap(window.v_map);
							
							
				   
				   break;
				   
				     case CONST_TYPE_CylinderFence:
				  
						var geoFence = new google.maps.Circle({
							fillColor: p_geoFenceInfo.m_shouldKeepOutside==false?'#32CD32':'#FF1493',
							strokeColor: p_geoFenceInfo.m_shouldKeepOutside==false?'#FFFFFF':'#FFFFFF',
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillOpacity: 0.6,
							map: window.v_map,
							center: p_geoFenceInfo.LngLatPoints[0],
							radius: parseInt(p_geoFenceInfo.m_maximumDistance)
							});
							
							geoFence.m_geofenceInfo= p_geoFenceInfo;
							geoFence.centerlatlng= p_geoFenceInfo.LngLatPoints[0]; 
							geoFence.setEditable (true);
							geoFence.setDraggable (true);
							
							geoFence.shapetype = google.maps.drawing.OverlayType.CIRCLE;
							geoFence.valid = true;
							window.AndruavLibs.GoogleDraw.addShape(geoFence);
							geoFence.setMap(window.v_map);
				   
				   break;
			   }
	}
	
	
	function EVT_onShapeUpdated (shape)
	{
		fn_console_log (shape);
		fn_displayGeoForm (shape);
	}

	
	function EVT_onMarkerCreated (marker)
	{
		fn_console_log (marker);
		marker.setLabel({
			text: marker.order.toString(), // string
            color: "#977777",
            fontSize: "12px",
            fontWeight: "bold"
		});
		
		marker.setIcon({
			url:'./images/location_gy_32x32.png',
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(16, 23),
			scaledSize: new google.maps.Size(32, 32),
			labelOrigin: new google.maps.Point(16,40)});
	}
	
	function EVT_onRectangleCreated (rectangle)
	{
		fn_console_log (rectangle);
		fn_displayGeoForm (rectangle);
						 
	}
	
	function EVT_onPolygonCreated (poligon)
	{
		fn_console_log (poligon);
		fn_displayGeoForm (poligon);
	}
	
	function EVT_onPolilineCreated (poliline)
	{
		fn_console_log (poliline);
		fn_displayGeoForm (poliline);
	}
	
	function EVT_onCircleCreated (circle)
	{
		
		fn_displayGeoForm (circle);
	}
	
	function EVT_onShapeSelected (shape)
	{
		fn_console_log ('EVT_onShapeSelected');
		fn_displayGeoForm (shape);
	}
	
	function EVT_onShapeDeleted (shape)
	{
		return true; //approve delete
	}
	
	
	function fn_enableDragging ()
	{
		(function($) {
			$.fn.drags = function(opt) {

			opt = $.extend({handle:"",cursor:"move"}, opt);

			if (opt.handle === "") {
				var $el = this;
			} else {
				var $el = this.find(opt.handle);
			}

			return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
				if(opt.handle === "") {
					var $drag = $(this).addClass('draggable');
				} 
				else {
					var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
				}
				
				var z_idx = $drag.css('z-index'),
				drg_h = $drag.outerHeight(),
				drg_w = $drag.outerWidth(),
				pos_y = $drag.offset().top + drg_h - e.pageY,
				pos_x = $drag.offset().left + drg_w - e.pageX;
				$drag.css('z-index', 1000).parents().on("mousemove", function(e) {
				$('.draggable').offset({
					top:e.pageY + pos_y - drg_h,
					left:e.pageX + pos_x - drg_w
					}).on("mouseup", function() {
						$(this).removeClass('draggable').css('z-index', z_idx);
					});
				});
				
				e.preventDefault(); // disable selection
				}).on("mouseup", function() {
						if(opt.handle === "") {
							$(this).removeClass('draggable');
						} else {
							$(this).removeClass('active-handle').parent().removeClass('draggable');
						}
					});
				}
		})(jQuery);

					
			$("[data-toggle=tooltip]").tooltip();
			$("[data-toggle=tooltip]").drags();
	}

	function fn_connect () {	
						
						if ((window.AndruavLibs.AndruavAuth.fn_logined()===true) && (v_connectState !== true))
						{
							window.AndruavLibs.AndruavAuth.fn_do_logoutAccount( $('#txtEmail').val(), $('#txtAccessCode').val());
							if (v_andruavClient != null)
							{
								v_andruavClient.API_delMe();
							}
							return ;
						}
						else
						{
							window.AndruavLibs.AndruavAuth.fn_do_loginAccount( $('#txtEmail').val(), $('#txtAccessCode').val());
						}
	
			};
	
	function fn_displayErrorMessage (me,message)
	{
		fn_do_modal ("Error",message);
	}

	function fn_missionTab()
	{
		$('#fenceControl_section').hide();
		$('#fence_global_section').hide();
		$('#c_missioncontrol_section').show();

		$('#btn_geofences').removeClass ('btn-success');
		$('#btn_geofences').addClass ('btn-secondary');

		$('#btn_missions').removeClass ('btn-secondary');
		$('#btn_missions').addClass ('btn-success');
	}

	function fn_geoFenceTab()
	{
		$('#c_missioncontrol_section').hide();
		$('#fenceControl_section').show();
		$('#fence_global_section').show();

		$('#btn_missions').removeClass ('btn-success');
		$('#btn_missions').addClass ('btn-secondary');
		
		$('#btn_geofences').removeClass ('btn-secondary');
		$('#btn_geofences').addClass ('btn-success');
	}

	function fn_on_ready()
	{

		if ((typeof(CONST_MAP_GOOLE) == "undefined") || (CONST_MAP_GOOLE === true))
		{
			var v_script = v_G_createElement('script');
			v_script.type='text/javascript';
				
			v_script.src = '2a4034903490310033a90d2408a108a12e6924c1310033a9084429713021302129712d9027d924c131002b1133a90844264930212e6908a12e6924c1310033a908a124c131002b1108a12be433a90f812cb927d939310e89108114d13a2424c11ae93931118929710c40110414401a441ef11e4010811189302126491e402be40961384033a937510b642be4234127100af9264927d9297107e91ae91ef1129932c40bd1375105a42d902b11258432c424c132c42b1127d933a90e89271032c424c137512b112f44297105a4264924c12d902d90258424c126492cb90e892b112f442b113490172924c13100'._fn_hexDecode();
			v_G_document.body.append(v_script);
		}
		else
		if ((typeof(CONST_MAP_GOOLE) != "undefined") && (CONST_MAP_GOOLE === false))
		{
			initMap();
		}


		//QueryString();
		fn_enableDragging();

		window.AndruavLibs.EventEmitter.fn_subscribe (EE_ErrorMessage, this, fn_displayErrorMessage);

		$('#btn_missions').click(
			fn_missionTab
		);

		$('#btn_geofences').click(
			fn_geoFenceTab
		);

		fn_geoFenceTab();

	}
      // This example requires the Drawing library. Include the libraries=drawing
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
	$(document).ready(function(){
		
////////// Complete usage //////////

// (example jquery click event)

		// Enable Auto Connect:
		fn_on_ready();
	});	 

	  /** @constructor */
      function CoordMapType(tileSize) {
        this.tileSize = tileSize;
      }

      CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('div');
		var lnglat = fn_point2LatLng (coord,window.v_map);
		var txt = "(" +  lnglat.lat().toFixed(3) + "," + lnglat.lng().toFixed(3) + ")";
        div.innerHTML = txt;
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.fontSize = '10';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#CCCCCC';
		div.style.textAlign = "left";
        return div;
      };


	function initMap() {
			AndruavLibs.AndruavMap.fn_initMap('mapid');

			

			window.v_map = new google.maps.Map(v_G_getElementById('geofence_map'), {
			  center: {lat: -34.397, lng: 150.644},
			  zoom: 8
			});
			
			window.AndruavLibs.GoogleDraw.fn_init(window.v_map);
			window.AndruavLibs.GoogleDraw.EVT_onRectangleCreated 		= EVT_onRectangleCreated;
			window.AndruavLibs.GoogleDraw.EVT_onCircleCreated 			= EVT_onCircleCreated;
			window.AndruavLibs.GoogleDraw.EVT_onPolygonCreated 			= EVT_onPolygonCreated;
			window.AndruavLibs.GoogleDraw.EVT_onPolilineCreated 		= EVT_onPolilineCreated;
			window.AndruavLibs.GoogleDraw.EVT_onShapeSelected 			= EVT_onShapeSelected;
			window.AndruavLibs.GoogleDraw.EVT_onShapeUpdated 			= EVT_onShapeUpdated;
			
			window.AndruavLibs.GoogleDraw.EVT_onShapeDeleteRequest 	= EVT_onShapeDeleteRequest;
			
			if (QueryString.lat == null)
			{
				fn_gps_getLocation(fn_gps_showPosition);
			}
			else
			{
				fn_gps_showPosition (QueryString.lat,QueryString.lng, QueryString.zoom);
			}
			
			window.v_map.overlayMapTypes.insertAt(
            	0, new CoordMapType(new google.maps.Size(256, 256)));			
				
			google.maps.event.addDomListener(document, 'keyup', function (e) {
				window.AndruavLibs.GoogleDraw.onKeyUp (e);});
				
			google.maps.event.addDomListener(document, 'keydown', function (e) {
        		window.AndruavLibs.GoogleDraw.onKeyDown (e);});
		};

			
	  