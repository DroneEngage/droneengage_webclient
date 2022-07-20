export class CLSS_CTRL_ARDUPILOT_FLIGHT_CONTROL extends React.Component {
    constructor()
	{
		super ();
		    this.state = {
		};
    }

    hlp_getflightButtonStyles (p_andruavUnit)
	{
	    var res = {};
		res.btn_arm_class               = "";
        res.btn_climb_class             = "";
        res.btn_takeoff_class           = " disabled hidden ";
		res.btn_climb_text              = "Climb";
		res.btn_land_class              = "";
        res.btn_surface_class           = " disabled hidden ";
        res.btn_auto_class              = "";
        res.btn_guided_class            = "";
        res.btn_brake_class             = "";
        res.btn_hold_class              = "";
        res.btn_brake_text              = "";
		res.btn_manual_class            = "";
        res.btn_acro_class              = " disabled hidden ";
        res.btn_stabilize_class         = " disabled hidden ";
        res.btn_alt_hold_class          = "";
        res.btn_pos_hold_class          = "";
        res.btn_loiter_class            = "";
        res.btn_rtl_class               = "";
        res.btn_srtl_class              = "";
        res.btn_circle_class            = "";
		res.btn_yaw_class               = "";
		res.btn_speed_class             = "";
        res.btn_cruise_class            = "";
        res.btn_fbwa_class              = "";
        res.btn_tele_class              = "";
        res.btn_load_wp_class           = "";
        res.btn_q_stabilize             = " disabled hidden";
        res.btn_q_loiter                = " disabled hidden";
        res.btn_q_hover                 = " disabled hidden";
        res.btn_q_land                  = " disabled hidden";
        res.btn_q_rtl                   = " disabled hidden";
        
        res.btn_servo_class         = " btn-success ";

        if (CONST_EXPERIMENTAL_FEATURES_ENABLED == false )
        {
            res.btn_servo_class = " disabled hidden ";
        }
        
            
        const  c_manualTXBlockedSubAction = p_andruavUnit.m_Telemetry.fn_getManualTXBlockedSubAction();
            

		if (p_andruavUnit.m_isArmed==true) 
		{
            switch (p_andruavUnit.m_VehicleType)
            {
                case VEHICLE_ROVER:
                    res.btn_arm_class 		    = " btn-danger";
                    res.btn_climb_class 	    = " disabled hidden ";
                    res.btn_land_class 		    = " disabled hidden ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_takeoff_class       = " disabled hidden ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_manual_class	    = " btn-primary  ";
                    res.btn_acro_class	        = " btn-primary  ";
                    res.btn_alt_hold_class      = " disabled hidden  ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class	    = " btn-warning "; // used in boat only
                    res.btn_rtl_class 		    = " btn-primary  rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary disabled hidden ";
                    res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
                    res.btn_yaw_class 	 	    = " disabled hidden ";
                    res.btn_brake_class 	    = " btn-primary disabled hidden ";
                    res.btn_hold_class          = " btn-primary  ";
                    res.btn_speed_class	 	    = " btn-success  ";
                break;
                    
                case VEHICLE_TRI:
                case VEHICLE_QUAD:
                    res.btn_takeoff_class       = " disabled hidden ";
                    res.btn_arm_class 		    = " btn-danger";
                    res.btn_climb_class 	    = " btn-warning  ";
                    res.btn_land_class 		    = " btn-warning  ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_brake_class 	    = " btn-primary  ";
                    res.btn_hold_class 	        = " disabled hidden ";
                    res.btn_manual_class	    = " disabled hidden ";
                    res.btn_manual_onclick      = " ";
                    res.btn_alt_hold_class      = " btn-danger  ";
                    res.btn_pos_hold_class      = " btn-danger  ";
                    res.btn_loiter_class 	    = " btn-danger  ";
                    res.btn_rtl_class 		    = " btn-primary rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " disabled hidden ";
                    res.btn_fbwa_class 	 	    = " disabled hidden ";
                    res.btn_yaw_class 	 	    = " btn-success  ";
                    res.btn_speed_class 	    = " btn-success  ";
                break;

                case VEHICLE_SUBMARINE:
                    res.btn_takeoff_class      = " btn-outline-light ";
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-warning ";
                    res.btn_climb_text          = "dive";
		            res.btn_land_class 		    = " disabled hidden ";
                    res.btn_surface_class       = " btn-warning ";
                    res.btn_auto_class 		    = " btn-primary ";
                    res.btn_guided_class 	    = " btn-primary ";
                    res.btn_brake_class 	    = " disabled hidden ";
                    res.btn_hold_class 	        = " disabled hidden ";
                    res.btn_manual_class	    = " disabled hidden ";
                    res.btn_manual_onclick      = " ";
                    res.btn_cruise_class  	    = " disabled hidden ";
                    res.btn_fbwa_class 	 	    = " disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden ";
                    res.btn_loiter_class 	    = " disabled hidden ";
                    res.btn_rtl_class 		    = " disabled hidden ";
                    res.btn_srtl_class 		    = " disabled hidden ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_yaw_class 	 	    = " btn-success  ";
                    res.btn_speed_class 	    = " btn-success  ";
                break;
                
                case  VEHICLE_PLANE:
                    // https://ardupilot.org/plane/docs/flight-modes.html
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-warning ";
                    res.btn_takeoff_class       = " btn-warning ";
                    res.btn_land_class 		    = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_manual_class	    = " btn-danger   ";
                    res.btn_stabilize_class     = " btn-danger   ";
                    res.btn_brake_class 	    = " disabled hidden ";
                    res.btn_hold_class 	        = " disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden ";
                    res.btn_loiter_class 	    = " btn-danger  ";
                    res.btn_rtl_class 		    = " btn-primary rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class   = c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary  ";
                    res.btn_fbwa_class 	 	    = " btn-primary  ";
                    res.btn_yaw_class 	 	    = " disabled hidden   ";
                    res.btn_speed_class 	    = " btn-success  ";

                    res.btn_q_stabilize         = " btn-primary ";
                    res.btn_q_loiter            = " btn-danger ";
                    res.btn_q_hover             = " btn-primary ";
                    res.btn_q_land              = " btn-warning ";
                    res.btn_q_rtl               = " btn-primary ";
                break; 

                default:
                    // https://ardupilot.org/plane/docs/flight-modes.html
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-warning  ";
                    res.btn_land_class 		    = " btn-warning  ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_manual_class	    = " btn-outline-light  ";
                    res.btn_acro_class	        = " disabled hidden ";
                    res.btn_brake_class 	    = " disabled hidden ";
                    res.btn_hold_class 	        = " disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class 	    = " btn-primary  ";
                    res.btn_rtl_class 		    = " btn-primary rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary  ";
                    res.btn_cruise_class  	    = " btn-primary  ";
                    res.btn_fbwa_class 	 	    = " btn-primary  ";
                    res.btn_yaw_class 	 	    = " btn-success  ";
                    res.btn_speed_class 	    = " btn-success  ";
                break;
            }				
							
		}
		else
		{
            // NOT ARMED

			res.btn_arm_class 			= " btn-outline-light ";
			res.btn_climb_class 		= " disabled hidden ";
			res.btn_land_class 			= " disabled hidden ";
            res.btn_auto_class 			= " disabled hidden ";
			res.btn_guided_class 		= " btn-outline-light  ";
            res.btn_manual_class	    = " disabled hidden ";
            res.btn_acro_class	        = " disabled hidden ";
            res.btn_stabilize_class     = " disabled hidden ";
            res.btn_pos_hold_class      = " disabled disabled hidden  ";
            res.btn_loiter_class 		= " disabled hidden ";
			res.btn_rtl_class 			= " btn-outline-light rounded-1 ";
			res.btn_srtl_class 		    = " btn-outline-light ";
            res.btn_cruise_class  	    = " disabled hidden ";
            res.btn_fbwa_class 	 	    = " bdisabled hidden ";
		    res.btn_yaw_class 	 		= " disabled hidden ";
		    res.btn_speed_class 	    = " disabled hidden ";
            
            switch (p_andruavUnit.m_VehicleType)
            {
                case VEHICLE_SUBMARINE:
                    res.btn_takeoff_class      = " btn-outline-light ";
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-outline-light ";
                    res.btn_climb_text          = "dive";
		            res.btn_land_class 		    = " disabled hidden ";
                    res.btn_surface_class       = " btn-outline-light ";
                    res.btn_auto_class 		    = " btn-outline-light ";
                    res.btn_guided_class 	    = " btn-outline-light ";
                    res.btn_brake_class 	    = " disabled hidden ";
                    res.btn_hold_class 	        = " disabled hidden ";
                    res.btn_manual_class	    = " disabled hidden ";
                    res.btn_manual_onclick      = " ";
                    res.btn_cruise_class  	    = " disabled hidden ";
                    res.btn_fbwa_class 	 	    = " disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden ";
                    res.btn_loiter_class 	    = " disabled hidden ";
                    res.btn_rtl_class 		    = " disabled hidden ";
                    res.btn_srtl_class 		    = " disabled hidden ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_yaw_class 	 	    = " btn-outline-light ";
                    res.btn_speed_class 	    = " btn-outline-light ";
                    break;
                case VEHICLE_ROVER:
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " disabled hidden ";
                    res.btn_land_class 		    = " disabled hidden ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-outline-light ";
                    res.btn_takeoff_class       = " disabled hidden ";
                    res.btn_guided_class 	    = " btn-outline-light ";
                    res.btn_manual_class	    = " btn-outline-light ";
                    res.btn_acro_class	        = " btn-outline-light ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden ";
                    res.btn_loiter_class	    = " btn-outline-light "; // used in boat only
                    res.btn_rtl_class 		    = " btn-outline-light rounded-1 ";
                    res.btn_srtl_class 		    = " btn-outline-light ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary disabled hidden ";
                    res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
                    res.btn_yaw_class 	 	    = " disabled hidden ";
                    res.btn_brake_class 	    = " btn-primary disabled hidden ";
                    res.btn_hold_class          = "  btn-outline-light ";
                    res.btn_speed_class	 	    = "  btn-outline-light ";
                        break;

                case VEHICLE_TRI:
                case VEHICLE_QUAD:
                        res.btn_takeoff_class       = " disabled hidden ";
                        res.btn_arm_class 		    = " btn-danger ";
                        res.btn_climb_class 	    = " btn-outline-light ";
                        res.btn_land_class 		    = " btn-outline-light ";
                        res.btn_surface_class       = " disabled hidden ";
                        res.btn_auto_class 		    = " btn-outline-light ";
                        res.btn_guided_class 	    = " btn-outline-light ";
                        res.btn_brake_class 	    = " btn-outline-light ";
                        res.btn_hold_class 	        = " disabled hidden ";
                        res.btn_manual_class	    = " disabled hidden ";
                        res.btn_alt_hold_class      = " btn-outline-light ";
                        res.btn_pos_hold_class      = " btn-outline-light ";
                        res.btn_loiter_class 	    = " btn-outline-light ";
                        res.btn_rtl_class 		    = " btn-outline-light rounded-1 ";
                        res.btn_srtl_class 		    = " btn-outline-light ";
                        res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                        res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                        res.btn_cruise_class  	    = " disabled hidden ";
                        res.btn_fbwa_class 	 	    = " disabled hidden ";
                        res.btn_yaw_class 	 	    = " btn-outline-light ";
                        res.btn_speed_class 	    = " btn-outline-light ";
                        break;

                case  VEHICLE_PLANE:
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-outline-light ";
                    res.btn_takeoff_class       = " btn-outline-light ";
                    res.btn_land_class 		    = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-outline-light ";
                    res.btn_guided_class 	    = " btn-outline-light ";
                    res.btn_manual_class	    = " btn-outline-light ";
                    res.btn_stabilize_class     = " btn-outline-light ";
                    res.btn_brake_class 	    = " disabled hidden ";
                    res.btn_hold_class 	        = " disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden ";
                    res.btn_loiter_class 	    = " btn-outline-light ";
                    res.btn_rtl_class 		    = " btn-outline-light rounded-1 ";
                    res.btn_srtl_class 		    = " btn-outline-light ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class   = c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-outline-light ";
                    res.btn_fbwa_class 	 	    = " btn-outline-light ";
                    res.btn_yaw_class 	 	    = " disabled hidden   ";
                    res.btn_speed_class 	    = " btn-outline-light ";

                    res.btn_q_stabilize         = " btn-outline-light ";
                    res.btn_q_loiter            = " btn-outline-light ";
                    res.btn_q_hover             = " btn-outline-light ";
                    res.btn_q_land              = " btn-outline-light ";
                    res.btn_q_rtl               = " btn-outline-light ";
                    break;
        
                default: 
                    break;
            } 				

		}

	    return res;
	}

    fn_ToggleArm(v_andruavUnit) {
        if (this.props.v_andruavUnit != null) {
            if (this.props.v_andruavUnit.m_isArmed) {
                this.fn_doDisarm(v_andruavUnit);
            }
            else {
                this.fn_doArm(v_andruavUnit);
            }
        }
    }

    fn_doArm(v_andruavUnit) {
        if (v_andruavUnit != null) {
            fn_do_modal_confirmation("DANGEROUS: FORCE ADMING  " + v_andruavUnit.m_unitName + "   " + v_andruavUnit.m_VehicleType_TXT,
                "OVERRIDE ARM .. Are You SURE?", function (p_approved) {
                    if (p_approved === false) 
                    {
                        v_andruavClient.API_do_Arm(v_andruavUnit.partyID, true, false);
                        return;
                    }
                    else
                    {
					    v_SpeakEngine.fn_speak('DANGEROUS EMERGENCY DISARM');
                        v_andruavClient.API_do_Arm(v_andruavUnit.partyID, true, true);
                        return ;
                    }
                }, "FORCED-ARM", "bg-danger text-white", "ARM");
        }
    }

    fn_doDisarm(v_andruavUnit) {
        if (v_andruavUnit != null) {
            fn_do_modal_confirmation("DANGEROUS: EMERGENCY DISARM  " + v_andruavUnit.m_unitName + "   " + v_andruavUnit.m_VehicleType_TXT,
                "STOP all MOTORS and if vehicle in air will CRASH. Are You SURE?", function (p_approved) {
                    if (p_approved === false) return;
					v_SpeakEngine.fn_speak('DANGEROUS EMERGENCY DISARM');
                    v_andruavClient.API_do_Arm(v_andruavUnit.partyID, false, true);
                }, "KILL-MOTORS", "bg-danger text-white");


        }
    }

    fn_doTakeOffPlane(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_TAKEOFF);
    }

    fn_doLand(v_andruavUnit) {
        v_andruavClient.API_do_Land(v_andruavUnit.partyID);
    }

    fn_doSurface(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_SURFACE);
    }

    fn_doManual(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_MANUAL);
    }

    fn_doAcro(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_ACRO);
    }

    fn_doStabilize(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_STABILIZE);
    }

    fn_doRTL(v_andruavUnit, smart) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, smart == true ? CONST_FLIGHT_CONTROL_SMART_RTL : CONST_FLIGHT_CONTROL_RTL);
    }


    fn_doCruise(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_CRUISE);
    }


    fn_doFBWA(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_FBWA);
    }

    fn_doFBWB(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_FBWB);
    }


    fn_doQStabilize(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QSTABILIZE);
    }
    fn_doQLoiter(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QLOITER);
    }
    fn_doQHover(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QHOVER);
    }
    fn_doQLand(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QLAND);
    }
    fn_doQRTL(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QRTL);
    }

    
    

    fn_doGuided(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_GUIDED);
    }

    fn_doAuto(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_AUTO);
    }

    fn_doPosHold(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_POSTION_HOLD);
    }

    fn_doLoiter(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_LOITER);
    }

    fn_doBrake(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_BRAKE);
    }

    fn_doHold(v_andruavUnit) {
        v_andruavClient.API_do_FlightMode(v_andruavUnit.partyID, CONST_FLIGHT_CONTROL_HOLD);
    }


    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render ()
    {
        var btn = this.hlp_getflightButtonStyles(this.props.v_andruavUnit);
        var ctrl=[];
        

        switch (this.props.v_andruavUnit.m_VehicleType)
        {
            case  VEHICLE_PLANE:
                ctrl.push(<div key={this.props.id+"rc1"} id={this.props.id+"rc1"}  className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_arm' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_arm_class}  title='ARM / DISARM' onClick={ () => this.fn_ToggleArm(this.props.v_andruavUnit)}>&nbsp;ARM&nbsp;</button>
                    <button id='btn_climb' type='button' className={'btn btn-sm  flgtctrlbtn '  + btn.btn_climb_class } onClick={ (e) => fn_changeAltitude(this.props.v_andruavUnit)}>&nbsp;{btn.btn_climb_text}&nbsp;</button>
                    <button id='btn_takeoff' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_takeoff_class } onClick={ (e) => this.fn_doTakeOffPlane(this.props.v_andruavUnit)}>&nbsp;TakeOff&nbsp;</button>
                    <button id='btn_land' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_land_class } onClick={ (e) => this.fn_doLand(this.props.v_andruavUnit)}>&nbsp;Land&nbsp;</button>
                    <button id='btn_surface' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_surface_class } onClick={ (e) => this.fn_doSurface(this.props.v_andruavUnit)}>&nbsp;Surface&nbsp;</button>
                    <button id='btn_auto' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_auto_class } onClick={ (e) => this.fn_doAuto(this.props.v_andruavUnit)}>&nbsp;Auto&nbsp;</button>
                    <button id='btn_guided' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_guided_class } onClick={ (e) => this.fn_doGuided(this.props.v_andruavUnit)}>&nbsp;Guided </button>
                    <button id='btn_break' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_brake_class } onClick={ (e) => this.fn_doBrake(this.props.v_andruavUnit)}>&nbsp;Brake&nbsp;</button>
                    <button id='btn_hold' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_hold_class } onClick={ (e) => this.fn_doHold(this.props.v_andruavUnit)}>&nbsp;Hold&nbsp;</button>
                    <button id='btn_loiter' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_loiter_class } onClick={ (e) => this.fn_doLoiter(this.props.v_andruavUnit)}>&nbsp;Loiter&nbsp;</button>
                    </div></div>);
        
                ctrl.push(<div key={this.props.id+"rc2"}  id={this.props.id+"rc2"}  className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_posh' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_pos_hold_class } onClick={ (e) => this.fn_doPosHold(this.props.v_andruavUnit)}>&nbsp;Pos-H&nbsp;</button>
                    <button id='btn_manual' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_manual_class } onClick={ (e) => this.fn_doManual(this.props.v_andruavUnit)}>&nbsp;Manual&nbsp;</button>
                    <button id='btn_stabilize' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_stabilize_class } onClick={ (e) => this.fn_doStabilize(this.props.v_andruavUnit)}>&nbsp;Stabilize&nbsp;</button>
                    <button id='btn_rtl' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_rtl_class } title="RTL mode"  onClick={ (e) => this.fn_doRTL(this.props.v_andruavUnit, false)}>&nbsp;RTL&nbsp;</button>
                    <button id='btn_rtl_s' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_srtl_class } title="Smart RTL"  onClick={ (e) => this.fn_doRTL(this.props.v_andruavUnit, true)}>&nbsp;S-RTL&nbsp;</button>
                    <button id='btn_cruse' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_cruise_class } onClick={ (e) => this.fn_doCruise(this.props.v_andruavUnit)}>&nbsp;Cruise&nbsp;</button>
                    <button id='btn_fbwa' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWA(this.props.v_andruavUnit)}>&nbsp;FBWA&nbsp;</button>
                    <button id='btn_fbwb' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWB(this.props.v_andruavUnit)}>&nbsp;FBWB&nbsp;</button>
                    <button id='btn_yaw' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_yaw_class } onClick={ (e) => gui_doYAW(this.props.v_andruavUnit.partyID)}>&nbsp;YAW&nbsp;</button>
                    <button id='btn_speed' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_speed_class } onClick={ (e) => fn_changeSpeed(this.props.v_andruavUnit,this.props.v_andruavUnit.m_Nav_Info.p_Location.speed!=null?this.props.v_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>&nbsp;GS&nbsp;</button>
                    <button id='btn_servos' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_servo_class } onClick={ (e) => fn_ServoControl(this.props.v_andruavUnit)}>&nbsp;SRV&nbsp;</button>
                    </div></div>);
            
            
                ctrl.push(<div key={this.props.id+"rc22"} id={this.props.id+"rc22"}   className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_q_sblt' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_q_stabilize } onClick={ (e) => this.fn_doQStabilize(this.props.v_andruavUnit)}>&nbsp;Q-Stab&nbsp;</button>
                    <button id='btn_q_loiter' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_q_loiter } onClick={ (e) => this.fn_doQLoiter(this.props.v_andruavUnit)}>&nbsp;Q-Loiter&nbsp;</button>
                    <button id='btn_q_hover' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_q_hover } onClick={ (e) => this.fn_doQHover(this.props.v_andruavUnit)}>&nbsp;Q-Hover&nbsp;</button>
                    <button id='btn_q_land' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_q_land } title="RTL mode"  onClick={ (e) => this.fn_doQLand(this.props.v_andruavUnit)}>&nbsp;Q-Land&nbsp;</button>
                    <button id='btn_q_rtl' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_q_rtl } title="Smart RTL"  onClick={ (e) => this.fn_doQRTL(this.props.v_andruavUnit)}>&nbsp;Q-RTL&nbsp;</button>
                    </div></div>);
    
                

            default:
                ctrl.push(<div key={this.props.id+"rc1"}  id={this.props.id+"rc1"}  className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_arm' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_arm_class}  title='ARM / DISARM' onClick={ () => this.fn_ToggleArm(this.props.v_andruavUnit)}>&nbsp;ARM&nbsp;</button>
                    <button id='btn_climb' type='button' className={'btn btn-sm  flgtctrlbtn '  + btn.btn_climb_class } onClick={ (e) => fn_changeAltitude(this.props.v_andruavUnit)}>&nbsp;{btn.btn_climb_text}&nbsp;</button>
                    <button id='btn_takeoff' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_takeoff_class } onClick={ (e) => this.fn_doTakeOffPlane(this.props.v_andruavUnit)}>&nbsp;TakeOff&nbsp;</button>
                    <button id='btn_land' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_land_class } onClick={ (e) => this.fn_doLand(this.props.v_andruavUnit)}>&nbsp;Land&nbsp;</button>
                    <button id='btn_surface' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_surface_class } onClick={ (e) => this.fn_doSurface(this.props.v_andruavUnit)}>&nbsp;Surface&nbsp;</button>
                    <button id='btn_auto' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_auto_class } onClick={ (e) => this.fn_doAuto(this.props.v_andruavUnit)}>&nbsp;Auto&nbsp;</button>
                    <button id='btn_guided' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_guided_class } onClick={ (e) => this.fn_doGuided(this.props.v_andruavUnit)}>&nbsp;Guided </button>
                    <button id='btn_break' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_brake_class } onClick={ (e) => this.fn_doBrake(this.props.v_andruavUnit)}>&nbsp;Brake&nbsp;</button>
                    <button id='btn_hold' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_hold_class } onClick={ (e) => this.fn_doHold(this.props.v_andruavUnit)}>&nbsp;Hold&nbsp;</button>
                    </div></div>);
        
                ctrl.push(<div key={this.props.id+"rc2"}   id={this.props.id+"rc2"}  className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_posh' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_pos_hold_class } onClick={ (e) => this.fn_doPosHold(this.props.v_andruavUnit)}>&nbsp;Pos-H&nbsp;</button>
                    <button id='btn_loiter' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_loiter_class } onClick={ (e) => this.fn_doLoiter(this.props.v_andruavUnit)}>&nbsp;Loiter&nbsp;</button>
                    <button id='btn_manual' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_manual_class } onClick={ (e) => this.fn_doManual(this.props.v_andruavUnit)}>&nbsp;Manual&nbsp;</button>
                    <button id='btn_acro' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_acro_class } onClick={ (e) => this.fn_doAcro(this.props.v_andruavUnit)}>&nbsp;Acro&nbsp;</button>
                    <button id='btn_rtl' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_rtl_class } title="RTL mode"  onClick={ (e) => this.fn_doRTL(this.props.v_andruavUnit, false)}>&nbsp;RTL&nbsp;</button>
                    <button id='btn_rtl_s' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_srtl_class } title="Smart RTL"  onClick={ (e) => this.fn_doRTL(this.props.v_andruavUnit, true)}>&nbsp;S-RTL&nbsp;</button>
                    <button id='btn_cruse' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_cruise_class } onClick={ (e) => this.fn_doCruise(this.props.v_andruavUnit)}>&nbsp;Cruise&nbsp;</button>
                    <button id='btn_fbwa' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWA(this.props.v_andruavUnit)}>&nbsp;FBWA&nbsp;</button>
                    <button id='btn_fbwb' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWB(this.props.v_andruavUnit)}>&nbsp;FBWB&nbsp;</button>
                    <button id='btn_yaw' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_yaw_class } onClick={ (e) => gui_doYAW(this.props.v_andruavUnit.partyID)}>&nbsp;YAW&nbsp;</button>
                    <button id='btn_speed' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_speed_class } onClick={ (e) => fn_changeSpeed(this.props.v_andruavUnit,this.props.v_andruavUnit.m_Nav_Info.p_Location.speed!=null?this.props.v_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>&nbsp;GS&nbsp;</button>
                    <button id='btn_servos' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_servo_class } onClick={ (e) => fn_ServoControl(this.props.v_andruavUnit)}>&nbsp;SRV&nbsp;</button>
                    </div></div>);
                break;
        }
        

        return (<div key={this.props.id+"rc"}   id={this.props.id+"rc"} >
            {ctrl}
            </div>
        );
    }
}
