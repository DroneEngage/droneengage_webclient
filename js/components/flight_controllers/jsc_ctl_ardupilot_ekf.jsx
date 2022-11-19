export class CLSS_CTRL_ARDUPILOT_EKF extends React.Component {
    constructor()
	{
		super ();
		    this.state = {
		};
    }

    getCss (value)
    {
        var ret = new C_GUI_READING_VALUE();
        if (value == undefined) 
        {
            value = 'na';
        }
        else
        {
            value = value.toFixed(2);
        }
        
        ret.value = value;

        if ((value == null) || (value==0.0)) 
        {
            ret.css = 'bg-none';
        }else
        if (value >= 0.8)
        {
            ret.css = 'bg-danger';
        }else
        if (value >= 0.5)
        {
            ret.css = 'bg-warning';
        }else
        {
            ret.css = 'bg-success';
        }

        return ret
    }

    render ()
    {
        const v_andruavUnit = this.props.m_unit;
        const flags = v_andruavUnit.m_EKF.m_flags;
        var gui_V = this.getCss(v_andruavUnit.m_EKF.m_velocity_variance);
        var gui_PH = this.getCss(v_andruavUnit.m_EKF.m_pos_horiz_variance);
        var gui_PV = this.getCss(v_andruavUnit.m_EKF.m_pos_vert_variance);
        var gui_CO = this.getCss(v_andruavUnit.m_EKF.m_compass_variance);
        var gui_TA = this.getCss(v_andruavUnit.m_EKF.m_terrain_alt_variance);
        var gui_AS = this.getCss(v_andruavUnit.m_EKF.m_airspeed_variance);

        
        return (
            <div className = 'row  css_margin_zero css_padding_zero fss-4'>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ gui_V.css}  title ={'velocity variance X: '  + gui_V.value}>V</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ gui_PH.css} title ={'pos horiz variance X: '  + gui_PH.value}>PH</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ gui_PV.css} title ={'pos vert variance X: '  + gui_PV.value}>PV</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ gui_CO.css} title ={'pos vert variance X: '  + gui_CO.value}>CO</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ gui_TA.css} title ={'terrain alt variance X: '  + gui_TA.value}>TA</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ gui_AS.css} title ={'airspeed variance X: ' + gui_AS.value}>AS</div>
            </div>
        );
    }
};