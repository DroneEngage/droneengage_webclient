class CFieldChecked extends React.Component {
    
    
    constructor()
    {
        super ();
        this.state = {

        };

    }

    componentWillMount ()
    {
        //this.fullName = this.props.txtLabel;
    }

    componentDidMount()
    {
        var n = '#'+this.props.itemid ;
        //var me = this;    
        $(n + ' :checkbox').change(function() {

            // this will contain a reference to the checkbox   
            fn_console_log ("HELP");
            if (this.checked) {
                this.props = true;
                $(n + " :text").removeAttr('disabled', true);
            } else {
                this.props = false;
                $(n + " :text").attr('disabled', 'disabled');
            }
        });

        if ((this.props.required === false) || (this.props.required == 'false'))
        {
            $(n + " :text").attr('disabled', 'disabled');
        }
        else
        {
            $(n + " :text").removeAttr('disabled', true);
        }

        $('#' + this.props.itemid + " :text").val(this.props.txtValue);
    }

    componentDidUpdate() 
    {
        var n = '#'+ this.props.itemid ;
        
        if ((this.props.required == false) || (this.props.required == 'false'))
        {
            $(n + " :text").attr('disabled', 'disabled');
            $(n + " :checkbox").prop('checked', false);
        }
        else
        {
            $(n + " :text").removeAttr('disabled', true);
            $(n + " :checkbox").prop('checked', true);
        }
    }

    fn_getValue ()
    {
        if ($('#' + this.props.itemid + ' :checkbox').prop('checked') == false)
        {
            return null;
        }
        
        
        return $('#' + this.props.itemid + " :text").val();
    }

    render ()
    {

        return (
            <div id={this.props.itemid} className="form-inline css_chkfield">
                <div className="form-group">
                    <label id={'lbl' + this.props.itemid}  className="form-control-label css_margin_left_5 " >{this.props.txtLabel}</label>
                    <input id={'txt' + this.props.itemid}  className="form-control input-sm css_margin_left_5 " type='text' />
                    <input id={'chk' + this.props.itemid}  className="form-control css_margin_left_5 " type='checkbox' />
                </div>
            </div>
        );
    }

}

class CWayPoint extends React.Component {

    constructor()
    {
        super ();
        this.state = {

        };
    }

    componentDidUpdate() 
    { 
        var lnglat = this.props.p_shape.getPosition();
        $('#txt_lat' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(lnglat.lat()); 
        $('#txt_lng' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(lnglat.lng()); 
        $('#txt_alt' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(this.props.p_shape.m_missionItem.alt); 
    }

    fn_editShape ()
    {
        //alert("I am CWayPoint");

        this.props.p_shape.m_missionItem.alt = $('#txt_alt'+ this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(); 

        var latlng = new google.maps.LatLng($('#txt_lat'+ this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(), $('#txt_lng'+ this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val());
        this.props.p_shape.setPosition(latlng);
    }

    render ()
    {
        return (<div className="margin_zero css_margin_top_small">
            <p className="al_l  text-primary">3D-Location</p>
            <div className="row margin_zero">
                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="txt_lat" className="text-primary margin_zero"><small>lat</small></label>
                        &nbsp;<input id={"txt_lat" + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id}  type="number" min={-90} max={90} step="0.0001" className="form-control input-xs input-sm txt_margin" placeholder="0.00"    />
                        &nbsp;&nbsp;
                        <label htmlFor="txt_lng" className="text-primary css_margin_left_5"><small>lng</small></label>
                        &nbsp;<input id={"txt_lng" + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id}  type="number" min={-180} max={180} step="0.0001" className="form-control input-xs input-sm txt_margin" placeholder="0.00" />
                        &nbsp;&nbsp;
                        <label htmlFor="txt_alt" className="text-primary css_margin_left_5"><small>alt</small></label>
                        &nbsp;<input id={"txt_alt" + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id}  type="number" min={0} max={9000} step="1.0" className="form-control input-xs input-sm txt_margin" placeholder="0.00"  />
                </div>
                </div>
            </div>
            </div>
            
        );
    }
}


class CMissionActions extends React.Component {

    Me;
    constructor()
    {
        super ();
        this.state = {

        };
    }
 

    fn_editShape ()
    {
        var waypointType = parseInt($('#msnaction' + this.props.p_shape.id + '_' + this.props.p_shape.m_mission.m_id + ' #msnsel option:selected').val());
        this.props.p_shape.m_missionItem.missionType = waypointType;
        var icon_img = './images/location_bb_32x32.png';
        switch (waypointType)
		{
            case CONST_WayPoint_TYPE_WAYPOINTSTEP:
			    icon_img= {
                    url:'./images/location_bb_32x32.png',
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 23),
                    scaledSize: new google.maps.Size(32, 32),
                    labelOrigin: new google.maps.Point(16,40)
                };
                break;
            
            case CONST_WayPoint_TYPE_SPLINE:
			    icon_img= {
                    url:'./images/location_bb_32x32.png',
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 23),
                    scaledSize: new google.maps.Size(32, 32),
                    labelOrigin: new google.maps.Point(16,40)
                };
                break;
            
            case CONST_WayPoint_TYPE_EKLA3:
			    icon_img= {
                    url:'./images/takeoff_bb_32x32.png',
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16),
                    scaledSize: new google.maps.Size(32, 32),
                    labelOrigin: new google.maps.Point(16,40)
                };
                break;
            
            case CONST_WayPoint_TYPE_HOBOOT:
			    icon_img= {
                    url:'./images/landing_bb_32x32.png',
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16),
                    scaledSize: new google.maps.Size(32, 32),
                    labelOrigin: new google.maps.Point(16,40)
                };
                break;
            
            case CONST_WayPoint_TYPE_RTL:
			    icon_img= {
                    url:'./images/rtl_bb_32x32.png',
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16),
                    scaledSize: new google.maps.Size(32, 32),
                    labelOrigin: new google.maps.Point(16,40)
                };
                break;
            
            case CONST_WayPoint_TYPE_CIRCLE:
                icon_img= {
                    url:'./images/circle_bb_32x32.png',
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 23),
                    scaledSize: new google.maps.Size(32, 32),
                    labelOrigin: new google.maps.Point(16,40)
                };
                break;

            
        }
        
        this.props.p_shape.setIcon(icon_img);

        this.props.p_shape.m_missionItem.speed = this.speed.fn_getValue();
        this.props.p_shape.m_missionItem.m_speedRequired = (this.props.p_shape.m_missionItem.speed != null);
        
        this.props.p_shape.m_missionItem.yaw = this.yaw.fn_getValue();
        this.props.p_shape.m_missionItem.m_yawRequired = (this.props.p_shape.m_missionItem.yaw != null) ;
       
    }

    componentDidUpdate() 
    {
        if (this.props.p_shape.m_missionItem.missionType ==0) this.props.p_shape.m_missionItem.missionType =1;
        $('#msnaction' + this.props.p_shape.id + '_' + this.props.p_shape.m_mission.m_id + ' #msnsel').val(this.props.p_shape.m_missionItem.missionType);
    }
    

    render ()
    {

        var v_itemID = this.props.p_shape.id+ "_" + this.props.p_shape.m_mission.m_id;

        var v_event_firing = [];
        
        return (

        <div id={"msnaction"+ v_itemID} className="form-group text-left ">
        <label className="form-control-label text-primary">To Do When Arrive </label>
        {v_event_firing}
        <CFieldChecked  required={this.props.p_shape.m_missionItem.m_speedRequired == true} txtLabel='speed' itemid={v_itemID + 'spd'} txtValue={this.props.p_shape.m_missionItem.speed}  ref={instance => {this.speed = instance}} />
        <CFieldChecked  required={this.props.p_shape.m_missionItem.m_yawRequired == true}  txtLabel='yaw' itemid={v_itemID + 'yaw'} txtValue={this.props.p_shape.m_missionItem.yaw}  ref={instance => {this.yaw = instance}} />
        <select id="msnsel"  className="form-control css_margin_top_small">
                <option value={CONST_WayPoint_TYPE_EKLA3}>Take Off</option>
                <option value={CONST_WayPoint_TYPE_WAYPOINTSTEP}>Waypoint</option>
                <option value={CONST_WayPoint_TYPE_CIRCLE}>Circle Here</option>
                <option value={CONST_WayPoint_TYPE_RTL}>RTL</option>
                <option value={CONST_WayPoint_TYPE_HOBOOT}>Land</option>
                </select>
        </div>);
    }

}

class CMissionStep extends React.Component {

    constructor()
    {
        super ();
        this.state = {

        };
    }


    fn_editShape ()
    {
        this.wp.fn_editShape();
        this.ma.fn_editShape();
        this.props.p_shape.order = parseInt($('#txt_orderNum' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val());
        this.props.p_shape.setLabel({
            text: $('#txt_orderNum' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(), // string
            color: "#977777",
            fontSize: "12px",
            fontWeight: "bold"
          });

        this.props.p_shape.m_mission.fn_updatePath(true)
        return ;
    }

    componentDidUpdate() 
    {
        if (this.props.p_shape != null)
        {
            $('#txt_orderNum' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id).val(this.props.p_shape.order); 
        }
    }
    
    render ()
    {
        if ((this.props.p_shape == null)  || (this.props.p_isCurrent == false))
        {
            return (<div/>);
        }

        return (
            <div key={"ms_o" + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id} id="m_hdr" className="col  col-sm-12 margin_zero" >
		        

            <label className="text-primary  border border-warning rounded text-center ">
                <strong>{"Mission Item #" + this.props.p_shape.m_mission.m_id}</strong>
            </label>
		    <div className="form-group text-left">
                <label className="text-primary">ID</label>
                <input type='text' id={'txt_orderNum' + this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id} className="form-control input-sm"/>
            </div>
		    

            <div key={this.props.p_shape.id + "_" + this.props.p_shape.m_mission.m_id} id="m_bdy" className="geo_fence ">
		        <CMissionActions p_shape= {this.props.p_shape}  ref={instance => {this.ma = instance}}/>
                <CWayPoint       p_shape= {this.props.p_shape}  ref={instance => {this.wp = instance}}/>
                <button className="button btn-primary css_margin_top_small" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
            </div>
            </div>
        );
    }
}

class MissionControlPanel extends React.Component {


    constructor()
	{
		super ();
		this.state = {
            m_deleted: false
		};
    }
    

    fn_onSocketStatus (me,params) {
        
        if (params.status == CONST_SOCKET_STATUS_REGISTERED)
        {				
            me.setState({is_connected:true});
        }
        else
        {				
            me.setState({is_connected:false});
        }
    }


    fn_missionUpdated (me)
    {
        me.forceUpdate();
    }

    fn_exportMission ()
    {
        this.props.p_mission.fn_exportToV110 ();
    }

    fn_saveDBMission ()
    {
        this.props.p_mission.fn_exportToJSONAndruav ($('#prt_' + this.props.p_mission.m_id).val());
    }

    fn_deleteDBMission()
    {
        v_andruavClient.API_disableWayPointTasks(window.AndruavLibs.AndruavAuth.username,v_andruavClient.m_groupName,$('#prt_' + this.props.p_mission.m_id).val(),'_drone_',1);
    }

    fn_deleteMission ()
    {
        if (this.props.p_mission == null) return ;
        window.AndruavLibs.MapMission.fn_deleteMission(this.props.p_mission.m_id);
        this.setState ({m_deleted:true});
    }


    fn_changeColor ()
    {
        if (this.props.p_ParentCtrl.props.p_missionPlan != null)
        {
            this.props.p_mission.fn_DrawStyle ($('#cp_' + this.props.p_mission.m_id).val());
            this.props.p_mission.fn_updatePath (true);
        }

       $('#pc_' + this.props.p_mission.m_id).css("background-color",$('#cp_' + this.props.p_mission.m_id).val());
    }

    /**
     * Close Mission Panel Control
     * @param {*} e 
     */
    fn_collabseMe (e)
    {
        if ((this.props.p_ParentCtrl.props.p_missionPlan.m_hidden == true) && (this.props.p_ParentCtrl.props.p_isCurrent == false))
        {
            // display path if group is going to be activated and was hidden.
            this.fn_togglePath(e);
        }

        window.AndruavLibs.EventEmitter.fn_dispatch(EE_onMissionItemToggle,{p_isCurrent:this.props.p_ParentCtrl.props.p_isCurrent, p_mission:this.props.p_ParentCtrl.props.p_missionPlan} );
    }


    /**
     * hide or display pathes on Google Map.
     * @param {*} e 
     */
    fn_togglePath (e)
    {
        fn_console_log (e);
        this.props.p_ParentCtrl.props.p_missionPlan.fn_togglePath(window.v_map);
        if (this.props.p_ParentCtrl.props.p_missionPlan.m_hidden == true)
        {
            $('#ph_' + this.props.p_mission.m_id).addClass('text-muted');
            $('#ph_' + this.props.p_mission.m_id).removeClass('text-success');
            $('#ph_' + this.props.p_mission.m_id).addClass('border-muted');
            $('#ph_' + this.props.p_mission.m_id).removeClass('border-success');
        }
        else
        {
            $('#ph_' + this.props.p_mission.m_id).addClass('text-success');
            $('#ph_' + this.props.p_mission.m_id).removeClass('text-muted');
            $('#ph_' + this.props.p_mission.m_id).addClass('border-success');
            $('#ph_' + this.props.p_mission.m_id).removeClass('border-muted');
        }
    }

    /**
     * simulate click on color button
     * @param {*} e 
     */
    fn_simClick (e)
    {
        $('#cp_' + this.props.p_mission.m_id).click();
    }

    componentWillMount () 
    {
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_mapMissionUpdate,this,this.fn_missionUpdated);
    }

    componentWillUnmount () 
    {
        window.AndruavLibs.EventEmitter.unsubscribe(EE_mapMissionUpdate,this);
    }

    componentDidMount ()
    {
        //$('#cp_' + this.props.p_mission.m_id).val()
        $('#pc_' + this.props.p_mission.m_id).css("background-color",this.props.p_mission.m_pathColor);
    }


    componentDidUpdate ()
    {
        if ((this.props.p_ParentCtrl.props.p_missionPlan.m_hidden == true) && (this.props.p_ParentCtrl.props.p_isCurrent == true))
        {
            // display path if group is ACVTIE NOW and was hidden.
            this.fn_togglePath(e);
        }
    }
    
    render ()
    {

        if (this.state.m_deleted == true) return (<div className = " margin_zero "/>);

        if (this.props.p_mission == null)
        {
            return (<div className = " margin_zero "/>);
        }

        var v_item2 = [];
        var v_partyIDCtrl = [];

        var v_saveAsTask = [];

        if (this.props.p_isCurrent == true)
        {
            v_item2.push (

                <div id="geofence" className="btn-group  css_margin_top_small" >
                    <button id='pre_geo_btn_generate' className='btn btn-primary btn-xs ctrlbtn'   title ="Export Mission" type="button "  onClick={ (e) => this.fn_exportMission(e) } >Export</button>
                    <button  id="geo_btn_georeset"  className="btn btn-warning btn-xs ctrlbtn" title ="Reset Mission on Map" type="button" onClick={ (e) => this.fn_deleteMission(e) } >Reset</button>
                    {v_saveAsTask}
                </div>

            );

            
            if (CONST_THIS_IS_PUBLIC_VERSION===true)
			{
                // overwrite with this if public version 
                v_partyIDCtrl = [];        
                
            }

        }
        
        var v_class = (this.props.p_isCurrent === true)?"text-primary border border-warning rounded text-center cursor_hand padding_zero":"text-secondary border  border-secondry rounded text-center cursor_hand padding_zero"
        return (
            <div key={"plan" + this.props.p_mission.m_id} id="m_hdr" className="col  col-sm-12 margin_zero" >
            <div className="form-inline  margin_zero padding_zero">
                <div className="form-group  margin_zero padding_zero">
                    <label onClick={ (e) => this.fn_collabseMe(e) } className={v_class}><strong>{'Mission #' + this.props.p_mission.m_id + ' Panel (' + (this.props.p_mission.fn_getMissionDistance() / 1000.0).toFixed(1) + ' km)'}</strong></label>
                    <input type='color' className = "border hidden" id={'cp_' + this.props.p_mission.m_id} onChange={(e)=> this.fn_changeColor()}/>
                    <p id={'pc_' + this.props.p_mission.m_id}  onClick={ (e) => this.fn_simClick(e) } className="btn  btn-xs css_margin_left_5 text-light border border-primary rounded text-center cursor_hand" title="Change Plan color path"  >C</p>
                    <p id={'ph_' + this.props.p_mission.m_id}  onClick={ (e) => this.fn_togglePath(e) } className="btn  btn-xs  text-success border border-success rounded text-center cursor_hand" title="Hide/Display plan on Map"  >H</p>
                </div>
                </div>
            
            {v_item2}
            
            {v_partyIDCtrl}
            <hr/>
            </div>
        );
    }
}




class UnitMissionContainer extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
		};
	}

    
    displayGeoForm (me,v_shape)
    {
        // not a marker
        if (v_shape.m_mission == null) return ; 
        
        if (me.props.p_missionPlan.m_id != v_shape.m_mission.m_id)
        {
            fn_console_log ("Not Me");
            return ;
        } 

        if (me.props.p_isCurrent == false)
        {
            window.AndruavLibs.EventEmitter.fn_dispatch(EE_onMissionItemToggle,{p_isCurrent:me.props.p_isCurrent, p_mission:me.props.p_missionPlan});
        }

        me.setState({s_shape:v_shape});


        fn_console_log ("REACT:displayGeoForm" );

        me.forceUpdate();
		
    }


    fn_onMissionItemToggle (me,p_params)
    {
        fn_console_log (p_params);
        
        
        me.forceUpdate();
    }

   


    componentWillUpdate ()
    {
        fn_console_log ("block id" + this.props.p_missionPlan.m_id + " is current " + this.props.p_isCurrent);
    }

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_displayGeoForm,this,this.displayGeoForm);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onMissionItemToggle, this, this.fn_onMissionItemToggle);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.unsubscribe(EE_displayGeoForm,this);
        window.AndruavLibs.EventEmitter.unsubscribe (EE_onMissionItemToggle,this);
    }

    render() {
   
        var c_borderStyle;

        if (this.props.p_isCurrent === true)
        {
            c_borderStyle = 'css_missionMapSelected';
        }

        
        var item = [];
        
        if (this.props.p_missionPlan == null)
        {
            item.push (<h4 key="mi"></h4>);
        }
        else
        {
            if ((window.v_map != null))
            {
                if (this.state.shape != null)
                {
                    this.state.shape.setLabel({
                        text: this.state.shape.order.toString(), // string
                        color: "#977777",
                        fontSize: "12px",
                        fontWeight: "bold"
                    });
                }
                item.push (<div key={"mstp"  + this.props.p_missionPlan.m_id} id="missionstep" className = {"container-fluid localcontainer " + c_borderStyle}>
                            <MissionControlPanel p_mission={this.props.p_missionPlan} p_ParentCtrl= {this}  p_isCurrent={this.props.p_isCurrent}/>
                            <CMissionStep  p_shape={this.state.s_shape} p_isCurrent={this.props.p_isCurrent}/>
                        </div>);
                
                    
            }
            else
            {
                    
            }
        
        }
        
    return (
            <div key='fsc' className ="margin_zero width_100">
            
            <div className="row margin_zero"> 
                {item}
            </div>
            </div>
            );
    }
};



class CMissionsContainer extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
            p_plans:[],
		};

    
	}

    fn_onSocketStatus (me,p_params) {
        
        if (p_params.status == CONST_SOCKET_STATUS_REGISTERED)
        {				
            me.setState({is_connected:true});
        }
        else
        {				
            me.setState({is_connected:false});
        }
    }
    
    fn_onMissionItemToggle (me,p_params)
    {
       
        if (p_params.p_isCurrent == true)
        {
            // switch to next
            window.AndruavLibs.MapMission.fn_activateNextMission(p_params.p_mission.m_id);
        }
        else
        {
            // make this the current
            window.AndruavLibs.MapMission.fn_setCurrentMission(p_params.p_mission.m_id);
        }
        me.forceUpdate();
    }


    fn_addNewPathPlan (e)
    {
        var v_missionPlan = window.AndruavLibs.MapMission.fn_createNewMission();
        window.AndruavLibs.MapMission.fn_setCurrentMission(v_missionPlan.m_id);
        
        this.setState ({p_plans: this.state.p_plans.concat([v_missionPlan])});
    }


    

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onMissionItemToggle, this, this.fn_onMissionItemToggle);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.unsubscribe (EE_onSocketStatus,this);
        window.AndruavLibs.EventEmitter.unsubscribe (EE_onMissionItemToggle,this);
    }

    render() {
   
        var item = [];
        

        let v_mission1 = window.AndruavLibs.MapMission.fn_getCurrentMission();
				
        if ((this.state.is_connected == false) || (this.state.p_plans == null) || (this.state.p_plans.length ==0))
        {
            item.push (<h4 key="mi"></h4>);
        }
        else
        {
            if (window.v_map != null)
            {
                this.state.p_plans.map (function (v_plan)
                {
                    
                
                    item.push (
                            <UnitMissionContainer key={'umc' + v_plan.m_id} p_missionPlan={v_plan} p_isCurrent={v_plan.m_id==v_mission1.m_id}/>
                        );
                });
                    
            }
            else
            {
                    
            }
        }
        
        let v_ctrl = [];

        if (this.state.is_connected == true)
        {
            v_ctrl.push(
                <div key='fsc' className="width_100">
                <div className="row margin_zero"> 
                    <div className="col-11">
                    <label>Add New Mission </label>
                    </div>
                    <div className="col-1">
                    <button className="btn-primary btn-xs float-left" title="Add New Mission Plan" onClick={ (e) => this.fn_addNewPathPlan(e)} >+</button>
                    </div>
                </div>
                <div className="row margin_zero width_100"> 
                {item}
                </div>				
            </div>
            );
        }
        else
        {
            v_ctrl.push (
                <div key='fsc' ><h4> </h4></div>
            )    ;
        }

        
    return (
        <div key='CLSS_CMissionsContainer' className="width_100">{v_ctrl}</div>
            );
    }
};


ReactDOM.render(
    <CMissionsContainer  />,
    v_G_getElementById('c_missioncontrol')
);