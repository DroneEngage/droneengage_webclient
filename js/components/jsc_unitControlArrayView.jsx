import {CLSS_AndruavUnit} from './jsc_andruav_unit.jsx' // add extension to allow encryptor to see it as same as file name.
import {CLSS_AndruavMessageLog} from './jsc_messagesControl.jsx' // add extension to allow encryptor to see it as same as file name.
import {CLSS_CTRL_HUD} from './gadgets/jsc_ctrl_hudControl.jsx'
import {CLSS_CTRL_DIRECTIONS} from './gadgets/jsc_ctrl_directionsControl.jsx'
import {CLSS_CTRL_ARDUPILOT_FLIGHT_CONTROL} from './flight_controllers/jsc_ctrl_ardupilot_flightControl.jsx'
import {CLSS_CTRL_PX4_FLIGHT_CONTROL} from './flight_controllers/jsc_ctrl_px4_flightControl.jsx'
import {CLSS_CTRL_ARDUPILOT_EKF} from './flight_controllers/jsc_ctl_ardupilot_ekf.jsx'
import {CLSS_CTRL_VIBRATION} from './flight_controllers/jsc_ctrl_vibration.jsx'


class CLSS_AndruavUnit_Drone_Header extends React.Component{

    render()
    {
        return (
            <div className = 'row  mt-0 me-0 ms-0 mb-2 text-nowrap bg-body border css_padding_zero css_cur_default fss-4'>
            <div className = 'col-1  css_margin_zero text-center '>ID</div>
            <div className = {'col-1  css_margin_zero text-center '}>MODE</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>EKF/VIB</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>HUD</div>
            <div className = 'col-2  css_margin_zero css_padding_zero '>BAT</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>GPS</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>SPEED</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>ALT</div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>WIND</div>
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
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitUpdated,this,this.fn_unitUpdated);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitNavUpdated,this,this.fn_unitUpdated);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitTelemetryOn,this,this.fn_unitTelemetryOn);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitTelemetryOff,this,this.fn_unitTelemetryOFF);
        
    }


    childcomponentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitUpdated,this,);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitNavUpdated,this,);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitTelemetryOn,this,);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitTelemetryOff,this,);
    }


    fn_unitUpdated(me,p_andruavUnit)
    {
        if (p_andruavUnit.partyID != me.props.m_unit.partyID) return ;
        me.forceUpdate();
    }

    
    fn_getFlightMode(v_andruavUnit)
    {
        var v_flight_mode_text = "NC";
        var v_flight_mode_class= " text-warning";
        var v_flight_mode_title= 'flight board is NOT CONNECTED';
        if (v_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_CONST_No_Telemetry)
        {
            v_flight_mode_text = hlp_getFlightMode(v_andruavUnit);
            v_flight_mode_class= " text-white";
            v_flight_mode_title= 'flight mode'
        }
        
        return {
            'css':v_flight_mode_class,
            'txt':v_flight_mode_text,
            'title': v_flight_mode_title
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

    hlp_getGPS (gps_Info)
    {
        var gps = new C_GUI_READING_VALUE();
        
        gps.css = "bg-danger text-white text-center";
        if (gps_Info.m_isValid == true)
        {
            switch (gps_Info.GPS3DFix)
            {
                case 0:
                    gps.value  =" No GPS";
                    gps.css = ' bg-danger ';
                break;

                case 1:
                    gps.css = ' bg-danger text-white text-center ';
                break;

                case 2:
                    gps.css = ' bg-warning ';
                break;

                case 3:
                    gps.css = ' bg-primary ';
                    gps.value  =' 3D Fix ';
                
                break;
                case 4:
                    gps.css = ' bg-primary ';
                    gps.value  =' DGPS ';
                break;
                case 5:
                    gps.css = ' bg-primary ';
                    gps.value  =' RTK-Fl ';
                break;
                case 6:
                    gps.css = ' bg-primary ';
                    gps.value  =' RTK-Fx ';
                break;
                case 7:
                    gps.css = ' bg-primary ';
                    gps.value  =' static ';
                break;
                case 8:
                    gps.css = ' bg-primary ';
                    gps.value  =' ppp ';
                break;
            }
            
            
            gps.value = gps.value + "[" + gps_Info.m_satCount + " sats]";

           
        }
        else
        {
            gps.value  =" No GPS";
            gps.css = ' bg-danger ';
        }

       
        return gps;
    }


    hlp_getFCBBatteryCSSClass (p_andruavUnit)
	{
        var v_battery_display_fcb_div = "";
        var v_battery_src = "./images/battery_gy_32x32.png";
        var v_battery2_display_fcb_div = "";
        var v_battery2_src = "./images/battery_gy_32x32.png";
        
        const p_Power = p_andruavUnit.m_Power;

	    var v_remainingBat1 = p_Power._FCB.p_Battery.FCB_BatteryRemaining;
		var v_bat1 = " ";
        var v_bat2 = " "; // no level info
			 
		if ((p_andruavUnit.m_IsShutdown === true) || (p_andruavUnit.m_Power._FCB.p_Battery.p_hasPowerInfo === false))
        {
            v_battery_display_fcb_div = " hidden ";
            v_battery_src = "./images/battery_gy_32x32.png";
            
        }

		if ((p_andruavUnit.m_IsShutdown === true) || (p_andruavUnit.m_Power._FCB.p_Battery2.p_hasPowerInfo === false))
        {
            v_battery2_display_fcb_div = " hidden ";
            v_battery2_src = "./images/battery_gy_32x32.png";
            
        }

		
        if (parseInt(v_remainingBat1,0) > 80)
		{
		    v_bat1 += ' battery_4 ';
            v_battery_src = "./images/battery_g_32x32.png";
		}
		else if (parseInt(v_remainingBat1,0) > 50)
		{
		    v_bat1 += ' battery_3 ';
            v_battery_src = "./images/battery_rg_32x32.png";
		}
		else if (parseInt(v_remainingBat1,0) > 25)
		{
		    v_bat1 += ' battery_2 ';
            v_battery_src = "./images/battery_rg_3_32x32.png";
		}
		else 
		{
		    v_bat1 += ' battery_1 ';
            v_battery_src = "./images/battery_r_32x32.png";
		}
			 
	    var bat1 = { m_battery_src: v_battery_src, css:v_bat1, level:v_remainingBat1, charging: 'unknown', v_battery_display_fcb_div: v_battery_display_fcb_div}; 
        var bat2 = { m_battery_src:v_battery2_src, css:v_bat2, level:'na', charging: 'na', v_battery_display_fcb_div: v_battery2_display_fcb_div}; 


        return {'bat1': bat1, 'bat2':bat2};
	}


    getAlt(p_andruavUnit)
    {
        var res= {
            'abs': new C_GUI_READING_VALUE(),
            'rel': new C_GUI_READING_VALUE(),
            'terC': new C_GUI_READING_VALUE(),
            'terH': new C_GUI_READING_VALUE(),
        };
        
        if (p_andruavUnit.m_Nav_Info.p_Location.abs_alt==null)
        {
            res.abs.value = 'NA';
            res.abs.css = ' text-muted ';
            res.abs.unit = ' ';
        }
        else
        {
            if (v_useMetricSystem==true)
            {
                res.abs.value = p_andruavUnit.m_Nav_Info.p_Location.abs_alt;
                res.abs.unit = ' m';
            }
            else
            {
                res.abs.value = p_andruavUnit.m_Nav_Info.p_Location.abs_alt * CONST_METER_TO_FEET;
                res.abs.unit = ' ft';
            }

            if (res.abs.value<10) 
            {
                res.abs.value = res.abs.value.toFixed(2);
            }
            else
            {
                res.abs.value = res.abs.value.toFixed(0);
            }
            res.abs.css = ' text-white ';
        }

        if (p_andruavUnit.m_Nav_Info.p_Location.alt==null)
        {
            res.rel.value = 'NA';
            res.rel.css = ' text-muted ';
            res.rel.unit = '';
        }
        else
        {
            if (v_useMetricSystem==true)
            {
                res.rel.value = p_andruavUnit.m_Nav_Info.p_Location.alt;
                res.rel.unit = ' m';
            }
            else
            {
                res.rel.value = p_andruavUnit.m_Nav_Info.p_Location.alt * CONST_METER_TO_FEET;
                res.rel.unit = ' ft';
            }
            res.rel.value = p_andruavUnit.m_Nav_Info.p_Location.alt;
            if (res.rel.value<10) 
            {
                res.rel.value = res.rel.value.toFixed(2);
            }
            else
            {
                res.rel.value = res.rel.value.toFixed(0);
            }
            res.rel.css = ' text-white ';
        }


        if (p_andruavUnit.m_Terrain_Info.last_terrain_entry == null)
        {
            res.terC.value = 'NA';
            res.terC.css = ' text-muted ';
            res.terC.unit = '';
        }
        else
        {
            if (v_useMetricSystem==true)
            {
                res.terC.value = p_andruavUnit.m_Terrain_Info.last_terrain_entry.m_current_height;
                res.terC.unit = ' m';
            }
            else
            {
                res.terC.value = p_andruavUnit.m_Terrain_Info.last_terrain_entry.m_current_height * CONST_METER_TO_FEET;
                res.terC.unit = ' ft';
            }

            if (res.terC.value<10) 
            {
                res.terC.value = res.terC.value.toFixed(2);
            }
            else
            {
                res.terC.value = res.terC.value.toFixed(0);
            }
            res.terC.css = ' text-white ';
        }

        if (p_andruavUnit.m_Terrain_Info.last_terrain_entry == null)
        {
            res.terH.value = 'NA';
            res.terH.css = ' text-muted ';
            res.terH.unit = '';
        }
        else
        {
            if (v_useMetricSystem==true)
            {
                res.terH.value = p_andruavUnit.m_Terrain_Info.last_terrain_entry.m_terrain_height;
                res.terH.unit = ' m';
            }
            else
            {
                res.terH.value = p_andruavUnit.m_Terrain_Info.last_terrain_entry.m_terrain_height * CONST_METER_TO_FEET;
                res.terH.unit = ' ft';
            }

            if (res.terH.value<10) 
            {
                res.terH.value = res.terH.value.toFixed(2);
            }
            else
            {
                res.terH.value = res.terH.value.toFixed(0);
            }
            res.terH.css = ' text-white ';
        }
        
        return res;
    }

    getSpeed(p_andruavUnit)
    {
        var res= {
            'GS': new C_GUI_READING_VALUE(),
            'AS': new C_GUI_READING_VALUE()
        };

        res.AS.value = 'na';
        res.GS.value = 'na';

        if (p_andruavUnit.m_Nav_Info.p_Location.ground_speed != null)
        {
            if (v_useMetricSystem==true)
            {
                res.GS.value = p_andruavUnit.m_Nav_Info.p_Location.ground_speed.toFixed(0);
                res.GS.unit = ' m/s';
            }
            else
            {
                res.GS.value = (p_andruavUnit.m_Nav_Info.p_Location.ground_speed * CONST_METER_TO_FEET).toFixed(0);
                res.GS.unit = ' ft/s';
            }
        }

        if (p_andruavUnit.m_Nav_Info.p_Location.airspeed != null)
        {
            if (v_useMetricSystem==true)
            {
                res.AS.value = p_andruavUnit.m_Nav_Info.p_Location.airspeed.toFixed(0);
                res.AS.unit = ' m/s';
            }
            else
            {
                res.AS.value = (p_andruavUnit.m_Nav_Info.p_Location.airspeed * CONST_METER_TO_FEET).toFixed(0);
                res.AS.unit = ' ft/s';
            }
        }

        return res;
    }


    getWind (p_andruavUnit)
    {
        var res= {
            'WS': new C_GUI_READING_VALUE(),
            'WZ': new C_GUI_READING_VALUE(),
            'WD': new C_GUI_READING_VALUE()
        };


        if (p_andruavUnit.m_WindSpeed != null)
        {
            if (v_useMetricSystem==true)
            {
                res.WS.value = p_andruavUnit.m_WindSpeed.toFixed(0);
                res.WS.unit = ' m/s';
            }
            else
            {
                res.WS.value = (p_andruavUnit.m_WindSpeed * CONST_METER_TO_FEET).toFixed(0);
                res.WS.unit = ' ft/s';
            }
            res.WS.css = '';
        }
        else
        {
            res.WS.value = 'na';
            res.WS.unit = '';
            res.WS.css = ' text-muted ';
        }

        if (p_andruavUnit.m_WindSpeed_z != null)
        {
            if (v_useMetricSystem==true)
            {
                res.WZ.value = p_andruavUnit.m_WindSpeed_z.toFixed(0);
                res.WZ.unit = ' m/s';
            }
            else
            {
                res.WZ.value = (p_andruavUnit.m_WindSpeed_z * CONST_METER_TO_FEET).toFixed(0);
                res.WZ.unit = ' ft/s';
            }
            res.WZ.css = '';
        }
        else
        {
            res.WZ.value = 'na';
            res.WZ.unit = '';
            res.WZ.css = ' text-muted ';
        }

        // wind direction
        res.WD.value = p_andruavUnit.m_WindDirection;
        if (res.WD.value!= null) res.WD.value = res.WD.value.toFixed(0);
        res.WD.css == res.WS.css;
        res.WD.unit = ' º';
        
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
        const v_gps1 = this.hlp_getGPS(v_andruavUnit.m_GPS_Info1);
        const v_gps2 = this.hlp_getGPS(v_andruavUnit.m_GPS_Info2);
        const v_alt = this.getAlt(v_andruavUnit);
        const v_speed = this.getSpeed(v_andruavUnit);
        const v_wind = this.getWind(v_andruavUnit);

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
        
        var ctrl_ekf = [];
        switch (v_andruavUnit.m_autoPilot)
        {
            case mavlink20.MAV_AUTOPILOT_PX4:
                ctrl_ekf.push(<div>EKF-PX4</div>);
            break;
            default:
                ctrl_ekf.push(<CLSS_CTRL_ARDUPILOT_EKF key={v_andruavUnit.partyID + "_ctrl_ekf"} id={v_andruavUnit.partyID + "_ctrl_ekf"} m_unit={v_andruavUnit}/>);
            break;
        }

        

        return (
            <div className = 'row  mt-0 me-0 ms-0 mb-2 text-nowrap border-bottom bg-gradient'>
            <div className = {'col-1  css_margin_zero text-center cursor_hand ' + v_id_class} onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)}>
                <div className = 'row  css_margin_zero '>
                    <div className = {'col-12  css_margin_zero css_padding_zero '+ v_id_icon}>{v_id_text}</div>
                </div>
                <div className = 'row  css_margin_zero css_padding_zero'>
                        <div className = 'col-12  css_margin_zero '>{'mavid: ' + v_mav_id_text}</div>
                </div>
            </div>
            <div className = {'col-1  css_margin_zero text-center css_padding_zero '}>
                <div className = 'row  css_margin_zero css_padding_zero '>
                    <div className = {'col-12  css_margin_zero css_padding_zero '+ v_flight_mode.css} title ={v_flight_mode.title}>{v_flight_mode.txt}</div>
                </div>
                <div className = 'row  css_margin_zero css_padding_zero'>
                    <div className = {'col-12  css_margin_zero css_padding_zero '+ v_armed.css}>{v_armed.text}</div>
                </div>
            </div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>
                    <div className = 'row  css_margin_zero fss-4 '>
                        {ctrl_ekf}
                    </div>
                    <div className = 'row  css_margin_zero fss-4 '>
                        <CLSS_CTRL_VIBRATION key={v_andruavUnit.partyID + "_ctrl_vib"} id={v_andruavUnit.partyID + "_ctrl_vib"} m_unit={v_andruavUnit}/>
                    </div>
                
            </div>
            <div className = 'col-1  css_margin_zero css_padding_zero'>
                    <ul className="css_hud_bullets">
                        <li><span className="text-warning">R:</span><span className="text-white">{v_HUD.r}</span><span className="text-warning">º</span></li>
                        <li><span className="text-warning">P:</span><span className="text-white">{v_HUD.p}</span><span className="text-warning">º</span></li>
                    </ul>
            </div>
            <div className = 'col-2  css_margin_zero'>
                <div className = 'row  css_margin_zero fss-4 '>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat1.css}><span className="text-warning">Batt1</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryVoltage/1000).toFixed(1).toString()} <span className="text-warning">v</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryCurrent/1000).toFixed(0).toString()} <span className="text-warning">A</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat1.css}>{parseFloat(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryRemaining).toFixed(0)} <span className="text-warning">%</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_TotalCurrentConsumed/1000).toFixed(0).toString()} <span className="text-warning">AH</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat1.css}>{(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryTemprature/1000).toFixed(1).toString()} <span className="text-warning">C</span></div>
                </div>
                <div className = 'row  css_margin_zero  fss-4 '>
                    <div className = {'col-2  css_margin_zero ' + v_battery_display_fcb.bat2.css}><span className="text-warning">Batt2</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery2.FCB_BatteryVoltage/1000).toFixed(1).toString()} <span className="text-warning">v</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery2.FCB_BatteryCurrent/1000).toFixed(0).toString()} <span className="text-warning">A</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat2.css}>{parseFloat(v_andruavUnit.m_Power._FCB.p_Battery2.FCB_BatteryRemaining).toFixed(0)} <span className="text-warning">%</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery2.FCB_TotalCurrentConsumed/1000).toFixed(0).toString()} <span className="text-warning">AH</span></div>
                    <div className = {'col-2  css_margin_zero text-white' + v_battery_display_fcb.bat2.css}>{(v_andruavUnit.m_Power._FCB.p_Battery2.FCB_BatteryTemprature/1000).toFixed(1).toString()} <span className="text-warning">C</span></div>
                
                </div>
            </div>
            <div className = 'col-1  css_margin_zero css_padding_zero fss-4'>
                <div className = 'row  css_margin_zero css_padding_zero'>
                    <div className = {'col-12  css_margin_zero text-white'+ v_gps1.css}><span className='fss-4'>{v_gps1.value}</span></div>
                </div>
                <div className = 'row  css_margin_zero css_padding_zero'>
                <div className = {'col-12  css_margin_zero text-white '+ v_gps2.css}><span className='fss-4'>{v_gps2.value}</span></div>
                </div>
             </div>
            <div className = 'col-1  css_margin_zero fss-4'>
                <div className = {'row  css_margin_zero' + v_speed.GS.css}>
                    <div className = {'col-4  css_margin_zero text-warning' + v_speed.AS.css}>AS:</div>
                    <div className = {'col-8  css_margin_zero text-white' + v_speed.AS.css}>{v_speed.AS.value}<span className='text-warning'>{v_speed.AS.unit}</span></div>
                </div>
                <div className = {'row  css_margin_zero' + v_speed.GS.css}>
                    <div className = 'col-4  css_margin_zero text-warning '>GS:</div>
                    <div className = 'col-8  css_margin_zero text-white '>{v_speed.GS.value}<span className='text-warning'>{v_speed.GS.unit}</span></div>
                </div>
            </div>
            
            <div className = 'col-1  css_margin_zero fss-4'>
                <div className = {'row  css_margin_zero ' + v_alt.rel.css}>
                    <div className = {'col-6  css_margin_zero al_l '+ v_alt.abs.css}><span className='text-warning'>A:</span>{v_alt.abs.value}<span className='text-warning'>{v_alt.abs.unit}</span></div>
                    <div className = {'col-6  css_margin_zero al_l '+ v_alt.rel.css}><span className='text-warning'>R:</span>{v_alt.rel.value}<span className='text-warning'>{v_alt.rel.unit}</span></div>
                </div>
                <div className = 'row  css_margin_zero '>
                    <div className = {'col-6  css_margin_zero al_l '+ v_alt.terC.css}><span className='text-warning'>TC:</span>{v_alt.terC.value}<span className='text-warning'>{v_alt.terC.unit}</span></div>
                    <div className = {'col-6  css_margin_zero al_l '+ v_alt.terH.css}><span className='text-warning'>L:</span>{}<span className='text-warning'>{v_alt.terH.unit}</span></div>
                </div>
            </div>
           
            <div className = {'col-1  css_margin_zero fss-4' + v_wind.WS.css}>
                <div className = 'row  css_margin_zero'>
                    <div className = 'col-4  css_margin_zero text-warning al_l'>WS/Z:</div>
                    <div className = 'col-8  css_margin_zero text-white al_r' > {v_wind.WS.value} / {v_wind.WZ.value}<span className='text-warning'>{v_wind.WS.unit}</span></div>
                </div>
                <div className = {'row  css_margin_zero  fss-4' + v_wind.WD.css}>
                    <div  className = 'col-4  css_margin_zero text-warning al_l'>WD:</div>
                    <div  className = 'col-8  css_margin_zero text-white al_r'> {v_wind.WD.value}<span className="text-warning">{v_wind.WD.unit}</span></div>
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
        //me.forceUpdate();
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

    fn_OnClick()
    {
            if ($('#andruav_unit_list_array_float').attr('opacity') == null) {
                $('#andruav_unit_list_array_float').attr('opacity', '1.0');
                $('#andruav_unit_list_array_float').css('opacity', '1.0');
                $('#andruav_unit_list_array_float').unbind('mouseout');
                $('#andruav_unit_list_array_float #obaq').removeClass('bi-x-diamond');
                $('#andruav_unit_list_array_float #obaq').addClass('bi-x-diamond-fill');
            }
            else {
                $('#andruav_unit_list_array_float').attr('opacity', null);
                $('#andruav_unit_list_array_float').mouseout(function () {
                    $('#andruav_unit_list_array_float').css('opacity', '0.8');
                });
                $('#andruav_unit_list_array_float #obaq').removeClass('bi-x-diamond-fill');
                $('#andruav_unit_list_array_float #obaq').addClass('bi-x-diamond');
                
            }
        
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
                        //units_gcs.push (<CLSS_AndruavUnit_GCS key={partyID} v_en_GCS= {window.AndruavLibs.LocalStorage.fn_getGCSDisplayEnabled()} m_unit = {v_andruavUnit}/>);
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
        
            unit.push (<div className="card-header text-center">
							<div className="row">
							<div className="col-11">
								<h3 className="text-success text-start">Units</h3>
							</div>
							<div className="col-1 float-right">
							<span id ='obaq' className="cursor_hand bi bi-x-diamond" onClick={ (e) => this.fn_OnClick()}></span>
							</div>
							</div>
                            {units_details} 
						</div>);

        return (
            <div key={new Date()} className='margin_zero row'>{unit}</div>
        );
    }
};



if ($('#andruav_unit_list_array_float').length != 0) {

	ReactDOM.render(
		<CLSS_AndruavUnitListArray />,
		v_G_getElementById('andruav_unit_list_array_float')
	);
}

if ($('#andruav_unit_list_array_fixed').length != 0) {

	ReactDOM.render(
		<CLSS_AndruavUnitListArray />,
		v_G_getElementById('andruav_unit_list_array_fixed')
	);
}

