export class CLSS_CTRL_ARDUPILOT_EKF_CONTROL extends React.Component {
    constructor()
	{
		super ();
		    this.state = {
		};
    }

    render ()
    {
        var v_armed = {
            css:' text-white '
        }
        return (
            <div className = 'row  css_margin_zero css_padding_zero'>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ v_armed.css}>V</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ v_armed.css}>PH</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ v_armed.css}>PV</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ v_armed.css}>CO</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ v_armed.css}>TA</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ v_armed.css}>AS</div>
            </div>
        );
    }
};