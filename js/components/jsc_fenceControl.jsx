const DEFAULT_DISTANCE = 10;
class CLSS_FenceAction extends React.Component {


    

    /**
     * When checkbox item is selected.
     * @param {*} e 
     */
    fn_onSelect(e)
    {
        this.props.shape.m_geofenceInfo.isHardFence=e.target.value; 
        this.forceUpdate();
    }

    fn_update ()
    {
        	//(this.props.hardCLSS_FenceAction==null)?$('#geo #sel').val(0):$('#geo #sel').val(this.props.hardCLSS_FenceAction);
	
    }
    

    componentDidMount ()
    {
        this.fn_update();
    }

    componentDidUpdate()
    {
         this.fn_update();
    }

    render ()
    {
        const selected_value = (this.props.shape.m_geofenceInfo.isHardFence==null?0:this.props.shape.m_geofenceInfo.isHardFence);
        return (
                <div className="form-group text-left"><label className="control-label">Fence Action </label>
                <select id='sel' className="form-control" onChange={(e) => this.fn_onSelect(e)} value={selected_value}>
                                                          <option value="0" >Soft Fence</option>
														  <option value="2" >Make RTL</option>
														  <option value="12">Make LAND</option>
														  <option value="10">Make LOITER</option>
                                                          <option value="17">Make BRAKE/HOLD</option>
                                                          <option value="21">Make Smart RTL</option>
                                                          </select>
			    </div>
        );
    }

}

class CLSS_ShapeControl extends React.Component {
    constructor()
	{
		super ();
		this.state = {
		   
		};
    }

    fn_init () 
    {
        if (this.props.shape.m_geofenceInfo==null)
        {
            this.props.shape.m_geofenceInfo= {};
            this.props.shape.m_geofenceInfo.m_geoFenceName = ('fence_' + fn_generateRandomString(4));
            this.props.shape.m_geofenceInfo.m_valid = false;
            this.props.shape.m_geofenceInfo.m_shouldKeepOutside = false;
        }

        this.fn_updateToolTip();
    }

    fn_updateCheckBox(p_ctrl) 
    {
        if (this.props.shape.m_geofenceInfo.m_shouldKeepOutside === true)
        {
            $(p_ctrl).addClass('bg-danger');
        }
        else
        {
            $(p_ctrl).removeClass('bg-danger');
        }
    }

    fn_onCheck (e)
    {
        this.props.shape.m_geofenceInfo.m_shouldKeepOutside = e.target.checked;
        this.fn_updateCheckBox (e.target);
        
        this.fn_editShape();
    }

    fn_displayShapeData ()
    {
        if (this.props.shape.m_geofenceInfo != null) {
            $('#geo #name').val(this.props.shape.m_geofenceInfo.m_geoFenceName);
			$('#geo #chk').prop('checked', this.props.shape.m_geofenceInfo.m_shouldKeepOutside);
            this.fn_updateCheckBox($('#geo #chk'));
			//(this.props.shape.m_geofenceInfo.isHardFence==null)?$('#geo #sel').val(0):$('#geo #sel').val(this.props.shape.m_geofenceInfo.isHardFence);
		}
        
     }

     /**
      * Update tooltip location and contents.
      */
     fn_updateToolTip()
     {
        this.props.shape.unbindTooltip();
        this.props.shape.bindTooltip(this.props.shape.m_geofenceInfo.m_geoFenceName, {sticky: true, permanent: true, className: "bg-transparent fence_tooltip border-0 fs-6 text-white", opacity: 0.5, ffset: [0, 0] });
     }
   
     fn_editShape ()
     {
            if (this.props.shape.m_geofenceInfo == null) {this.props.shape.m_geofenceInfo= {};}

			//this.props.shape.m_geofenceInfo.m_shouldKeepOutside = this.state.restricted!=null?this.state.restricted:false;
        	var v_name = $('#geo #name').val();
            if (v_name == "") v_name = ('fence_' + fn_generateRandomString(4));
			this.props.shape.m_geofenceInfo.m_geoFenceName      = v_name;
			this.props.shape.m_geofenceInfo.isHardFence       = parseInt($('#geo #sel').val());
			this.props.shape.m_geofenceInfo.m_maximumDistance   = 0;
					
			var color;
			if(this.props.shape.m_geofenceInfo.m_shouldKeepOutside) {color='#FF1493';} else {color='#32CD32';}
            this.props.shape.setStyle({
                color: color
            });
			this.props.shape.m_geofenceInfo.m_valid = true;
            this.fn_updateToolTip();
     }
}


class CLSS_PolygonControl extends CLSS_ShapeControl {
    constructor()
	{
		super ();
	}

    fn_displayShapeData ()
    {
        super.fn_displayShapeData()
        
        if (this.props.shape.m_geofenceInfo != null) {
            $('#geo #distance').val(this.props.shape.m_geofenceInfo.m_maximumDistance);
        }

    }

    fn_editShape ()
	{
		super.fn_editShape ();
	}


    componentDidUpdate () {
        fn_console_log ("componentWillUpdate");
		this.fn_displayShapeData();
    }
    
    componentDidMount ()
    {
         fn_console_log ("componentDidMount");
		this.fn_displayShapeData();
    }
    
   
    render() {

        
        this.fn_init ();
        
        return (

            <div key={this.props.shape.id} id="geo" className="card text-white bg-primary mb-3">
                <h4 className="card-header">Circle Fence</h4>
                <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type='text' id='name' className="form-control input-sm"  onChange={(e) => this.fn_editShape()}/>
                </div>
                <div className="form-check form-switch">
                <input className="form-check-input " type="checkbox" id='chk' onChange={(e) => this.fn_onCheck(e)}/>
                <label className="form-check-label" htmlFor="chk">Restricted Area</label>
                </div>
                <CLSS_FenceAction shape={this.props.shape} hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
                </div> 
            </div> 
            );
           
     }
}



class CLSS_PolylineControl extends CLSS_ShapeControl {
    
    
    constructor()
	{
		super ();
	}

    fn_displayShapeData ()
    {
        super.fn_displayShapeData()
        if (this.props.shape.m_geofenceInfo.m_maximumDistance ==null) 
        {
            this.props.shape.m_geofenceInfo.m_maximumDistance = DEFAULT_DISTANCE
        }
       $('#geo #distance').val(Math.round(this.props.shape.m_geofenceInfo.m_maximumDistance));
     }

    fn_editShape ()
	{
		super.fn_editShape ();

        this.props.shape.m_geofenceInfo.m_maximumDistance = parseInt($('#geo #distance').val());
	}


    componentDidUpdate () {
        fn_console_log ("componentWillUpdate");
		this.fn_displayShapeData();
    }
    
    componentDidMount ()
    {
         fn_console_log ("componentDidMount");
		this.fn_displayShapeData();
    }
    
   
    render() {

        this.fn_init ();

        return (

            <div key={this.props.shape.id} id="geo" className="card text-white bg-primary mb-3">
                <h4 className="card-header">Polyline Fence</h4>
                <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type='text' id='name' className="form-control input-sm"  onChange={(e) => this.fn_editShape()}/>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input " type="checkbox" id='chk' onChange={(e) => this.fn_onCheck(e)}/>
                    <label className="form-check-label" htmlFor="chk">Restricted Area</label>
                </div>
                <CLSS_FenceAction shape={this.props.shape} hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <div className="form-group text-left"><label className="control-label">Minimum Distance</label> <div className="form-inline text-left"><input type='number' 		id='distance' className="form-control" /> &nbsp; meters</div></div>
		        <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
                </div> 
            </div> 
                    );
           
     }
}


class CLSS_CircleControl extends CLSS_ShapeControl {
    constructor()
	{
		super ();
	}

   

    fn_displayShapeData ()
    {
        super.fn_displayShapeData()

        $('#geo #radius').val(Math.round(this.props.shape.getRadius()));
    }

    fn_editShape ()
    {
        super.fn_editShape()

        this.props.shape.m_geofenceInfo.m_maximumDistance = parseInt($('#geo #radius').val());
	}

   

    componentDidUpdate () {
        fn_console_log ("componentWillUpdate");
		this.fn_displayShapeData();
    }
    
    componentDidMount ()
    {
         fn_console_log ("componentDidMount");
		 this.fn_displayShapeData();
    }
    
   
    render() {

        this.fn_init ();
        
        return (

            <div key={this.props.shape.id} id="geo" className="card text-white bg-primary mb-3">
		        <h4 className="card-header">Circle Fence</h4>
                <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type='text' id='name' className="form-control input-sm"  onChange={(e) => this.fn_editShape()}/>
                </div>
                <div className="form-check form-switch">
                <input className="form-check-input " type="checkbox" id='chk' onChange={(e) => this.fn_onCheck(e)}/>
                <label className="form-check-label" htmlFor="chk">Restricted Area</label>
                </div>
		        <CLSS_FenceAction shape={this.props.shape} hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <div className="form-group text-left">
                        <label className="control-label">Radius</label> 
                        <div className="form-inline text-left">
                        <input type='number' id='radius' className="form-control" readOnly/> &nbsp; meters
                        </div>
                </div>
	            <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
                </div> 
            </div> 
                    );
           
     }
}

class CLSS_RectangleControl extends CLSS_ShapeControl {

    constructor()
	{
		super ();
		
    }

   
    componentDidUpdate () {
        fn_console_log ("componentWillUpdate");
		this.fn_displayShapeData();
    }
    
    componentDidMount ()
    {
         fn_console_log ("componentDidMount");
		this.fn_displayShapeData();
    }
    
   
    render() {

        this.fn_init ();

        return (
            <div key={this.props.shape.id} id="geo" className="card text-white bg-primary mb-3">
                <h4 className="card-header">Rectangle Fence</h4>
                <div className="card-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type='text' id='name' className="form-control input-sm" onChange={(e) => this.fn_editShape()}/>
                </div>
                <div className="form-check form-switch">
                <input className="form-check-input " type="checkbox" id='chk' onChange={(e) => this.fn_onCheck(e)}/>
                <label className="form-check-label" htmlFor="chk">Restricted Area</label>
                </div>
		        <CLSS_FenceAction shape={this.props.shape} hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
                </div>
            </div>
 		
		            );
     }
}




class CLSS_FenceCLSS_ShapeControl extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
			
		};

    
	    window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onShapeCreated, this, this.fn_onShapeCreated);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onShapeSelected, this, this.fn_onShapeSelected);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onShapeEdited, this, this.fn_onShapeEdited);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onShapeDeleted, this, this.fn_onShapeDeleted);
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
    

    fn_onShapeCreated (me, p_shape) 
    {
        fn_console_log ("fn_onShapeCreated: " + p_shape);
        me.setState({m_shape: p_shape});
    }

    
    /**
     * 
     * @param {*} me 
     * @param {*} p_event 
     *      p_event
            { 
                latlng: { lat, lng}
                target: shape
            }
     */
    fn_onShapeSelected (me, p_event) 
    {
        me.setState({m_shape: p_event.target});
    }

    fn_onShapeEdited(me, p_shape)
    {
        me.setState({m_shape: p_shape});
    }

    fn_onShapeDeleted (me, p_shape) 
    {
        if (p_shape.m_geofenceInfo!= null) 
        {
            p_shape.m_geofenceInfo.m_deleted = true;
        }
        me.setState({m_shape: null});
    }

    
    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onSocketStatus,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onShapeCreated,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onShapeSelected,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onShapeEdited,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onShapeDeleted,this);
    }

    _renderswitch (v_unit)
    {
        switch (this.state.m_shape.pm.getShape())
        {
            case 'Marker':
            break;
            
            case 'Rectangle':
                v_unit.push (<CLSS_RectangleControl shape = {this.state.m_shape}></CLSS_RectangleControl>);
            break;   

            case 'Circle':
                v_unit.push (<CLSS_CircleControl shape = {this.state.m_shape}></CLSS_CircleControl>);
            break;

            case 'Polygon':
                v_unit.push (<CLSS_PolygonControl shape = {this.state.m_shape}></CLSS_PolygonControl>);
            break;
        
            case 'Line':
                v_unit.push (<CLSS_PolylineControl shape = {this.state.m_shape}></CLSS_PolylineControl>);
            break;

            default:
                v_unit.push (<h4>Please Create or Select a Region</h4>);
            break;
        }

    }
    
    render() {
   
        var v_unit = [];
        

        if ((this.state.m_shape == null) 
        || ((this.state.m_shape.m_geofenceInfo != null) && (this.state.m_shape.m_geofenceInfo.m_deleted===true))
        )
        {
            v_unit.push (<h4 key="h4">Please Select A Shape</h4>);
        }
        else
        {
            if (this.state.is_connected == true)
            {
                this._renderswitch(v_unit);
            }
            else
            {
                v_unit.push (<h4>Please login first.</h4>)    ;
            }
        }
        
       
       

    return (

                <div key='CLSS_FenceCLSS_ShapeControl'>{v_unit}</div>
            );
    }
};


ReactDOM.render(
			<CLSS_FenceCLSS_ShapeControl  />,
			v_G_getElementById('fenceControl')
		);