import {CLSS_AndruavUnit} from './jsc_andruav_unit.jsx' // add extension to allow encryptor to see it as same as file name.
import {CLSS_AndruavMessageLog} from './jsc_messagesControl.jsx' // add extension to allow encryptor to see it as same as file name.
import {CLSS_CTRL_HUD} from './gadgets/jsc_ctrl_hudControl.jsx'
import {CLSS_CTRL_DIRECTIONS} from './gadgets/jsc_ctrl_directionsControl.jsx'
import {CLSS_CTRL_ARDUPILOT_FLIGHT_CONTROL} from './flight_controllers/jsc_ctrl_ardupilot_flightControl.jsx'
import {CLSS_CTRL_PX4_FLIGHT_CONTROL} from './flight_controllers/jsc_ctrl_px4_flightControl.jsx'


class CLSS_AndruavUnit_Drone_Header extends React.Component{

    render()
    {
        return (
            <div className = 'row  mt-0 me-0 ms-0 mb-2 text-nowrap bg-body border css_padding_zero'>
            <div className = 'col-1  css_margin_zero text-center cursor_hand '>ID</div>
            <div className = {'col-1  css_margin_zero text-center '}>MODE</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>EKF</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>HUD</div>
            <div className = 'col-3  css_margin_zero css_padding_zero '>BAT</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>GPS</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>Speed</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>ALT</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>ID</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>ID</div>
            </div>
            
        );
    }
}

class CLSS_AndruavUnit_Drone_Row extends React.Component{
    constructor()
	{
		super ();
        this.localvars={};
        this.localvars.speed_link = false;	
		this.telemetry_level=["OFF","1","2","3"];
    }

    childcomponentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_requestGamePad,this,this.fn_requestGamePad);
    }

    childcomponentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_requestGamePad,this);
    }



    fn_getFlightMode(v_andruavUnit)
    {
        var v_flight_mode_text = "NC";
        var v_flight_mode_class= " text-warning";
        if (v_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_CONST_No_Telemetry)
        {
            v_flight_mode_text = hlp_getFlightMode(v_andruavUnit);
            var v_flight_mode_class= " text-white";
        }
        
        return {
            'css':v_flight_mode_class,
            'txt':v_flight_mode_text
        }
    }


    fn_getHUD(v_andruavUnit)
    {
        //const c_yaw = (CONST_RADIUS_TO_DEGREE * ((v_andruavUnit.m_Nav_Info.p_Orientation.nav_yaw + CONST_PTx2) % CONST_PTx2)).toFixed(1);
        const c_pitch = ((CONST_RADIUS_TO_DEGREE * v_andruavUnit.m_Nav_Info.p_Orientation.nav_pitch) ).toFixed(1);
        const c_roll = ((CONST_RADIUS_TO_DEGREE * v_andruavUnit.m_Nav_Info.p_Orientation.nav_roll) ).toFixed(1);
        
        return {
            'p':c_pitch,
            'r':c_roll
        }
    }

    fn_gotoUnit_byPartyID (e,p_partyID)
    {
        v_andruavClient.API_requestID(p_partyID);
        fn_gotoUnit_byPartyID(p_partyID);
    }

    hlp_getGPS (p_andruavUnit)
    {
        var gps1 = {
            m_gps_class: "",
            m_gps_text: "",
            m_gps_text2: "",
            m_gps_status: "",
            m_gps_source: ""
        }

        gps1.m_gps_class = "bg-danger text-white text-center";
        if (p_andruavUnit.m_GPS_Info.m_isValid == true)
        {
            switch (p_andruavUnit.m_GPS_Info.GPS3DFix)
            {
                case 0:
                    gps1.m_gps_text  =" No GPS";
                    gps1.m_gps_class = ' bg-danger ';
                    gps1.m_gps_sat_count = ''; 
                break;

                case 1:
                    gps1.m_gps_class = ' bg-danger text-white text-center ';
                break;

                case 2:
                    gps1.m_gps_class = ' bg-warning ';
                break;

                case 3:
                    gps1.m_gps_class = ' bg-primary ';
                    gps1.m_gps_text  =' 3D Fix ';
                
                break;
                case 4:
                    gps1.m_gps_class = ' bg-primary ';
                    gps1.m_gps_text  =' DGPS ';
                break;
                case 5:
                    gps1.m_gps_class = ' bg-primary ';
                    gps1.m_gps_text  =' RTK-Fl ';
                break;
                case 6:
                    gps1.m_gps_class = ' bg-primary ';
                    gps1.m_gps_text  =' RTK-Fx ';
                break;
                case 7:
                    gps1.m_gps_class = ' bg-primary ';
                    gps1.m_gps_text  =' static ';
                break;
                case 8:
                    gps1.m_gps_class = ' bg-primary ';
                    gps1.m_gps_text  =' ppp ';
                break;
            }
            p_andruavUnit.m_GPS_Info.satCount;
            
            gps1.m_gps_sat_count = gps1.m_gps_text + "[" + p_andruavUnit.m_GPS_Info.satCount + " sats]";

           
        }
        else
        {
            gps1.m_gps_text  =" No GPS";
            gps1.m_gps_class = ' bg-danger ';
            gps1.m_gps_sat_count = '';      
        }

       
        return {'gps1': gps1};
    }


    hlp_getFCBBatteryCSSClass (p_andruavUnit)
	{
        var v_battery_display_fcb_div = "";
        var v_battery_src = "./images/battery_gy_32x32.png";
        const p_Power = p_andruavUnit.m_Power;

	    var v_remainingBat = p_Power._FCB.p_Battery.FCB_BatteryRemaining;
		var v_bat1 = " ";
			 
		if ((p_andruavUnit.m_IsShutdown === true) || (p_andruavUnit.m_Power._FCB.p_hasPowerInfo === false))
        {
            v_battery_display_fcb_div = " hidden ";
            v_battery_src = "./images/battery_gy_32x32.png";
            
        }

		
        if (parseInt(v_remainingBat,0) > 80)
		{
		    v_bat1 += ' battery_4 ';
            v_battery_src = "./images/battery_g_32x32.png";
		}
		else if (parseInt(v_remainingBat,0) > 50)
		{
		    v_bat1 += ' battery_3 ';
            v_battery_src = "./images/battery_rg_32x32.png";
		}
		else if (parseInt(v_remainingBat,0) > 25)
		{
		    v_bat1 += ' battery_2 ';
            v_battery_src = "./images/battery_rg_3_32x32.png";
		}
		else 
		{
		    v_bat1 += ' battery_1 ';
            v_battery_src = "./images/battery_r_32x32.png";
		}
			 
	    var bat1 = { m_battery_src:v_battery_src, css:v_bat1, level:v_remainingBat, charging: 'unknown', v_battery_display_fcb_div: v_battery_display_fcb_div}; 
        var bat2 = { m_battery_src:'', css:'', level:'', charging: '', v_battery_display_fcb_div: ''}; 


        return {'bat1': bat1, 'bat2':bat2};
	}


    getAlt(p_andruavUnit)
    {
        var res= {};
        
        if (p_andruavUnit.m_Nav_Info.p_Location.abs_alt==null)
        {
            res.abs_alt = 'NA';
            res.abs_css = ' text-muted ';
        }
        else
        {
            if (v_useMetricSystem==true)
            {
                res.abs_alt = p_andruavUnit.m_Nav_Info.p_Location.abs_alt;
                res.abs_alt_unit = ' m';
            }
            else
            {
                res.abs_alt = p_andruavUnit.m_Nav_Info.p_Location.abs_alt * CONST_METER_TO_FEET;
                res.abs_alt_unit = ' ft';
            }

            if (res.abs_alt<10) 
            {
                res.abs_alt = res.abs_alt.toFixed(2);
            }
            else
            {
                res.abs_alt = res.abs_alt.toFixed(0);
            }
            res.abs_css = ' text-white ';
        }

        if (p_andruavUnit.m_Nav_Info.p_Location.alt==null)
        {
            res.rel_alt = 'NA';
            res.rel_css = ' text-muted ';
        }
        else
        {
            if (v_useMetricSystem==true)
            {
                res.rel_alt = p_andruavUnit.m_Nav_Info.p_Location.alt;
                res.rel_alt_unit = ' m';
            }
            else
            {
                res.rel_alt = p_andruavUnit.m_Nav_Info.p_Location.alt * CONST_METER_TO_FEET;
                res.rel_alt_unit = ' ft';
            }
            res.rel_alt = p_andruavUnit.m_Nav_Info.p_Location.alt;
            if (res.rel_alt<10) 
            {
                res.rel_alt = res.rel_alt.toFixed(2);
            }
            else
            {
                res.rel_alt = res.rel_alt.toFixed(0);
            }
            res.rel_css = ' text-white ';
        }

        return res;
    }

    render()
    {
        const v_andruavUnit = this.props.m_unit;
               
        
        var v_id_class = '';
        var v_id_text = v_andruavUnit.m_unitName;
        var v_id_icon = '';
        var v_armed = {};
        v_armed.text = 'disarmed';
        v_armed.css = 'text-white';
        var v_mav_id_text = v_andruavUnit.m_FCBParameters.m_systemID;
        const v_flight_mode = this.fn_getFlightMode(v_andruavUnit);
        const v_HUD = this.fn_getHUD(v_andruavUnit);
        const v_battery_display_fcb = this.hlp_getFCBBatteryCSSClass(v_andruavUnit);
        const v_gps = this.hlp_getGPS(v_andruavUnit);
        const v_alt = this.getAlt(v_andruavUnit);

        if ( v_andruavUnit.m_IsShutdown === true)
        {
            v_id_class = ' text-muted ';
        }
        else
        {
            if (v_andruavUnit.m_isArmed==true) 
            {
                v_id_class = " bg-danger text-white ";
                v_armed.text ='ARMED';
                v_armed.css = 'bg-danger text-white';
                
            }
            else
            {
                v_id_class = " bg-success text-white ";
            }
            if ((v_andruavUnit.m_useFCBIMU === false) 
                ||((v_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_DroneKit_Telemetry)
                && (v_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_CONST_Mavlink_Telemetry)))
            {
                v_id_icon = " bi bi-exclamation-diamond";
                v_id_text = ' ' + v_id_text;
                v_id_class = " bg-warning text-black ";
                
            }
            else
            {

            }
        }

        return (
            <div className = 'row  mt-0 me-0 ms-0 mb-2 text-nowrap border-bottom bg-gradient'>
            <div className = {'col-1  css_margin_zero text-center cursor_hand ' + v_id_class} onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)}>
                <div className = 'row  css_margin_zero '>
                    <div className = {'col-12  css_margin_zero css_padding_zero '+ v_id_icon}>{v_id_text}</div>
                </div>
                <div className = 'row  css_margin_zero css_padding_zero'>
                        <div className = 'col-12  css_margin_zero '>{v_mav_id_text}</div>
                </div>
            </div>
            <div className = {'col-1  css_margin_zero text-center css_padding_zero '}>
                <div className = 'row  css_margin_zero css_padding_zero '>
                    <div className = {'col-12  css_margin_zero css_padding_zero '+ v_flight_mode.css}>{v_flight_mode.txt}</div>
                </div>
                <div className = 'row  css_margin_zero css_padding_zero'>
                    <div className = {'col-12  css_margin_zero css_padding_zero '+ v_armed.css}>{v_armed.text}</div>
                </div>
            </div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>EKF</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>
                    <ul class="css_hud_bullets">
                        <li><span className="text-white al_l">R:</span><span className="text-warning">{v_HUD.r}º</span></li>
                        <li><span className="text-white al_l">P:</span><span className="text-warning">{v_HUD.p}º</span></li>
                    </ul>
            </div>
            <div className = 'col-3  css_margin_zero'>
                <div className = 'row  css_margin_zero fss-4 '>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}><span className="text-warning">Batt1</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryVoltage/1000).toFixed(1).toString()} <span className="text-warning">v</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryCurrent/1000).toFixed(0).toString()} <span className="text-warning">A</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}>{parseFloat(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryRemaining).toFixed(0)} <span className="text-warning">%</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_TotalCurrentConsumed/1000).toFixed(0).toString()} <span className="text-warning">AH</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryTemprature/1000).toFixed(1).toString()} <span className="text-warning">C</span></div>
                </div>
                <div className = 'row  css_margin_zero  fss-4 '>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}><span className="text-warning">Batt2</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryVoltage/1000).toFixed(1).toString()} <span className="text-warning">v</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryCurrent/1000).toFixed(0).toString()} <span className="text-warning">A</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}>{parseFloat(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryRemaining).toFixed(0)} <span className="text-warning">%</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_TotalCurrentConsumed/1000).toFixed(0).toString()} <span className="text-warning">AH</span></div>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryTemprature/1000).toFixed(1).toString()} <span className="text-warning">C</span></div>
                
                </div>
            </div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>
                <div className = 'row  css_margin_zero css_padding_zero'>
                    <div className = {'col-12  css_margin_zero '+ v_gps.gps1.m_gps_class}>{v_gps.gps1.m_gps_sat_count}</div>
                </div>
                <div className = 'row  css_margin_zero css_padding_zero'>
                    <div className = 'col-12  css_margin_zero '>GPS2</div>
                </div>
             </div>
            <div className = 'col-1  css_margin_zero'>
                <div className = 'row  css_margin_zero'>
                    <div className = 'col-6  css_margin_zero '>AS</div>
                    <div className = 'col-6  css_margin_zero '>GS</div>
                </div>
            </div>
            
            <div className = 'col-1  css_margin_zero fss-4'>
                <div className = 'row  css_margin_zero'>
                    <div className = {'col-6  css_margin_zero al_r '+ v_alt.rel_css}>{v_alt.rel_alt}<span className='text-warning'>{v_alt.rel_alt_unit}</span></div>
                </div>
                <div className = 'row  css_margin_zero'>
                    <div className = {'col-6  css_margin_zero al_r '+ v_alt.abs_css}>{v_alt.abs_alt}<span className='text-warning'>{v_alt.abs_alt_unit}</span></div>
                </div>
            </div>
           
            <div className = 'col-1  css_margin_zero'>ID</div>
            <div className = 'col-1  css_margin_zero'>ID</div>
            </div>
            
        );
    }
}

class CLSS_AndruavUnitListArray extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
			andruavUnitPartyIDs : [],
		};

        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onPreferenceChanged, this, this.fn_onPreferenceChanged);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitAdded,this,this.fn_unitAdded);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitUpdated,this,this.fn_unitUpdated);
	}



    fn_unitUpdated(me,p_andruavUnit)
    {
        me.forceUpdate();
    }

    fn_unitAdded (me,p_andruavUnit)
    {
         fn_console_log ("REACT:fn_unitAdded" );
         // http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs      
         me.setState({ 
            andruavUnitPartyIDs: me.state.andruavUnitPartyIDs.concat([p_andruavUnit.partyID])
        });
    }
    
    fn_onPreferenceChanged(me)
    {
        me.forceUpdate();
    }

    fn_updateMapStatus(p_andruavUnit)
    {
        if (p_andruavUnit.hasOwnProperty("p_marker") == false) return;
        if (
                ((v_en_GCS === true ) && (p_andruavUnit.m_IsGCS === true))
             || ((v_en_Drone === true ) && (p_andruavUnit.m_IsGCS ===false))
            )
        {
            // if (p_andruavUnit.m_gui != null)
            // {
            //     //p_andruavUnit.p_marker.setMap(p_andruavUnit.m_gui.m_mapObj);
            //     AndruavLibs.AndruavMap.setMap(p_andruavUnit.p_marker, p_andruavUnit.m_gui.m_mapObj);
            // }   
        }
        else
        {
            AndruavLibs.AndruavMap.fn_hideItem(p_andruavUnit.p_marker);
        }

        return ;
    }

    fn_onSocketStatus (me,params) {
       
        if (params.status == CONST_SOCKET_STATUS_REGISTERED)
        {				
                $('#andruavUnits').show();
        }
        else
        {				
                me.state.andruavUnitPartyIDs = [];
                me.forceUpdate();
        }
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onPreferenceChanged,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onSocketStatus,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitAdded,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitUpdated,this);
    }


    render() {
        var unit = [];
        
        var units_header = [];
        var units_details = [];
        var units_gcs = [];

        {/* <p id='gps' className={' rounded-3 textunit text-center cursor_hand  ' + gps.m_gps_class} title ={gps.m_gps_status} onClick={ (e) => fn_switchGPS(v_andruavUnit.partyID)} >{gps.m_gps_source + gps.m_gps_text + ' ' + gps.m_gps_text2}</p> */}
        if (this.state.andruavUnitPartyIDs.length == 0) 
        {

            unit.push (<div key={unit.length} className='bg-success'>NO ONLINE UNITS</div>);
        }
        else 
            {
                var me = this;
                units_details.push(<CLSS_AndruavUnit_Drone_Header key='LH' />);
                this.state.andruavUnitPartyIDs.map(function (partyID)
                {
                    var v_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(partyID);
                    
                    if (v_andruavUnit==null) return ;

                    if (v_andruavUnit.m_IsGCS===true)
                    {
                        units_gcs.push (<CLSS_AndruavUnit_GCS key={partyID} v_en_GCS= {window.AndruavLibs.LocalStorage.fn_getGCSDisplayEnabled()} m_unit = {v_andruavUnit}/>);
                    }
                    else 
                    if (v_andruavUnit.m_IsGCS===false)
                    {
                        
                            units_details.push(<CLSS_AndruavUnit_Drone_Row key={partyID}  m_unit = {v_andruavUnit}/>);
                        
                        
                    }

                    me.fn_updateMapStatus(v_andruavUnit);

                });
            }
        
            //unit.push (<ul className="row"> {units_header} </ul>    );
            //unit.push (<div id="myTabContent" className="tab-content padding_zero"> {units_details} </div>);
            //unit.push (units_gcs);
        
            unit.push (<div class="card-header text-center">
							<div class="row">
							<div class="col-10">
								<h3 class="text-success text-start">Units</h3>
							</div>
							<div class="col-2 float-right">
							<button id="btnclose" type="button" class="btn-close"></button>
							</div>
							</div>
                            {units_details} 
						</div>);

        return (
            <div key='main' className='margin_zero row'>{unit}</div>
        );
    }
};




ReactDOM.render(
    <CLSS_AndruavUnitListArray key={'AULS'} />,
    v_G_getElementById('andruav_unit_list_array')
);