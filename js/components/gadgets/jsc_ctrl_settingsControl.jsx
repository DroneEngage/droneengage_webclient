export  class CLSS_CTRL_SETTINGS   extends React.Component {
    
    constructor()
    {
        super();
        this.state={
            m_message: []
        };
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_unitUpdated,this,this.fn_unitUpdated);

    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_unitUpdated,this);
    }

    fn_unitUpdated (p_me,p_andruavUnit)
    {
        if (p_me.props.p_unit.partyID != p_andruavUnit.partyID) return ;

        p_me.forceUpdate();
    }

    render () {
        
        var module_version;

        const v_andruavUnit = this.props.p_unit;
        if (v_andruavUnit.m_isDE==false)
        {
            module_version = "Andruav";
        }
        else
        {
            module_version = "DE version: " + v_andruavUnit.m_version;
            const len = v_andruavUnit.m_modules.length;
            for (var i=0; i< len; ++i)
            {
                const module = v_andruavUnit.m_modules[i];
                module_version += '  -  ';
                module_version += module.i + '(' + module.v +')';
            }
        }

        return (
            <div>
            <div className='row css_margin_zero padding_zero '>
                <div className="col-6">
                    <p className="textunit user-select-all"><span><small><b>Received {parseFloat(v_andruavUnit.m_NetworkStatus.m_received_bytes/1024).toFixed(2)} KB</b></small></span></p>
                </div>
                
                <div className="col-6">
                    <p className="textunit user-select-all"><span><small><b>Received {v_andruavUnit.m_NetworkStatus.m_received_msg} msgs</b></small></span></p>
                </div>
            </div>
            <div className='row css_margin_zero padding_zero '>
                <div className="col-12">
                    <p className="textunit_nowidth user-select-all"><span><small><b>{module_version}</b></small></span></p>
                </div>
            </div>
            <div className='row css_margin_zero padding_zero '>
                <div className="col-12">
                    <p className="textunit_nowidth user-select-all"><span><small><b>Last Active {Date(v_andruavUnit.m_lastActiveTime)} </b></small></span></p>
                </div>
            </div>
            </div>
            
        )
    }
}