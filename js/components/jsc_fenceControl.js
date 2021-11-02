const DEFAULT_DISTANCE = 10;
class CLSS_FenceAction extends React.Component {


    fn_update ()
    {
        	(this.props.hardCLSS_FenceAction==null)?$('#geo #sel').val(0):$('#geo #sel').val(this.props.hardCLSS_FenceAction);
	
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
        return (
                <div className="form-group text-left"><label className="control-label">Fence Action </label><select id='sel' className="form-control">
                                                          <option value="0">Soft Fence</option>
														  <option value="2">Make RTL</option>
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


    fn_displayShapeData ()
    {
        if (this.props.shape.geofenceInfo != null) {
            $('#geo #name').val(this.props.shape.geofenceInfo.geoFenceName);
			$('#geo #chk').prop('checked', this.props.shape.geofenceInfo.shouldKeepOutside);
			(this.props.shape.geofenceInfo.isHardFence==null)?$('#geo #sel').val(0):$('#geo #sel').val(this.props.shape.geofenceInfo.isHardFence);
		}
        
     }
   
     fn_editShape ()
     {
            if (this.props.shape.geofenceInfo == null) {this.props.shape.geofenceInfo= {};}
					
			this.props.shape.geofenceInfo.geoFenceName      = $('#geo #name').val();
            this.props.shape.geofenceInfo.shouldKeepOutside = $('#geo #chk').prop('checked');
			this.props.shape.geofenceInfo.isHardFence       = parseInt($('#geo #sel').val());
			this.props.shape.geofenceInfo.maximumDistance   = 0;
					
			var color;
			if(this.props.shape.geofenceInfo.shouldKeepOutside) {color='#FF1493';} else {color='#32CD32';}
			window.AndruavLibs.GoogleDraw.fn_setShapeColor(this.props.shape,color);
            this.props.shape.valid = true;
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
        
        if (this.props.shape.geofenceInfo != null) {
            $('#geo #distance').val(this.props.shape.geofenceInfo.maximumDistance);
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

        if (this.props.shape.geofenceInfo==null)
        {
            this.props.shape.geofenceInfo= {};
            this.props.shape.geofenceInfo.geoFenceName = ('fence_' + fn_generateRandomString(4));
            this.props.shape.valid = false;
        }

        var unit = [];
        
        return (

           <div key={this.props.shape.id} id="geo" className="geo_fence subblock" >
		
		       <p className="bg-warning  text-center"><strong>Polygon Fence</strong></p>
                <div className="form-group"><label>Name</label><input 		  type='text' 	  id='name' className="form-control input-sm"/></div>
                <div className="form-inline text-left"><label className="control-label" >Restricted Area &nbsp; &nbsp;<input type='checkbox' id='chk'  className="form-control "/></label></div>
                <CLSS_FenceAction hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
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
        if (this.props.shape.geofenceInfo.maximumDistance ==null) 
        {
            this.props.shape.geofenceInfo.maximumDistance = DEFAULT_DISTANCE
        }
       $('#geo #distance').val(Math.round(this.props.shape.geofenceInfo.maximumDistance));
     }

    fn_editShape ()
	{
		super.fn_editShape ();

        this.props.shape.geofenceInfo.maximumDistance = $('#geo #distance').val();
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

        if (this.props.shape.geofenceInfo==null)
        {
            this.props.shape.geofenceInfo= {};
            this.props.shape.geofenceInfo.geoFenceName = ('fence_' + fn_generateRandomString(4));
        }

        var unit = [];
        
        return (

           <div key={this.props.shape.id} id="geo" className="geo_fence subblock" >
		
		       <p className="bg-warning  text-center"><strong>Polygon Fence</strong></p>
                <div className="form-group"><label>Name</label><input 		  type='text' 	  id='name' className="form-control input-sm"/></div>
                <div className="form-inline text-left"><label className="control-label" >Restricted Area &nbsp; &nbsp;<input type='checkbox' id='chk'  className="form-control "/></label></div>
                <CLSS_FenceAction hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <div className="form-group text-left"><label className="control-label">Minimum Distance</label> <div className="form-inline text-left"><input type='number' 		id='distance' className="form-control" /> &nbsp; meters</div></div>
		        <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
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

        this.props.shape.geofenceInfo.maximumDistance = $('#geo #radius').val();
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

        if (this.props.shape.geofenceInfo==null)
        {
            this.props.shape.geofenceInfo= {};
            this.props.shape.geofenceInfo.geoFenceName = ('fence_' + fn_generateRandomString(4));
        }

        var unit = [];
        
        return (

           <div key={this.props.shape.id} id="geo" className="geo_fence subblock" >
		
		        <p className="bg-warning  text-center"><strong>Circle Fence</strong></p>
		        <div className="form-group text-left"><label >Name</label><input 		  type='text' 	  id='name' className="form-control"/></div>
		        <div className="form-inline text-left"><label className="control-label" >Restricted Area &nbsp; &nbsp;<input type='checkbox' id='chk'  className="form-control "/></label></div>
		        <CLSS_FenceAction hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
                <div className="form-group text-left"><label className="control-label">Radius</label> <div className="form-inline text-left"><input type='number' 		id='radius' className="form-control" readOnly/> &nbsp; meters</div></div>
	         <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
            </div> 
                    );
           
     }
}

class CLSS_RectangleControl extends CLSS_ShapeControl {

    constructor()
	{
		super ();
		
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

        if (this.props.shape.geofenceInfo==null)
        {
            this.props.shape.geofenceInfo= {};
            this.props.shape.geofenceInfo.geoFenceName = ('fence_' + fn_generateRandomString(4));
        }

        var unit = [];
        
        return (

           <div key={this.props.shape.id} id="geo" className="geo_fence subblock" >
		
		    <p className="bg-warning  text-center"><strong>Rectangle Fence</strong></p>
		    <div className="form-group"><label>Name</label><input type='text' id='name' className="form-control input-sm"/></div>
		    <div className="form-inline text-left"><label className="control-label" >Restricted Area &nbsp; &nbsp;<input type='checkbox' id='chk'  className="form-control "/></label></div>
		    <CLSS_FenceAction hardCLSS_FenceAction={this.props.shape.isHardFence==null?0:this.props.shape.isHardFence}/>
            <button className="button btn-primary" id='btn'  onClick={ (e) => this.fn_editShape()}>Apply</button>
            </div> 
                    );
     }
}




class CLSS_FenceCLSS_ShapeControl extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
			shapesList:[]
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
    

    fn_displayGeoForm (me,p_shape)
    {
        fn_console_log ("REACT:fn_displayGeoForm" );

       // hlp_hideGeoForms();
		me.setState({ shapeType:p_shape.shapetype, shape: p_shape});

		
    }

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_displayGeoForm,this,this.fn_displayGeoForm);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_displayGeoForm,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onSocketStatus,this);
    }

    
    render() {
   
        var v_unit = [];
        

        if (this.state.shapeType == 0)
        {
            v_unit.push (<h4 key="h4">Please Select A Shape</h4>);
        }
        else
        {
            if (window.v_map != null)
            {
                if (this.state.is_connected == true)
                {
                    switch (this.state.shapeType)
                    {
                        case google.maps.drawing.OverlayType.MARKER:
                        break;
                        
                        case google.maps.drawing.OverlayType.RECTANGLE:
                            v_unit.push (<CLSS_RectangleControl shape = {this.state.shape}></CLSS_RectangleControl>);
                        break;   

                        case google.maps.drawing.OverlayType.CIRCLE:
                            v_unit.push (<CLSS_CircleControl shape = {this.state.shape}></CLSS_CircleControl>);
                        break;

                        case google.maps.drawing.OverlayType.POLYGON:
                            v_unit.push (<CLSS_PolygonControl shape = {this.state.shape}></CLSS_PolygonControl>);
                        break;
                    
                        case google.maps.drawing.OverlayType.POLYLINE:
                            v_unit.push (<CLSS_PolylineControl shape = {this.state.shape}></CLSS_PolylineControl>);
                        break;

                        default:
                            v_unit.push (<h4>Please Create or Select a Region</h4>);
                        break;
                    }
                }
                else
                {
                    v_unit.push (<h4>Please login first.</h4>)    ;
                }
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