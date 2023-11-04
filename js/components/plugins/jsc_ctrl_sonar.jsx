export class CLSS_CTRL_SONAR    extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            'm_update': 0
        };
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_customSONAR,this,this.fn_unitUpdated);
    }

    fn_unitUpdated (p_me,p_andruavUnit)
    {
        try
        {
            if (p_me.props.p_unit.partyID != p_andruavUnit.partyID) return ;
            if (p_me.state.m_update == 0) return ;
            p_me.setState({'m_update': p_me.state.m_update +1});
        }
        catch (ex)
        {

        }
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_customSONAR,this);
    }

    componentDidMount () 
    {
        this.state.m_update = 1;
    }


    fn_pauseSonar(p_andruavUnit)
    {
        if (p_andruavUnit==null) return;
        v_andruavClient.API_pauseSonar(p_andruavUnit);
        v_andruavClient.API_requestSonarRequestStatus(p_andruavUnit);
    }

    fn_resumeSonar(p_andruavUnit)
    {
        if (p_andruavUnit==null) return;
        v_andruavClient.API_resumeSonar(p_andruavUnit);
        v_andruavClient.API_requestSonarRequestStatus(p_andruavUnit);
    }


    fn_getSonarStatus(p_andruavUnit)
    {
        if (p_andruavUnit==null) return;
        v_andruavClient.API_requestSonarRequestStatus(p_andruavUnit);
    }




    render() {

        if (this.props.p_unit.m_extra.m_sonar== null) 
        {
            return (
                <div key='sonar_1' id='sonar_1'>
                    
                </div>
            );
        }


        const v_andruavUnit = this.props.p_unit;
        const c_sonar = this.props.p_unit.m_extra.m_sonar;
        var  v_sonar_buttom =[];
        
        if ((c_sonar.m_is_initialized===true) && (c_sonar.m_is_paused===false))
        {
            v_sonar_buttom.push(<p key={Math.random().toString(36)}  className="text-success">Sonar is Active <span className="text-success">{c_sonar.m_log_filename}</span></p>);
        }
        else
        {
            v_sonar_buttom.push(<p key={Math.random().toString(36)}  className="text-danger">Sonar is Inactive <span className="text-light">{c_sonar.m_log_filename}</span></p>);
        }



        return(
            <div key={Math.random().toString(36)} id='sonar_1' className= 'row al_l  css_margin_zero '>
                <div key={Math.random().toString(36)} className = 'row al_l css_margin_zero d-flex '>
                    <div key={Math.random().toString(36)}  className= 'col-12 user-select-none '>
                        {v_sonar_buttom}
                        <div key={Math.random().toString(36)} id="main_btn_group"  role="group" aria-label="Basic example">
                        <button type="button" id="btn_startSonar" className="btn btn-success btn-sm ctrlbtn" title='Start Sonar' onClick={(e) => this.fn_resumeSonar(v_andruavUnit)}><strong>Start Sonar</strong></button>
                        <button type="button" id="btn_stopSonar" className="btn btn-danger btn-sm ctrlbtn" title='Stop SOnar' onClick={(e) => this.fn_pauseSonar(v_andruavUnit)}><strong>Pause Sonar</strong></button>
                        <button type="button" id="btn_refreshSonar" className="btn btn-warning btn-sm ctrlbtn" title='Stop SOnar' onClick={(e) => this.fn_getSonarStatus(v_andruavUnit)}><strong>Refresh</strong></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
 