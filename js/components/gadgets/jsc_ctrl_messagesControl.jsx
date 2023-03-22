
class CLSS_AndruavMessageItem extends React.Component {

    
    
    render () 
    {
        var v_text_color = " text-white ";
        switch (this.props.p_msg.m_msg.m_error.notification_Type)
        {
            case 0:
            case 1:
            case 2:
            case 3:
                v_text_color = " text-danger ";
                break;
            case 4:
                v_text_color = " text-warning ";
                break;
            case 5:
            case 6:
            case 7:
                v_text_color = " text-success ";
                break;
        }

        return (
        <tr className = {v_text_color}>
            <td key={this.props.p_index} scope="row">{this.props.p_msg.time}</td>
            <td scope="row">{this.props.p_msg.m_msg.m_notification_Type}</td>
            <td scope="row">{this.props.p_msg.m_msg.m_error.Description}</td>
        </tr>
        );
    }
}

export  class CLSS_AndruavMessageLog  extends React.Component {

    constructor()
    {
        super();
        this.state={
            m_message: []
        };
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onMessage, this, this.fn_onMessage);
    }

    fn_onMessage (p_me, p_msg)
    {
        /*
            c_msg.m_unit = p_andruavUnit;
			c_msg.m_notification_Type = v_notification_Type;
			c_msg.m_cssclass = v_cssclass;
			c_msg.m_error = p_error
		*/

        if (p_me.props.p_unit.partyID != p_msg.m_unit.partyID) return ;
        
        p_me.state.m_message.push ({
            m_msg: p_msg,
            time: (new Date()).toLocaleTimeString()
        });

        p_me.forceUpdate();

    }

    fn_clear (e)
    {
        this.state.m_message = [];
        this.forceUpdate();
    }

    componentWillUnmount () {
        window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onMessage,this);
    }

    render () {
        var v_messages=[];

        const len = this.state.m_message.length>0?this.state.m_message.length:0;
        for (var i=len-1; i>=0; --i) 
        {
            v_messages.push(<CLSS_AndruavMessageItem key={this.props.p_unit.partyID + "_log" + i} p_index={i} p_msg={this.state.m_message[i]}/>)
        }
        
        return (
            <div className="">
                 <div key='params' id="parameters_sublist" className="d-flex justify-content-end">
                            <button type="button" className="btn btn-success btn-sm ctrlbtn"  title='Clear Messages' onClick={(e) => this.fn_clear(e)}>Clear</button>
                 </div>
                 <table className = "table table-dark css_table_log">
                    <thead>
                        <tr>
                        <th data-sort-type="text" className="w-25" scope="col">time</th>
                        <th className="w-25" scope="col">Type</th>
                        <th data-sort-type="text" className="w-75" scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {v_messages}
                    </tbody>
                </table>
            </div>
        ) 
    }
}

