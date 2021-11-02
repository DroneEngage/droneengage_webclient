class CLSS_GlobalSettings extends React.Component {
  
  constructor()
	{
		super ();
		this.state = {
		    m_unitText: 'm',
        CONST_DEFAULT_ALTITUDE:CONST_DEFAULT_ALTITUDE,
        CONST_DEFAULT_RADIUS:CONST_DEFAULT_RADIUS,
		};

      //gui_toggleUnits();

      if (window.AndruavLibs.LocalStorage.fn_getMetricSystem()==true)
      {
        this.state.m_unitText = 'm';
      }
      else
      {
        this.state.m_unitText = 'ft';
      }

      this.state.CONST_DEFAULT_ALTITUDE=window.AndruavLibs.LocalStorage.fn_getDefaultAltitude();
      this.state.CONST_DEFAULT_RADIUS=window.AndruavLibs.LocalStorage.fn_getDefaultRadius();
     
    
	}

 shouldComponentUpdate(nextProps, nextState) {
    
  //  fn_console_log ('nextProps ' + JSON.stringify(nextProps) + ' nextState ' + JSON.stringify(nextState));
    

    if (this.props.CONST_DEFAULT_ALTITUDE !== nextState.CONST_DEFAULT_ALTITUDE) {
     return true;
    }
    if (this.state.CONST_DEFAULT_RADIUS !== nextState.CONST_DEFAULT_RADIUS) {
      return true;
    }
    if (this.state.m_unitText !== nextState.m_unitText) {
      return true;
    }
     
    return false;
  }
  

  clickToggleUnit (e) {
    
      gui_toggleUnits();

      if (window.AndruavLibs.LocalStorage.fn_getMetricSystem()==true)
      {
        this.setState({m_unitText:'m'});
      }
      else
      {
        this.setState({m_unitText:'ft'});
      }

   
      //this.state.CONST_DEFAULT_ALTITUDE=CONST_DEFAULT_ALTITUDE;
      this.setState ({CONST_DEFAULT_ALTITUDE:CONST_DEFAULT_ALTITUDE});
      this.setState ({CONST_DEFAULT_RADIUS:CONST_DEFAULT_RADIUS});
      
			  
  }


  fn_onAuthStatus (me,res) {
      me.forceUpdate();
  }

  updateSmartTelemetry (e,v) {
      v_smart_Telemetry_Level = v;
      fn_resumeTelemetry();
  }
  
 componentWillMount () {
				window.AndruavLibs.EventEmitter.fn_subscribe (EE_Auth_Logined, this, this.fn_onAuthStatus);
	}

  componentWillUnmount () {
				window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_Auth_Logined,this);
  }
  
  componentDidMount()
  {
    $('#toggle_GCS').prop("checked", v_en_GCS);      
    $('#toggle_DRONE').prop("checked", v_en_Drone);      
    $('#toggle_ADSB').prop("checked", v_EnableADSB);      
    
    $('#toggle_GCS').change(function (e)
        {
          var state = $(this).prop('checked');
          v_en_GCS = state;
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
          
    $('#toggle_DRONE').change(function (e)
        {
          var state = $(this).prop('checked');
          v_en_Drone = state;
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
          
          
    $('#toggle_ADSB').change(function (e)
        {
          var state = $(this).prop('checked');
          v_EnableADSB = state;
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
  
      
    }


  onChange (e) {

      CONST_DEFAULT_ALTITUDE = parseInt($("#txt_defaultAltitude").val());
      CONST_DEFAULT_RADIUS = parseInt($("#txt_defaultCircle").val());
      
 
      if (CONST_DEFAULT_ALTITUDE < CONST_DEFAULT_ALTITUDE_min) CONST_DEFAULT_ALTITUDE = parseInt(CONST_DEFAULT_ALTITUDE_min);
      if (CONST_DEFAULT_RADIUS < CONST_DEFAULT_RADIUS_min)     CONST_DEFAULT_RADIUS   = parseInt(CONST_DEFAULT_RADIUS_min);


      this.setState ({CONST_DEFAULT_ALTITUDE:CONST_DEFAULT_ALTITUDE});
      this.setState ({CONST_DEFAULT_RADIUS:CONST_DEFAULT_RADIUS});

     
  
  }


  render() {

     var m_unitText= "";
     var tele = "";

     if (window.AndruavLibs.LocalStorage.fn_getMetricSystem()==true)
      {
        m_unitText = 'm';
      }
      else
      {
        m_unitText = 'ft';
      }

      if (window.AndruavLibs.AndruavAuth.fn_do_canTele()==false)
      {
        tele = " " ; //" hidden ";
      }
      
  //  fn_console_log ("REACT:RENDER CLSS_GlobalSettings" + this.state.CONST_DEFAULT_ALTITUDE );
  var v_gadgets = [];
  var v_uploadFile = [];
  var v_telemetryModes = [];
  
  v_gadgets.push (
              <div className="row margin_zero">
                <div className="col-xs-6 col-sm-6 col-lg-6">
                  <div className="form-inline">
                    <div className="form-group">
                      <div>
                        <label htmlFor="txt_defaultAltitude" className="text-primary"><small>Alt&nbsp;Step</small></label>
                        <input id="txt_defaultAltitude" type="number" min={parseInt(CONST_DEFAULT_ALTITUDE_min)} className="form-control input-xs input-sm" placeholder onChange={(e) => this.onChange(e)}  value={this.state.CONST_DEFAULT_ALTITUDE} />
                        <button id="btn_defaultAltitude" className="btn btn-secondary btn-sm" type="button" onClick={ (e) => this.clickToggleUnit(e) }>{this.state.m_unitText}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6">
                  <div className="form-inline">
                    <div className="form-group">
                        <div>
                          <label htmlFor="txt_defaultCircle" className="text-primary"><small>Radius</small></label>
                          <input id="txt_defaultCircle" type="number" min={parseInt(CONST_DEFAULT_RADIUS_min)} className="form-control input-xs input-sm" placeholder onChange={(e) => this.onChange(e)}  value={this.state.CONST_DEFAULT_RADIUS}/>
                          <button id="btn_defaultCircle" className="btn btn-secondary btn-sm" type="button"  onClick={ (e) => this.clickToggleUnit(e) }>{this.state.m_unitText}</button>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
    );


  var check_btns = [];
  if (CONST_DISABLE_ADSG == false)
  {
    check_btns.push (
      <div className="btn-group css_margin_top_small" role="group" >
        <label className="checkbox-inline">
			  <input id="toggle_GCS"    type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> GCS
				</label>
				<label className="checkbox-inline">
				<input id="toggle_DRONE"  type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> Drone
				</label>
				<label className="checkbox-inline">
				<input id="toggle_ADSB"   type="checkbox" data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> ADSB
				</label> 
      </div>
      );
  }
  else
  {
    check_btns.push (
      <div className="btn-group css_margin_top_small" role="group" >
        <label className="checkbox-inline">
	  		<input id="toggle_GCS"    type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> GCS
				</label>
				<label className="checkbox-inline">
				<input id="toggle_DRONE"  type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> Drone
				</label>
      </div>
    );
  }


    v_uploadFile.push (
              <div key='v_uploadFile0' className="row width_100 margin_zero css_margin_top_small ">
                <div key='v_uploadFile1' className={"col-12 " + tele}>
                  <div key='v_uploadFile2' className="form-inline">
                    <div key='v_uploadFile3' className="form-group">
                      <div key='v_uploadFile4' >
                        <label htmlFor="btn_filesWP" className="text-primary"><small>Mission&nbsp;File</small></label>
                        <input type="file" id="btn_filesWP" name="file" className="form-control input-xs input-sm css_margin_left_5"/>
                      </div>
                    </div>
                  </div>
                   {check_btns}
                </div>
              </div>
      );

    


    v_uploadFile.push ();
    
  
  v_telemetryModes.push (
            <div className="row css_margin_top_small">
                <div className={"col-xs-12 col-sm-12 col-lg-12 " + tele}>
                  <p className = 'text-primary'>Smart Telemetry</p>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-danger btn-xs ctrlbtn"   title='No Traffics Optimization [ALL DATA]' onClick={ (e) => this.updateSmartTelemetry(e,0) }>OFF</button>
                    <button type="button" className="btn btn-warning btn-xs ctrlbtn"  title='Low traffic optimization' onClick={ (e) => this.updateSmartTelemetry(e,1) }>LVL 1</button>
                    <button type="button" className="btn btn-success btn-xs ctrlbtn"  title='Mid traffic optimization [recommended]' onClick={ (e) => this.updateSmartTelemetry(e,2) }>LVL 2</button>
                    <button type="button" className="btn btn-success btn-xs ctrlbtn"  title='High traffic optimization' onClick={ (e) => this.updateSmartTelemetry(e,3) }>LVL 3</button>
                    <button type="button" className="btn btn-primary btn-xs ctrlbtn"  title='use settings defined in drone mobile' onClick={ (e) => this.updateSmartTelemetry(e,-1) }>Drone</button>
                  </div>
              
                </div>
            </div>
    );
  return (
     <div key='g1' className="row margin_zero">
            
            {v_gadgets}
            

            {v_uploadFile}

            {v_telemetryModes}
            

      </div>
    );
  }
};

ReactDOM.render(
			<CLSS_GlobalSettings key="global_settings" date={new Date()} myname={' '} />,
			v_G_getElementById('andruavUnits_in')
		);
