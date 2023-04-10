
class CLSS_GUIMessage extends React.Component {
	constructor()
	{
		super ();
		this.state = {
            m_hidden: true,
            m_title: "",
            m_msg: "",
            m_level: ""
        };
    
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onGUIMessage, this, this.fn_onMessage);
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onGUIMessageHide, this, this.fn_onHide);
    
    }


    fn_onMessage (p_me,p_params)
    {
        p_me.state.m_title    = p_params.p_title;
        p_me.state.m_msg      = p_params.p_msg;
        p_me.state.m_level    = p_params.p_level;
        p_me.state.m_hidden   = false;
        p_me.forceUpdate();
    }

    fn_onHide(p_me)
    {
        p_me.state.m_hidden   = true;
        p_me.forceUpdate();
    }

    fn_hide ()
    {
        this.state.m_hidden   = true;
        this.forceUpdate();
    }


    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onGUIMessage,this);
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onGUIMessageHide,this);
    }


    render () 
    {
        if (this.state.m_hidden == true) 
        {
            return (
                <div  display="none" >
							
						</div>
            );
        }
        
        else 
        {

        return (
                <div id="alertdiv" className="container-fluid gray_border localcontainer">
							<div id="alert" className={'alert alert-dismissible  alert-' + this.state.m_level}>
                            <button type="button" className="btn-close" onClick={() => this.fn_hide()}></button>
  
                            <h4 className="alert-heading">{this.state.m_title}</h4>
                                
								<p id='msg' className="mb-0" dangerouslySetInnerHTML={{__html: this.state.m_msg}} />
							</div>
						</div>

        );
        }
    }

}


ReactDOM.render(
    <CLSS_GUIMessage p_index='0' />,
    window.document.getElementById('guiMessageCtrl')
);

