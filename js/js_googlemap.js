/* ********************************************************************************
*   Mohammad Hefny
*
*   31 Aug 2020
*
*********************************************************************************** */

/*jshint esversion: 6 */

class C_GoogleAndruavMap {

    constructor() {
        this.Me = this;
        this.m_Map = null;
        this.m_isMapInit = false;
        this.m_infowindow = null;
        this.m_elevator = null;
        this.m_markGuided = null;
    };


    fn_fromLatLngToPoint(p_latLng, p_map) {
        var v_topRight = p_map.getProjection().fromLatLngToPoint(p_map.getBounds().getNorthEast());
        var v_bottomLeft = p_map.getProjection().fromLatLngToPoint(p_map.getBounds().getSouthWest());
        var v_scale = Math.pow(2, p_map.getZoom());
        var v_worldPoint = p_map.getProjection().fromLatLngToPoint(p_latLng);
        return new google.maps.Point((v_worldPoint.x - v_bottomLeft.x) * v_scale, (v_worldPoint.y - v_topRight.y) * v_scale);
    }


    fn_addListenerOnMarker(p_marker, p_callback, p_event) {
        var p_call = p_callback;
        google.maps.event.addListener(p_marker, p_event, function (p_event) {
            p_call(p_event.latLng.lat(), p_event.latLng.lng());
        });
    };


    /**
    * Get LngLat object compatible with Map
    * @param {*} p_lat 
    * @param {*} p_lng 
    * @param {*} p_alt 
    */
    fn_getLocationObjectBy_latlng(p_lat, p_lng) {
        return new google.maps.LatLng(p_lat, p_lng);
    }

    // this.fn_contextMenu = function (p_position) {
    // // use JS Dom methods to create the menu
    // // use event.pixel.x and event.pixel.y
    // // to position menu at mouse position


    // if (this.m_markGuided != null) {
    // this.m_markGuided.setMap(null);
    // this.m_markGuided = null;
    // }
    // // this.m_markGuided = new google.maps.Marker({
    // // 	position: event.latLng,
    // // 	map: Me.m_Map,
    // // 	draggable: true,
    // // 	icon: { url: './images/waypoint_bg_32x32.png', origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(16, 32), scaledSize: new google.maps.Size(32, 32) }
    // // 	//anchor: new google.maps.Point(16, 32), // bottom middle
    // // });

    //     this.m_markGuided = Me.fn_CreateMarker ('./images/waypoint_bg_32x32.png', 'target');
    //     Me.fn_setPosition(this.m_markGuided,p_position);

    // google.maps.event.addListener(Me.m_markGuided, 'click', function (p_event2) {


    // $('.contextmenu').remove(); //remove previous context menus
    // if (v_contextMenuOpen === true)
    // {
    // v_contextMenuOpen = false;
    // return ;
    // }


    // contextmenuDir = document.createElement("div");
    // contextmenuDir.className = 'contextmenu';
    // //now add our options.
    // var h = hlp_generateFlyHereMenu(p_event2.latLng.lat(), p_event2.latLng.lng()); //event.latLng);
    // //contextmenuDir.innerHTML =  h;


    // $(Me.m_Map.getDiv()).append(contextmenuDir);
    // $('.contextmenu').html(h);
    // contextmenuDir.style.visibility = "visible";

    // var x, y;
    // /*if (event2.pixel != null)
    // {
    // x = event.pixel.x;
    // y = event.pixel.y;
    // }
    // else
    // { */
    // var worldPoint = fn_fromLatLngToPoint(p_event2.latLng, Me.m_Map);
    // x = worldPoint.x;
    // y = worldPoint.y;
    // //}
    // // might need to offset if you have moved the map div like i did (then - the pixel size off)
    // $('.contextmenu').css('left', x);
    // $('.contextmenu').css('top', y);

    // });


    // }


    /**
         * Handle map initialization onLoad.
         */
    fn_initMap(p_mapelement) {

        this.m_Map = new google.maps.Map(v_G_getElementById(p_mapelement), {
            zoom: 2,
            rotateControl: true,
            scrollwheel: true,
            center: {
                lat: 0.0,
                lng: 0.0
            },
            rotateControl: true,
            panControl: true, // enable pan Control
            zoomControl: true, // enable zoom control
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT // zoom control size
            },
            scaleControl: true, // enable scale control
        });

        this.m_elevator = new google.maps.ElevationService;

        this.m_infowindow = new google.maps.InfoWindow({
            size: new google.maps.Size(150, 50)
        });

        var update_timeout = null;
        var dontexecute = false;
        google.maps.event.addListener(this.m_Map, 'click', function (event) {
            update_timeout = setTimeout(function () { // if (dontexecute) return ;
                $('.contextmenu').remove();
            }, 300);
        });

        google.maps.event.addListener(this.m_Map, 'dblclick', function (event) {
            clearTimeout(update_timeout);
            dontexecute = true;
            fn_contextMenu(event.latLng)
        });


        this.m_isMapInit = true;
    };

    setMap(p_map) {
        Me.m_Map = p_map;
    };


    fn_PanTo_latlng(p_lat, p_lng) {
        var v_latlng = new google.maps.LatLng(p_lat, p_lng);

        Me.m_Map.panTo(v_latlng);
    };

    fn_PanTo(p_marker) {
        Me.m_Map.panTo(p_marker.position);
    };

    fn_setZoom(p_zoom) {
        Me.m_Map.setZoom(p_zoom);
    }


    fn_getZoom() {
        return Me.m_Map.getZoom();
    }


    /**
    * Create a marker with image and title
    */
    fn_CreateMarker(p_image, p_title, p_draggable, p_isTop) {
        var v_image = {
            url: p_image,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32)
        };


        var v_marker = new google.maps.Marker({
            map: Me.m_Map,
            // label: c_lbl,
            // labelAnchor: new google.maps.Point(22, 0),
            draggable: p_draggable ? true : false,
            anchor: new google.maps.Point(16, 16),
            icon: v_image
        });

        v_marker.setTitle(p_title);

        return v_marker;
    };

    fn_hideItem(p_marker) {
        p_marker.setMap(null);
    }

    fn_DrawPath(p_positionFromLat, p_positionFromLng, p_positionToLat, p_positionToLng) {
        var flightPlanCoordinates = [
            new google.maps.LatLng(p_positionFromLat, p_positionFromLng),
            new google.maps.LatLng(p_positionToLat, p_positionToLng)
        ];

        var v_flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#F5D29A',
            strokeOpacity: 8.0,
            strokeWeight: 2,
            icons: [
                {
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                    },
                    offset: '100%'
                }
            ]
        });

        v_flightPath.setMap(Me.m_Map);
        return v_flightPath;

    }

    fn_drawPolyline(p_lnglatFromTo, p_shouldKeepOutside) {
        var v_geoFence = new google.maps.Polyline({
            path: p_lnglatFromTo,
            geodesic: true,
            strokeColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493', // '#75A4D3':'#F75050',
            strokeOpacity: 0.9,
            strokeWeight: 2
        });
        v_geoFence.setMap(Me.m_Map);

        return v_geoFence;
    }

    fn_drawPolygon(p_lnglatFromTo, p_shouldKeepOutside) {
        var v_geoFence = new google.maps.Polygon({
            path: p_lnglatFromTo,
            geodesic: true,
            fillColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493',
            // '#75A4D3':'#F75050',
            // strokeColor: geoFenceInfo.m_shouldKeepOutside==false?'#FFFFFF':'#D3D375',
            strokeOpacity: 1.0,
            fillOpacity: 0.45,
            strokeWeight: 0 // you can use width with violation
        });
        v_geoFence.setMap(Me.m_Map);

        return v_geoFence;
    }

    fn_drawCircle(p_center, p_radius, p_shouldKeepOutside) {
        var v_geoFence = new google.maps.Circle({
            fillColor: p_shouldKeepOutside == false ? '#32CD32' : '#FF1493',
            // '#75A4D3':'#F75050',
            // strokeColor: geoFenceInfo.m_shouldKeepOutside==false?'#FFFFFF':'#D3D375',
            strokeOpacity: 1.0,
            strokeWeight: 0,
            fillOpacity: 0.45,
            map: map,
            center: p_center,
            radius: p_radius
        });
        v_geoFence.setMap(Me.m_Map);

        return v_geoFence;
    }

    fn_drawMissionPolyline(p_lnglatFromTo) {
        var v_missionLine = new google.maps.Polyline({
            path: p_lnglatFromTo,
            geodesic: true,
            strokeColor: '#75A4D3',
            strokeOpacity: 0.9,
            strokeWeight: 2
        });
        v_missionLine.setMap(Me.m_Map);

        return v_missionLine;
    }

    fn_drawMissionCircle(p_center, p_radius) {
        var v_circleMission = new google.maps.Circle({
            fillColor: '#3232CD',
            strokeOpacity: 1.0,
            strokeWeight: 0,
            map: map,
            fillOpacity: 0.25,
            center: p_center,
            radius: parseInt(p_radius)
        });
        v_circleMission.setMap(Me.m_Map);

        return v_circleMission;
    }

    /**
         * Set icon of a marker.
         * @param {*} p_marker 
         * @param {*} p_image 
         */
    fn_setIcon(p_marker, p_image) {
        var v_image = {
            url: p_image,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32)
        };

        p_marker.setIcon(v_image);

    };

    /**
         * Set position of a marker.
         * @param {*} p_marker 
         * @param {*} p_lat 
         * @param {*} p_lng  
         * @param {*} p_yaw to set orientation.
         */
    fn_setPosition_bylatlng(p_marker, p_lat, p_lng, p_yaw) {

        p_marker.setPosition(new google.maps.LatLng(p_lat, p_lng));

    };

    fn_setPosition(p_marker, p_latlng) {

        p_marker.setPosition(p_latlng);

    };

    fn_setVehicleIcon(p_marker, p_image) {

        if (p_marker != null) {
            var image = {
                url: p_image,
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32)
            };

            p_marker.setIcon(image);
        }

    };

    fn_setVehicleIcon(p_marker, p_image) {

        if (p_marker != null) {
            var image = {
                url: p_image,
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 32),
                scaledSize: new google.maps.Size(32, 32)
            };

            p_marker.setIcon(image);
        }

    };

    /**
         * Get altitude of a location compare to sea level.
         * @param {*} p_lat 
         * @param {*} p_lng 
         * @param {*} p_callback 
         */
    fn_getElevationForLocation(p_lat, p_lng, p_callback) {
        var p_call = p_callback;
        Me.m_elevator.getElevationForLocations({
            'locations': [new google.maps.LatLng(p_lat, p_lng)]
        }, function (results) {
            if (results[0]) {
                p_call(results[0].elevation, p_lat, p_lng);
            } else {
                p_call(null);
            }
        });
    }


    /**
         * 
         * @param {*} p_infoWindow 
         * @param {*} p_content 
         * @param {*} p_lat 
         * @param {*} p_lng 
         */
    fn_showInfoWindow(p_infoWindow, p_content, p_lat, p_lng) {
        if (p_infoWindow == null) {
            p_infoWindow = new google.maps.InfoWindow({});
        } else {
            p_infoWindow.close();
        }

        p_infoWindow.setContent(p_content);
        p_infoWindow.setPosition(new google.maps.LatLng(p_lat, p_lng));
        p_infoWindow.open(Me.m_Map);

        return p_infoWindow;
    };

    fn_hideInfoWindow = function (p_infoWindow) {
        if (p_infoWindow == null) 
            return;
        

        p_infoWindow.close();
        p_infoWindow = null;
    };

    fn_addListenerOnClickMarker(p_marker, p_callback) {
        fn_addListenerOnMarker(p_marker, p_callback, 'click');
    };

    fn_addListenerOnDblClickMarker(p_marker, p_callback) {
        fn_addListenerOnMarker(p_marker, p_callback, 'dblclick');
    };


    fn_addListenerOnRightClickMarker(p_marker, p_callback) {
        fn_addListenerOnMarker(p_marker, p_callback, 'rightclick');
    };


    fn_addListenerOnMouseOverMarker(p_marker, p_callback) {
        fn_addListenerOnMarker(p_marker, p_callback, 'mouseover');
    };

    fn_addListenerOnMouseOutClickMarker(p_marker, p_callback) {
        fn_addListenerOnMarker(p_marker, p_callback, 'mouseout');
    };

    fn_removeListenerOnMouseOverMarker = function (p_marker, p_callback) {
        google.maps.event.clearListeners(p_marker, 'mouseover');
    };

    fn_removeListenerOnMouseOutClickMarker(p_marker, p_callback) {
        google.maps.event.clearListeners(p_marker, 'mouseout');
    };


};


var AndruavLibs = AndruavLibs || {
    REVISION: 'BETA'
};


if ((typeof(CONST_MAP_GOOLE) == "undefined") || (CONST_MAP_GOOLE === true)) {
    (function (lib) {
        "use strict";
        if (typeof module === "undefined" || typeof module.exports === "undefined") {
            window.AndruavLibs.AndruavMap = lib; // in ordinary browser attach library to window
        } else {
            module.exports = lib; // in nodejs
        }
    })(new C_GoogleAndruavMap);
}
