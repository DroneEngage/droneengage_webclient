export  class CLSS_CTRL_SETTINGS   extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state={
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

    render () {
        
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

        return (
            <div>
            <div key={v_andruavUnit.partyID + 'Set1'} className='row css_margin_zero padding_zero '>
                <div key={v_andruavUnit.partyID + 'Set11'} className="col-6">
                    <p key={v_andruavUnit.partyID + 'Set12'} className="textunit user-select-all m-0"><span><small><b>Received {parseFloat(v_andruavUnit.m_NetworkStatus.m_received_bytes/1024).toFixed(2)} KB</b></small></span></p>
                </div>
                
                <div className="col-6">
                    <p className="textunit user-select-all m-0"><span><small><b>Received {v_andruavUnit.m_NetworkStatus.m_received_msg} msgs</b></small></span></p>
                </div>
            </div>
            <div key={v_andruavUnit.partyID + 'Set2'} className='row css_margin_zero padding_zero '>
                <div key={v_andruavUnit.partyID + 'Set21'} className="col-12">
                    <p key={v_andruavUnit.partyID + 'Set22'} className="textunit_nowidth user-select-all m-0"><span><small><b>{module_version}</b></small></span></p>
                </div>
            </div>
            <div key={v_andruavUnit.partyID + 'Set3'}  className='row css_margin_zero padding_zero '>
                <div key={v_andruavUnit.partyID + 'Set31'} className="col-12">
                    <p key={v_andruavUnit.partyID + 'Set32'} className="textunit_nowidth user-select-all m-0"><span><small><b>Last Active <span className='text-warning' ><small><b>{Date(v_andruavUnit.m_lastActiveTime)}</b></small></span> </b></small></span></p>
                </div>
            </div>
            </div>
            
        )
    }
}