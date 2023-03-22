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
        
        return (
            <div>
            <div className='row css_margin_zero padding_zero '>
                <div className="col-6">
                    <p className="textunit"><span><small><b>Received {parseFloat(this.props.p_unit.m_NetworkStatus.m_received_bytes/1024).toFixed(2)} KB</b></small></span></p>
                </div>
                
                <div className="col-6">
                    <p className="textunit"><span><small><b>Received {this.props.p_unit.m_NetworkStatus.m_received_msg} msgs</b></small></span></p>
                </div>

                
            </div>
            <div className='row css_margin_zero padding_zero '>
                <div className="col-12">
                    <p className="textunit_nowidth"><span><small><b>Last Active {Date(this.props.p_unit.m_lastActiveTime)} </b></small></span></p>
                </div>
            </div>
            </div>
            
        )
    }
}