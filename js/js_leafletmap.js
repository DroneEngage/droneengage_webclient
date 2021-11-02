/* ********************************************************************************
*   Mohammad Hefny
*
*   31 Aug 2020
*
*********************************************************************************** */
"use strict";

/*jshint esversion: 6 */
var AndruavLibs = AndruavLibs || {REVISION: 'BETA' };


(function (global)
{
    var v_LeafletMap = function ()
    {
      
        var Me = this;

        function fn_init()
        {
          Me.m_Map = null;
          Me.m_isMapInit = false;
          Me.m_infowindow = null;
          Me.m_elevator = null;
          Me.m_markGuided = null;
        };

        
        function fn_addListenerOnMarker (p_marker, p_callback, p_event)
        {
            var p_call = p_callback;
            p_marker.on(p_event, function (p_event)
            {
                p_call(p_event.latlng.lat, p_event.latlng.lng);
            });
        };


        /**
         * Get LngLat object compatible with Map
         * @param {*} p_lat 
         * @param {*} p_lng 
         * @param {*} p_alt 
         */
        this.fn_getLocationObjectBy_latlng = function (p_lat, p_lng)
        {
            return new L.LatLng(p_lat, p_lng); 
        };


        // this.fn_contextMenu = function (p_position) {
        //   // use JS Dom methods to create the menu
        //   // use event.pixel.x and event.pixel.y 
        //   // to position menu at mouse position
    
    
    
    
        //   if (Me.m_markGuided != null) {
        //     Me.m_markGuided.remove();
        //     Me.m_markGuided = null;
        //   }
        //   // Me.m_markGuided = new google.maps.Marker({
        //   //   position: event.latLng,
        //   //   map: Me.m_Map,
        //   //   draggable: true,
        //   //   icon: { url: './images/waypoint_bg_32x32.png', origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(16, 32), scaledSize: new google.maps.Size(32, 32) }
        //   //   //anchor: new google.maps.Point(16, 32), // bottom middle
        //   // });
    
        //   Me.m_markGuided = Me.fn_CreateMarker ('./images/waypoint_bg_32x32.png', 'target', true, true);
        //   Me.fn_setPosition(Me.m_markGuided, p_position);
          
        //   Me.m_markGuided.on('click', function (p_event2)
        //     {
        //         $('.contextmenu').remove(); //remove previous context menus
        //         if (v_contextMenuOpen === true) 
        //         {
        //           v_contextMenuOpen = false;
        //           return ;
        //         }
        
        
        //         contextmenuDir = v_G_createElement("div");
        //         contextmenuDir.className = 'contextmenu';
        //         //now add our options.
        //         var h = hlp_generateFlyHereMenu(p_event2.latlng.lat, p_event2.latlng.lng); //event.latLng);
        //         //contextmenuDir.innerHTML =  h;
        
        //         p_infoWindow = L.popup()
        //         .setLatLng(new L.LatLng(p_event2.latlng.lat, p_event2.latlng.lng))
        //         .setContent(h)
        //         .openOn(Me.m_Map);
        //     });
        
    
        // }


        /**
         * Handle map initialization onLoad.
         */
        this.fn_initMap = function (p_mapelement)
        {
          Me.m_Map = L.map(p_mapelement).setView([51.505, -0.09], 13);
          L.tileLayer(VAR_MAP_LEAFLET_URL._fn_hexDecode(), {
            maxZoom: 22,
              attribution: "www.andruav.com",
              id: 'mapbox.streets'
            }).addTo(Me.m_Map);
            
            // L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=babed5ef144e19a8edafd111a373036b', {
            //   attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
            //   opacity: 0.8
            // }).addTo(Me.m_Map);

            // L.tileLayer('https://{s}.tiles.mapbox.com/v3/pk.eyJ1IjoibWhlZm55IiwiYSI6ImNrZW84Nm9rYTA2ZWgycm9mdmNscmFxYzcifQ.c-zxDjXCthXmRsErPzKhbQ/{z}/{x}/{y}.png',
            //   { attribution: 'Map tiles &copy; <a href="https://mapbox.com">Mapbox</a>', maxZoom: 17 }).addTo(Me.m_Map);

          // var bounds = [[90,0], [-90,-180]];
          // Me.m_Map = L.map(p_mapelement, {
          //   crs: L.CRS.EPSG3857,
          //   minZoom: -5
          // });
          // L.imageOverlay('./images/map.png', bounds).addTo(Me.m_Map);
          // Me.m_Map.fitBounds(bounds);

          var update_timeout = null;
          Me.m_Map.on('click', function (event) {
            update_timeout = setTimeout(function () {
              //if (dontexecute) return ;
              $('.contextmenu').remove();
            }, 300);
          });

          Me.m_Map.on('dblclick', function (event) {
            clearTimeout(update_timeout);
            fn_contextMenu(event.latlng)
          });


			    this.m_isMapInit = true;
        };


        this.setMap = function (p_map)
        {
            Me.m_Map = p_map;
        };
    

        this.fn_PanTo_latlng = function (p_lat, p_lng)
        {
          var v_latlng = new L.LatLng(p_lat, p_lng);

          Me.m_Map.panTo(v_latlng);
        };

        this.fn_PanTo = function (p_marker)
        {
            Me.m_Map.panTo(p_marker._latlng);
        };

        this.fn_setZoom = function (p_zoom)
        {
            Me.m_Map.setZoom(p_zoom);
        };
        
        
        this.fn_getZoom = function ()
        {
            return Me.m_Map.getZoom();
        };



        /**
         * Create a marker with image and title
         */
        this.fn_CreateMarker = function (p_image, p_title, p_draggable, p_isTop, p_htmlTitle)
        {
            var v_image;
            
            if (p_htmlTitle == null)
            {
              v_image = L.icon({
                iconUrl: p_image,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [-16,-16],
                //shadowUrl: 'my-icon-shadow.png',
                //shadowSize: [68, 95],
                //shadowAnchor: [22, 94]
            });
            }
            else
            {
              var v_htmlIcon = p_htmlTitle + "<image src='" + p_image + "'/>";
              v_image = L.divIcon ({
                html:v_htmlIcon,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [-16,-16],
                className: "css_leaflet_icon"
                //shadowUrl: 'my-icon-shadow.png',
                //shadowSize: [68, 95],
                //shadowAnchor: [22, 94]
              });
  
            }
            
            var v_marker = L.marker(
               [0,0],
               {
                 icon:v_image,
                 title: p_title,
                 draggable: p_draggable?true:false,
                 zIndexOffset: p_isTop?1000:0
               }
			  //   map: Me.m_Map,
				// //label: c_lbl,
				// //labelAnchor: new google.maps.Point(22, 0),
				// anchor: new google.maps.Point(16, 16),
				// icon: v_image
             ).addTo(Me.m_Map);

        //     v_marker.setTitle(p_title);
                    
            return v_marker;
        };

        this.fn_HideMarker = function (p_marker)
        {
            //p_marker.setMap(null);
            p_marker.remove();
        }

        this.fn_DrawPath = function (p_positionFromLat, p_positionFromLng, p_positionToLat, p_positionToLng)
        {
            var flightPlanCoordinates = [[p_positionFromLat,p_positionFromLng],[p_positionToLat,p_positionToLng]];
            //         new L.LatLng(p_positionFromLat, 
            //           p_positionFromLng),
            //         new L.LatLng(p_positionToLat, 
            //           p_positionToLng)
            // ];

            // var v_flightPath = new google.maps.Polyline({
            //     path: flightPlanCoordinates,
            //     geodesic: true,
            //     strokeColor: '#F5D29A',
            //     strokeOpacity: 8.0,
            //     strokeWeight: 2,
            //     icons: [{
            //         icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
            //         offset: '100%'
            //     }]
            // });
       
            // v_flightPath.setMap (Me.m_Map);
            // return v_flightPath;

            return L.polyline(flightPlanCoordinates, {color:'#F5D29A', opacity:0.8, weight:2 }).addTo(Me.m_Map);

        }

        this.fn_drawPolyline = function (p_lnglatFromTo, p_shouldKeepOutside)
        {
            // var v_geoFence = new google.maps.Polyline({
            //     path: p_lnglatFromTo,
            //     geodesic: true,
            //     strokeColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493', //'#75A4D3':'#F75050',
            //     strokeOpacity: 0.9,
            //     strokeWeight: 2
            // });
            // v_geoFence.setMap(Me.m_Map);
                    
            // return v_geoFence;

            return L.polyline(p_lnglatFromTo, {color: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493', opacity:0.9, weight:2 }).addTo(Me.m_Map);

        }

        this.fn_drawPolygon = function (p_lnglatFromTo, p_shouldKeepOutside)
        {
            // var v_geoFence = new google.maps.Polygon({
            //     path: p_lnglatFromTo,
            //     geodesic: true,
            //     fillColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493', //'#75A4D3':'#F75050',
            //     //strokeColor: geoFenceInfo.shouldKeepOutside==false?'#FFFFFF':'#D3D375',
            //     strokeOpacity: 1.0,
            //     fillOpacity: 0.45,
            //     strokeWeight: 0  // you can use width with violation
            // });
            // v_geoFence.setMap(Me.m_Map);
                    
            // return v_geoFence;
         
            return L.polygon(p_lnglatFromTo, {fill: true, fillColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493', fillOpacity: 0.45, opacity: 0.9, weight:0 }).addTo(Me.m_Map);
        }

        this.fn_drawCircle = function (p_center, p_radius, p_shouldKeepOutside)
        {
            // var v_geoFence = new google.maps.Circle({
            //     fillColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493', //'#75A4D3':'#F75050',
            //     //strokeColor: geoFenceInfo.shouldKeepOutside==false?'#FFFFFF':'#D3D375',
            //     strokeOpacity: 1.0,
            //     strokeWeight: 0,
            //     fillOpacity: 0.45,
            //     map: map,
            //     center: p_center,
            //     radius: p_radius
            // });
            // v_geoFence.setMap(Me.m_Map);
                    
            // return v_geoFence;

            return L.circle(p_center, {radius: parseInt(p_radius), fill: true, fillColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493'
                    , opacity: 1.0, weight:0, fillOpacity: 0.45}).addTo(Me.m_Map);

        }

        this.fn_drawMissionPolyline = function (p_lnglatFromTo)
        {
            // var v_missionLine = new google.maps.Polyline({
            //     path: p_lnglatFromTo,
            //     geodesic: true,
            //     strokeColor: '#75A4D3',
            //     strokeOpacity: 0.9,
            //     strokeWeight: 2
            // });
            // v_missionLine.setMap(Me.m_Map);
                    
            // return v_missionLine;

            return L.polyline(p_lnglatFromTo, {color: '#75A4D3', opacity: 0.9, weight:2 }).addTo(Me.m_Map);
        }

        this.fn_drawMissionCircle = function (p_center, p_radius)
        {
            // var v_circleMission = new google.maps.Circle({
            //     fillColor: '#3232CD',
            //     strokeOpacity: 1.0,
            //     strokeWeight: 0,
            //     map: map,
            //     fillOpacity: 0.25,
            //     center: p_center,
            //     radius: parseInt(p_radius)
            // });
            // v_circleMission.setMap(Me.m_Map);
                    
            // return v_circleMission;

            return L.polyline(p_center, {radius: parseInt(p_radius), fill: true, fillColor: '#3232CD'
                    , opacity: 1.0, weight:0, fillOpacity: 0.25}).addTo(Me.m_Map);

        }

        /**
         * Set icon of a marker.
         * @param {*} p_marker 
         * @param {*} p_image 
         */
        this.fn_setIcon = function (p_marker, p_image)
        {
            // var v_image = {
            //     url: p_image,
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(16, 16),
            //     scaledSize: new google.maps.Size(32, 32)
            // };

            // p_marker.setIcon (v_image);

        };

        /**
         * Set position of a marker.
         * @param {*} p_marker 
         * @param {*} p_lat 
         * @param {*} p_lng 
         * @param {*} p_yaw to set orientation.
         */
        this.fn_setPosition_bylatlng = function (p_marker, p_lat, p_lng, p_yaw)
        {

            p_marker.setLatLng(new L.LatLng(p_lat, p_lng));
            //p_marker.setRotationOrigin ('center 10px');
            p_marker.setRotationAngle(p_yaw * 180 / Math.PI); //(360 + p_yaw * 180 / Math.PI) % 360;
            
        };
        

        this.fn_setPosition= function (p_marker, p_latlng)
        {

            p_marker.setLatLng(p_latlng);
            
        };

        this.fn_setVehicleIcon= function (p_marker, p_image)
        {
          var v_image = L.icon({
            iconUrl: p_image,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0,0],
            //shadowUrl: 'my-icon-shadow.png',
            //shadowSize: [68, 95],
            //shadowAnchor: [22, 94]
            
          });

          p_marker.setRotationOrigin ('center center');  
          p_marker.setIcon(v_image);
          
        };

        

        this.fn_setMarkerIcon= function (p_marker, p_image)
        {
          var v_image = L.icon({
            iconUrl: p_image,
            iconSize: [32, 32],
            iconAnchor: [16, 23],
            popupAnchor: [10,10],
            //shadowUrl: 'my-icon-shadow.png',
            //shadowSize: [68, 95],
            //shadowAnchor: [22, 94]
          });

          p_marker.setIcon(v_image);
            
        };
        
        

        /**
         * Get altitude of a location compare to sea level.
         * @param {*} p_lat 
         * @param {*} p_lng 
         * @param {*} p_callback 
         */
        this.fn_getElevationForLocation = function (p_lat, p_lng, p_callback)
        {
        //     var p_call = p_callback;
        //     Me.m_elevator.getElevationForLocations({
				// 'locations': [new google.maps.LatLng(p_lat, p_lng)]
        //     }, function (results)
        //     {
        //         if (results[0])
        //         {
        //             p_call (results[0].elevation, p_lat, p_lng);
        //         }
        //         else
        //         {
        //             p_call (null);
        //         }
        //     });
              p_callback ("NA", p_lat, p_lng);
        }


        /**
         * 
         * @param {*} p_infoWindow 
         * @param {*} p_content 
         * @param {*} p_lat 
         * @param {*} p_lng 
         */
        this.fn_showInfoWindow = function (p_infoWindow, p_content, p_lat, p_lng)
        {
          //   if (p_infoWindow == null)
          //   {
          //       p_infoWindow = new google.maps.InfoWindow(
					// {
					// }); 
          //   }
          //   else
          //   {
          //       p_infoWindow.close();
          //   }

          //   p_infoWindow.setContent (p_content);
          //   p_infoWindow.setPosition(new google.maps.LatLng(p_lat, p_lng));
          //   p_infoWindow.open(Me.m_Map);

          //   return p_infoWindow;
            Me.fn_hideInfoWindow (p_infoWindow);

            p_infoWindow = L.popup()
              .setLatLng(new L.LatLng(p_lat, p_lng))
              .setContent(p_content)
              .openOn(Me.m_Map);

            return p_infoWindow;
        }

        this.fn_hideInfoWindow = function (p_infoWindow)
        {
            if (p_infoWindow == null) return ;
            
            p_infoWindow.remove();
            p_infoWindow = null;
        }
        

        this.fn_addListenerOnClickMarker = function (p_marker, p_callback)
        {
            fn_addListenerOnMarker (p_marker, p_callback, 'click');
        };

        this.fn_addListenerOnDblClickMarker = function (p_marker, p_callback)
        {
            fn_addListenerOnMarker (p_marker, p_callback, 'dblclick');
        };


        this.fn_addListenerOnRightClickMarker = function (p_marker, p_callback)
        {
            fn_addListenerOnMarker (p_marker, p_callback, 'rightclick');
        };


        this.fn_addListenerOnMouseOverMarker = function (p_marker, p_callback)
        {
            fn_addListenerOnMarker (p_marker, p_callback, 'mouseover');
        };

        this.fn_addListenerOnMouseOutClickMarker = function (p_marker, p_callback)
        {
            fn_addListenerOnMarker (p_marker, p_callback, 'mouseout');
        };

        this.fn_removeListenerOnMouseOverMarker = function (p_marker, p_callback)
        {
            p_marker.off('mouseover');
        };

        this.fn_removeListenerOnMouseOutClickMarker = function (p_marker, p_callback)
        {
            p_marker.off('mouseout');
        };


        fn_init();
    }

    if ((typeof(CONST_MAP_GOOLE) != "undefined") && (CONST_MAP_GOOLE === false))
    {
        global.AndruavMap = new v_LeafletMap;
    }
    
}) (AndruavLibs);

if ((typeof(CONST_MAP_GOOLE) != "undefined") && (CONST_MAP_GOOLE === false))
{
(function(lib) {
    "use strict";
    if (typeof module === "undefined" || typeof module.exports === "undefined") {
      window.AndruavLibs = lib; // in ordinary browser attach library to window
    } else {
      module.exports = lib; // in nodejs
    }
  })(AndruavLibs);
}