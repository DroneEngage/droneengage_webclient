
class CLSS_GamePadAxisControl extends React.Component {

    render()
    {
        return (
            <div >
            <svg viewBox="-2.2 -2.2 4.4 4.4" width="128" height="128">
                <circle cx="0" cy="0" r="2" fill="none" stroke="#888" strokeWidth="0.04"></circle>
                <path d="M0,-2L0,2M-2,0L2,0" stroke="#888" strokeWidth="0.04"></path>
                <circle cx={this.props.x*2} cy={this.props.y*2} r="0.22" fill="red" className="axis"></circle>
                <text textAnchor="middle" fill="#CCC" x="0" y="2">{this.props.x + "," + this.props.y}</text>
            </svg>
            </div>
        );
    }
}


class CLSS_GamePadButton extends React.Component {
    render()
    {
        const c_color = this.props.pressed==true?this.props.color_active:this.props.color_inactive;
        fn_console_log ("buttion " + this.props.color_active);
        return (
            <div>
                <svg viewBox="-2.2 -2.2 4.4 4.4" width="48" height="48">
                    <circle cx="0" cy="0" r="1.5" fill={c_color} stroke={this.props.color_active} strokeWidth="0.2"></circle>
                    <circle cx="0" cy="0" r="1.0" fill="none"  className="button"></circle>
                    <text className="gp_index" dominantBaseline="central" textAnchor="middle" fill={this.props.color_active} x="0" y="0">{this.props.t}</text>
                </svg>
            </div>
        );
    }
}


class CLSS_GamePadAxesControl extends React.Component {

    constructor()
	{
		super ();
        
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_GamePad_Axes_Updated,this, this.fn_gamePadAxesUpdated);
    }
    
    fn_gamePadAxesUpdated(p_me,p_obj)
    {
        p_me.forceUpdate();
    }

    
    componentWillUnmount () 
    {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_GamePad_Axes_Updated,this);
    }

    render()
    {
        const c_padStatus = window.AndruavLibs.AndruavGamePad.fn_getGamePad(this.props.p_index);

        var v_axis = [0,1,2,3];

        // KEEP GUI as Sticks ... dont change it that is why we comment below code
        // switch(window.AndruavLibs.LocalStorage.fn_getGamePadMode())
        // {
        //     case 1:
        //         v_axis = [0,3,2,1];
        //         break;
        //     case 2:
        //         v_axis = [0,1,2,3];
        //         break;
        //     case 3:
        //         v_axis = [2,3,0,1];
        //         break;
        //     case 4:
        //         v_axis = [2,1,0,3];
        //         break;
                            
        // }

        return (
            <div className='gp_axes'>
                <CLSS_GamePadAxisControl id='axes1' x={c_padStatus.p_axes[v_axis[0]]} y={c_padStatus.p_axes[v_axis[1]]}></CLSS_GamePadAxisControl>
                <CLSS_GamePadAxisControl id='axes2' x={c_padStatus.p_axes[v_axis[2]]} y={c_padStatus.p_axes[v_axis[3]]}></CLSS_GamePadAxisControl>
            </div>
                
        );
    }
}

class CLSS_GamePadButtonControl extends React.Component {
    
    
    constructor()
	{
		super ();
        
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_GamePad_Button_Updated,this, this.fn_gamePadButtonUpdated);
    }
    
    fn_gamePadButtonUpdated(p_me,p_obj)
    {
        p_me.forceUpdate();
    }

    
    componentWillUnmount () 
    {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_GamePad_Button_Updated,this);
    }


    render()
    {
        const c_padStatus = window.AndruavLibs.AndruavGamePad.fn_getGamePad(this.props.p_index);
        return (
            <div className='gp_buttons'>
                <CLSS_GamePadButton id='btn4' t='L' color_active='white'     color_inactive='none' pressed={c_padStatus.p_buttons[4].m_pressed}></CLSS_GamePadButton>
                <CLSS_GamePadButton id='btn0' t='A' color_active='green'     color_inactive='none' pressed={c_padStatus.p_buttons[0].m_pressed}></CLSS_GamePadButton>
                <CLSS_GamePadButton id='btn1' t='B' color_active='red'       color_inactive='none' pressed={c_padStatus.p_buttons[1].m_pressed}></CLSS_GamePadButton>
                <CLSS_GamePadButton id='btn2' t='X' color_active='blue'      color_inactive='none' pressed={c_padStatus.p_buttons[2].m_pressed}></CLSS_GamePadButton>
                <CLSS_GamePadButton id='btn3' t='Y' color_active='yellow'    color_inactive='none' pressed={c_padStatus.p_buttons[3].m_pressed}></CLSS_GamePadButton>
                <CLSS_GamePadButton id='btn5' t='R' color_active='white'     color_inactive='none' pressed={c_padStatus.p_buttons[5].m_pressed}></CLSS_GamePadButton>
            </div>
        );
    }
}


class CLSS_GamePadControl extends React.Component {

    constructor()
	{
        super ();

        this.state =
        {
            m_andruavUnit: null,
            m_mode: window.AndruavLibs.LocalStorage.fn_getGamePadMode()
        };
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_GamePad_Connected,this, this.fn_gamePadConnected);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_GamePad_Disconnected,this, this.fn_gamePadDisconnected);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_requestGamePad,this, this.fn_requestGamePad);
        window.AndruavLibs.EventEmitter.fn_subscribe(EE_releaseGamePad,this, this.fn_releaseGamePad);
    }
    
    fn_renderMainOutput(p_connected)
    {
        if (p_connected === true)
        {
            this.m_output = (
                <div className='gp_input'>
                    <div className="row  margin_2px css_padding_zero">
                        <div className='col-12'>
                            <CLSS_GamePadAxesControl p_index={this.props.p_index}></CLSS_GamePadAxesControl>
                        </div>
                        <div className='col-12'>
                            <CLSS_GamePadButtonControl p_index={this.props.p_index}></CLSS_GamePadButtonControl>
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            this.m_output = (<div>NO Gamepad Detected</div>);
        }
    }

    fn_gamePadConnected(p_me,p_obj)
    {
        p_me.forceUpdate();
    }

    fn_gamePadDisconnected(p_me,p_obj)
    {
        p_me.forceUpdate();
    }

    fn_changeMode (p_mode)
    {
        if (isNaN(p_mode)) return ;

        window.AndruavLibs.LocalStorage.fn_setGamePadMode(p_mode);
        v_SpeakEngine.fn_speak ('Game pad mode is set to ' + p_mode.toString());
        this.forceUpdate();
    }

    /***
     * called when WebClient needs to assign gamePad readings to a given drone.
     */
    fn_requestGamePad(p_me,p_andruavUnit)
    {
        if (p_andruavUnit == null) return ;
        p_me.state.m_andruavUnit = p_andruavUnit;
        $('#modal_ctrl_gamepad').find('#btnGoto').unbind("click");
        $('#modal_ctrl_gamepad').find('#btnGoto').click(function () {
            fn_gotoUnit_byPartyID($('#modal_ctrl_gamepad').attr(p_andruavUnit.partyID));
        });
        $('#modal_ctrl_gamepad').show();
        p_me.forceUpdate();
    }
    
    fn_releaseGamePad(p_me,p_andruavUnit)
    {
        p_me.state.m_andruavUnit = null;
        $('#modal_ctrl_gamepad').hide();  
        p_me.forceUpdate();
    }

        
    componentWillUnmount ()
    {
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_GamePad_Connected,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_GamePad_Disconnected,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_requestGamePad,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_releaseGamePad,this);
    }   


    

    componentDidMount () {
        $('#modal_ctrl_gamepad').hide();
        $('#modal_ctrl_gamepad').draggable();
        $('#modal_ctrl_gamepad').mouseover(function () {
            $('#modal_ctrl_gamepad').css('opacity', '1.0');
        });
        $('#modal_ctrl_gamepad').mouseout(function () {
            if ($('#modal_ctrl_gamepad').attr('opacity') == null) {
                $('#modal_ctrl_gamepad').css('opacity', '0.4');
            }
        });
        $('#modal_ctrl_gamepad').find('#opaque_btn').click(function () {
            if ($('#modal_ctrl_gamepad').attr('opacity') == null) {
                $('#modal_ctrl_gamepad').attr('opacity', '1.0');
                $('#modal_ctrl_gamepad').css('opacity', '1.0');
            }
            else {
                $('#modal_ctrl_gamepad').attr('opacity', null);
            }
        });
        $('#modal_ctrl_gamepad').find('#btnGoto').click(function () {
            fn_gotoUnit_byPartyID($('#modal_ctrl_gamepad').attr('partyID'));
        });
    }

    
    render()
    {
        const c_mode = window.AndruavLibs.LocalStorage.fn_getGamePadMode();
    
        this.fn_renderMainOutput (window.AndruavLibs.AndruavGamePad.fn_isGamePadDefined() === true);
        
        fn_console_log (this.m_output);
        var v_title = this.state.m_andruavUnit!= null?this.state.m_andruavUnit.m_unitName:'NA';
        return (<div id="modal_ctrl_gamepad" title="GamePad Control" className="localcontainer css_ontop">
                    <h4 id="title" className="modal-title text-warning">GamePad of {v_title} </h4>
                    {this.m_output}
					<div id="modal_gamepad_footer" className="form-group text-center localcontainer bg-dark">
                        <div className = "row">
                            <div className = "col-4">
                                <button id="opaque_btn" type="button" className="btn  btn-sm btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">opaque</button>
                            </div>    
                            <div className = "col-4">
                                <button id="btnGoto" type="button" className="btn  btn-sm btn-success">Goto</button>
                            </div>
                            
                            <div className = "col-4">
                                <div className="nav-item dropdown">
                                    <button className="btn  btn-sm btn-danger dropdown-toggle show" data-bs-toggle="dropdown"aria-haspopup="true" aria-expanded="false">{"Mode " + c_mode.toString() + " "}</button>
                                    <div className="dropdown-menu show" data-popper-placement="bottom-start">
                                    <a className="dropdown-item" href="#" onClick={ (e) => this.fn_changeMode(1)}>Mode 1</a>
                                    <a className="dropdown-item" href="#" onClick={ (e) => this.fn_changeMode(2)}>Mode 2</a>
                                    <a className="dropdown-item" href="#" onClick={ (e) => this.fn_changeMode(3)}>Mode 3</a>
                                    <a className="dropdown-item" href="#" onClick={ (e) => this.fn_changeMode(4)}>Mode 4</a>
                                    </div>
                                </div>
                            </div>    
                            
                        </div>
                    </div>
                </div>);
    }
}



ReactDOM.render(
    <CLSS_GamePadControl p_index='0' />,
    v_G_getElementById('gamepadCtrl')
);




