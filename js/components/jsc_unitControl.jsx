import {CLSS_AndruavMessageLog} from './jsc_messagesControl.jsx' // add extension to allow encryptor to see it as same as file name.
import {CLSS_CTRL_HUD} from './jsc_ctrl_hudControl.jsx'
import {CLSS_CTRL_DIRECTIONS} from './jsc_ctrl_directionsControl.jsx'


class CLSS_AndruavSwarmLeaders extends React.Component {


    fn_toggleMakeSwarm (p_formationID)
    {
        //CODEBLOCK_START
        if (this.props.m_unit.m_Swarm.m_isLeader == true)
        {   // make not a leader
            v_andruavClient.API_makeSwarm (this.props.m_unit.partyID, CONST_TASHKEEL_SERB_NO_SWARM);
        }
        else
        {   // make leader and set formation.
            v_andruavClient.API_makeSwarm (this.props.m_unit.partyID, p_formationID);
        }
        //CODEBLOCK_END
    }

    fn_updateSwarm(p_andruavUnit,leaderAndruavUnit)
    {
        //CODEBLOCK_START
        v_andruavClient.API_updateSwarm (TASHKEEL_SERB_UPDATED, -1, p_partyID, p_leaderPartyID);
        //CODEBLOCK_END
    }

    fn_requestToFollow (p_unit)
    {
        //CODEBLOCK_START
        fn_console_log (p_unit);
        var v_partyID = null;
        if (p_unit != null)
        {
            v_partyID = p_unit.partyID;
        }
        v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, v_partyID);
        //CODEBLOCK_END
    }


    onChange(e)
    {
       //CODEBLOCK_START
       if (e.target.value)
       {
          if (e.target.value == "NA")
          {
              // do not follow
            v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, null);
          } 
          else
          {
            v_andruavClient.API_requestFromDroneToFollowAnother(this.props.m_unit.partyID, -1, e.target.value);
          }
       }
       //CODEBLOCK_END
    }
    
    componentDidUpdate() 
    {
        //CODEBLOCK_START
        if (this.props.m_unit.m_Swarm.m_following != null)
        {
            var leaderUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.m_unit.m_Swarm.m_following);
            if (leaderUnit != null)
            {
                $("#" + this.props.m_unit.partyID + "dldrselsel").val(leaderUnit.partyID);
            }
            else
            {
                $("#" + this.props.m_unit.partyID + "dldrselsel").val("NA");
            }
        }
        else
        {
            $("#" + this.props.m_unit.partyID + "dldrselsel").val("NA");
        }
        //CODEBLOCK_END
    }

    
    render ()
    {
        if (window.AndruavLibs.LocalStorage.fn_getAdvancedOptionsEnabled()!=='true')
        {
            return (
                <div></div>
            )
        }
        else
        {

            
                
        //CODEBLOCK_START
        var options = [];
        var v_units = v_andruavClient.m_andruavUnitList.fn_getUnitValues();
        var len = v_units.length;
        const c_items = [];
        
        var v_leader_class = "btn-secondry";
        var v_leader_title_leader   = "not leader";
        var v_leader_title_follower = "following none";
        var v_leader_dropdown_class = "bg-secondry";

        if (this.props.m_unit.m_Swarm.m_following != null)
        {
            v_leader_class = "btn-success"; // this state can be overwritten if it is a leader. 
            v_leader_dropdown_class = "bg-success text-white";
            var v_leaderUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.m_unit.m_Swarm.m_following);
            v_leader_title_follower = " following: "  + v_leaderUnit.m_unitName;
        }

        if (this.props.m_unit.m_Swarm.m_isLeader === true)
        {
            v_leader_class = "btn-danger";
            v_leader_dropdown_class = "bg-danger text-white";
            v_leader_title_leader = "LEADER";
        }
        

        for (var i=0; i<len; ++i)
        {   
            var v_unit = v_units[i];

            /*
                It is not Me.
                It is a leader i.e. can be followed.
                It is not following me. -as leaders can be followers but should not be following me-.
                Notice: deeper circulaar error can be made and not handled here.
            */
            if ((this.props.m_unit.partyID != v_unit.partyID) 
            && (v_unit.m_Swarm.m_isLeader === true)  
            && (this.props.m_unit.m_Swarm.m_following != v_unit.partyID ))
            {
                var v_out = v_unit; // need a local copy 
                // list drones that are not me and are leaders.
                c_items.push(
                     <a key={v_unit.m_unitName+"s"} className="dropdown-item" href="#" onClick={() => this.fn_requestToFollow(v_out)}>{v_unit.m_unitName}</a>
                );     
            }
        }

        return (
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button id={this.props.m_unit.partyID + "_ldr"} 
                        type="button" 
                        className={"btn btn-sm " + v_leader_class} 
                        title={v_leader_title_leader + " / " + v_leader_title_follower}
                        onClick={() => this.fn_toggleMakeSwarm(CONST_TASHKEEL_SERB_VECTOR_180)}>Leader</button>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop2" type="button" className="btn btn-success btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                        {c_items}
                        <a className="dropdown-item " href="#" onClick={() => this.fn_requestToFollow()}>unfollow</a>
                    </div>
                </div>
            </div>
        );
        //CODEBLOCK_END


        }
    }
}




class CLSS_SearchableTargets extends React.Component {
    constructor()
	{
		super ();
		this.state = {
		    
		};
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_SearchableTarget,this,this.fn_unitSearchableTargets);
    }

    //CODEBLOCK_START

    fn_unitSearchableTargets (me, p_andruavUnit)
    {
        if (p_andruavUnit.partyID != me.props.m_unit.partyID) 
        {
          //  fn_console_log ('err: This is not me ' + p_andruavUnit.partyID);
            return ; // not me
        }
        me.forceUpdate();
    }
    
    fn_refresh(e, p_partyID)
    {
        v_andruavClient.API_requestSearchableTargets(p_partyID);
    }

    fn_toggleSeach()
    {
        //v_andruavClient.API_requestNotificationWhenFound(this.props.m_unit);
    }

    fn_selectUnit(p_key)
    {
        const c_item = this.props.m_unit.m_DetectedTargets.m_searchable_targets[p_key];
        fn_console_log(c_item);
        $('#' + this.props.m_unit.partyID + "_sch").html(c_item.m_name);
        fn_console_log ('#' + this.props.m_unit.partyID + "_sch");
    }

    
    fnl_TrackingOnOff (e, p_unit)
    {
        const c_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(p_unit);
        if (c_andruavUnit == null)
        {
            return ;
        }

        v_andruavClient.API_StopTracking (c_andruavUnit);
    }
    

    componentWillUnmount () 
    {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_SearchableTarget,this);
    }

    //CODEBLOCK_END
    
    render ()
    {
        //CODEBLOCK_START
        if (CONST_EXPERIMENTAL_FEATURES_ENABLED===false)
        {
            // used to test behavior after removing code and as double check
            return (<div />);
        }
        const c_name = Object.keys(this.props.m_unit.m_DetectedTargets.m_searchable_targets);
        
        if (c_name.length==0)
        {
            return (
                <div className="btn-group">
                <button id={this.props.m_unit.partyID + "_sch"} type="button" className="btn btn-sm btn-danger" onClick={() => this.fn_toggleSeach()}>Action</button>
                <button type="button" className="btn btn-sm btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(e) => this.fn_refresh(e,this.props.m_unit.partyID)}>refresh</a></li>
                    
                        <li><a className="dropdown-item" href="#" onClick={(e) => this.fnl_TrackingOnOff(e,this.props.m_unit.partyID)}>stop</a></li>
                    </ul>
                </div>
            );
        }

        const c_len = c_name.length;
        const c_items = [];
        for (var i=0;i<c_len;++i)
        {
            const c_item = this.props.m_unit.m_DetectedTargets.m_searchable_targets[c_name[i]];
            const c_searchTargetName = c_item.m_name;
            const c_searchTargetType = c_item.m_type;
            var id = c_name[i];
            var me = this;
            c_items.push(
                <li key={"t" + i} ><a className="dropdown-item" href="#" onClick={this.fn_selectUnit.bind(this,c_name[i])}>{c_searchTargetName}</a></li>
            );
        }

        return (
            <div className="btn-group">
            <button id={this.props.m_unit.partyID + "_sch"} type="button" className="btn btn-sm btn-danger" onClick={(e) => this.fn_toggleSeach()}>Action</button>
            <button type="button" className="btn btn-sm btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
            </button>
                <ul className="dropdown-menu">
                    {c_items}
                    <li role="separator " className="divider"></li>
                    <li><a className="dropdown-item " href="#" onClick={(e) => this.fn_refresh(e,this.props.m_unit.partyID)}>refresh</a></li>
                </ul>
            </div>
        );

        //CODEBLOCK_END

        return (<div />);
    }
}


class CLSS_AndruavUnit extends React.Component {
    constructor()
	{
		super ();
		this.state = {
		    
		};

        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitUpdated,this,this.fn_unitUpdated);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitNavUpdated,this,this.fn_unitUpdated);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitTelemetryOn,this,this.fn_unitTelemetryOn);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitTelemetryOff,this,this.fn_unitTelemetryOFF);
        
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

   
    childcomponentWillMount() {};
    childcomponentWillUnmount() {};

    
    componentDidMount() {
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


    fn_sendParametersToGCS(p_andruavUnit)
    {
        if (v_andruavClient == null) return;
        
        // if (p_andruavUnit.m_Telemetry._isActive == true) {
        //     v_andruavClient.sendParametersValuesToGCS(p_andruavUnit);
        // }

        window.AndruavLibs.EventEmitter.fn_dispatch(EE_displayParameters, p_andruavUnit);
    }

    fn_telemetry_toggle(p_andruavUnit) {
        if (v_andruavClient == null) return;
        
        if (p_andruavUnit.m_Telemetry._isActive == true) {
            this.fn_telemetryOff(p_andruavUnit);
        }
        else {
            this.fn_telemetryOn(p_andruavUnit, v_smart_Telemetry_Level);
        }

    };

    

    fn_resumeTelemetry() {
        if (v_andruavClient == null) return;
        v_andruavClient.API_resumeTelemetry(v_smart_Telemetry_Level);
    };

    fn_telemetryOn(p_andruavUnit) {

        if (v_andruavClient == null) return;
        window.AndruavLibs.LocalTelemetry.fn_init(function () {
            // NOT TESTED YET
            $('#btn_send').removeAttr('readonly');
            $('#btn_send').addClass ('btn-primary').removeClass('btn-secondary');
            fn_console_log("Connection is Open");

            v_andruavClient.API_startTelemetry(p_andruavUnit);
        });



    };

    fn_telemetryOff(p_andruavUnit) {

        if (v_andruavClient == null) return;
        
        v_andruavClient.API_stopTelemetry(p_andruavUnit);

    };

    fn_gotoUnit_byPartyID (e,p_partyID)
    {
        v_andruavClient.API_requestID(p_partyID);
        fn_gotoUnit_byPartyID(p_partyID);
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
         <div id={v_andruavUnit.partyID + "__FAKE"}  className={v_hidden + " row mb-1 mt-0 me-0 ms-0 pt-1 IsGCS_" + v_andruavUnit.m_IsGCS + " IsShutdown_" + v_andruavUnit.m_IsShutdown}>
            <div className='col-11 css_margin_zero padding_zero'>
                <div className='col-1' ><img className='gcs IsGCS_true cursor_hand' src={getVehicleIcon(v_andruavUnit)} alt='GCS' onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)} /> </div>
                <div className='col-11'><p id='id' className='text-right text-warning cursor_hand'> GCS [<strong>{v_andruavUnit.m_unitName}</strong>]</p></div>
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
            "Are you sure you want to delete mission?", function (p_approved) {
                if (p_approved === false) return;
				v_andruavClient.API_clearWayPoints(p_andruavUnit, p_fromFCB);

            }, "YES", "bg-danger text-white");
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
        if (p_andruavUnit != null) {
            fn_do_modal_confirmation("DANGEROUS: FORCE ADMING  " + p_andruavUnit.m_unitName + "   " + p_andruavUnit.m_VehicleType_TXT,
                "OVERRIDE ARM .. Are You SURE?", function (p_approved) {
                    if (p_approved === false) 
                    {
                        v_andruavClient.API_do_Arm(p_andruavUnit.partyID, true, false);
                        return;
                    }
                    else
                    {
					    v_SpeakEngine.fn_speak('DANGEROUS EMERGENCY DISARM');
                        v_andruavClient.API_do_Arm(p_andruavUnit.partyID, true, true);
                        return ;
                    }
                }, "FORCED-ARM", "bg-danger text-white", "ARM");
        }
    }

    fn_doDisarm(p_andruavUnit) {
        if (p_andruavUnit != null) {
            fn_do_modal_confirmation("DANGEROUS: EMERGENCY DISARM  " + p_andruavUnit.m_unitName + "   " + p_andruavUnit.m_VehicleType_TXT,
                "STOP all MOTORS and if vehicle in air will CRASH. Are You SURE?", function (p_approved) {
                    if (p_approved === false) return;
					v_SpeakEngine.fn_speak('DANGEROUS EMERGENCY DISARM');
                    v_andruavClient.API_do_Arm(p_andruavUnit.partyID, false, true);
                }, "KILL-MOTORS", "bg-danger text-white");


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


    fn_doQStabilize(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QSTABILIZE);
    }
    fn_doQLoiter(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QLOITER);
    }
    fn_doQHover(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QHOVER);
    }
    fn_doQLand(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QLAND);
    }
    fn_doQRTL(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_QRTL);
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

    fn_doBrake(p_andruavUnit) {
        v_andruavClient.API_do_FlightMode(p_andruavUnit.partyID, CONST_FLIGHT_CONTROL_BRAKE);
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

        res.m_gps_class = "bg-danger text-white text-center";
        if (p_andruavUnit.m_GPS_Info.m_isValid == true)
        {
            switch (p_andruavUnit.m_GPS_Info.GPS3DFix)
            {
                case 1:
                    res.m_gps_text = "No Fix";
                    res.m_gps_class = "bg-danger text-white text-center";
                break;

                case 2:
                    res.m_gps_class = "bg-warning";
                break;

                case 3:
                    res.m_gps_class = "bg-info text-white text-center";
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
        res.btn_stabilize_class         = " disabled hidden";
        res.btn_alt_hold_class          = "";
        res.btn_pos_hold_class          = "";
        res.btn_loiter_class            = "";
        res.btn_rtl_class               = "";
        res.btn_srtl_class              = "";
        res.btn_takeCTRL_class          = "";
        res.btn_releaseCTRL_class       = "";
        res.btn_sendParameters_class    = "";
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
                    res.btn_climb_class 	    = " btn-outline-light disabled hidden ";
                    res.btn_land_class 		    = " btn-outline-light disabled hidden ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_takeoff_class       = " btn-outline-light disabled hidden ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_manual_class	    = " btn-primary  ";
                    res.btn_alt_hold_class      = " disabled hidden  ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class	    = " btn-danger  disabled hidden "; // used in boat only
                    res.btn_rtl_class 		    = " btn-primary  rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary disabled hidden ";
                    res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
                    res.btn_yaw_class 	 	    = " btn-outline-light disabled hidden ";
                    res.btn_brake_class 	    = " btn-primary disabled hidden ";
                    res.btn_hold_class          = " btn-primary  ";
                    res.btn_speed_class	 	    = " btn-success  ";
                break;
                    
                case VEHICLE_TRI:
                case VEHICLE_QUAD:
                    res.btn_takeoff_class       = " btn-outline-light disabled hidden ";
                    res.btn_arm_class 		    = " btn-danger";
                    res.btn_climb_class 	    = " btn-warning  ";
                    res.btn_land_class 		    = " btn-warning  ";
                    res.btn_surface_class       = " disabled hidden ";
                    res.btn_auto_class 		    = " btn-primary  ";
                    res.btn_guided_class 	    = " btn-primary  ";
                    res.btn_brake_class 	    = " btn-primary  ";
                    res.btn_hold_class 	        = " btn-primary disabled hidden ";
                    res.btn_manual_class	    = " btn-outline-light disabled hidden ";
                    res.btn_manual_onclick      = " ";
                    res.btn_alt_hold_class      = " btn-danger  ";
                    res.btn_pos_hold_class      = " btn-danger  ";
                    res.btn_loiter_class 	    = " btn-danger  ";
                    res.btn_rtl_class 		    = " btn-primary rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary  ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary disabled hidden ";
                    res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
                    res.btn_yaw_class 	 	    = " btn-success  ";
                    res.btn_speed_class 	    = " btn-success  ";
                break;

                case VEHICLE_SUBMARINE:
                    res.btn_takeoff_class      = " btn-outline-light disabled hidden ";
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
                    res.btn_brake_class 	    = " btn-primary  disabled hidden ";
                    res.btn_hold_class 	        = " btn-primary  disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden ";
                    res.btn_loiter_class 	    = " btn-danger  ";
                    res.btn_rtl_class 		    = " btn-primary rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary ";
                    res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
                    res.btn_releaseCTRL_class   = c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
                    res.btn_cruise_class  	    = " btn-primary  ";
                    res.btn_fbwa_class 	 	    = " btn-primary  ";
                    res.btn_yaw_class 	 	    = " btn-primary  disabled hidden   ";
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
                    res.btn_brake_class 	    = " btn-primary  disabled hidden ";
                    res.btn_hold_class 	        = " btn-primary  disabled hidden ";
                    res.btn_alt_hold_class      = " disabled hidden ";
                    res.btn_pos_hold_class      = " disabled hidden  ";
                    res.btn_loiter_class 	    = " btn-primary  ";
                    res.btn_rtl_class 		    = " btn-primary rounded-1 ";
                    res.btn_srtl_class 		    = " btn-primary  ";
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

			res.btn_arm_class 			= " btn-outline-light ";
			res.btn_climb_class 		= " btn-outline-light disabled hidden ";
			res.btn_land_class 			= " btn-outline-light disabled hidden ";
            res.btn_auto_class 			= " btn-outline-light disabled hidden ";
			res.btn_guided_class 		= " btn-outline-light  ";
            res.btn_manual_class	    = " btn-outline-light  disabled hidden ";
            res.btn_stabilize_class     = " btn-outline-light  disabled hidden ";
            res.btn_pos_hold_class      = " disabled disabled hidden  ";
            res.btn_loiter_class 		= " disabled hidden ";
			res.btn_rtl_class 			= " btn-outline-light rounded-1 ";
			res.btn_srtl_class 		    = " btn-outline-light  ";
            res.btn_takeCTRL_class      = ((c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_CENTER_CHANNELS) || (c_manualTXBlockedSubAction == CONST_RC_SUB_ACTION_FREEZE_CHANNELS))?" btn-danger   ":" btn-primary   ";
            res.btn_releaseCTRL_class 	= c_manualTXBlockedSubAction != CONST_RC_SUB_ACTION_RELEASED?" btn-danger   ":" btn-primary   ";
            res.btn_cruise_class  	    = " btn-primary disabled hidden ";
            res.btn_fbwa_class 	 	    = " btn-primary disabled hidden ";
		    res.btn_yaw_class 	 		= " btn-outline-light disabled hidden ";
		    res.btn_speed_class 	    = " btn-outline-light disabled hidden ";
            
            switch (p_andruavUnit.m_VehicleType)
            {
                case VEHICLE_SUBMARINE:
                        res.btn_takeoff_class      = " btn-outline-light disabled hidden ";
                        res.btn_hold_class 		    = " btn-outline-light  ";
                        break;
                case VEHICLE_ROVER:
                        res.btn_takeoff_class      = " btn-outline-light disabled hidden ";
                        res.btn_brake_class         = " btn-outline-light disabled hidden ";
                        res.btn_hold_class 		    = " btn-outline-light  ";
                        break;

                case VEHICLE_TRI:
                case VEHICLE_QUAD:
                        res.btn_takeoff_class      = " btn-outline-light disabled hidden ";
                        res.btn_brake_class         = " btn-outline-light  ";
                        res.btn_hold_class 		    = " btn-outline-light disabled hidden ";
                        break;

                case  VEHICLE_PLANE:
                        res.btn_takeoff_class       = " btn-outline-light ";
                        res.btn_manual_class	    = " btn-outline-light ";
                        res.btn_stabilize_class	    = " btn-outline-light ";
                        res.btn_brake_class 	    = " btn-primary  disabled hidden ";
                        res.btn_hold_class 	        = " btn-primary  disabled hidden ";
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


        res.btn_sendParameters_class = " btn-primary  ";
        
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
        
        var wpdst_text;
        var v_leader_class,v_leader_text;
        var v_flyingTime = " ";
        var v_totalFlyingTime = " ";
        var v_now = (new Date()).valueOf() ;
        if (v_andruavUnit.m_isFlying == true) 
        {
            if ((v_andruavUnit.m_FlyingLastStartTime != undefined) || (v_andruavUnit.m_FlyingLastStartTime === 0))
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
            v_flight_status_class = 'bg-danger text-white cursor_hand ';
        }
        else
        {
            v_flight_status_text = 'On Ground';
            v_flight_status_class = 'bg-success text-white';
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
                v_flight_mode_class = ' bg-warning ';
                
                v_fcb_mode_title = 'Click to connect to FCB if not active';
            break;
            case CONST_TelemetryProtocol_CONST_Andruav_Telemetry:
            case CONST_TelemetryProtocol_CONST_Mavlink_Telemetry:
            case CONST_TelemetryProtocol_CONST_MW_Telemetry:
            case CONST_TelemetryProtocol_DroneKit_Telemetry:
            case CONST_TelemetryProtocol_DJI_Telemetry:
            case CONST_TelemetryProtocol_CONST_Unknown_Telemetry:
                v_flight_mode_text = "mode - " + hlp_getFlightMode(v_andruavUnit);
                v_flight_mode_class = ' bg-info text-white ';
                v_fcb_mode_title = 'Flight Mode';
            break;
        }

        v_flight_mode_class += ' cursor_hand ';

        if (v_andruavUnit.m_Nav_Info.p_Location.lat == null) 
        {
            v_distanceToMe_class = ' bg-danger text-white cursor_hand ';
            v_distanceToMe_text = 'No Unit GPS';
        }
        else if (myposition == null)
        {
            v_distanceToMe_text = 'No GCS GPS';
            v_distanceToMe_class = ' bg-danger text-white cursor_hand ';
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
                v_distanceToMe_class = ' bg-danger text-white  cursor_hand ';
            }
            else if (distance > CONST_DFM_SAFE)
            {
                v_distanceToMe_class = 'bg-warning';
            }
            else
            {
                v_distanceToMe_class = 'bg-info text-white';
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
                
                if (v_andruavUnit.m_Nav_Info.p_Location.abs_alt!= null) 
                {
                    v_altitude_text += '/' + v_andruavUnit.m_Nav_Info.p_Location.abs_alt.toFixed(0).toString();
                }
                
                v_altitude_text += " m";

            }
            else
            {
                v_altitude_text = (v_altitude_text * CONST_METER_TO_FEET).toFixed(0);
                
                if (v_andruavUnit.m_Nav_Info.p_Location.abs_alt!= null) 
                {
                    v_altitude_text += '/' + (v_andruavUnit.m_Nav_Info.p_Location.abs_alt * CONST_METER_TO_FEET).toFixed(0).toString();
                }
                
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
            //v_andruavUnit.m_Nav_Info._Target.target_bearing = 90.0;
            //v_andruavUnit.m_Nav_Info.p_Desired.nav_bearing = 10.0;
            const c_target = v_andruavUnit.m_Nav_Info._Target.target_bearing ; // ) % CONST_PTx2)).toFixed(1);
            const c_bearing = v_andruavUnit.m_Nav_Info.p_Desired.nav_bearing ;
            v_bearing_knob.push(<CLSS_CTRL_DIRECTIONS key={v_andruavUnit.partyID + "_tb"} id={v_andruavUnit.partyID + "_tb"} v_target={c_target} v_bearing={c_bearing} />);

        }

		if ((v_andruavUnit.m_Nav_Info._Target.wp_dist == null) 
        || (v_andruavUnit.m_Nav_Info._Target.wp_dist < 0 ))
        {
            wpdst_text = "na";
            distanceToWP_class = ' text-light ';
            
        }
        else
        {
            
            
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
                distanceToWP_class = ' bg-danger text-white cursor_hand ';
            }
            else if (v_andruavUnit.m_Nav_Info._Target.wp_dist > CONST_DFM_SAFE)
            {
                distanceToWP_class = ' bg-warning cursor_hand ';
            }
            else
            {
                distanceToWP_class = ' bg-info text-white cursor_hand ';
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
				v_fence_class = 'bg-danger text-white';
			}
			else if ((v_andruavUnit.m_fencestatus & 0b110) == 0b100) // good & no violation
			{ // unknown
			    v_fence_text = 'fence - good';
				v_fence_class = 'bg-success text-white';
			}
			else if ((v_andruavUnit.m_fencestatus  & 0b111) == 0b001) // out of greed areas .... display as bad
			{ // unknown
			    v_fence_text = 'fence - bad';
				v_fence_class = 'bg-danger text-white';
			}
			else
			{ // good
			    v_fence_text = 'fence - no violation';
				v_fence_class = 'bg-warning';
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
                        <div className= 'col-3 user-select-none '>
                                <p className=' rounded-3 text-warning cursor_hand textunit' title ='Ground Speed'>
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
                        <div className= 'col-3 user-select-none user-select-none '>
                                <p id='gps' className={' rounded-3 textunit text-center cursor_hand  ' + gps.m_gps_class} title ={gps.m_gps_status} onClick={ (e) => fn_switchGPS(v_andruavUnit.partyID)} >{gps.m_gps_source + gps.m_gps_text + ' ' + gps.m_gps_text2}</p>
                        </div>
                        <div className= 'col-3 user-select-none '>
                                  <p id='dfm' className={' rounded-3 text-center textunit ' + v_distanceToMe_class} title ='Unit distance from Me' >{"dfm: " + v_distanceToMe_text}</p>
                         </div>
                        <div className= 'col-3 user-select-none '>
                        <p id='fence' className={'rounded-3 textunit text-center cursor_hand ' + v_fence_class} title ='Fence Violation Status' onClick={ (e) => fn_openFenceManager(v_andruavUnit.partyID)} >{v_fence_text}</p>
                        </div>
                    </div>

                    <div className = 'row al_l css_margin_zero'>
                        <div className= 'col-3 user-select-none user-select-none '>
                                  <p id='alt'   className=' rounded-3 cursor_hand textunit text-warning' >
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
                        <div className= 'col-3 css_margin_zero user-select-none '>
                                <p id='alt'   className={' rounded-3  textunit text-center ' + v_flight_status_class} title = {'Total Flying: ' + v_totalFlyingTime}>
                                {v_flight_status_text + " "}   <small> {v_flyingTime}</small>
                                </p>
                        </div>
                        <div className= 'col-3 css_margin_zero user-select-none '>
                            <p id='wpd' className={' rounded-3 textunit text-center ' + distanceToWP_class} title ='distance to next destination' >{'wp dist: '+ wpdst_text}</p>
                            
                        </div>
                        <div className= 'col-3 css_margin_zero user-select-none '>
                        <p id='fcb_mode'  className={' rounded-3 textunit   text-center ' + v_flight_mode_class} title ={v_fcb_mode_title} onClick={ (e) => this.fn_connectToFCB(v_andruavUnit,true)}> {v_flight_mode_text } </p>
                        </div>
                    </div>

                    <div className = 'row al_l bg-gradient css_margin_zero user-select-none '>
                        <div className= 'col-4  margin_2px padding_zero'>
                                <p id='yaw' className=' rounded-3 text-white css_margin_zero '><small>{v_yaw_text}</small></p><div id ='imu_v_yaw_knob'>{v_yaw_knob}</div>
                        </div>
                        <div className= 'col-3 margin_2px padding_zero'>
                                <p id='bearing' className=' rounded-3 text-white css_margin_zero '><small>{v_bearing_text}</small></p>
                                <div id='bearing_main' className='css_margin_zero'>
                                <div id='bearingknob' >{v_bearing_knob}</div>
                                <div id='bearingtargetknob' >{v_bearingTarget_knob}</div>
                                </div>
                        </div>
                        <div className= 'col-2  margin_2px padding_zero'>
                        {/* <CLSS_SearchableTargets m_unit = {v_andruavUnit}/> */}

                        </div>
                        <div className= 'col-2  margin_2px padding_zero'>
                        {/* <CLSS_AndruavSwarmLeaders   m_unit={v_andruavUnit}/> */}
                        </div>
                        <div className= 'col-1  margin_2px padding_zero'>
                        </div>
                    </div>

                </div>);
        
        
					
        return imu;
    }


    renderControl (p_andruavUnit)
    {

        if ((p_andruavUnit.m_useFCBIMU === false) 
        ||((p_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_DroneKit_Telemetry)
            && (p_andruavUnit.m_telemetry_protocol != CONST_TelemetryProtocol_CONST_Mavlink_Telemetry)))
        {
            return ;
        }

        if (p_andruavUnit.m_Telemetry.m_isGCSBlocked === true)
        {

            return (
                <div id='ctrl_k'>
                    <p className="text-danger user-select-none">BLOCKED By RC in the Field</p> 
                </div>
            );
        }

        var btn = this.hlp_getflightButtonStyles(p_andruavUnit);
        var ctrl=[];
        var ctrl2=[];
        

        switch (p_andruavUnit.m_VehicleType)
        {
            case  VEHICLE_PLANE:
                ctrl.push(<div key="rc1" id='rc1' className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_arm' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_arm_class}  title='ARM / DISARM' onClick={ () => this.fn_ToggleArm(p_andruavUnit)}>&nbsp;ARM&nbsp;</button>
                    <button id='btn_climb' type='button' className={'btn btn-sm  flgtctrlbtn '  + btn.btn_climb_class } onClick={ (e) => fn_changeAltitude(p_andruavUnit)}>&nbsp;{btn.btn_climb_text}&nbsp;</button>
                    <button id='btn_takeoff' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_takeoff_class } onClick={ (e) => this.fn_doTakeOffPlane(p_andruavUnit)}>&nbsp;TakeOff&nbsp;</button>
                    <button id='btn_land' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_land_class } onClick={ (e) => this.fn_doLand(p_andruavUnit)}>&nbsp;Land&nbsp;</button>
                    <button id='btn_surface' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_surface_class } onClick={ (e) => this.fn_doSurface(p_andruavUnit)}>&nbsp;Surface&nbsp;</button>
                    <button id='btn_auto' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_auto_class } onClick={ (e) => this.fn_doAuto(p_andruavUnit)}>&nbsp;Auto&nbsp;</button>
                    <button id='btn_guided' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_guided_class } onClick={ (e) => this.fn_doGuided(p_andruavUnit)}>&nbsp;Guided </button>
                    <button id='btn_break' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_brake_class } onClick={ (e) => this.fn_doBrake(p_andruavUnit)}>&nbsp;Brake&nbsp;</button>
                    <button id='btn_hold' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_hold_class } onClick={ (e) => this.fn_doHold(p_andruavUnit)}>&nbsp;Hold&nbsp;</button>
                    <button id='btn_loiter' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_loiter_class } onClick={ (e) => this.fn_doLoiter(p_andruavUnit)}>&nbsp;Loiter&nbsp;</button>
                    </div></div>);
        
                ctrl.push(<div key="rc2" id='rc2'  className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_posh' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_pos_hold_class } onClick={ (e) => this.fn_doPosHold(p_andruavUnit)}>&nbsp;Pos-H&nbsp;</button>
                    <button id='btn_manual' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_manual_class } onClick={ (e) => this.fn_doManual(p_andruavUnit)}>&nbsp;Manual&nbsp;</button>
                    <button id='btn_stabilize' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_stabilize_class } onClick={ (e) => this.fn_doStabilize(p_andruavUnit)}>&nbsp;Stabilize&nbsp;</button>
                    <button id='btn_rtl' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_rtl_class } title="RTL mode"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, false)}>&nbsp;RTL&nbsp;</button>
                    <button id='btn_rtl_s' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_srtl_class } title="Smart RTL"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, true)}>&nbsp;S-RTL&nbsp;</button>
                    <button id='btn_cruse' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_cruise_class } onClick={ (e) => this.fn_doCruise(p_andruavUnit)}>&nbsp;Cruise&nbsp;</button>
                    <button id='btn_fbwa' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWA(p_andruavUnit)}>&nbsp;FBWA&nbsp;</button>
                    <button id='btn_fbwb' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWB(p_andruavUnit)}>&nbsp;FBWB&nbsp;</button>
                    <button id='btn_yaw' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_yaw_class } onClick={ (e) => gui_doYAW(p_andruavUnit.partyID)}>&nbsp;YAW&nbsp;</button>
                    <button id='btn_speed' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_speed_class } onClick={ (e) => this.fn_changeSpeed(e,p_andruavUnit,p_andruavUnit.m_Nav_Info.p_Location.speed!=null?p_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>&nbsp;GS&nbsp;</button>
                    <button id='btn_servos' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_servo_class } onClick={ (e) => this.fn_ServoControl(e,p_andruavUnit)}>&nbsp;SRV&nbsp;</button>
                    </div></div>);
            
            
                ctrl.push(<div key="rc22" id='rc22'  className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_q_sblt' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_q_stabilize } onClick={ (e) => this.fn_doQStabilize(p_andruavUnit)}>&nbsp;Q-Stab&nbsp;</button>
                    <button id='btn_q_loiter' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_q_loiter } onClick={ (e) => this.fn_doQLoiter(p_andruavUnit)}>&nbsp;Q-Loiter&nbsp;</button>
                    <button id='btn_q_hover' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_q_hover } onClick={ (e) => this.fn_doQHover(p_andruavUnit)}>&nbsp;Q-Hover&nbsp;</button>
                    <button id='btn_q_land' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_q_land } title="RTL mode"  onClick={ (e) => this.fn_doQLand(p_andruavUnit)}>&nbsp;Q-Land&nbsp;</button>
                    <button id='btn_q_rtl' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_q_rtl } title="Smart RTL"  onClick={ (e) => this.fn_doQRTL(p_andruavUnit)}>&nbsp;Q-RTL&nbsp;</button>
                    </div></div>);
    
    
                ctrl2.push (<div key="rc3"  id='rc3' className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_telemetry' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_tele_class}  title='Web based telemetry' onClick={ (e) => this.fn_telemetry_toggle(p_andruavUnit)}>{btn.btn_tele_text}</button>
                    <button id='btn_refreshwp' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_load_wp_class}   onClick={ (e) => this.fn_requestWayPoints(p_andruavUnit,true)} title="Load Waypoints from Drone">L-WP</button>
                    <button id='btn_writewp'  type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_save_wp_class}   onClick={ (e) => fn_putWayPoints(p_andruavUnit,true)} title="Write Waypoints into Drone">W-WP</button>
                    <button id='btn_clearwp'   type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_clear_wp_class}   onClick={ (e) => this.fn_clearWayPoints(p_andruavUnit,true)} title="Clear Waypoints" >C-WP</button>
                    <button id='btn_webRX'      type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_rx_class}   onClick={ (e) => this.fn_webRX_toggle(p_andruavUnit)} title={btn.btn_rx_title}>{btn.btn_rx_text}</button>
                    <button id='btn_freezerx' type='button' title="Freeze RemoteControl -DANGER-" className={'hidden btn btn-sm flgtctrlbtn ' + btn.btn_takeCTRL_class } onClick={ (e) => this.fn_takeTXCtrl(e,p_andruavUnit)}>&nbsp;TX-Frz&nbsp;</button>
                    <button id='btn_releaserx' type='button' title="Release Control" className={'btn btn-sm flgtctrlbtn ' + btn.btn_releaseCTRL_class } onClick={ (e) => this.fn_releaseTXCtrl(p_andruavUnit)}>&nbsp;TX-Rel&nbsp;</button>
                    <button id='btn_inject_param' type='button' title="Send Parameters to GCS" className={'btn btn-sm flgtctrlbtn ' + btn.btn_sendParameters_class } onClick={ (e) => this.fn_sendParametersToGCS(p_andruavUnit)}>&nbsp;PARM&nbsp;</button>
                    </div></div>);
                    break;

            default:
                ctrl.push(<div key="rc1"  id='rc1' className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_arm' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_arm_class}  title='ARM / DISARM' onClick={ () => this.fn_ToggleArm(p_andruavUnit)}>&nbsp;ARM&nbsp;</button>
                    <button id='btn_climb' type='button' className={'btn btn-sm  flgtctrlbtn '  + btn.btn_climb_class } onClick={ (e) => fn_changeAltitude(p_andruavUnit)}>&nbsp;{btn.btn_climb_text}&nbsp;</button>
                    <button id='btn_takeoff' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_takeoff_class } onClick={ (e) => this.fn_doTakeOffPlane(p_andruavUnit)}>&nbsp;TakeOff&nbsp;</button>
                    <button id='btn_land' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_land_class } onClick={ (e) => this.fn_doLand(p_andruavUnit)}>&nbsp;Land&nbsp;</button>
                    <button id='btn_surface' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_surface_class } onClick={ (e) => this.fn_doSurface(p_andruavUnit)}>&nbsp;Surface&nbsp;</button>
                    <button id='btn_auto' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_auto_class } onClick={ (e) => this.fn_doAuto(p_andruavUnit)}>&nbsp;Auto&nbsp;</button>
                    <button id='btn_guided' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_guided_class } onClick={ (e) => this.fn_doGuided(p_andruavUnit)}>&nbsp;Guided </button>
                    <button id='btn_break' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_brake_class } onClick={ (e) => this.fn_doBrake(p_andruavUnit)}>&nbsp;Brake&nbsp;</button>
                    <button id='btn_hold' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_hold_class } onClick={ (e) => this.fn_doHold(p_andruavUnit)}>&nbsp;Hold&nbsp;</button>
                    </div></div>);
        
                ctrl.push(<div key="rc2"  id='rc2' className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_posh' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_pos_hold_class } onClick={ (e) => this.fn_doPosHold(p_andruavUnit)}>&nbsp;Pos-H&nbsp;</button>
                    <button id='btn_loiter' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_loiter_class } onClick={ (e) => this.fn_doLoiter(p_andruavUnit)}>&nbsp;Loiter&nbsp;</button>
                    <button id='btn_manual' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_manual_class } onClick={ (e) => this.fn_doManual(p_andruavUnit)}>&nbsp;Manual&nbsp;</button>
                    <button id='btn_rtl' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_rtl_class } title="RTL mode"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, false)}>&nbsp;RTL&nbsp;</button>
                    <button id='btn_rtl_s' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_srtl_class } title="Smart RTL"  onClick={ (e) => this.fn_doRTL(p_andruavUnit, true)}>&nbsp;S-RTL&nbsp;</button>
                    <button id='btn_cruse' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_cruise_class } onClick={ (e) => this.fn_doCruise(p_andruavUnit)}>&nbsp;Cruise&nbsp;</button>
                    <button id='btn_fbwa' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWA(p_andruavUnit)}>&nbsp;FBWA&nbsp;</button>
                    <button id='btn_fbwb' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_fbwa_class } onClick={ (e) => this.fn_doFBWB(p_andruavUnit)}>&nbsp;FBWB&nbsp;</button>
                    <button id='btn_yaw' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_yaw_class } onClick={ (e) => gui_doYAW(p_andruavUnit.partyID)}>&nbsp;YAW&nbsp;</button>
                    <button id='btn_speed' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_speed_class } onClick={ (e) => this.fn_changeSpeed(e,p_andruavUnit,p_andruavUnit.m_Nav_Info.p_Location.speed!=null?p_andruavUnit.m_Nav_Info.p_Location.speed:this.localvars.speed_link)}>&nbsp;GS&nbsp;</button>
                    <button id='btn_servos' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_servo_class } onClick={ (e) => this.fn_ServoControl(e,p_andruavUnit)}>&nbsp;SRV&nbsp;</button>
                    </div></div>);
        
        
                ctrl2.push (<div key="rc3"  id='rc33' className= 'col-12  al_l ctrldiv'><div className='btn-group '>
                    <button id='btn_telemetry' type='button' className={'btn btn-sm  flgtctrlbtn ' + btn.btn_tele_class}  title='Web based telemetry' onClick={ (e) => this.fn_telemetry_toggle(p_andruavUnit)}>{btn.btn_tele_text}</button>
                    <button id='btn_refreshwp' type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_load_wp_class}   onClick={ (e) => this.fn_requestWayPoints(p_andruavUnit,true)} title="Load Waypoints from Drone">L-WP</button>
                    <button id='btn_writewp'  type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_save_wp_class}   onClick={ (e) => fn_putWayPoints(p_andruavUnit,true)} title="Write Waypoints into Drone">W-WP</button>
                    <button id='btn_clearwp'   type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_clear_wp_class}   onClick={ (e) => this.fn_clearWayPoints(p_andruavUnit,true)} title="Clear Waypoints" >C-WP</button>
                    <button id='btn_webRX'      type='button' className={'btn btn-sm flgtctrlbtn ' + btn.btn_rx_class}   onClick={ (e) => this.fn_webRX_toggle(p_andruavUnit)} title={btn.btn_rx_title}>{btn.btn_rx_text}</button>
                    <button id='btn_freezerx' type='button' title="Freeze RemoteControl -DANGER-" className={'hidden btn btn-sm flgtctrlbtn ' + btn.btn_takeCTRL_class } onClick={ (e) => this.fn_takeTXCtrl(e,p_andruavUnit)}>&nbsp;TX-Frz&nbsp;</button>
                    <button id='btn_releaserx' type='button' title="Release Control" className={'btn btn-sm flgtctrlbtn ' + btn.btn_releaseCTRL_class } onClick={ (e) => this.fn_releaseTXCtrl(p_andruavUnit)}>&nbsp;TX-Rel&nbsp;</button>
                    <button id='btn_inject_param' type='button' title="Send Parameters to GCS" className={'btn btn-sm flgtctrlbtn ' + btn.btn_sendParameters_class } onClick={ (e) => this.fn_sendParametersToGCS(p_andruavUnit)}>&nbsp;PARM&nbsp;</button>
                    </div></div>);
        
                break;
        }
        

        return (
            <div id='ctrl_k'>
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
            online_class2 =" text-info ";
            online_class = " bg-success text-white ";
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
            rows.push (<div  key={id +"fc1"}className= "col-1 padding_zero"><img className= {v_battery_display_fcb.css}   src={v_battery_display_fcb.m_battery_src}  title={"fcb batt: " +  parseFloat(v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryRemaining).toFixed(1) + "%  " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryVoltage/1000).toFixed(1).toString() + "v " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryCurrent/1000).toFixed(1).toString() + "A " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_TotalCurrentConsumed).toFixed(1).toString() + " mAh " + (v_andruavUnit.m_Power._FCB.p_Battery.FCB_BatteryTemprature/1000).toFixed(1).toString() + "C"} /></div>);
            rows.push (<div  key={id +"fc2"} className= "col-1 padding_zero"  onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)} ></div>);
            rows.push (<div  key={id +"fc3"} className= "col-4 padding_zero text-end"  onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)} ><p id='id' className={'cursor_hand text-right ' + online_class2 } title={"version:" + v_andruavUnit.m_version}  ><strong>{v_andruavUnit.m_unitName + " "}</strong><span className={' ' + online_class}>{online_text}</span></p></div>);
        }
        else
        {
            rows.push (<div key={id +"fc4"} className= "col-2 padding_zero"  onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)} ></div>);
            rows.push (<div key={id +"fc5"} className= "col-4 padding_zero text-end"  onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)} ><p id='id' className={'cursor_hand text-right ' + online_class2 } title={"version:" + v_andruavUnit.m_version}  ><strong>{v_andruavUnit.m_unitName + " "}</strong><span className={' ' + online_class}>{online_text}</span></p></div>);
        }

     
      

     return (
            
             <div  key={id +"1"} id={id} className={"row mb-1 mt-0 me-0 ms-0 pt-1 user-select-none IsGCS_" + v_andruavUnit.m_IsGCS + " card border-light IsShutdown_" + v_andruavUnit.m_IsShutdown}>
             <div  key={id +"_1"} id={v_andruavUnit.partyID + "_1"} className='row margin_2px padding_zero user-select-none'>        	
                <div key={id +"__1"} className= 'col-1  padding_zero'><img className=' cursor_hand gcs IsGCS_false' src={getVehicleIcon(v_andruavUnit)}  title={"version:" + v_andruavUnit.m_version}  alt='Vehicle' onClick={ (e) => this.fn_gotoUnit_byPartyID(e,v_andruavUnit.partyID)}/></div>
                <div key={id +"__2"} className= 'col-1  padding_zero'><img className={'cursor_hand ' + camera_class  } src={camera_src} title='take image from mobile' onClick={ (e) => this.fn_toggleCamera(v_andruavUnit.partyID)}/></div>
                <div key={id +"__3"} className= 'col-1  padding_zero'><img className={'cursor_hand ' + video_class   } src={video_src} title='stream video from mobile' onClick={ (e) => this.fn_toggleVideo(v_andruavUnit.partyID)}/></div>
                <div key={id +"__4"} className= 'col-1  padding_zero'><img className={'cursor_hand ' + recvideo_class} src={recvideo_src} title='record video on drone mobile' onClick={ (e) => toggleRecrodingVideo(v_andruavUnit.partyID)}/></div>
                <div key={id +"__5"} className= 'col-1  padding_zero'><img className={v_battery_display.css}  src={v_battery_display.m_battery_src} title={'Andruav batt: ' + v_battery_display.level +'% ' + v_battery_display.charging }/></div>
                
                 {rows}
            </div>
             
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link user-select-none " data-bs-toggle="tab" href={"#home" + v_andruavUnit.partyID}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link user-select-none " data-bs-toggle="tab" href={"#profile" + v_andruavUnit.partyID}>Log</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link user-select-none text-dark" data-bs-toggle="tab" href={"#empty" + v_andruavUnit.partyID}>Collapse</a>
                    </li>
                </ul>
                <div id="myTabContent" className="tab-content padding_zero">
                    <div className="tab-pane fade  active show pt-2" id={"home" + v_andruavUnit.partyID}>
                            {this.renderIMU(v_andruavUnit)}
                            {this.renderControl(v_andruavUnit)}
                    </div>
                    <div className="tab-pane fade pt-2" id={"profile" + v_andruavUnit.partyID}>
                            <CLSS_AndruavMessageLog  p_unit={v_andruavUnit}/>
                    </div>
                    <div className="tab-pane fade" id={"empty" + v_andruavUnit.partyID}>
                    </div>
                </div>
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

        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onPreferenceChanged, this, this.fn_onPreferenceChanged);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_unitAdded,this,this.fn_unitAdded);
    
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
            AndruavLibs.AndruavMap.fn_hideItem(p_andruavUnit.p_marker);
        }

        return ;

        
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
                var v_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(partyID);
                
                if (v_andruavUnit==null) return ;

                if (v_andruavUnit.m_IsGCS===true)
                {
                    // unit.push (<div className="accordion-item" key={"accordion-item" + partyID}>
                    //             <h2 className="accordion-header" id={"headingTwo"+partyID}>
                    //                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    //                     {partyID}
                    //                 </button>
                    //                 </h2>
                    //                 <div id={"collapse"+partyID} className="accordion-collapse collapse" aria-labelledby={"headingTwo"+partyID}data-bs-parent="#accordionExample" style="">
                    //                 <div className="accordion-body">
                    //                     <CLSS_AndruavUnit_GCS key={partyID} v_en_GCS= {v_en_GCS} m_unit = {v_andruavUnit}/>
                    //                 </div>
                    //                 </div>
                    //             </div>
                    //         );
                    unit.push (<CLSS_AndruavUnit_GCS key={partyID} v_en_GCS= {v_en_GCS} m_unit = {v_andruavUnit}/>
                        );
                }
                else 
                if (v_andruavUnit.m_IsGCS===false)
                {
                    // unit.push (<div className="accordion-item" key={"accordion-item" + partyID}>
                    //                 <h2 className="accordion-header" id={"headingTwo"+partyID}>
                    //                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    //                     {partyID}
                    //                 </button>
                    //                 </h2>
                    //                 <div id={"collapse"+partyID} className="accordion-collapse collapse" aria-labelledby={"headingTwo"+partyID} data-bs-parent="#accordionExample" style="">
                    //                 <div className="accordion-body">
                    //                     <CLSS_AndruavUnit_Drone key={partyID}  m_unit = {v_andruavUnit}/>
                    //                 </div>
                    //                 </div>
                    //             </div>
                    //         );
                    unit.push (<CLSS_AndruavUnit_Drone key={partyID}  m_unit = {v_andruavUnit}/>
                        );
                }

                me.fn_updateMapStatus(v_andruavUnit);

            });
        }
       

    return (

                <div key='main' className='margin_zero row'>{unit}</div>
                // <div key='main'>
                //         <div className="accordion" id="accordionExample">
                //             {unit}
                //         </div>
                //  </div>
            );
    }
};

ReactDOM.render(
			<CLSS_AndruavUnitList key={new Date()} />,
			v_G_getElementById('andruavUnitList')
        );
        