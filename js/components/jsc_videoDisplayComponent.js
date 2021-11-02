
class CLSS_CVideoScreen extends React.Component {

    constructor()
	{
        super ();
            this.state = {
                m_flash: CONST_FLASH_DISABLED,
                m_zoom: 0.0
        };
        
        this.m_timerID = null;
        
    }


    fn_gotoUnit (v_e)
    {
        fn_showMap();
        fn_gotoUnit(this.props.obj.v_unit);
    }


    fnl_switchcam (e, p_obj)
    {
        v_andruavClient.API_SwitchCamera (this.props.obj.v_unit, p_obj.v_track);
    }


    fnl_takeLocalImage (e)
    {
        const c_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.obj.v_unit);
        if (c_andruavUnit == null)
        {
            return ;
        }

        
        if ((c_andruavUnit.m_Video.m_videoactiveTracks[this.props.obj.v_track].mmRTC != null))
        {
            fn_takeLocalImage(c_andruavUnit,this.props.obj.v_track,id);
        }
        else
        {
            fn_takeLocalImage(c_andruavUnit,this.props.obj.v_track,id);
        }

    }


    fnl_stoprecord (p_andruavUnit,p_activeTrack,p_blob,id)
    {

        var filename = 'video_';
        if (p_andruavUnit!=null)
        {
            filename = filename + p_andruavUnit.m_unitName;
        }

        invokeSaveAsDialog (p_blob,filename);
        var talk = p_andruavUnit.m_Video.m_videoactiveTracks[p_activeTrack];
        talk.VideoRecording = false;
        window.AndruavLibs.EventEmitter.fn_dispatch(EE_videoStreamRedraw,{'andruavUnit': p_andruavUnit,'v_track':p_activeTrack});
    }


    fnl_recordVideo (v_e)
    {
        var v_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.obj.v_unit);
        if (v_andruavUnit == null)
        {
            return ;
        }
        
        var v_me = this;
        var v_activeTrack = v_andruavUnit.m_Video.m_videoactiveTracks[this.props.obj.v_track];
        if ((v_activeTrack.mmRTC != null) && (v_activeTrack.mmRTC.isStoppedRecording==false))
        {
            //window.recordRTC.stopRecording ( function (blob) {
                v_activeTrack.mmRTC.stop (function (p_blob) {
                    v_me.fnl_stoprecord (v_andruavUnit,v_me.props.obj.v_track,p_blob,id);
                    v_activeTrack.mmRTC = undefined;
                   
            });
        }
        else
        {
            fn_console_log ("start recording");
            fn_startrecord (v_andruavUnit,this.props.obj.v_track);
                    
        }
    }



    fnl_stopVideo (v_e)
    {
        var v_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.obj.v_unit);
		if ((v_andruavUnit==undefined) || (v_andruavUnit == null)) return ;
		const v_talk = v_andruavUnit.m_Video.m_videoactiveTracks[this.props.obj.v_track];
        v_talk.hangup(true);
		v_andruavClient.API_CONST_RemoteCommand_streamVideo(v_andruavUnit,false,v_talk.number,this.props.obj.v_track);
        v_andruavUnit.m_Video.VideoStreaming = CONST_VIDEOSTREAMING_OFF;
        // mark stream as closes
        //v_talk = CONST_VIDEOSTREAMING_OFF;
        this.forceUpdate();
    }



    fn_videoRedraw(p_me,p_obj)
    {
        if (p_me.props.obj.v_unit != p_obj.andruavUnit.partyID)
        {
            return ;
        }
        if (p_me.props.obj.v_track != p_obj.v_track)
        {
            return ;
        }
        p_me.forceUpdate();
    }



    fn_flashChanged(p_me, p_obj)
    {
        if (p_me.props.obj.v_unit != p_obj.p_unit.partyID)
        {
            return ;
        }

        // flash value: f
        if ((!p_obj.p_jmsg.hasOwnProperty('f'))
        && (typeof p_obj.p_jmsg['f'] !== 'number')) return ;
        
        p_me.state.m_flash = p_obj.p_jmsg['f'];
        fn_console_log ("Flash Updated" , p_me.state.m_flash);
        p_me.forceUpdate();
    }

    fn_zoomChanged(p_me, p_obj)
    {
        if (p_me.props.obj.v_unit != p_obj.p_unit.partyID)
        {
            return ;
        }

        // zoom value: b
        if ((!p_obj.p_jmsg.hasOwnProperty('b'))
        && (typeof p_obj.p_jmsg['b'] !== 'number')) return ;
        
        p_me.state.m_zoom = (p_obj.p_jmsg['b'] != 0.0);
        fn_console_log ("Zoom Updated" , p_me.state.m_zoom);
        p_me.forceUpdate();
    }

    fn_opacity()
    {
        $('#css_video_ctrl_panel').mouseover ( function ()
        {
            $('#css_video_ctrl_panel').css('opacity', '1.0');
        });
        $('#css_video_ctrl_panel').mouseout ( function ()
        {
            $('#css_video_ctrl_panel').css('opacity', '0.2');
        });

    }
    
    fn_lnkVideo()
    {
        const c_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.obj.v_unit);
        const c_talk = c_andruavUnit.m_Video.m_videoactiveTracks[this.props.obj.v_track];
        var v_video = v_G_getElementById("videoObject" + c_talk.targetVideoTrack);
        if (v_video == null) return ;
        v_video.srcObject = c_talk.stream;
        fn_console_log (c_talk.stream.getTracks()[0]);
    }

    fnl_canvas(p_targets)
    {
        
    }

    fnl_requestPictureInPicture (p_andruavUnit,videoTrackID)
    {
        const c_talk = p_andruavUnit.m_Video.m_videoactiveTracks[videoTrackID];
        const c_videoctrl = '#videoObject'+c_talk.targetVideoTrack;
        const c_video=$(c_videoctrl)[0];
        if (c_video == null)
        {
            return ;
        }
        
        c_video.requestPictureInPicture();
        
    }

    fnl_requestPIP(e)
    {
        const v_andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.obj.v_unit);
        
        if (v_andruavUnit == null)
        {
            return ;
        }

        
        if ((v_andruavUnit.m_Video.m_videoactiveTracks[this.props.obj.v_track].mmRTC != null))
        {
            this.fnl_requestPictureInPicture(v_andruavUnit,this.props.obj.v_track,id);
        }
        else
        {
            this.fnl_requestPictureInPicture(v_andruavUnit,this.props.obj.v_track,id);
                    
        }
    }


    fnl_isFullScreen()
    {
        
        return (window.innerHeight == screen.height) || (!window.screenTop && !window.screenY);
    }

    fnl_requestFullScreen (e)
    {
        const c_ele = v_G_getElementById("div_video_control");
        fn_console_log ("fnl_requestFullScreen");
        if (this.fnl_isFullScreen())
        {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        else
        {
            if (c_ele.requestFullscreen) {
                c_ele.requestFullscreen();
            }
            else if (c_ele.mozRequestFullScreen) {
                c_ele.mozRequestFullScreen();
            }
            else if (c_ele.webkitRequestFullScreen) {
                c_ele.webkitRequestFullScreen();
            }
            else if (c_ele.msRequestFullscreen) {
                c_ele.msRequestFullscreen();
            }  
        }

        
    }

    fnl_zoomInOut (e, p_zoomIn, p_obj)
    {
        fn_console_log ("p_cameraIndex: " + JSON.stringify(p_obj));
        v_andruavClient.API_CONST_RemoteCommand_zoomCamera (p_obj.v_unit, p_obj.v_track, p_zoomIn, null, 0.1);
    }


    fnl_flashOnOff (e, p_obj)
    {
        var v_flashValue = CONST_FLASH_OFF
        if (this.state.m_flash == CONST_FLASH_OFF)
        {   
            v_flashValue = CONST_FLASH_ON;
        }else if (this.state.m_flash == CONST_FLASH_ON)
        {   
            v_flashValue = CONST_FLASH_OFF;
        }
        else
        {
            // disabled.
            return ; 
        }
        fn_console_log ("fnl_flashOnOff p_cameraIndex: " + JSON.stringify(p_obj) + "  " + v_flashValue);
        v_andruavClient.API_TurnMobileFlash (p_obj.v_unit, v_flashValue, p_obj.v_track);

        this.state.m_flash = v_flashValue;
    }


    fnl_div_clicked (e)
    {
        
    }

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_videoStreamRedraw, this, this.fn_videoRedraw);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_cameraFlashChanged, this, this.fn_flashChanged);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_cameraZoomChanged, this, this.fn_zoomChanged);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_videoStreamRedraw,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_cameraFlashChanged,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_cameraZoomChanged,this);
    } 

    componentDidMount() {
        this.fn_lnkVideo();
        var me = this;

        $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)    
        {
            fn_console_log ("I AM CALLED");
            me.forceUpdate();
        });
    }

    componentDidUpdate() {
        this.fn_lnkVideo();
        this.fn_opacity();
        fn_console_log ("componentDidUpdate");
    }
    
    render ()
    {
        var unit = [];
        //fn_console_log (JSON.stringify(this.props));
        var andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(this.props.obj.v_unit);
        var talk = andruavUnit.m_Video.m_videoactiveTracks[this.props.obj.v_track];
        var divID = andruavUnit.partyID +  this.props.obj.v_index;
        if (talk.VideoStreaming == CONST_VIDEOSTREAMING_OFF)
        {
            return (
                <div id={divID} className={"tab-pane fade in " + this.props.first}>
                          <h4 className='bg-danger rounded_6px'>{andruavUnit.m_unitName}</h4>
                          <div>NO VIDEO</div>
                </div>
            );
        }
        
        var css_switchCam;
        const c_trackAttributes = andruavUnit.m_Video.m_videoTracks[this.props.obj.v_index];
        if ((c_trackAttributes.hasOwnProperty("f")) && (c_trackAttributes.f===true))
        {
            css_switchCam = "cursor_hand css_camera_switch";
        }
        else
        {
            css_switchCam = 'hidden';
        }

        var css_zoomCam = '';
        var css_flashCam = '';
        if ((c_trackAttributes.hasOwnProperty("z")) && (c_trackAttributes.z===true))
        {
            css_zoomCam = "cursor_hand ";
        }
        else
        {
            css_zoomCam = 'hidden';
        }

        if ((c_trackAttributes.hasOwnProperty("f")) && (c_trackAttributes.f===true))
        {
            if (this.state.m_flash === CONST_FLASH_ON)
            {
                css_flashCam = "cursor_hand css_camera_flash_on";
            }
            else if (this.state.m_flash === CONST_FLASH_OFF)
            {
                css_flashCam = "cursor_hand css_camera_flash_off";
            }
            else
            {
                // state was initialized disabled and this is the first tie to setup it.
                this.state.m_flash = CONST_FLASH_OFF;
                css_flashCam = "cursor_hand css_camera_flash_off";
            }
        }
        else
        {
            css_flashCam = "hidden ";
        }

        var btn_videorecordClass ;

        if (talk.VideoRecording != true)
        {
            btn_videorecordClass = "cursor_hand  css_recvideo_ready";
        } 
        else
        {
            btn_videorecordClass = "cursor_hand  css_recvideo_active";
        }

        var btn_fullscreen, btn_fullscreen_txt;

        if (this.fnl_isFullScreen())
        {
            btn_fullscreen = "cursor_hand css_fullscreen_active";
            btn_fullscreen_txt = "Exit Full Screen";
        }
        else
        {
            btn_fullscreen = "cursor_hand css_fullscreen";
            btn_fullscreen_txt = "Full Screen";
        }

        var v_btns=[];
        if (CONST_THIS_IS_PUBLIC_VERSION===true)
		{   
        
            v_btns.push (<div id="css_video_ctrl_panel" className="row  margin_2px css_padding_zero">
            <div className="col-xs-1"><img id="btnclose" className="cursor_hand css_video_close" title="Close Camera" onClick={ (e) => this.fnl_stopVideo(e)}/></div>
            <div className="col-xs-1"><img id="btnGoto" className="cursor_hand css_goto_drone" title="Goto Agent" onClick={ (e) => this.fn_gotoUnit(e)}/></div>
            <div className="col-xs-1"></div>
            <div className="col-xs-1"><img id="btnPIP" className="cursor_hand css_video_pip" title="Picture in Picture" onClick={ (e) => this.fnl_requestPIP(e)}/></div>
            <div className="col-xs-1"><img id="btn_fullscreen" className={btn_fullscreen} title={btn_fullscreen_txt} onClick={ (e) => this.fnl_requestFullScreen(e)}/></div>
            <div className="col-xs-1"><img id="btnSwitchCam" className={ css_switchCam } title="Switch between Front & Back Cameras" onClick={ (e) => this.fnl_switchcam(e, this.props.obj)}/></div>
            <div className="col-xs-1"><img id="btn_videorecord" className={btn_videorecordClass} title="Record Web" onClick={ (e) => this.fnl_recordVideo(e)}/></div>
            <div className="col-xs-1"><img id="btn_takeimage" className="cursor_hand css_camera_ready" title="Take Snapshot" onClick={ (e) => this.fnl_takeLocalImage(e)}/></div>
            <div className="col-xs-1"><img id="btn_zoom_in" className={css_zoomCam + " css_camera_zoom_in"} title="Zoom In" onClick={ (e) => this.fnl_zoomInOut(e, true,this.props.obj)}/></div>
            <div className="col-xs-1"><img id="btn_zoom_out" className={ css_zoomCam + " css_camera_zoom_out"} title="Zoom Out" onClick={ (e) => this.fnl_zoomInOut(e, false, this.props.obj)}/></div>
            <div className="col-xs-1"><img id="btn_flash" className={ css_flashCam } title="Flash (Tourch)" onClick={ (e) => this.fnl_flashOnOff(e, this.props.obj)}/></div>
            <div className="col-xs-3"></div>
            </div>);
            
        }

        return (
        <div id={divID} className={"css_videoScreen tab-pane fade in " + this.props.first}>
                <h4 className='bg-primary rounded_6px'>{andruavUnit.m_unitName + ' track: ' + andruavUnit.m_Video.m_videoTracks[this.props.obj.v_index].ln}</h4>
                    {v_btns}
                    <div className='row'>
                        <div id='gimbaldiv' className="col-xs-4">
                            <div>
                                <button id="btnpitchp" type="button" className="btn btn-primary btn-xs">P +</button>
                                <button id="btnrollp" type="button" className="btn btn-primary btn-xs">R +</button>
                                <button id="btnyawp" type="button" className="btn btn-primary btn-xs">Y +</button>
                            </div>
                            <div>
                                <button id="btnpitchm" type="button" className="btn btn-primary btn-xs">P -</button>
                                <button id="btnrollm" type="button" className="btn btn-primary btn-xs">R -</button>
                                <button id="btnyawm" type="button" className="btn btn-primary btn-xs">Y -</button>
                                
                            </div>
                        </div>
                    </div>
                <div id={'css_tvideo-div' + talk.targetVideoTrack} className="css_videoContainer" onClick={ e => this.fnl_div_clicked(e)}>
                <canvas id={"canvasoObject" + talk.targetVideoTrack} className="canvasOverlay"> ALLO </canvas>
                    <video autoPlay className="videoObject" id={"videoObject" + talk.targetVideoTrack} data-number={talk.number}> </video>
                </div>
                
        </div>);
    }
}


class CLSS_CVideoControl extends React.Component {
	constructor()
	{
		super ();
		this.state = {
            m_videoScreens : {},
            lastadded: null
		};
    }


    fn_videoStarted (me,p_obj)
    {
        p_obj.andruavUnit.m_Video.m_videoactiveTracks[p_obj.talk.targetVideoTrack].VideoStreaming = CONST_VIDEOSTREAMING_ON;

        var vid = p_obj.andruavUnit.partyID + p_obj.talk.targetVideoTrack;
        if (me.state.m_videoScreens.hasOwnProperty(vid)==false)
        {
            me.state.m_videoScreens[vid] = {};
            const c_screen = me.state.m_videoScreens[vid];
            c_screen.v_unit = p_obj.andruavUnit.partyID;
            c_screen.v_track = p_obj.talk.targetVideoTrack;
            c_screen.v_index = fn_findWithAttributeIndex(p_obj.andruavUnit.m_Video.m_videoTracks,"id", p_obj.talk.targetVideoTrack);	
            me.state.lastadded = vid;
        }
        
        fn_showVideoMainTab();
        
        me.forceUpdate();
        
        // SIMULATE a click to activate the link.
        // bug: if the tab is already selected then click will not be effective.
        // you need to deactivate the tab in case it is active
        // eq(0) is another bug as using [0] will return a DOM object and you need a JQuery object.
        $('#div_video_control ul li a[href="#' + p_obj.andruavUnit.partyID + me.state.m_videoScreens[vid].v_index + '"]').eq(0).parent().removeClass("active")
        
        // simulate click
        $('#div_video_control ul li a[href="#' + p_obj.andruavUnit.partyID + me.state.m_videoScreens[vid].v_index + '"]')[0].click();
        

    }
    
    fn_videoStopped (me,obj)
    {
        
        obj.andruavUnit.m_Video.m_videoactiveTracks[obj.talk.targetVideoTrack].VideoStreaming = CONST_VIDEOSTREAMING_OFF;
        if (me.state.m_videoScreens.hasOwnProperty(obj.andruavUnit.partyID)==false)
        {
           me.state.m_videoScreens[obj.andruavUnit.partyID] = undefined;
        }

        me.forceUpdate();
        
        
    }

    componentWillMount () {
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_videoStreamStarted, this, this.fn_videoStarted);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_videoStreamStopped, this, this.fn_videoStopped);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_videoStreamStarted,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_videoStreamStopped,this);
    }   


render() {
    const arr = Object.keys (this.state.m_videoScreens);
    
    var len = arr.length;

    if (len==0)
    {
        return (
            <div> NO VIDEOS </div>
        );
    }
    
    var out_h = [];
    var out_b = [];
    for (var i=0; i<len;++i)
    {

        var _first = "";
        const v_key = arr[i];
        var v_obj = this.state.m_videoScreens[v_key];
        if (v_obj != undefined)
        {
            var andruavUnit = v_andruavClient.m_andruavUnitList.fn_getUnit(v_obj.v_unit);
        
       
            if (this.state.lastadded == v_key)
            {
                _first ="active";
            }
            else
            {
                _first ="";
            }

            out_h.push (<li key ={'h'+v_key} ><a data-toggle="tab" className={_first} href={'#' + andruavUnit.partyID + v_obj.v_index}>{andruavUnit.m_unitName + ' #' + v_obj.v_index}</a></li>);
            out_b.push (<CLSS_CVideoScreen key ={v_key}  first={_first}  obj={v_obj}/>);
        }
    }


    return (
        <div className="container-fluid localcontainer">
            <ul  className="nav nav-pills">
            {out_h}
            </ul>
            <div  className="tab-content">
            {out_b}
            </div>
        </div>
    )
}    


}



ReactDOM.render(
    <CLSS_CVideoControl />,
    v_G_getElementById('div_video_control')
);