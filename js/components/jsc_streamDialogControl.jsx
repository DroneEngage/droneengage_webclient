class CLSS_StreamChannel extends React.Component {

    constructor ()
    {
        super ();
        // this.state =
        // {
        //     v_track: null,
        // };
    }

    fn_videoStream()
    {
        const v_track = this.props.prop_session.m_unit.m_Video.m_videoTracks[this.props.prop_track_number];
        fn_VIDEO_login (this.props.prop_session, v_track.id);
        window.AndruavLibs.EventEmitter.fn_dispatch (EE_hideStreamDlgForm); // if you do not hide then you need to request camera list status to update track video streaming
    }

    fn_videoRecord(p_startRecord)
    {
        const v_track = this.props.prop_session.m_unit.m_Video.m_videoTracks[this.props.prop_track_number];
        fn_VIDEO_Record (this.props.prop_session, v_track.id, p_startRecord);
        window.AndruavLibs.EventEmitter.fn_dispatch (EE_hideStreamDlgForm); // if you do not hide then you need to request camera list status to update track recording status
    }

    componentDidMount () 
    {
        
    }

    render ()  {
        const v_track = this.props.prop_session.m_unit.m_Video.m_videoTracks[this.props.prop_track_number];
        var v_unit = this.props.prop_session.m_unit;
        if ((v_unit == null) || (v_track == null))
        {
            
            return (
                <div></div>
            );
        }
        else
        {
            
            var v_stream_class = 'btn-primary';
            var v_record_class = 'btn-primary';
            var v_startRecord = true;
            if ((v_unit.m_Video.m_videoactiveTracks[v_track.id] != null) && (v_unit.m_Video.m_videoactiveTracks[v_track.id].VideoStreaming != CONST_VIDEOSTREAMING_OFF))
            {
                v_stream_class = 'btn-danger';
            }
            if ((v_unit.m_Video.m_videoTracks[this.props.prop_track_number].r != null) && (v_unit.m_Video.m_videoTracks[this.props.prop_track_number].r == true))
            { // recording
                v_record_class = 'btn-danger';
                v_startRecord = false;
            }
            return (
                    <div className="row al_l css_margin_zero">
                            <div className= "col-8   si-09x css_margin_zero text-white">
                            <label>{v_track.ln}</label>
                            </div>
                            <div className= "col-2   si-09x css_margin_zero css_padding_2">
                                <button type="button" className={"btn btn-sm " + v_stream_class}  onClick={ (e) => this.fn_videoStream()}>stream</button>
                            </div>
                            <div className= "col-2   si-09x css_margin_zero css_padding_2">
                                <button type="button" className={"btn btn-sm " + v_record_class} onClick={ (e) => this.fn_videoRecord(v_startRecord)}>record</button>
                            </div>
                        </div>
            );
        }
    };
};


class CLSS_StreamDialog extends React.Component
{
    
    constructor()
	{
		super ();
		this.state = {
			
		};
    
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_displayStreamDlgForm,this, this.fn_displayDialog);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_hideStreamDlgForm,this, this.fn_closeDialog);
    }


    fn_displayDialog (p_me, p_session)
    {
        p_me.setState({'p_session':p_session});
        p_me.forceUpdate();
        $('#modal_ctrl_stream_dlg').show();
    }

    fn_initDialog()
    {
        $('#modal_ctrl_stream_dlg').hide();
        $('#modal_ctrl_stream_dlg').draggable();
        $('#modal_ctrl_stream_dlg').mouseover(function () {
            $('#modal_ctrl_stream_dlg').css('opacity', '1.0');
        });
        $('#modal_ctrl_stream_dlg').mouseout(function () {
            if ($('#modal_ctrl_stream_dlg').attr('opacity') == null) {
                $('#modal_ctrl_stream_dlg').css('opacity', '0.4');
            }
        });
    }

    fn_gotoUnitPressed()
    {
        fn_gotoUnit_byPartyID(this.state.p_session.m_unit.partyID);

    }

    fn_closeDialog()
    {
        $('#modal_ctrl_stream_dlg').hide();
        $('#modal_ctrl_stream_dlg').attr('opacity', null);
        if ((this.state != null) && (this.state.hasOwnProperty('p_session') === true))
        {
            this.state.p_session = null;            
        }
    }

    fn_opacityDialog()
    {
        if ($('#modal_ctrl_stream_dlg').attr('opacity') == null) {
            $('#modal_ctrl_stream_dlg').attr('opacity', '1.0');
            $('#modal_ctrl_stream_dlg').css('opacity', '1.0');
        }
        else 
        {
            $('#modal_ctrl_stream_dlg').attr('opacity', null);
        }
    }

    
    componentWillUnmount ()
    {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_displayStreamDlgForm,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_hideStreamDlgForm,this);
    } 

    componentDidMount () {
        this.fn_initDialog();
    }

    render ()
    {
        var p_andruavUnit = null;
        if ((this.state.hasOwnProperty('p_session')) && (this.state.p_session != null))
        {
            p_andruavUnit = AndruavLibs.AndruavClient.m_andruavUnitList.fn_getUnit(this.state.p_session.m_unit.partyID);
        }

        if (p_andruavUnit == null)
        {
            fn_console_log ("stream:  NULL")
            
            return (
                <div id="modal_ctrl_stream_dlg" title="Streaming Dialog" className="card width_fit_max css_ontop border-light p-2" >
                            
                    <div className="card-header">
						<div className="row">
						  <div className="col-10">
							<h4 className="text-success text-start">Streams of' {v_unitName} </h4>
						  </div>
						  <div className="col-2 float-right">
						  <button id="btnclose" type="button" className="btn-close" onClick={(e)=>this.fn_closeDialog()}></button>
						   </div>
						</div>
				    </div>
                    <div id="card-body"  id="modal_ctrl_stream_footer" className="card-body ">
                        {/* <div className = "row">
                            <div className = "col-md-4">
                                <button id="opaque_btn" type="button" className="btn  btn-sm btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">opaque</button>
                            </div>    
                            <div className = "col-md-4">
                                <button id="btnGoto" type="button" className="btn  btn-sm btn-success">Goto</button>
                            </div>
                            <div className = "col-md-4">
                                <button id="btnHelp" type="button" className="btn  btn-sm btn-primary">Help</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            );
        }
        else
        {
            var p_session;
            var v_streanms = [];
            var v_unitName;

            if ((this.state.hasOwnProperty('p_session')) && (this.state.p_session != null))
            {
                p_session = this.state.p_session;

                for (var i = 0; i < p_session.m_unit.m_Video.m_videoTracks.length; ++i) {
                    v_streanms.push(<CLSS_StreamChannel key={i} prop_session={p_session} prop_track_number={i} />);
                }
                v_unitName = p_session.m_unit.m_unitName
            }

            return (
                <div id="modal_ctrl_stream_dlg" title="Streaming Dialog" className="card width_fit_max css_ontop border-light p-2" >
                            
                <div className="card-header">
                    <div className="row">
                      <div className="col-10">
                        <h4 className="text-success text-start">Streams of' {v_unitName} </h4>
                      </div>
                      <div className="col-2 float-right">
                      <button id="btnclose" type="button" className="btn-close" onClick={(e)=>this.fn_closeDialog()}></button>
                       </div>
                    </div>
                </div>    
                <div id="card-body"  id="modal_ctrl_stream_footer" className="card-body ">
                            <div className='row'>
                                {v_streanms}
                            </div>
                            </div>
                            <div id="modal_ctrl_stream_footer" className="form-group text-center localcontainer">
                                <div className = "btn-group">
                                        <button id="opaque_btn" type="button" className="btn  btn-sm btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off" onClick={(e)=>this.fn_opacityDialog()}>opaque</button>
                                        <button id="btnGoto" type="button" className="btn  btn-sm btn-success" onClick={(e)=>this.fn_gotoUnitPressed()}>Goto</button>
                                        <button id="btnHelp" type="button" className="btn  btn-sm btn-primary">Help</button>
                                    
                                </div>
                            </div>
                        </div>
            );
        }
    }
}



       
ReactDOM.render(
    <CLSS_StreamDialog />,
    v_G_getElementById('CTRL_streamCtrl')
);

