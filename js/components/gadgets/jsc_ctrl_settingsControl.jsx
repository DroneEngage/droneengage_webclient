import {CLSS_RX_MESSAGE} from './gadgets/jsc_ctrl_rx_messageControl.jsx'

export  class CLSS_CTRL_SETTINGS   extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state={
            m_traffic_monitor: false,
            m_message: [],
		    'm_update': 0
        };
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_unitUpdated,this,this.fn_unitUpdated);
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_unitUpdated,this);
    }

    componentDidMount () 
    {
        this.state.m_update = 1;
    }

    fn_unitUpdated (p_me,p_andruavUnit)
    {
        if (p_me.props.p_unit.partyID != p_andruavUnit.partyID) return ;
        if (p_me.state.m_update == 0) return ;
        p_me.setState({'m_update': p_me.state.m_update +1});
        //me.forceUpdate();
    }

    fn_changeTelemetryPort(p_andruavUnit)
    {
        if (p_andruavUnit==null) return;
        
        fn_changeUDPPort(p_andruavUnit);
    }

    fn_toggleTrafficMonitor()
    {
        this.setState({'m_traffic_monitor': !this.state.m_traffic_monitor});
    }

    render() {
        
        var module_version = [];

        const v_andruavUnit = this.props.p_unit;
        if (v_andruavUnit.m_isDE==false)
        {
            module_version.push(<span>Andruav</span>);
        }
        else
        {
            module_version.push(<span className=''>DE version: {v_andruavUnit.m_version}</span>);
            const len = v_andruavUnit.m_modules.length;
            if (len==0)
            {
                module_version.push(<span className='text-warning'>&nbsp;( no modules connected ) </span>);
            }
            else
            {
                for (var i=0; i< len; ++i)
                {
                    const module = v_andruavUnit.m_modules[i];
                    
                    if (module.d == true)
                    {
                        module_version.push(<span>&nbsp;-&nbsp;<span className='text-danger'>{module.i} {module.v}</span> <span className='blink_alert animate_iteration_5s'>OFFLINE</span></span>);
                    }
                    else
                    {
                        module_version.push(<span>&nbsp;-&nbsp;<span className='text-success'>{module.i} {module.v}</span></span>);
                    }
                }
            }
        }
        
        var cmd_btns = [];
        if (CONST_FEATURE.DISABLE_UDPPROXY_UPDATE !== true)
        {
            cmd_btns.push(<div key={v_andruavUnit.partyID + 'Set4'}  className='row css_margin_zero padding_zero border-top border-secondary'>
                
                <div key={v_andruavUnit.partyID + 'Set41'} className="col-12 mt-1">
                <div className = 'row al_l css_margin_zero d-flex '>
                    <div className= 'col-6 col-sm-3 user-select-none '>
                    <p className=' rounded-3 text-white bg-danger cursor_hand textunit_nowidth al_c' title ='Change UDP Proxy Port' onClick={() => this.fn_changeTelemetryPort(v_andruavUnit)}>Proxy Port</p>
                    </div>
                </div>
                </div>
            </div>);
        }
        
        var cmd_data = [];
        if (this.state.m_traffic_monitor===true)
        {
            cmd_data.push(<div key={v_andruavUnit.partyID + 'Set4'}  className='row css_margin_zero padding_zero border-top border-secondary'>
                            <div key={v_andruavUnit.partyID + 'Set41'} className="col-12 mt-1">
                            <CLSS_RX_MESSAGE p_unit={v_andruavUnit}/>
                            </div>
                        </div>
            );
        }

        const v_date = (new Date(v_andruavUnit.m_NetworkStatus.m_lastActiveTime));
        
        return (
            <div>
            <div key={v_andruavUnit.partyID + 'Set1'} className='row css_margin_zero padding_zero '>
                <div key={v_andruavUnit.partyID + 'Set11'} className="col-6">
                    <p key={v_andruavUnit.partyID + 'Set12'} className="textunit user-select-all m-0" onClick={(e) => this.fn_toggleTrafficMonitor(e)}><span><small><b>Received {parseFloat(v_andruavUnit.m_NetworkStatus.m_received_bytes/1024).toFixed(2)} KB</b></small></span></p>
                </div>
                
                <div className="col-6">
                    <p className="textunit user-select-all m-0" onClick={(e) => this.fn_toggleTrafficMonitor(e)}><span><small><b>Received {v_andruavUnit.m_NetworkStatus.m_received_msg} msgs</b></small></span></p>
                </div>
            </div>
            <div key={v_andruavUnit.partyID + 'Set2'} className='row css_margin_zero padding_zero '>
                <div key={v_andruavUnit.partyID + 'Set21'} className="col-12">
                    <p key={v_andruavUnit.partyID + 'Set22'} className="textunit_nowidth user-select-all m-0"><span><small><b>{module_version}</b></small></span></p>
                </div>
            </div>
            <div key={v_andruavUnit.partyID + 'Set3'}  className='row css_margin_zero padding_zero '>
                <div key={v_andruavUnit.partyID + 'Set31'} className="col-12">
                    <p key={v_andruavUnit.partyID + 'Set32'} className="textunit_nowidth user-select-all m-0"><span><small><b>Last Active <span className='text-warning' ><small><b>{v_date.toUTCString()}</b></small></span> </b></small></span></p>
                </div>
            </div>
            {cmd_btns}
            {cmd_data}
            </div>
            
        )
    }
}