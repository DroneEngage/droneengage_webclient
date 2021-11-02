/***************************************************

	30 Jul 2016

*****************************************************/



var AndruavLibs = AndruavLibs || { REVISION: 'BETA' };

(function (global)
{


	var m_map;
	var _drawingManager;
	
	
	var shapes = [];
	var counter = 0;
	
	var Me = this;
	
	this.CONST_SELECTED_NEWSHAPE 		= '#1E90FF';
	this.CONST_SELECTED_SHAPE 			= '#506050';
	this.CONST_FORBIDDEN_AREA 			= '#FF1493';
	this.CONST_ALLOWED_AREA 			= '#32CD32';


	this.EVT_onMarkerCreated			= null;
	this.EVT_onRectangleCreated 		= null;
	this.EVT_onPolygonCreated 			= null;
	this.EVT_onPolylineCreated 			= null;
	this.EVT_onCircleCreated 			= null;
	this.EVT_onShapeSelected 			= null;
	this.EVT_onShapeUpdated 			= null;
	this.EVT_onShapeDeleted 			= null;
	this.EVT_onShapeDeleteRequest 		= null;

	
	var _shift = false;
	var _selectedShapes =[];
	var p_lastSelectedShape;

	Me.onKeyUp = function (e)
	{
		var code = (e.keyCode ? e.keyCode : e.which);
		
		if (e.keyCode == 46) // DEL
		{
			if (Me.EVT_onShapeDeleteRequest != null) 
				{
					Me.EVT_onShapeDeleteRequest(p_lastSelectedShape,e);
				}
				else
				{  // delete with no confirmation
					if (p_lastSelectedShape != null)
					{
						deleteObject (p_lastSelectedShape,e.vertex);
					}
				}
		}
		else if (e.key =='Shift')
		{
			_shift = false;
		}
	}
	
	Me.onKeyDown = function (e)
	{
		let code = (e.keyCode ? e.keyCode : e.which);
		//selecting = e.keyCode  ((e.keyIdentifier == 'Control') || (e.ctrlKey == true));
		if ((e.ctrlKey == true) && (e.code=='KeyZ'))
		{
			_undeleteShape ();
				
		}
		else if (e.key =='Shift')
		{
			if (_shift == false)
			{
				_selectedShapes =[]; // reset select
				if ((p_lastSelectedShape != null) && (_selectedShapes.indexOf(p_lastSelectedShape)<0))
				{	// add the first selected one to the shift group
					_selectedShapes.push (p_lastSelectedShape)
				}
			}
			_shift = true;
		}
		else if ((e.ctrlKey == true) && (e.code=='KeyM'))
		{

			// merge command
			var l = _selectedShapes.length;
			if (l>2)
			{
				alert ('يجب اختيار مسارين من نفس النوع');
				return ;
			}
			
			if ((_selectedShapes[0].shapetype != google.maps.drawing.OverlayType.POLYLINE)
			|| (_selectedShapes[1].shapetype != google.maps.drawing.OverlayType.POLYLINE))
			{
				alert ('يجب اختيار مسارين من نفس النوع');
				return ;
			}

			fn_mergePolyLines (_selectedShapes[0],_selectedShapes[1]);
			
			
			
		}
	}
	
	


	Me.fn_showHideShapes = function (p_show)
	{
		for (let i =0 ; i < shapes.length; ++i)
		{
			if (p_show == false)
			{
				shapes[i].setMap(null);
			}
			else
			{
				shapes[i].setMap(m_map);
			}
		}
	}

	Me.fn_showHideMarkers = function (_show)
	{
		if (_show == false)
		{
			window.AndruavLibs.MapMission.fn_showAllMarkers(null);
		}
		else
		{
			window.AndruavLibs.MapMission.fn_showAllMarkers(m_map);
		}
	}


	function fn_mergePolyLines (_poly1,_poly2)
	{

		if ((_poly1==null) || (_poly2==null)) return ;


		var outlatlngArray = mergeTwoPathes (_poly1.latlngArray,_poly2.latlngArray);

		var poliline = new google.maps.Polyline({
			path: outlatlngArray,
			fillOpacity: 0.45,
			strokeColor: this.CONST_SELECTED_NEWSHAPE,
			strokeWeight: 5,
			draggable: true,
			editable: true
		});

		poliline.shapetype = google.maps.drawing.OverlayType.POLYLINE;				
		_onPolylineCreated (poliline);				
		_addShape(poliline);
		poliline.setMap(map);
		deleteObject (_poly1);
		deleteObject (_poly2);
	}

	Me.hlp_convertLngLattoCustomLngLatAlt = function hlp_convertLngLattoCustomLngLatAlt(_latlngObjectArray)
	{
		if (_latlngObjectArray == null) return [];
		
		const count = _latlngObjectArray.length;
		
		var _latlngArray = [];
		
		for (let i=0;i< count; i++)
		{
			var _lnglat = {
				lat: _latlngObjectArray[i].lat(),
				lng: _latlngObjectArray[i].lng()
				};
			
			_latlngArray.push (_lnglat);
		}
		
		return _latlngArray;
	};
	
	function _onOverlayCompleted(event) {
			  
		event.overlay.shapetype =  event.type; //google.maps.drawing.OverlayType.CIRCLE
		_addShape (event.overlay);
	
	};
	
	
	/***
	 * Gets LngLat object of circle
	 * ***/
	function _getCirclelngLat (_circle)
	{
		var _lnglat ={
			lat: _circle.getCenter().lat(),
			lng: _circle.getCenter().lng()
			};
		return _lnglat;
	}
	
	/***
	 * Gets LngLat object of circle
	 * ***/
	function _getRectanglelngLat (p_rectangle)
	{
		var p_latlngArray = [];
		
		
		var p_upperright ={
			lat: p_rectangle.getBounds().getNorthEast().lat(),
			lng: p_rectangle.getBounds().getNorthEast().lng()
			};
		var p_downleft ={
			lat: p_rectangle.getBounds().getSouthWest().lat(),
			lng: p_rectangle.getBounds().getSouthWest().lng()
			};
		var p_upperleft ={
			lat: p_rectangle.getBounds().getNorthEast().lat(),
			lng: p_rectangle.getBounds().getSouthWest().lng()
			};
		var p_downright ={
			lat: p_rectangle.getBounds().getSouthWest().lat(),
			lng: p_rectangle.getBounds().getNorthEast().lng()
			};
						
		
		p_latlngArray.push (p_upperleft);
		p_latlngArray.push (p_downleft);
		p_latlngArray.push (p_downright);
		p_latlngArray.push (p_upperright);
		
		return p_latlngArray;
	};
	
	
	
	///////////////////////////////////////////////// SHAPES EVENTS
	 
	function _onMarkerCreated (p_marker)
	{
		fn_console_log ('_onMarkerCreated');
		if ((p_marker.hasOwnProperty('cancel')) && (p_marker.cancel == true)) return ;
		if (Me.EVT_onMarkerCreated != null)
		{
			Me.EVT_onMarkerCreated(p_marker);
		}
	}


	function _onRectangleCreated (p_rectangle)
	{
		
		fn_console_log ('_onRectangleCreated');
		
		p_rectangle.latlngArray = _getRectanglelngLat(p_rectangle);
		
		
		
		if (Me.EVT_onRectangleCreated != null)
		{
			Me.EVT_onRectangleCreated(p_rectangle);
		}
	};
	
	
	/***
	 * Called when a circle is created.
	 * Attaches  radius_changed  & center_changed events to the circle.
	 * **/
	function _onCircleCreated (p_circle)
	{
		 //fn_console_log ('_onCircleCreated');
		
		 p_circle.centerlatlng = _getCirclelngLat(p_circle);
		 
		
		

		if (Me.EVT_onCircleCreated != null)
		{
			Me.EVT_onCircleCreated(p_circle);
			
		}
	};
	
	function _onPolygonCreated (p_poligon)
	{
		//fn_console_log ('_onPolygonCreated');
		
		p_poligon.latlngArray = Me.hlp_convertLngLattoCustomLngLatAlt (p_poligon.getPath().getArray());
		
		if (Me.EVT_onPolygonCreated != null)
		{
			Me.EVT_onPolygonCreated(p_poligon);
			
		}
	};
	
	function _onPolylineCreated (p_poliline)
	{
		//fn_console_log ('_onPolylineCreated');
			
		//poliline.latlngArray = poliline.getPath().getArray();
		
		p_poliline.latlngArray = Me.hlp_convertLngLattoCustomLngLatAlt (p_poliline.getPath().getArray());
		
		
		if (Me.EVT_onPolylineCreated != null)
		{
			Me.EVT_onPolylineCreated(p_poliline);
		}
	};
	
   
		
	this.fn_init = function fn_init(map)
	{
		m_map = map;
		_drawingManager = new google.maps.drawing.DrawingManager({
			  drawingMode: google.maps.drawing.OverlayType.CIRCLE,
			  drawingControl: true,
			  drawingControlOptions: {
								position: google.maps.ControlPosition.TOP_CENTER,
								//drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
								drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
							},
			  markerOptions: {
								fillOpacity: 0.45,
								icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
								draggable: true,
								editable: true,
								zIndex: 1
							},
			  circleOptions: {
								fillColor: this.CONST_SELECTED_NEWSHAPE,
								fillOpacity: 0.45,
								strokeWeight: 0,
								draggable: true,
								editable: true,
								zIndex: 1
							},
			  rectangleOptions: {
								fillOpacity: 0.45,
								fillColor: this.CONST_SELECTED_NEWSHAPE,
								strokeWeight: 0,
								draggable: true,
								editable: true,
								zIndex: 1
							},
			 polygonOptions: {
								fillOpacity: 0.45,
								fillColor: this.CONST_SELECTED_NEWSHAPE,
								strokeWeight: 0,
								draggable: true,
								editable: true,
								zIndex: 1
							},
			  polylineOptions: {
								fillOpacity: 0.45,
								strokeColor: this.CONST_SELECTED_NEWSHAPE,
								strokeWeight: 5,
								draggable: true,
								editable: true,
								zIndex: 1
							}
			});
		
		 
		// drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
		 
		_drawingManager.setMap(map);
		 
		
		google.maps.event.addListener(_drawingManager, 'markercomplete', 	_onMarkerCreated);
		
		google.maps.event.addListener(_drawingManager, 'rectanglecomplete',  _onRectangleCreated);
			 
		google.maps.event.addListener(_drawingManager, 'polylinecomplete', 	_onPolylineCreated);
			 
		google.maps.event.addListener(_drawingManager, 'polygoncomplete', 	_onPolygonCreated);
			 
		google.maps.event.addListener(_drawingManager, 'circlecomplete', 	_onCircleCreated);

		google.maps.event.addListener(_drawingManager, 'overlaycomplete', 	_onOverlayCompleted);

		
	};
	
	
	
	this.fn_setShapeColor = function fn_setSelectedShapeColor (p_shape,p_color) {
		if ((p_shape== null) || (p_color == null)) return ;
		
		if (p_shape.shapetype == google.maps.drawing.OverlayType.POLYLINE) 
		{
			p_shape.set('strokeColor', p_color);
		} else 
		{
			p_shape.set('fillColor', p_color);
		}
	}
	   
	function getShapeColor (p_shape) {
		if (p_shape== null) return ;
        
		if (p_shape.shapetype == google.maps.drawing.OverlayType.POLYLINE) {
				return 	p_shape.get('strokeColor');
		} else {
				return p_shape.get('fillColor');
		}
	}


            
	function setSelectedShap (p_shape)
	{
		
		var unselect = false;
		if (_shift == true)
		{	// MULTIPLE SELECT MODE is ON
			var idx = _selectedShapes.indexOf(p_shape);
			if  (idx >=0)
			{
				//already in remove it
				_selectedShapes.splice(idx,1);
				p_shape.selected = false; 
			}
			else
			{	
				_selectedShapes.push (p_shape)
				p_shape.selected = true;
			}
		}
		else
		{
			if (_selectedShapes.length != 0)
			{
				// we have changed from Shoft multiselect to single select mode....unselect groups
				for (var x = 0; x < _selectedShapes.length; ++x)
				{
					var oldshape = _selectedShapes[x];
					if (oldshape == p_shape) continue;
					oldshape.selected = false;
					this.fn_setShapeColor  (oldshape,oldshape.originalColor);

				} 
			}
			if (p_shape.selected == true)
			{

				p_shape.selected = false;
				this.fn_setShapeColor  (p_shape,p_shape.originalColor);
				p_lastSelectedShape = null;
				
			}
			else
			{
				p_shape.selected = true;
				
				if (p_lastSelectedShape != null)
				{
					p_lastSelectedShape.selected = false;
					this.fn_setShapeColor  (p_lastSelectedShape,p_lastSelectedShape.originalColor);
				}
				p_lastSelectedShape = p_shape;
			}
			
		}
			
			
		// highlight shape as selected
		if (p_shape.selected==true) 
		{
			p_shape.originalColor = getShapeColor(p_shape);
			this.fn_setShapeColor  (p_shape,this.CONST_SELECTED_SHAPE);
			
						
			if (Me.EVT_onShapeSelected != null)
			{	
				Me.EVT_onShapeSelected(p_shape);
			}

			p_lastSelectedShape = p_shape;
		}
		else
		{
			this.fn_setShapeColor  (p_shape,p_shape.originalColor);
			p_lastSelectedShape = null; 
		}

		

		
	}
	
	this.deleteAllShapes = function deleteAllShapes ()
	{
		
		for (var i =0 ; i < shapes.length; ++ i)
		{
			let p_shape = shapes[i];
			
			if (Me.EVT_onShapeDeleted != null)
			{
				Me.EVT_onShapeDeleted(p_shape);
			}
			p_shape.setMap(null);
				
			
		}
		shapes = [];
	}
	



	
	this.deleteShape = function (p_shape,p_vertexIndex)
	{
		for (var i =0 ; i < shapes.length; ++ i)
		{
			var v_shape = shapes[i];
			if (v_shape.id == p_shape.id)
			{
				if (p_vertexIndex != null)
				{
					if (v_shape.shapetype==google.maps.drawing.OverlayType.POLYLINE)
					{
						v_shape.getPath().removeAt(p_vertexIndex);
						return ;
					}
				}
				//delete shapes[id]; << for a list
				shapes.splice(i, 1);
				var delshape = false;
				if (Me.EVT_onShapeDeleted != null)
				{
					delshape = Me.EVT_onShapeDeleted(v_shape);
				}
				
				if (delshape == true)
				{
					v_shape.setMap(null);
				}
				
				this.lastDeletedShape = v_shape;

				return ;
			}
		}
	}
	
	this.deleteObject = function deleteObject (p_shape,p_vertexIndex)
	{
		if (p_shape.shapetype == google.maps.drawing.OverlayType.MARKER)
		{
			deleteMarker (p_shape);
		}
		else
		{
			deleteShape (p_shape.id,p_vertexIndex);
		}
	}

	this.deleteMarker = function deleteMarker (p_marker)
	{

		let p_delshape = Me.EVT_onShapeDeleted(p_marker);
		if (p_delshape == true)
		{
			p_marker.m_mission.fn_deleteMe(p_marker);
		}
		
	}

	this.getShape = function getShape (p_id)
	{
		if (p_id == null) return ;
		for (var i =0 ; i < shapes.length; ++ i)
		{
			var p_shape = shapes[i];
			if (p_shape.id ==p_id)
			{
				return p_shape;
			}
		}
		
		return null;
	}
	
	this.addShape = function (p_shape)
	{
		
		_addShape(p_shape);
		
		
	}
	
	function _undeleteShape ()
	{
		if (this.lastDeletedShape != null)
		{
				
			this.lastDeletedShape.setMap(m_map);
			this.fn_setShapeColor  (p_lastSelectedShape,p_lastSelectedShape.originalColor);
			_addShape (this.lastDeletedShape);

			this.lastDeletedShape = null;
		}
	}

	function _addShape (shape)
	{
		counter = counter + 1; // used for id ... never decrement it
		shape.id =  counter;
			
		shape.originalColor  = null; // reset if undo object
		p_lastSelectedShape = null;
		google.maps.event.addListener(shape, 'click', function (e) {
				
				if (shape.shapetype == google.maps.drawing.OverlayType.MARKER)
				{
					p_lastSelectedShape = shape;
					shape.selected = true;
					
					shape.EVT_onShapeUpdated(shape);
				}
				else
				{
					setSelectedShap(shape);
				}
				//fn_console_log ('click');
			});
			
		google.maps.event.addListener(shape, 'rightclick', function (e) {
				if (Me.EVT_onShapeDeleteRequest != null) 
				{
					Me.EVT_onShapeDeleteRequest(shape,e);
				}
				else
				{  // delete with no confirmation
					deleteObject(shape.id,e.vertex);
				}
				
				//fn_console_log ('rightclick');
			});
			
		google.maps.event.addListener(shape, 'dragend', function (e) {
				//fn_console_log (shape);
				//fn_console_log ('dragend');
				
			});
			
			
		switch (shape.shapetype)
		{
			case google.maps.drawing.OverlayType.MARKER:
				//fn_console_log ('radius_changed: MARKER ');
				let v_mission = window.AndruavLibs.MapMission.fn_getCurrentMission();
				if (v_mission == null) 
				{
					window.AndruavLibs.EventEmitter.fn_dispatch(EE_ErrorMessage,"Please create a mission.");
					shape.setMap(null);
					shape.cancel = true;
					return ;
				}
				v_mission.fn_addMarker(shape);
				shape.EVT_onShapeUpdated = Me.EVT_onShapeUpdated; 
				shape.EVT_onShapeDeleted = Me.EVT_onShapeDeleted; 
				
				google.maps.event.addListener(shape, 'dragend', function() {
						//fn_console_log ('dragend: marker ');
						if (Me.EVT_onShapeUpdated != null)
						{
							Me.EVT_onShapeUpdated(shape);
						}
					});
					
				break;
			case google.maps.drawing.OverlayType.CIRCLE:
				shapes.push (shape);
				google.maps.event.addListener(shape, 'radius_changed', function() {
					//fn_console_log ('radius_changed: _onCircleCreated ');
					shape.centerlatlng = _getCirclelngLat(shape);
				  
					if (Me.EVT_onShapeUpdated != null)
					{
						Me.EVT_onShapeUpdated(shape);
					}
				});

				google.maps.event.addListener(shape, 'center_changed', function() {
					// bug shapes.push (shape);
					//fn_console_log ('center_changed: _onCircleCreated ');
					shape.centerlatlng = _getCirclelngLat(shape);
				
					if (Me.EVT_onShapeUpdated != null)
					{
						Me.EVT_onShapeUpdated(shape);
					}
				});
			break;
			
			case google.maps.drawing.OverlayType.POLYLINE:
			case google.maps.drawing.OverlayType.POLYGON:
				shapes.push (shape);
				google.maps.event.addListener(shape.getPath(), 'set_at', function() {
				
					//fn_console_log ('set_at _onPolygonCreated');
					shape.latlngArray = Me.hlp_convertLngLattoCustomLngLatAlt (shape.getPath().getArray());
					if (Me.EVT_onShapeUpdated != null)
					{
						EVT_onShapeUpdated(shape);
					}
				});

				google.maps.event.addListener(shape.getPath(), 'insert_at', function() {
				
					// bug shapes.push (shape);
					//fn_console_log ('insert_at _onPolygonCreated');
					shape.latlngArray = Me.hlp_convertLngLattoCustomLngLatAlt (shape.getPath().getArray());
					
				});
			break;
			
			case google.maps.drawing.OverlayType.RECTANGLE:
				shapes.push (shape);
				google.maps.event.addListener(shape, 'bounds_changed', function() {
			
					// bug shapes.push (shape);
					//fn_console_log ('bounds_changed: _onRectangleCreated');
					shape.latlngArray = _getRectanglelngLat(shape); // called even when drag multiple times..... but important when changing the boundries dimention cannot ignore
					
					if (Me.EVT_onShapeUpdated != null)
					{
						EVT_onShapeUpdated(shape);
					}
				});
			break;
		}
		
	}
	
	/***
	 * Loop on shapes and send it in callback
	 * */
	this.getShapes = function (callback)
	{
		if (callback == null) return ;
		for (var i =0 ; i < shapes.length; ++i)
		{
			var shape = shapes[i];
			callback(shape);
		}
		
	}
	
	this.getShapesCounts = function ()
	{
		return shapes.length;
	}
	
	
	
	
	global.GoogleDraw = this;
}) (AndruavLibs);


(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.AndruavLibs = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(AndruavLibs);

