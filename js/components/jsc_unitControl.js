class CLSS_AndruavSwarmLeaders extends React.Component {


    fn_toggleMakeSwarm (p_formationID)
    {
        if (this.props.m_unit.m_Swarm.m_isLeader == true)
        {   // make not a leader
            v_andruavClient.API_makeSwarm (this.props.m_unit.partyID, CONST_TASHKEEL_SERB_NO_SWARM);
        }
        else
        {   // make leader and set formation.
            v_andruavClient.API_makeSwarm (this.props.m_unit.partyID, p_formationID);
        }
    }

    fn_updateSwarm(p_andruavUnit,leaderAndruavUnit)
    {
        v_andruavClient.API_updateSwarm (TASHKEEL_SERB_UPDATED, -1, p_partyID, p_leaderPartyID);
    }

    fn_requestToFollow (p_unit)
    {
        fn_console_log (p_unit);
        var v_partyID = null;
        if (p_unit != null)
        {
            v_partyID = p_unit.partyID;
        }
        v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, v_partyID);
    }


    onChange(e)
    {
       
    }
    
    componentDidUpdate() 
    {
        
    }

    
    render ()
    {
        if (CONST_THIS_IS_PUBLIC_VERSION === true)
        {
            return (
                <div></div>
            )
        }
        else
        {

            
                
        


        }
    }
}

class CLSS_CTRL_DIRECTIONS extends React.Component {

    constructor()
	{
		super ();
		    this.state = {
		};
    }

    

    draw (target_deg, bearing_deg) 
    {
        //fn_console_log ("target_deg:"+ target_deg + " bearing_deg:" + bearing_deg);
        const c_canvas=$('#' + this.props.id +' #ctrl_target_bearing')[0];
        const c_ctx = c_canvas.getContext('2d');
        
        c_canvas.width  = 50;
        c_canvas.height = 50; 
        c_canvas.style.width  = '50px';
        c_canvas.style.height = '50px';

        var centerX = c_canvas.width / 2;
        var centerY = c_canvas.height / 2;
        var radius = 22;
        
        var v_target_start = (target_deg-4-90)* Math.PI / 180;
        var v_target_end = (target_deg+4-90)* Math.PI / 180;
        

        var v_bearing_start = (bearing_deg-3-90)* Math.PI / 180;
        var v_bearing_end = (bearing_deg+3-90)* Math.PI / 180;
        

        c_ctx.clearRect(0, 0, c_canvas.width, c_canvas.height);
        

        c_ctx.beginPath();
        c_ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        c_ctx.lineWidth = 3;
        c_ctx.strokeStyle = '#2cb1e1';
        c_ctx.stroke();
        
        
        

        // 1- Bearing
        c_ctx.beginPath();
        c_ctx.moveTo(centerX,centerY);
        c_ctx.arc(centerX, centerY, radius, v_bearing_start, v_bearing_end, false);
        c_ctx.fillStyle = '#36AB36';
        c_ctx.fill();
        c_ctx.lineWidth = 1;
        c_ctx.strokeStyle = '#36AB36';
        c_ctx.closePath();
        c_ctx.stroke();


        // 2- Target to override tip of bearing
        c_ctx.beginPath();
        c_ctx.arc(centerX, centerY, radius, v_target_start, v_target_end, false);
        c_ctx.lineWidth = 2;
        c_ctx.strokeStyle = '#000000';
        c_ctx.closePath();
        c_ctx.stroke();


    }


    componentDidMount() {
        this.draw(this.props.v_target,this.props.v_bearing);
    }

    componentDidUpdate() {
        this.draw(this.props.v_target,this.props.v_bearing);
    }

    render ()
    {
        return (
            <div  id={this.props.id}  className='css_hud_div'>
                <div className = 'row al_l css_margin_zero'>
                    <canvas id='ctrl_target_bearing' className='css_target_bearing'></canvas>
                </div>
            </div>
        )
    }
}

class CLSS_CTRL_HUD extends React.Component {

    constructor()
	{
		super ();
		    this.state = {
		};
    }

    draw (p_pitch_deg, p_roll_deg, p_yaw_deg) 
    {
        //fn_console_log("pitch_deg:" + pitch_deg + "  roll_deg:" + roll_deg);
        const c_canvas=$('#' + this.props.id + ' #ctrl_hud')[0];
        const c_ctx = c_canvas.getContext('2d');
        c_canvas.width  = 50;
        c_canvas.height = 50; 
        c_canvas.style.width  = '50px';
        c_canvas.style.height = '50px';

        var centerX = c_canvas.width / 2;
        var centerY = c_canvas.height / 2;
        var radius = 22;
        p_pitch_deg = 2 * p_pitch_deg;
        var v_pitch = p_pitch_deg * Math.PI / 180;
        var v_roll = -p_roll_deg * Math.PI / 180;

        var v_pitch_start = v_pitch;
        var v_pitch_end = 3.14 - v_pitch_start;
        
        var v_yaw_start = (p_yaw_deg-3-90)* Math.PI / 180;
        var v_yaw_end = (p_yaw_deg+3-90)* Math.PI / 180;
        
        

        c_ctx.clearRect(0, 0, c_canvas.width, c_canvas.height);
        c_ctx.beginPath();
        c_ctx.lineWidth = 1;
        c_ctx.save();

        // rotate apply roll
        c_ctx.translate(centerX, centerY);
        c_ctx.rotate(v_roll);
        c_ctx.translate(-centerX, -centerY);
        
        // SKY
        c_ctx.beginPath();
        c_ctx.arc(centerX, centerY, radius, 0 , 6.28);
        c_ctx.fillStyle = '#75a4d3';
        c_ctx.fill();
        c_ctx.lineWidth = 2;
        c_ctx.strokeStyle = '#2cb1e1';
        c_ctx.stroke();

        // Ground
        c_ctx.beginPath();
        c_ctx.arc(centerX, centerY, radius, v_pitch_start, v_pitch_end, false);
        c_ctx.fillStyle = '#75D375';
        c_ctx.fill();
        c_ctx.lineWidth = 2;
        c_ctx.strokeStyle = '#36AB36';
        c_ctx.stroke();

        

        // Yaw
        c_ctx.beginPath();
        c_ctx.moveTo(centerX,centerY);
        c_ctx.arc(centerX, centerY, radius, v_yaw_start, v_yaw_end, false);
        c_ctx.fillStyle = '#F3DBE3';
        c_ctx.fill();
        c_ctx.lineWidth = 1;
        c_ctx.strokeStyle = '#F3DBE3';
        c_ctx.closePath();
        c_ctx.stroke();


        c_ctx.restore();

        c_ctx.beginPath();
        c_ctx.moveTo(5,centerY);
        c_ctx.lineTo(c_canvas.width-5, centerY);
        c_ctx.lineWidth = 1;
        c_ctx.fillStyle = '#F0AD4E';
        c_ctx.stroke();

        c_ctx.beginPath();
        c_ctx.arc(centerX, centerY, 2, 0, 2*Math.PI, false);
        c_ctx.fillStyle = '#DA7EB7';
        c_ctx.fill();
        c_ctx.lineWidth = 2;
        c_ctx.strokeStyle = '#DA7EB7';
        c_ctx.stroke();
        
    }

    componentDidMount() {
        this.draw(this.props.v_pitch,this.props.v_roll,this.props.v_yaw,this.props.v_target);
    }

    componentDidUpdate() {
        this.draw(this.props.v_pitch,this.props.v_roll,this.props.v_yaw,this.props.v_target);
    }

    render ()
    {
        return (
            <div id={this.props.id} className='css_hud_div'>
                <div className = 'row al_l css_margin_zero'>
                    <div className= 'col-xs-6   si-07x css_margin_zero'>
                        <ul className ='css_hud_bullets'>
                            <li><span className='text-primary'>R:</span>{this.props.v_roll}º</li>
                            <li><span className='text-primary'>P:</span>{this.props.v_pitch}º</li>
                            <li><span className='text-primary'>Y:</span>{this.props.v_yaw}º</li>
                        </ul>
                    </div>

                    <div className= 'col-xs-6  css_margin_zero css_padding_zero'>
                    <canvas id='ctrl_hud' className='css_hud'></canvas>
                    </div>
                   
                </div>
            </div>
        )
    }

}

class CLSS_SearchableTargets extends React.Component {
    constructor()
	{
		super ();
		this.state = {
		    
		};
    }

    
    render ()
    {

        return (<div />);
    }
}


class CLSS_AndruavUnit extends React.Component {
    constructor()
	{
		super ();
		this.state = {
		    
		};
    }

    fn_unitUpdated (me,p_andruavUnit)
    {
        if (p_andruavUnit.partyID != me.props.m_unit.partyID) 
        {
          //  fn_console_log ('err: This is not me ' + p_andruavUnit.partyID);
            return ; // not me
        }

      

        if (p_andruavUnit.m_IsGCS != me.state.m_IsGCS)
        {
            // Drone converted to GCS or other type... class is not valid now and an add new should be created.
          // fn_console_log ('err: Convert Me ' + p_andruavUnit.partyID);
           
           window.AndruavLibs.EventEmitter.fn_dispatch(EE_unitAdded,p_andruavUnit);
	
        }

        var v_date = p_andruavUnit.date;
        if (v_date == null)
        {
            p_andruavUnit.date = new Date();
        }
        else
        {
            var n = new Date();
            if ((n - p_andruavUnit.date) < 300)
            {
                return ;
            }
            p_andruavUnit.date = new Date();
        }

       // fn_console_log ('err: Force Update ' + p_andruavUnit.partyID);
          
        me.forceUpdate();
       
    }

    fn_unitTelemetryOn (me,p_andruavUnit)
    {
        if (p_andruavUnit== null) return;
        if (p_andruavUnit.partyID != me.props.m_unit.partyID) 
        {
          //  fn_console_log ('err: This is not me ' + p_andruavUnit.partyID);
            return ; // not me
        }
        
        me.forceUpdate();
    }

    fn_unitTelemetryOFF(me,p_andruavUnit)
    {
        if (p_andruavUnit== null) return;
        if (p_andruavUnit.partyID != me.props.m_unit.partyID) 
        {
          //  fn_console_log ('err: This is not me ' + p_andruavUnit.partyID);
            return ; // not me
        }
        
        me.forceUpdate();
    }

    /***
     * children classes needs componentWillMount() and there is no way to call super functions
     * so you need to make this bypass.
     */
    childcomponentWillMount() {};
    childcomponentWillUnmount() {};

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitUpdated,this,this.fn_unitUpdated);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitNavUpdated,this,this.fn_unitUpdated);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitTelemetryOn,this,this.fn_unitTelemetryOn);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitTelemetryOff,this,this.fn_unitTelemetryOFF);
         
         var v_andruavUnit = this.props.m_unit; 
         this.setState({m_IsGCS:v_andruavUnit.m_IsGCS});


         this.childcomponentWillMount();
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitUpdated,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitNavUpdated,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitTelemetryOn,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitTelemetryOff,this);
        this.childcomponentWillUnmount();
    }

    fn_ServoControl(e, p_andruavUnit)
    {
        window.AndruavLibs.EventEmitter.fn_dispatch (EE_displayServoForm, p_andruavUnit.partyID);
    }

    fn_changeSpeed (e, p_andruavUnit, p_speed)
    {
        if (fn_changeSpeed == false) return ; // no speed info
      fn_changeSpeed (p_andruavUnit);
    }

    fn_changeSpeedByStep (e, p_andruavUnit, p_speed)
    {
        if (p_speed == null) return ;
        
        if (p_speed <= 0 )
        {
            // BAD SPEED
            v_SpeakEngine.fn_speak('speed cannot be zero');
            return ;
        }

        if (isNaN(p_speed ) === true)
        {
            v_SpeakEngine.fn_speak('set speed to 5m/s');
            p_speed = 5.0
        }
        
        var v_speak = "change speed to ";
        // save target speed as indication.
		p_andruavUnit.m_Nav_Info.p_Orientation.m_NavSpeed = parseFloat(p_speed);
        
        
        if (v_useMetricSystem == true) {
            v_speak = v_speak + p_speed.toFixed(1) + "meter per second";
        }
        else {
            v_speak = v_speak + (p_speed * CONST_METER_TO_MILE).toFixed(1) + "mile per hour";
        }

        v_SpeakEngine.fn_speak(v_speak);

        v_andruavClient.API_do_ChangeSpeed1(p_andruavUnit.partyID, parseFloat(p_speed));
    }

    fn_takeTXCtrl (e,p_andruavUnit)
    {
        p_andruavUnit.m_Telemetry.m_rxEngaged = true;
        v_andruavClient.API_TXCtrl (p_andruavUnit, CONST_TX_SIGNAL_FREEZE_ALL);
        window.AndruavLibs.EventEmitter.fn_dispatch (EE_requestGamePad, p_andruavUnit);
            
    }

    fn_releaseTXCtrl (p_andruavUnit)
    {
        p_andruavUnit.m_Telemetry.m_rxEngaged = false;
        v_andruavClient.API_TXCtrl (p_andruavUnit, CONST_RC_SUB_ACTION_RELEASED);
        window.AndruavLibs.EventEmitter.fn_dispatch (EE_releaseGamePad, p_andruavUnit);
            
    }

    fn_gotoUnit (e,p_partyID)
    {
        v_andruavClient.API_requestID(p_partyID);
        fn_gotoUnit(p_partyID);
    }

    fn_toggleCamera(p_partyID)
    {
        function fn_callback (p_session)
        {
            if ((p_session != null) && (p_session.status == 'connected')) 
            {
                window.AndruavLibs.EventEmitter.fn_dispatch(EE_displayCameraDlgForm, p_session);
            }
        }
        
        v_andruavClient.API_requestCameraList(p_partyID, fn_callback);

    }

    fn_toggleVideo(p_partyID)
    {
        toggleVideo(p_partyID);
    }

    fn_toggleRecord (p_partyID)
    {
        toggleRecrodingVideo(p_partyID);
    }



}


class CLSS_AndruavUnit_GCS extends CLSS_AndruavUnit {
    constructor()
	{
		super ();
		
    }

    render ()
    {
        var v_andruavUnit = this.props.m_unit; 
        var v_hidden = "";
        if (this.props.v_en_GCS === false)
        {
            v_hidden = 'hidden';
        } 
        if (v_andruavUnit == null) return ;
        
        return (
         <div id={v_andruavUnit.partyID + "__FAKE"}  className={v_hidden + " row css_margin_zero IsGCS_" + v_andruavUnit.m_IsGCS + " IsShutdown_" + v_andruavUnit.m_IsShutdown}>
            <div className='col-xs-11 col-sm-11 css_margin_zero padding_zero'>
                <div className='col-xs-1 col-sm-1' ><img className='gcs IsGCS_true cursor_hand' src={getVehicleIcon(v_andruavUnit)} alt='GCS' onClick={ (e) => this.fn_gotoUnit(e,v_andruavUnit.partyID)} /> </div>
                <div className='col-xs-11 col-sm-11'><p id='id' className='text-right text-primary cursor_hand'> GCS [<strong>{v_andruavUnit.m_unitName}</strong>]</p></div>
            </div>
            <hr/>
        </div>
        );
    }
}


class CLSS_AndruavUnit_Drone extends CLSS_AndruavUnit {
    constructor()
	{
		super ();
        this.localvars={};
        this.localvars.speed_link = false;	
		
    }

    

    fn_requestGamePad(me,p_andruavUnit)
    {
        if (p_andruavUnit== null) return;
        if (p_andruavUnit.partyID != me.props.m_unit.partyID) 
        {
           // someone else wanta GamePad, I will release it if I have it.
            return ; // not me
        }
                
        p_andruavUnit.m_Telemetry.m_rxEngaged = true;
        
        me.forceUpdate();
    }

    fn_webRX_toggle (p_andruavUnit)
    {
        if (p_andruavUnit == null) return ;
        if (p_andruavUnit.m_Telemetry.m_rxEngaged==true)
        {
            v_andruavClient.API_disengageRX(p_andruavUnit);        
            window.AndruavLibs.EventEmitter.fn_dispatch (EE_releaseGamePad, p_andruavUnit);
            p_andruavUnit.m_Telemetry.m_rxEngaged = false;
            
        }
        else
        {
            v_andruavClient.API_engageRX(p_andruavUnit);	
        }
    }
    
    fn_clearWayPoints(p_andruavUnit, p_fromFCB) {
        if (p_andruavUnit == null) return;

        fn_do_modal_confirmation("Delete Mission for " + p_andruavUnit.m_unitName,
            "Are you sure you want to delete mission?", function () {
                v_andruavClient.API_clearWayPoints(p_andruavUnit, p_fromFCB);

            }, "YES", "bg-danger");
    }


    fn_requestWayPoints(p_andruavUnit, fromFCB) {
        if (p_andruavUnit == null) return;
        v_andruavClient.API_requestWayPoints(p_andruavUnit, fromFCB);
    }


  


    fn_doChangeAltitudeByStep (p_andruavUnit, p_AltitudeInMeter)
    {
        fn_console_log ("fn_doChangeAltitudeByStep:" + p_AltitudeInMeter);
        if (p_andruavUnit == null) return ;
        
        if ((p_AltitudeInMeter == null) || (p_AltitudeInMeter < CONST_DEFAULT_ALTITUDE_min)) return ;

        var v_speak;
        
        if (v_useMetricSystem == true) {
            v_speak = p_AltitudeInMeter.toFixed(1) + "meters";
        }
        else {
            v_speak = (p_AltitudeInMeter * CONST_METER_TO_FEET).toFixed(1) + "feet";
        }

        
        if (p_andruavUnit.m_VehicleType == VEHICLE_SUBMARINE)
        {
            v_speak = "change depth to " + v_speak;

            v_andruavClient.API_do_ChangeAltitude(p_andruavUnit.partyID, -p_AltitudeInMeter);
        }
        else
        {
            v_speak = "change altitude to " + v_speak;
            
            v_andruavClient.API_do_ChangeAltitude(p_andruavUnit.partyID, p_AltitudeInMeter);
        }

        v_SpeakEngine.fn_speak(v_speak);

    }
   

    fn_ToggleArm(p_andruavUnit) {
        if (p_andruavUnit != null) {
            if (p_andruavUnit.m_isArmed) {
                this.fn_doDisarm(p_andruavUnit);
            }
            else {
                this.fn_doArm(p_andruavUnit);
            }
        }
    }

    fn_doArm(p_andruavUnit) {
        
        v_andruavClient.API_do_Arm(p_andruavUnit.partyID, true, false);
    }

    fn_doDisarm(p_andruavUnit) {
        if (p_andruavUnit != null) {
            fn_do_modal_confirmation("DANGEROUS: EMERGENCY DISARM  " + p_andruavUnit.m_unitName + "   " + p_andruavUnit.m_VehicleType_TXT,
                "STOP all MOTORS and if vehicle in air will CRASH. Are You SURE?", function () {
                    v_SpeakEngine.fn_speak('DANGEROUS EMERGENCY DISARM');
                    v_andruavClient.API_do_Arm(p_andruavUnit.partyID, false, true);
                }, "KILL-MOTORS", "bg-danger");


        }
    }

    fn_doTakeOffPlane(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_TAKEOFF);
    }

    fn_doLand(p_andruavUnit) {
        v_andruavClient.API_do_Land(p_andruavUnit.partyID);
    }

    fn_doSurface(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_SURFACE);
    }

    fn_doManual(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_MANUAL);
    }

    fn_doStabilize(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_STABILIZE);
    }

    fn_doRTL(p_andruavUnit, smart) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, smart == true ? CONST_FLIGHT_CONTROL_SMART_RTL : CONST_FLIGHT_CONTROL_RTL);
    }


    fn_doCruise(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_CRUISE);
    }


    fn_doFBWA(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_FBWA);
    }

    fn_doFBWB(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_FBWB);
    }



    
    

    fn_doGuided(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_GUIDED);
    }

    fn_doAuto(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_AUTO);
    }

    fn_doPosHold(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_POSTION_HOLD);
    }

    fn_doLoiter(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_LOITER);
    }

    fn_doBreak(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_BREAK);
    }

    fn_doHold(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_HOLD);
    }


    fn_connectToFCB (p_andruavUnit)
	{
        if (p_andruavUnit == null) return ;
		v_andruavClient.API_connectToFCB(p_andruavUnit);
	}


    hlp_getGPS (p_andruavUnit)
    {
        var res = {
        m_gps_class: "",
        m_gps_text: "",
        m_gps_text2: "",
        m_gps_status: "",
        m_gps_source: ""
        }

        res.m_gps_class = "label-danger";
        if (p_andruavUnit.m_GPS_Info.m_isValid == true)
        {
            switch (p_andruavUnit.m_GPS_Info.GPS3DFix)
            {
                case 1:
                    res.m_gps_text = "No Fix";
                    res.m_gps_class = "label-danger";
                break;

                case 2:
                    res.m_gps_class = "label-warning";
                break;

                case 3:
                    res.m_gps_class = "label-primary";
                    res.m_gps_text  ="3D Fix";
                break;
            }

            switch (p_andruavUnit.m_GPS_Info.gpsMode)
            {
                case 0:
                    res.m_gps_status = 'GPS Auto';
                    res.m_gps_source = "A-gps: ";
                    break;
                case 1:
                    res.m_gps_status = 'GPS From Mobile';
                    res.m_gps_source = "M-gps: ";
                    break;
                case 2:
                    res.m_gps_status = 'GPS From FCB';
                    res.m_gps_source = "F-gps: ";
                    break;
        }

            res.m_gps_text2 = " [" + p_andruavUnit.m_GPS_Info.satCount + " sats]";

           
        }
        else
        {
            
            res.m_gps_text  =" No GPS";
            res.m_gps_status = "GPS Status";
            res.m_gps_source = "?-gps: ";        
        }

       
        return res;
    }

    hlp_getBatteryCSSClass (p_andruavUnit)
	{
        const p_Power = p_andruavUnit.m_Power;

        if ((p_andruavUnit.m_IsShutdown === true) || (p_Power._Mobile.p_hasPowerInfo == false)) 
            return { v_battery_src:"./images/battery_gy_32x32.png", css:"battery_inactive",level:0, charging:"unknown"};
        
        var v_bat = p_Power._Mobile.p_Battery.PlugStatus + " ";
		const batteryLevel = p_Power._Mobile.p_Battery.BatteryLevel;
        var v_battery_src = "./images/battery_gy_32x32.png";
        if (parseInt(batteryLevel,0) > 80)
		{
            v_bat += ' battery_4 ';
            v_battery_src = "./images/battery_g_32x32.png";
		}
		else if (parseInt(batteryLevel,0) > 50)
		{
		    v_bat += ' battery_3 ';
            v_battery_src = "./images/battery_rg_32x32.png";
		
		}
		else if (parseInt(batteryLevel,0) > 25)
		{
		    v_bat += ' battery_2 ';
            v_battery_src = "./images/battery_rg_3_32x32.png";
		
		}
		else 
		{
		    v_bat += ' battery_1 ';
            v_battery_src = "./images/battery_r_32x32.png";
		
		}
			 
		return { m_battery_src: v_battery_src, css:v_bat,level:batteryLevel, charging: p_Power._Mobile.p_Battery.PlugStatus}; 
	}


	hlp_getFCBBatteryCSSClass (p_andruavUnit)
	{
        var v_battery_display_fcb_div = "";
        var v_battery_src = "./images/battery_gy_32x32.png";
        const p_Power = p_andruavUnit.m_Power;

	    var v_remainingBat = p_Power._FCB.p_Battery.FCB_BatteryRemaining;
		var v_bat = " ";
			 
		if ((p_andruavUnit.m_IsShutdown === true) || (p_andruavUnit.m_Power._FCB.p_hasPowerInfo === false))
        {
            v_battery_display_fcb_div = " hidden ";
            return { v_battery_src:"./images/battery_gy_32x32.png", css:v_bat,level:v_remainingBat, charging: 'unknown', v_battery_display_fcb_div: v_battery_display_fcb_div};
        }

		if (p_Power._FCB.p_hasPowerInfo == false) return null;

        if (parseInt(v_remainingBat,0) > 80)
		{
		    v_bat += ' battery_4 ';
            v_battery_src = "./images/battery_g_32x32.png";
		}
		else if (parseInt(v_remainingBat,0) > 50)
		{
		    v_bat += ' battery_3 ';
            v_battery_src = "./images/battery_rg_32x32.png";
		}
		else if (parseInt(v_remainingBat,0) > 25)
		{
		    v_bat += ' battery_2 ';
            v_battery_src = "./images/battery_rg_3_32x32.png";
		}
		else 
		{
		    v_bat += ' battery_1 ';
            v_battery_src = "./images/battery_r_32x32.png";
		}
			 
	    return { m_battery_src:v_battery_src, css:v_bat, level:v_remainingBat, charging: 'unknown', v_battery_display_fcb_div: v_battery_display_fcb_div}; 
	}

    hlp_getflightButtonStyles (p_andruavUnit)
	{
	    var res = {};
		res.btn_arm_class           = "";
        res.btn_climb_class         = "";
        res.btn_takeoff_class       = " disabled hidden ";
		res.btn_climb_text          = "Climb";
		res.btn_land_class          = "";
        res.btn_surface_class       = " disabled hidden ";
        res.btn_auto_class          = "";
        res.btn_guided_class        = "";
        res.btn_brake_class         = "";
        res.btn_hold_class          = "";
        res.btn_brake_text          = "";
		res.btn_manual_class        = "";
        res.btn_stabilize_class     = " disabled hidden";
        res.btn_alt_hold_class      = "";
        res.btn_pos_hold_class      = "";
        res.btn_loiter_class        = "";
        res.btn_rtl_class           = "";
        res.btn_takeCTRL_class      = "";
        res.btn_releaseCTRL_class   = "";
		res.btn_circle_class        = "";
		res.btn_yaw_class           = "";
		res.btn_speed_class         = "";
        res.btn_cruise_class        = "";
        res.btn_fbwa_class          = "";
        res.btn_tele_class          = "";
        res.btn_load_wp_class       = "";
        
        res.btn_servo_class         = " btn-success ";

        if ((CONST_THIS_IS_PUBLIC_VERSION == true ) || (fn_isOnANdruavSite() == true))
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
                    res.btn_climb_class 	    = " btn-default disabled hidden ";
                    res.btn_land_class 		    = " btn-default disabled hidden ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_takeoff_class       = " btn-default disabled hidden ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_manual_class	    = " btn-primary  ";
                    res.btn_alt_hold_class      = " disabled hidden  ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class	    = " btn-danger  disabled hidden "; // used in boat only
                    res.btn_rtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary disabled hidden ";
                    res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
                    res.btn_yaw_class 	 	    = " btn-default disabled hidden ";
                    res.btn_brake_class 	    = " btn-primary disabled hidden ";
                    res.btn_hold_class          = " btn-primary  ";
                    res.btn_speed_class	 	    = " btn-success  ";
                break;
                    
                case VEHICLE_TRI:
                case VEHICLE_QUAD:
                    res.btn_takeoff_class       = " btn-default disabled hidden ";
                    res.btn_arm_class 		    = " btn-danger";
                    res.btn_climb_class 	    = " btn-warning  ";
                    res.btn_land_class 		    = " btn-warning  ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_brake_class 	    = " btn-primary  ";
                    res.btn_hold_class 	        = " btn-primary disabled hidden ";
                    res.btn_manual_class	    = " btn-default disabled hidden ";
                    res.btn_manual_onclick      = " ";
                    res.btn_alt_hold_class      = " btn-danger  ";
                    res.btn_pos_hold_class      = " btn-danger  ";
                    res.btn_loiter_class 	    = " btn-danger  ";
                    res.btn_rtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary disabled hidden ";
                    res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
                    res.btn_yaw_class 	 	    = " btn-success  ";
                    res.btn_speed_class 	    = " btn-success  ";
                break;

                case VEHICLE_SUBMARINE:
                    res.btn_takeoff_class      = " btn-default disabled hidden ";
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-warning  ";
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
                    res.btn_brake_class 	    = " btn-primary  disabled hidden ";
                    res.btn_hold_class 	        = " btn-primary  disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class 	    = " btn-primary  ";
                    res.btn_rtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class   = c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary  ";
                    res.btn_fbwa_class 	 	    = " btn-primary  ";
                    res.btn_yaw_class 	 	    = " btn-primary  disabled hidden   ";
                    res.btn_speed_class 	    = " btn-success  ";
                break; 

                default:
                    // https://ardupilot.org/plane/docs/flight-modes.html
                    res.btn_arm_class 		    = " btn-danger ";
                    res.btn_climb_class 	    = " btn-warning  ";
                    res.btn_land_class 		    = " btn-warning  ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_manual_class	    = " btn-default  ";
                    res.btn_brake_class 	    = " btn-primary  disabled hidden ";
                    res.btn_hold_class 	        = " btn-primary  disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class 	    = " btn-primary  ";
                    res.btn_rtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
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

			res.btn_arm_class 			= " btn-default ";
			res.btn_climb_class 		= " btn-default disabled hidden ";
			res.btn_land_class 			= " btn-default disabled hidden ";
            res.btn_auto_class 			= " btn-default disabled hidden ";
			res.btn_guided_class 		= " btn-default  ";
            res.btn_manual_class	    = " btn-default  disabled hidden ";
            res.btn_stabilize_class     = " btn-default  disabled hidden ";
            res.btn_pos_hold_class      = " disabled disabled hidden  ";
            res.btn_loiter_class 		= " disabled hidden ";
			res.btn_rtl_class 			= " btn-default  ";
			res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
            res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
            res.btn_cruise_class  	    = " btn-primary disabled hidden ";
            res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
		    res.btn_yaw_class 	 		= " btn-default disabled hidden ";
		    res.btn_speed_class 	    = " btn-default disabled hidden ";
            
            switch (p_andruavUnit.m_VehicleType)
            {
                case VEHICLE_SUBMARINE:
                        res.btn_takeoff_class      = " btn-default disabled hidden ";
                        res.btn_hold_class 		    = " btn-default  ";
                        break;
                case VEHICLE_ROVER:
                        res.btn_takeoff_class      = " btn-default disabled hidden ";
                        res.btn_brake_class         = " btn-default disabled hidden ";
                        res.btn_hold_class 		    = " btn-default  ";
                        break;

                case VEHICLE_TRI:
                case VEHICLE_QUAD:
                        res.btn_takeoff_class      = " btn-default disabled hidden ";
                        res.btn_brake_class         = " btn-default  ";
                        res.btn_hold_class 		    = " btn-default disabled hidden ";
                        break;

                case  VEHICLE_PLANE:
                        res.btn_takeoff_class      = " btn-default ";
                        res.btn_manual_class	   = " btn-danger ";
                        res.btn_stabilize_class	   = " btn-danger ";
                        break;
        
                default: 
                    break;
            } 				

		}

        if (p_andruavUnit.m_Telemetry._isActive == true)
        {
            res.btn_tele_class          = " btn-danger ";
            res.btn_tele_text           = "Tele On";
        }
        else
        {
            res.btn_tele_class          = " btn-primary ";
            res.btn_tele_text           = "Tele Off";
        }

        if ((p_andruavUnit.m_Telemetry.fn_getManualTXBlockedSubAction() != CONST_RC_SUB_ACTION_JOYSTICK_CHANNELS)
        && (p_andruavUnit.m_Telemetry.fn_getManualTXBlockedSubAction() != CONST_RC_SUB_ACTION_JOYSTICK_CHANNELS_GUIDED))
        {   
            res.btn_rx_class          = " btn-primary ";
            res.btn_rx_text           = "RX Off";
            res.btn_rx_title          = "Press to take control using Web - TX";
        }

        else if ((p_andruavUnit.m_Telemetry.fn_getManualTXBlockedSubAction() == CONST_RC_SUB_ACTION_JOYSTICK_CHANNELS)
        || (p_andruavUnit.m_Telemetry.fn_getManualTXBlockedSubAction() == CONST_RC_SUB_ACTION_JOYSTICK_CHANNELS_GUIDED))
        {

            if (p_andruavUnit.m_Telemetry.m_rxEngaged == true)
            {
                res.btn_rx_class          = " btn-danger ";
                res.btn_rx_text           = " RX On";
                res.btn_rx_title          = " You control this drone using Web - TX";

            }
            else   
            {
                res.btn_rx_class          = " btn-outline-warning ";
                res.btn_rx_text           = " RX Off";
                res.btn_rx_title          = "Drone is being controller by another GCS";
            }
        }
        else
        {  // p_andruavUnit.m_Telemetry.fn_getManualTXBlockedSubAction() != RC_SUB_ACTION_RELEASE  ONLY

            if (p_andruavUnit.m_Telemetry.m_rxEngaged == true)
            {
                res.btn_rx_class          = " btn-danger ";
                res.btn_rx_text           = " RX On";
                res.btn_rx_title          = " You control this drone using Web - TX";

            }
            else   
            {
                res.btn_rx_class          = " btn-outline-warning hidden";
                res.btn_rx_text           = " RX Off";
                res.btn_rx_title          = "Drone is being controller by another GCS";
            }
        }

        // for now this feature is disabled.
        //res.btn_rx_class   = "hidden disabled"; 
        res.btn_save_wp_class  = "btn-danger";
        res.btn_clear_wp_class = "btn-danger";
        res.btn_load_wp_class  = "btn-primary";

	    return res;
	}

    componentDidUpdate() {
        var cam = $(".dropdown-menu li a");
        if (cam != null) 
        {
            cam.click(function(){
                var selText = $(this).attr('data-value');
                $(this).parents('.btn-group').siblings('.menu').html(selText)
            });
        }
        
     }
    
   
    childcomponentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_requestGamePad,this,this.fn_requestGamePad);
    }

    childcomponentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_requestGamePad,this);
    }

    
    renderIMU (v_andruavUnit)
    {
        var v_fence_text = "unknown";
		var v_fence_class = "text-muted";
		var v_altitude_text = "";
		var v_speed_text = "";	
		var v_yaw_text;
        var v_yaw_knob = [];
        var v_fcb_mode_title;		
		var v_bearing_text;
        var v_bearing_knob = [];
        var v_bearingTarget_text;
        var v_bearingTarget_knob = [];
        var v_flight_mode_text;
        var v_flight_mode_class = ' ';
        var v_distanceToMe_text;
        var v_distanceToMe_class;
        var v_flight_status_text;
        var v_flight_status_class;
        var distanceToWP_class;
        var wpdst_class;
        var wpdst_text;
        var v_leader_class,v_leader_text;
        var v_flyingTime = " ";
        var v_totalFlyingTime = " ";
        var v_now = (new Date()).valueOf() ;
        if (v_andruavUnit.m_isFlying == true) 
        {
            if (v_andruavUnit.m_FlyingLastStartTime != undefined)
            {
                //v_flyingTime = fn_getTimeSpanDetails_Shortest ( v_now, v_andruavUnit.m_FlyingLastStartTime );
                /**
                 * You need to depend on board. cannot assume that board Local Time is the same so you neeed to rely
                 * on second difference. however you can make local counter to update time untill second update received from vehicle
                 * so that vehilce does not need to send many messages just to update time.
                 */
                v_flyingTime = fn_getTimeDiffDetails_Shortest ( v_andruavUnit.m_FlyingLastStartTime ); 
            }
            if (v_andruavUnit.m_VehicleType == VEHICLE_SUBMARINE)
            {
                v_flight_status_text = 'Diving';
            }
            else
            {
                v_flight_status_text = 'Flying';
            }
            v_flight_status_class = 'label-danger cursor_hand ';
        }
        else
        {
            v_flight_status_text = 'On Ground';
            v_flight_status_class = 'label-success';
        }

        // calculate Total Time
        //const c_delta = v_andruavUnit.m_FlyingLastStartTime==0?0.0:Math.abs(v_now - v_andruavUnit.m_FlyingLastStartTime);
        const c_delta = v_andruavUnit.m_FlyingLastStartTime==0?0.0:v_andruavUnit.m_FlyingLastStartTime;
        v_totalFlyingTime = fn_getTimeDiffDetails_Shortest ( (c_delta + v_andruavUnit.m_FlyingTotalDuration));

        v_leader_class = (v_andruavUnit.m_Swarm.m_isLeader==true)?"btn-success":"btn-danger";
        v_leader_text  = (v_andruavUnit.m_Swarm.m_isLeader==true)?"Press to leave swarm":"press to become a leader";
        
        if (v_andruavUnit.m_Nav_Info.p_Location.speed==null) 
        {
            v_speed_text = 'NA'; 
        }else
        { 
            v_speed_text = v_andruavUnit.m_Nav_Info.p_Location.speed;
		    this.localvars.speed_link = true;
            if (v_useMetricSystem==true)
            {
                v_speed_text = v_speed_text.toFixed(0) + ' m/s';
            }
            else
            {
                v_speed_text = ( v_speed_text * CONST_METER_TO_MILE).toFixed(0) + ' mph';
            }
            
        }


        switch (v_andruavUnit.m_telemetry_protocol)
        {
            case CONST_TelemetryProtocol_CONST_No_Telemetry:
                v_flight_mode_text = 'No FCB Connected';
                v_flight_mode_class = ' label-warning ';
                
                v_fcb_mode_title = 'Click to connect to FCB if not active';
            break;
            case CONST_TelemetryProtocol_CONST_Andruav_Telemetry:
            case CONST_TelemetryProtocol_CONST_Mavlink_Telemetry:
            case CONST_TelemetryProtocol_CONST_MW_Telemetry:
            case CONST_TelemetryProtocol_DroneKit_Telemetry:
            case CONST_TelemetryProtocol_DJI_Telemetry:
            case CONST_TelemetryProtocol_CONST_Unknown_Telemetry:
                v_flight_mode_text = "mode - " + hlp_getFlightMode(v_andruavUnit);
                v_flight_mode_class = ' label-primary ';
                v_fcb_mode_title = 'Flight Mode';
            break;
        }

        v_flight_mode_class += ' cursor_hand ';

        if (v_andruavUnit.m_Nav_Info.p_Location.lat == null) 
        {
            v_distanceToMe_class = ' label-danger cursor_hand ';
            v_distanceToMe_text = 'No Unit GPS';
        }
        else if (myposition == null)
        {
            v_distanceToMe_text = 'No GCS GPS';
            v_distanceToMe_class = ' label-danger cursor_hand ';
        }
        else
        {
            var v_lat2 = v_andruavUnit.m_Nav_Info.p_Location.lat;
            var v_lng2 = v_andruavUnit.m_Nav_Info.p_Location.lng;
            var distance = fn_calcDistance (myposition.coords.latitude,myposition.coords.longitude,v_lat2,v_lng2) ;
            if (v_useMetricSystem==true) 
            {
                v_distanceToMe_text = Number(distance.toFixed(0)).toLocaleString() + " m";
            }
            else
            {
                v_distanceToMe_text = Number((distance * CONST_METER_TO_FEET).toFixed(0)).toLocaleString() + " ft";
            }

            if (distance > CONST_DFM_FAR)
            {
                v_distanceToMe_class = ' label-danger  cursor_hand ';
            }
            else if (distance > CONST_DFM_SAFE)
            {
                v_distanceToMe_class = 'label-warning';
            }
            else
            {
                v_distanceToMe_class = 'label-primary';
            }
           
        }


        var v_alt_title, v_alt_remark;

        if (v_andruavUnit.m_VehicleType == VEHICLE_SUBMARINE)
        {
            v_alt_title ='depth:';
            v_alt_remark = 'depth';
        }
        else
        {
            v_alt_title = 'Alt:';
            v_alt_remark = 'Alt ';
        }    
        
        v_alt_remark += 'display: relative/absolute ... step: ' + window.AndruavLibs.LocalStorage.fn_getDefaultAltitude();

        if (v_useMetricSystem == true) {
            v_alt_remark += " m";
        }
        else
        {
            v_alt_remark += " feet";
        }

		v_altitude_text = v_andruavUnit.m_Nav_Info.p_Location.alt;
		if (v_altitude_text==null) 
        {
             v_altitude_text = 'NA';
        } 
        else 
        {
            if (v_useMetricSystem==true)
            {
                v_altitude_text = v_altitude_text.toFixed(0).toString();
                
                v_altitude_text += " m";

            }
            else
            {
                v_altitude_text = (v_altitude_text * CONST_METER_TO_FEET).toFixed(0);
                
                v_altitude_text += " ft";

            }
        }
						
		if (v_andruavUnit.m_Nav_Info.p_Orientation.nav_yaw==null)
        {
             v_yaw_text = 'hud - unknown';
             v_yaw_knob = '';
        }
        else 
        {
            const c_yaw = (CONST_RADIUS_TO_DEGREE * ((v_andruavUnit.m_Nav_Info.p_Orientation.nav_yaw + CONST_PTx2) % CONST_PTx2)).toFixed(1);
            const c_pitch = ((CONST_RADIUS_TO_DEGREE * v_andruavUnit.m_Nav_Info.p_Orientation.nav_pitch) ).toFixed(1);
            const c_roll = ((CONST_RADIUS_TO_DEGREE * v_andruavUnit.m_Nav_Info.p_Orientation.nav_roll) ).toFixed(1);
            v_yaw_text = 'hud';
            v_yaw_knob.push(<CLSS_CTRL_HUD key={v_andruavUnit.partyID + "_hud"} id={v_andruavUnit.partyID + "_hud"} v_pitch={c_pitch} v_roll={c_roll} v_yaw={c_yaw}  title ='Pitch: {v_pitch}'/>);
          }

        if (v_andruavUnit.m_Nav_Info.p_Location.bearing==null)
        {
              v_bearing_text = 'bearing/target';
              v_bearing_knob = '';
              v_bearingTarget_knob = '';

        }
        else
        {
            v_bearing_text = 'bearing/target';
            const c_target = (CONST_RADIUS_TO_DEGREE * ((v_andruavUnit.m_Nav_Info._Target.target_bearing + CONST_PTx2) % CONST_PTx2)).toFixed(1);
            const c_bearing = (CONST_RADIUS_TO_DEGREE * ((v_andruavUnit.m_Nav_Info.p_Location.bearing + CONST_PTx2) % CONST_PTx2)).toFixed(1);
            v_bearing_knob.push(<CLSS_CTRL_DIRECTIONS key={v_andruavUnit.partyID + "_tb"} id={v_andruavUnit.partyID + "_tb"} v_target={c_target} v_bearing={c_bearing} />);

        }

		if ((v_andruavUnit.m_Nav_Info._Target.wp_dist == null) 
        || (v_andruavUnit.m_Nav_Info._Target.wp_dist < 0 ))
        {
            wpdst_text = "na";
            wpdst_class = ' hidden ';
            
        }
        else
        {
            wpdst_class = 'label-primary';
            
            if (v_useMetricSystem==true)
            {
                wpdst_text =   Number(v_andruavUnit.m_Nav_Info._Target.wp_dist.toFixed(1)).toLocaleString()  + ' m';
            }
            else
            {
                wpdst_text =  Number(v_andruavUnit.m_Nav_Info._Target.wp_dist * CONST_METER_TO_FEET).toFixed(1).toLocaleString() + ' ft';
            }

            
            if (v_andruavUnit.m_Nav_Info._Target.wp_dist > CONST_DFM_FAR)
            {
                distanceToWP_class = ' label-danger cursor_hand ';
            }
            else if (v_andruavUnit.m_Nav_Info._Target.wp_dist > CONST_DFM_SAFE)
            {
                distanceToWP_class = ' label-warning cursor_hand ';
            }
            else
            {
                distanceToWP_class = ' label-primary cursor_hand ';
            }
        }				
						
		var res = fn_isBadFencing (v_andruavUnit);
		v_andruavUnit.m_fencestatus = res;

        if (v_andruavUnit.m_fencestatus!= null)
		{
		    var status;
			if ((v_andruavUnit.m_fencestatus & 0b010) == 0b010) //bad
			{
			    v_fence_text = 'fence - bad';
				v_fence_class = 'label-danger';
			}
			else if ((v_andruavUnit.m_fencestatus & 0b110) == 0b100) // good & no violation
			{ // unknown
			    v_fence_text = 'fence - good';
				v_fence_class = 'label-success';
			}
			else if ((v_andruavUnit.m_fencestatus  & 0b111) == 0b001) // out of greed areas .... display as bad
			{ // unknown
			    v_fence_text = 'fence - bad';
				v_fence_class = 'label-danger';
			}
			else
			{ // good
			    v_fence_text = 'fence - no violation';
				v_fence_class = 'label-warning';
			}
		}

       
        var gps = this.hlp_getGPS (v_andruavUnit);

        var v_targetspeed = parseFloat(v_andruavUnit.m_Nav_Info.p_Orientation.m_NavSpeed).toFixed(2) + " m/s";
        if (v_useMetricSystem == false) {
            // value stored in meters per seconds so convert it to miles per hour
            v_targetspeed = (parseFloat(v_andruavUnit.m_Nav_Info.p_Orientation.m_NavSpeed) * CONST_METER_TO_MILE).toFixed(2) + " mph";
        }

        var imu=[];
        // https://icons.getbootstrap.com/icons/caret-down-fill/
        imu.push (
                <div key='imu_1' id='imu_1' className= 'row al_l  css_margin_zero '>
                    <div className = 'row al_l css_margin_zero'>
                        <div className= 'col-md-3 col-xs-6  col-sm-3 '>
                                <p className=' img-rounded text-primary cursor_hand textunit' title ='Ground Speed'>
                                <span title={"decrease speed"} onClick={ (e) => this.fn_changeSpeedByStep(e,v_andruavUnit, v_andruavUnit.m_Nav_Info.p_Orientation.m_NavSpeed - CONST_DEFAULT_SPEED_STEP )}>
                                    <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>
                                </span>
                                <span id='speed'  title={"target: "+v_targetspeed}onClick={ (e) => this.fn_changeSpeed(e,v_andruavUnit,v_andruavUnit.m_Nav_Info.p_Location.speed!=null?v_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>
                                <small><b>&nbsp;
                                 {'GS: ' + v_speed_text}
                                 &nbsp;</b></small>
                                </span>
                                <span title="increase speed" onClick={ (e) => this.fn_changeSpeedByStep(e,v_andruavUnit, v_andruavUnit.m_Nav_Info.p_Orientation.m_NavSpeed + CONST_DEFAULT_SPEED_STEP )}>
                                    <svg className="bi bi-caret-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
                                    </svg>
                                </span>
                                </p>
                                
                        </div>
                        <div className= 'col-md-3 col-xs-6  col-sm-3 '>
                                <p id='gps' className={' img-rounded textunit cursor_hand label si-07x ' + gps.m_gps_class} title ={gps.m_gps_status} onClick={ (e) => fn_switchGPS(v_andruavUnit.partyID)} >{gps.m_gps_source + gps.m_gps_text + ' ' + gps.m_gps_text2}</p>
                        </div>
                        <div className= 'col-md-3 col-xs-6  col-sm-3 '>
                                  <p id='dfm' className={'label si-06x textunit ' + v_distanceToMe_class} title ='Unit distance from Me' >{"dfm: " + v_distanceToMe_text}</p>
                         </div>
                        <div className= 'col-md-3 col-xs-6 col-sm-3'>
                        <p id='fence' className={'label si-07x textunit cursor_hand ' + v_fence_class} title ='Fence Violation Status' onClick={ (e) => fn_openFenceManager(v_andruavUnit.partyID)} >{v_fence_text}</p>
                        </div>
                    </div>

                    <div className = 'row al_l css_margin_zero'>
                        <div className= 'col-xs-6  col-sm-3 '>
                                  <p id='alt'   className=' img-rounded cursor_hand textunit text-primary' >
                                        <span title={"decrease altitude"} onClick={ (e) => this.fn_doChangeAltitudeByStep(v_andruavUnit, v_andruavUnit.m_Nav_Info.p_Location.alt - fn_convertToMeter(window.AndruavLibs.LocalStorage.fn_getDefaultAltitude()) )}>
                                            <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                        </span>

                                        <span title ={v_alt_remark} onClick={ (e) => fn_changeAltitude(v_andruavUnit)}>
                                            <small><b>{ v_alt_title + v_altitude_text + ' '}</b></small>
                                        </span>

                                        <span title="increase altitude" onClick={ (e) => this.fn_doChangeAltitudeByStep(v_andruavUnit, v_andruavUnit.m_Nav_Info.p_Location.alt + fn_convertToMeter(window.AndruavLibs.LocalStorage.fn_getDefaultAltitude()) )}>
                                            <svg className="bi bi-caret-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
                                            </svg>
                                        </span>  
                                  </p>
                              
                        </div>
                        <div className= 'col-xs-6  col-sm-3 '>
                                <p id='alt'   className={' img-rounded label si-07x  textunit ' + v_flight_status_class} title = {'Total Flying: ' + v_totalFlyingTime}>
                                {v_flight_status_text + " "}   <small> {v_flyingTime}</small>
                                </p>
                        </div>
                        <div className= 'col-xs-6  col-sm-3 '>
                            <p id='wpd' className={'label si-07x textunit ' + distanceToWP_class} title ='distance to next destination' >{'wp dist: '+ wpdst_text}</p>
                            
                        </div>
                        <div className= 'col-xs-6  col-sm-3 '>
                        <p id='fcb_mode'  className={' img-rounded textunit  label si-07x ' + v_flight_mode_class} title ={v_fcb_mode_title} onClick={ (e) => this.fn_connectToFCB(v_andruavUnit,true)}> {v_flight_mode_text } </p>
                        </div>
                    </div>

                    <div className = 'row al_l css_margin_zero'>
                        <div className= 'col-xs-4  margin_2px padding_zero'>
                                <p id='yaw' className=' img-rounded text-primary css_margin_zero '><small>{v_yaw_text}</small></p><div id ='imu_v_yaw_knob'>{v_yaw_knob}</div>
                        </div>
                        <div className= 'col-xs-3 margin_2px padding_zero'>
                                <p id='bearing' className=' img-rounded text-primary css_margin_zero '><small>{v_bearing_text}</small></p>
                                <div id='bearing_main' className='css_margin_zero'>
                                <div id='bearingknob' >{v_bearing_knob}</div>
                                <div id='bearingtargetknob' >{v_bearingTarget_knob}</div>
                                </div>
                        </div>
                        <div className= 'col-xs-2  margin_2px padding_zero'>
                        <CLSS_SearchableTargets m_unit = {v_andruavUnit}/>
                        </div>
                        <div className= 'col-xs-2  margin_2px padding_zero'>
                        <CLSS_AndruavSwarmLeaders   m_unit={v_andruavUnit}/>
                        </div>
                        <div className= 'col-xs-1  margin_2px padding_zero'>
                        </div>
                    </div>

                </div>);
        
        
					
        return imu;
    }


    renderControl (p_andruavUnit)
    {

        if ((p_andruavUnit.m_useFCBIMU == false) 
        ||((p_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_DroneKit_Telemetry)
            && (p_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_CONST_Mavlink_Telemetry)))
        {
            return ;
        }

        var btn = this.hlp_getflightButtonStyles(p_andruavUnit);
        var ctrl=[];
        var ctrl2=[];
        

        switch (p_andruavUnit.m_VehicleType)
        {
            case  VEHICLE_PLANE:
                ctrl.push(<div key="rc1" className= 'col-xs-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_arm' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_arm_class}  title='ARM / DISARM' onClick={ () => this.fn_ToggleArm(p_andruavUnit)}>&nbsp;ARM&nbsp;</button>
                    <button id='btn_climb' type='button' className={'btn btn-xs  ctrlbtn '  + btn.btn_climb_class } onClick={ (e) => fn_changeAltitude(p_andruavUnit)}>&nbsp;{btn.btn_climb_text}&nbsp;</button>
                    <button id='btn_takeoff' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_takeoff_class } onClick={ (e) => this.fn_doTakeOffPlane(p_andruavUnit)}>&nbsp;TakeOff&nbsp;</button>
                    <button id='btn_land' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_land_class } onClick={ (e) => this.fn_doLand(p_andruavUnit)}>&nbsp;Land&nbsp;</button>
                    <button id='btn_surface' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_surface_class } onClick={ (e) => this.fn_doSurface(p_andruavUnit)}>&nbsp;Surface&nbsp;</button>
                    <button id='btn_auto' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_auto_class } onClick={ (e) => this.fn_doAuto(p_andruavUnit)}>&nbsp;Auto&nbsp;</button>
                    <button id='btn_guided' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_guided_class } onClick={ (e) => this.fn_doGuided(p_andruavUnit)}>&nbsp;Guided </button>
                    <button id='btn_break' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_brake_class } onClick={ (e) => this.fn_doBreak(p_andruavUnit)}>&nbsp;Brake&nbsp;</button>
                    <button id='btn_hold' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_hold_class } onClick={ (e) => this.fn_doHold(p_andruavUnit)}>&nbsp;Hold&nbsp;</button>
                    <button id='btn_loiter' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_loiter_class } onClick={ (e) => this.fn_doLoiter(p_andruavUnit)}>&nbsp;Loiter&nbsp;</button>
                    </div></div>);
        
                ctrl.push(<div key="rc2" className= 'col-xs-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_posh' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_pos_hold_class } onClick={ (e) => this.fn_doPosHold(p_andruavUnit)}>&nbsp;Pos-H&nbsp;</button>
                    <button id='btn_manual' type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_manual_class } onClick={ (e) => this.fn_doManual(p_andruavUnit)}>&nbsp;Manual&nbsp;</button>
                    <button id='btn_stabilize' type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_stabilize_class } onClick={ (e) => this.fn_doStabilize(p_andruavUnit)}>&nbsp;Stabilize&nbsp;</button>
                    <button id='btn_rtl' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_rtl_class } title="RTL mode"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, false)}>&nbsp;RTL&nbsp;</button>
                    <button id='btn_rtl_s' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_rtl_class } title="Smart RTL"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, true)}>&nbsp;S-RTL&nbsp;</button>
                    <button id='btn_cruse' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_cruise_class } onClick={ (e) => this.fn_doCruise(p_andruavUnit)}>&nbsp;Cruise&nbsp;</button>
                    <button id='btn_fbwa' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWA(p_andruavUnit)}>&nbsp;FBWA&nbsp;</button>
                    <button id='btn_fbwb' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWB(p_andruavUnit)}>&nbsp;FBWB&nbsp;</button>
                    <button id='btn_yaw' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_yaw_class } onClick={ (e) => gui_doYAW(p_andruavUnit.partyID)}>&nbsp;YAW&nbsp;</button>
                    <button id='btn_speed' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_speed_class } onClick={ (e) => this.fn_changeSpeed(e,p_andruavUnit,p_andruavUnit.m_Nav_Info.p_Location.speed!=null?p_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>&nbsp;GS&nbsp;</button>
                    <button id='btn_servos' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_servo_class } onClick={ (e) => this.fn_ServoControl(e,p_andruavUnit)}>&nbsp;SRV&nbsp;</button>
                    </div></div>);
            
            
                ctrl2.push (<div key="rc3" className= 'col-xs-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_telemetry' type='button' className={'btn btn-xs  ctrlbtn_lng ' + btn.btn_tele_class}  title='Web based telemetry' onClick={ (e) => fn_telemetry_toggle(p_andruavUnit.partyID)}>{btn.btn_tele_text}</button>
                    <button id='btn_refreshwp' type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_load_wp_class}   onClick={ (e) => this.fn_requestWayPoints(p_andruavUnit,true)} title="Load Waypoints from Drone">L-WP</button>
                    <button id='btn_writewp'  type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_save_wp_class}   onClick={ (e) => fn_putWayPoints(p_andruavUnit,true)} title="Write Waypoints into Drone">W-WP</button>
                    <button id='btn_clearwp'   type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_clear_wp_class}   onClick={ (e) => this.fn_clearWayPoints(p_andruavUnit,true)} title="Clear Waypoints" >C-WP</button>
                    <button id='btn_webRX'      type='button' className={'btn btn-xs ctrlbtn_lng ' + btn.btn_rx_class}   onClick={ (e) => this.fn_webRX_toggle(p_andruavUnit)} title={btn.btn_rx_title}>{btn.btn_rx_text}</button>
                    <button id='btn_freezerx' type='button' title="Freeze RemoteControl -DANGER-" className={'hidden btn btn-xs ctrlbtn_lng ' + btn.btn_takeCTRL_class } onClick={ (e) => this.fn_takeTXCtrl(e,p_andruavUnit)}>&nbsp;TX-Frz&nbsp;</button>
                    <button id='btn_releaserx' type='button' title="Release Control" className={'btn btn-xs ctrlbtn_lng ' + btn.btn_releaseCTRL_class } onClick={ (e) => this.fn_releaseTXCtrl(p_andruavUnit)}>&nbsp;TX-Rel&nbsp;</button>
                    </div></div>);
                    break;

            default:
                ctrl.push(<div key="rc1" className= 'col-xs-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_arm' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_arm_class}  title='ARM / DISARM' onClick={ () => this.fn_ToggleArm(p_andruavUnit)}>&nbsp;ARM&nbsp;</button>
                    <button id='btn_climb' type='button' className={'btn btn-xs  ctrlbtn '  + btn.btn_climb_class } onClick={ (e) => fn_changeAltitude(p_andruavUnit)}>&nbsp;{btn.btn_climb_text}&nbsp;</button>
                    <button id='btn_takeoff' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_takeoff_class } onClick={ (e) => this.fn_doTakeOffPlane(p_andruavUnit)}>&nbsp;TakeOff&nbsp;</button>
                    <button id='btn_land' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_land_class } onClick={ (e) => this.fn_doLand(p_andruavUnit)}>&nbsp;Land&nbsp;</button>
                    <button id='btn_surface' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_surface_class } onClick={ (e) => this.fn_doSurface(p_andruavUnit)}>&nbsp;Surface&nbsp;</button>
                    <button id='btn_auto' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_auto_class } onClick={ (e) => this.fn_doAuto(p_andruavUnit)}>&nbsp;Auto&nbsp;</button>
                    <button id='btn_guided' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_guided_class } onClick={ (e) => this.fn_doGuided(p_andruavUnit)}>&nbsp;Guided </button>
                    <button id='btn_break' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_brake_class } onClick={ (e) => this.fn_doBreak(p_andruavUnit)}>&nbsp;Brake&nbsp;</button>
                    <button id='btn_hold' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_hold_class } onClick={ (e) => this.fn_doHold(p_andruavUnit)}>&nbsp;Hold&nbsp;</button>
                    </div></div>);
        
                ctrl.push(<div key="rc2" className= 'col-xs-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_posh' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_pos_hold_class } onClick={ (e) => this.fn_doPosHold(p_andruavUnit)}>&nbsp;Pos-H&nbsp;</button>
                    <button id='btn_loiter' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_loiter_class } onClick={ (e) => this.fn_doLoiter(p_andruavUnit)}>&nbsp;Loiter&nbsp;</button>
                    <button id='btn_manual' type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_manual_class } onClick={ (e) => this.fn_doManual(p_andruavUnit)}>&nbsp;Manual&nbsp;</button>
                    <button id='btn_rtl' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_rtl_class } title="RTL mode"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, false)}>&nbsp;RTL&nbsp;</button>
                    <button id='btn_rtl_s' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_rtl_class } title="Smart RTL"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, true)}>&nbsp;S-RTL&nbsp;</button>
                    <button id='btn_cruse' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_cruise_class } onClick={ (e) => this.fn_doCruise(p_andruavUnit)}>&nbsp;Cruise&nbsp;</button>
                    <button id='btn_fbwa' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWA(p_andruavUnit)}>&nbsp;FBWA&nbsp;</button>
                    <button id='btn_fbwb' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWB(p_andruavUnit)}>&nbsp;FBWB&nbsp;</button>
                    <button id='btn_yaw' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_yaw_class } onClick={ (e) => gui_doYAW(p_andruavUnit.partyID)}>&nbsp;YAW&nbsp;</button>
                    <button id='btn_speed' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_speed_class } onClick={ (e) => this.fn_changeSpeed(e,p_andruavUnit,p_andruavUnit.m_Nav_Info.p_Location.speed!=null?p_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>&nbsp;GS&nbsp;</button>
                    <button id='btn_servos' type='button' className={'btn btn-xs  ctrlbtn ' + btn.btn_servo_class } onClick={ (e) => this.fn_ServoControl(e,p_andruavUnit)}>&nbsp;SRV&nbsp;</button>
                    </div></div>);
        
        
                ctrl2.push (<div key="rc3" className= 'col-xs-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_telemetry' type='button' className={'btn btn-xs  ctrlbtn_lng ' + btn.btn_tele_class}  title='Web based telemetry' onClick={ (e) => fn_telemetry_toggle(p_andruavUnit.partyID)}>{btn.btn_tele_text}</button>
                    <button id='btn_refreshwp' type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_load_wp_class}   onClick={ (e) => this.fn_requestWayPoints(p_andruavUnit,true)} title="Load Waypoints from Drone">L-WP</button>
                    <button id='btn_writewp'  type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_save_wp_class}   onClick={ (e) => fn_putWayPoints(p_andruavUnit,true)} title="Write Waypoints into Drone">W-WP</button>
                    <button id='btn_clearwp'   type='button' className={'btn btn-xs ctrlbtn ' + btn.btn_clear_wp_class}   onClick={ (e) => this.fn_clearWayPoints(p_andruavUnit,true)} title="Clear Waypoints" >C-WP</button>
                    <button id='btn_webRX'      type='button' className={'btn btn-xs ctrlbtn_lng ' + btn.btn_rx_class}   onClick={ (e) => this.fn_webRX_toggle(p_andruavUnit)} title={btn.btn_rx_title}>{btn.btn_rx_text}</button>
                    <button id='btn_freezerx' type='button' title="Freeze RemoteControl -DANGER-" className={'hidden btn btn-xs ctrlbtn_lng ' + btn.btn_takeCTRL_class } onClick={ (e) => this.fn_takeTXCtrl(e,p_andruavUnit)}>&nbsp;TX-Frz&nbsp;</button>
                    <button id='btn_releaserx' type='button' title="Release Control" className={'btn btn-xs ctrlbtn_lng ' + btn.btn_releaseCTRL_class } onClick={ (e) => this.fn_releaseTXCtrl(p_andruavUnit)}>&nbsp;TX-Rel&nbsp;</button>
                    </div></div>);
        
                break;
        }
        

        return (
            <div>
            <div className= 'row'>
            {ctrl}
            </div>
            <div className= 'row'>
            {ctrl2}
            </div>
            <div className= 'row'>
            </div>
            </div>
        );
    }

    render ()
    {

        var v_andruavUnit = this.props.m_unit; 
   
        if (v_andruavUnit == null) return ;

        var online_comment ="no signal info";
        var online_class ;
        var online_class2 ;
        var online_text ;
        var camera_class            = " camera_inactive ";
        var camera_src              = " ./images/camera_gy_32x32.png ";
        var video_class             = " video_inactive ";
		var video_src               = " ./images/videocam_gr_32x32.png";
		var recvideo_class          = "recvideo_inactive ";
        var recvideo_src            = "./images/video_recording_disabled_32x32.png";
        var v_battery_display_fcb  	= this.hlp_getFCBBatteryCSSClass(v_andruavUnit); 
        var v_battery_display 		= this.hlp_getBatteryCSSClass(v_andruavUnit);
        var id = v_andruavUnit.partyID + "__FAKE";

        if ( v_andruavUnit.m_IsShutdown === true)
        {
                online_class2 =" text-muted ";
                online_class = " text-muted ";
                online_text  = "offline";
        }
        else
        {
            online_class2 =" text-primary ";
            online_class = " label label-success ";
            online_text  = "online";

            if (v_andruavUnit.fn_canCamera()==true)
            {
                camera_class = "camera_active";
                camera_src   = "./images/camera_bg_32x32.png";
            }
            else
            {
                camera_class = "camera_inactive";
                camera_src   = "./images/camera_gy_32x32.png";
            }
            if (v_andruavUnit.m_Video.fn_getVideoStreaming() == CONST_VIDEOSTREAMING_ON)
            {
                video_class = "video_active";
                video_src   = "./images/videocam_active_32x32.png";
            }
            else
            {
                if (v_andruavUnit.fn_canVideo()==true)
                {
                    video_class = "video_ready";
                    video_src   = "./images/videocam_gb_32x32.png";
                }
                else
                {
                    video_class = "video_inactive";
                    video_src   = "./images/videocam_gr_32x32.png";
                }
            }
                        
            if (v_andruavUnit.m_Video.VideoRecording == CONST_VIDEORECORDING_ON)  // ONDRONE RECORDING
            {
                recvideo_class = "css_recvideo_active";
                recvideo_src   = "./images/video_recording_active_32x32.png";
            }
            else
            {
                recvideo_class = "css_recvideo_ready";
                recvideo_src   = "./images/video_recording_enabled_32x32.png";
            }

            if ( v_andruavUnit.m_IsShutdown != true) 
            {
                if ((v_andruavUnit.m_SignalStatus.mobile == true))
                {
                    //mobileNetworkType
                    //NETWORK_TYPE_LTE
                    let level = v_andruavUnit.m_SignalStatus.mobileSignalLevel;
                    if (v_andruavUnit.m_SignalStatus.mobileNetworkTypeRank < TELEPHONE_400G)
                    {
                        if (level < -100)
                        {
                            online_class = " badge badge-default ";
                        }else if ((level < -95) || (v_andruavUnit.m_SignalStatus.mobileNetworkTypeRank <= TELEPHONE_200G)) 
                        {
                            online_class = " badge badge-danger ";
                        }else if ((level < -80)  || (v_andruavUnit.m_SignalStatus.mobileNetworkTypeRank <= TELEPHONE_250G))
                        {  // or condition
                            online_class = " badge badge-warning ";
                        }else if ((level < -70) || (v_andruavUnit.m_SignalStatus.mobileNetworkTypeRank <= TELEPHONE_300G)) 
                        {
                            online_class = " badge badge-info ";
                        }else if (level < -60)
                        {
                            online_class = " badge badge-primary ";
                        }else 
                        {
                            online_class = " badge badge-success ";
                        }
                    }
                    else 
                    {
                        if (level < -140)
                        {
                            online_class = " badge badge-default ";
                        }else if (level < -124) 
                        {
                            online_class = " badge badge-danger ";
                        }else if (level < -108)
                        {
                            online_class = " badge badge-warning ";
                        }else if (level < -92) 
                        {
                            online_class = " badge badge-info ";
                        }else if (level < -80)
                        {
                            online_class = " badge badge-primary ";
                        }else 
                        {
                            online_class = " badge badge-success ";
                        }
                    }
                 
                    online_comment = _NETWORK_G_TYPE[v_andruavUnit.m_SignalStatus.mobileNetworkTypeRank] + " [" + _NETWORK_TYPE [v_andruavUnit.m_SignalStatus.mobileNetworkType] + "] "  + level + " dbm";
                    
                }
                else
                {
                    online_comment = "no signal info";
                }
            }
        }
        fn_console_log ("online_comment:" + online_comment);
        var rows=[];
        if ((v_andruavUnit.m_IsShutdown == false) && (v_andruavUnit.m_Power._FCB.p_hasPowerInfo == true))
        {
            // add FCB battery
            rows.push (<div  key={id +"fc1"}className= "col-xs-1 col-sm-1 padding_zero"><img className= {v_battery_display_fcb.css}   src={v_battery_display_fcb.m_battery_src}  title={"fcb batt: " +  parseFloat(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryRemaining).toFixed(1) + "%  " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryVoltage/1000).toFixed(1).toString() + "v " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryCurrent/1000).toFixed(1).toString() + "A " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_TotalCurrentConsumed).toFixed(1).toString() + " mAh " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryTemprature/1000).toFixed(1).toString() + "C"} /></div>);
            rows.push (<div  key={id +"fc2"} className= "col-xs-1 col-sm-1 padding_zero"  onClick={ (e) => this.fn_gotoUnit(e,v_andruavUnit.partyID)} ></div>);
            rows.push (<div  key={id +"fc3"} className= "col-xs-4 col-sm-4 padding_zero"  onClick={ (e) => this.fn_gotoUnit(e,v_andruavUnit.partyID)} ><p id='id' className={'cursor_hand text-right ' + online_class2 }><strong>{v_andruavUnit.m_unitName + " "} </strong><span className={' si-07x ' + online_class}>{online_text}</span></p></div>);
        }
        else
        {
            rows.push (<div key={id +"fc4"} className= "col-xs-2 padding_zero"  onClick={ (e) => this.fn_gotoUnit(e,v_andruavUnit.partyID)} ></div>);
            rows.push (<div key={id +"fc5"} className= "col-xs-4 padding_zero"  onClick={ (e) => this.fn_gotoUnit(e,v_andruavUnit.partyID)} ><p id='id' className={'cursor_hand text-right ' + online_class2 }><strong>{v_andruavUnit.m_unitName + " "} </strong><span className={' si-07x ' + online_class}>{online_text}</span></p></div>);
        }

     
      

     return (
            
             <div  key={id +"1"} id={id} className={"row css_margin_zero IsGCS_" + v_andruavUnit.m_IsGCS + " IsShutdown_" + v_andruavUnit.m_IsShutdown}>
             <div  key={id +"_1"} id={v_andruavUnit.partyID + "_1"} className='row margin_2px padding_zero'>        	
                <div key={id +"__1"} className= 'col-xs-3  col-sm-1 padding_zero'><img className=' cursor_hand gcs IsGCS_false' src={getVehicleIcon(v_andruavUnit)}  alt='Vehicle' onClick={ (e) => this.fn_gotoUnit(e,v_andruavUnit.partyID)}/></div>
                <div key={id +"__2"} className= 'col-xs-3  col-sm-1 padding_zero'><img className={'cursor_hand ' + camera_class  } src={camera_src} title='take image from mobile' onClick={ (e) => this.fn_toggleCamera(v_andruavUnit.partyID)}/></div>
                <div key={id +"__3"} className= 'col-xs-3  col-sm-1 padding_zero'><img className={'cursor_hand ' + video_class   } src={video_src} title='stream video from mobile' onClick={ (e) => this.fn_toggleVideo(v_andruavUnit.partyID)}/></div>
                <div key={id +"__4"} className= 'col-xs-3  col-sm-1 padding_zero'><img className={'cursor_hand ' + recvideo_class} src={recvideo_src} title='record video on drone mobile' onClick={ (e) => toggleRecrodingVideo(v_andruavUnit.partyID)}/></div>
                <div key={id +"__5"} className= 'col-xs-3  col-sm-1 padding_zero'><img className={v_battery_display.css}  src={v_battery_display.m_battery_src} title={'Andruav batt: ' + v_battery_display.level +'% ' + v_battery_display.charging }/></div>
                
                 {rows}
            </div>
             
                 {this.renderIMU(v_andruavUnit)}
                 {this.renderControl(v_andruavUnit)}
                 <hr/>
            </div>		
            
        
             
       );
    }
}

class CLSS_AndruavUnitList extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
			andruavUnitPartyIDs : [],
		};

    
	}

    fn_unitAdded (me,p_andruavUnit)
    {
         fn_console_log ("REACT:fn_unitAdded" );
         // http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs      
         me.setState({ 
            andruavUnitPartyIDs: me.state.andruavUnitPartyIDs.concat([p_andruavUnit.partyID])
        });
    }

    fn_onSocketStatus (me,params) {
       
        if (params.status == CONST_SOCKET_STATUS_REGISTERED)
        {				
                $('#andruavUnits').show();
                // v_SpeakEngine.fn_speak ('Connected');
                        
                
        }
        else
        {				
            
               
                me.state.andruavUnitPartyIDs = [];
                me.fn_forceRefresh(me);
        }
    }

    fn_onPreferenceChanged(me)
    {
        me.fn_forceRefresh(me);
    }

    fn_forceRefresh (me)
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
            AndruavLibs.AndruavMap.fn_HideMarker(p_andruavUnit.p_marker);
        }

        return ;

        
    }

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onPreferenceChanged, this, this.fn_onPreferenceChanged);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitAdded,this,this.fn_unitAdded);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onPreferenceChanged,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onSocketStatus,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_unitAdded,this);
    }

    
    render() {
        var unit = [];
        
        if (this.state.andruavUnitPartyIDs.length == 0) 
        {

            unit.push (<div key={unit.length} >NO ONLINE UNITS</div>);
        }
        else 
        {
            var me = this;
            this.state.andruavUnitPartyIDs.map(function (partyID)
            {
                //fn_console_log ('partyID' + partyID);
                var v_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(partyID);
                
                if (v_andruavUnit==null) return ;

                if (v_andruavUnit.m_IsGCS===true)
                {
                    unit.push (<CLSS_AndruavUnit_GCS key={partyID} v_en_GCS= {v_en_GCS} m_unit = {v_andruavUnit}/>
                        );
                }
                else 
                if (v_andruavUnit.m_IsGCS===false)
                {
                    unit.push (<CLSS_AndruavUnit_Drone key={partyID}  m_unit = {v_andruavUnit}/>
                        );
                }
                //unit.push(<hr key={unit.length} />);

                me.fn_updateMapStatus(v_andruavUnit);

            });
        }
       

    return (

                <div key='main'>{unit}</div>
            );
    }
};

ReactDOM.render(
			<CLSS_AndruavUnitList key={new Date()} />,
			v_G_getElementById('andruavUnitList')
        );
        