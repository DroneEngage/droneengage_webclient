export class CLSS_CTRL_ARDUPILOT_EKF_CONTROL extends React.Component {
    constructor()
	{
		super ();
		    this.state = {
		};
    }

    getCss (value)
    {
        if ((value == null) || (value==0.0)) return 'bg-none';
        if (value >= 0.8)
        {
            return 'bg-danger';
        }

        if (value >= 0.5)
        {
            return 'bg-warning';
        }

        return 'bg-success';
    }

    render ()
    {
        const v_andruavUnit = this.props.m_unit;
        const flags = v_andruavUnit.m_EKF.m_flags;
        var css_V = this.getCss(v_andruavUnit.m_EKF.m_velocity_variance);
        var css_PH = this.getCss(v_andruavUnit.m_EKF.m_pos_horiz_variance);
        var css_PV = this.getCss(v_andruavUnit.m_EKF.m_pos_vert_variance);
        var css_CO = this.getCss(v_andruavUnit.m_EKF.m_compass_variance);
        var css_TA = this.getCss(v_andruavUnit.m_EKF.m_terrain_alt_variance);
        var css_AS = this.getCss(v_andruavUnit.m_EKF.m_airspeed_variance);

        
        return (
            <div className = 'row  css_margin_zero css_padding_zero fss-4'>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_V}>V</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_PH}>PH</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_PV}>PV</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_CO}>CO</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_TA}>TA</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_AS}>AS</div>
            </div>
        );
    }
};