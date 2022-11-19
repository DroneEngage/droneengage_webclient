import e from "express";

export class CLSS_CTRL_VIBRATION extends React.Component {
    constructor()
	{
		super ();
		    this.state = {
		};
    }

    getVibrationCss (value)
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
        if (value >= 60)
        {
            ret.css = 'bg-danger';
        }else
        if (value >= 30)
        {
            ret.css = 'bg-warning';
        }if (value >= 5)
        {
            ret.css = 'bg-info';
        }else
        {
            ret.css = 'bg-success';
        }

        return ret;
    }

    getClippingCss (value)
    {
        var ret = new C_GUI_READING_VALUE();
        if (value == undefined) value = 'na';
        ret.value = value;
        if ((value == null) || (value==0)) 
        {
            ret.css = 'bg-success';
        }else
        if (value >= 50)
        {
            ret.css = 'bg-danger';
        }else
        if (value >= 1)
        {
            ret.css = 'bg-warning';
        }else
        if (value >= 1)
        {
            ret.css = 'bg-info';
        }

        return ret;

    }

    render ()
    {
        const v_andruavUnit = this.props.m_unit;
        const flags = v_andruavUnit.m_EKF.m_flags;
        var css_VX = this.getVibrationCss(v_andruavUnit.m_Vibration.m_vibration_x);
        var css_VY = this.getVibrationCss(v_andruavUnit.m_Vibration.m_vibration_y);
        var css_VZ = this.getVibrationCss(v_andruavUnit.m_Vibration.m_vibration_z);
        var css_C0 = this.getClippingCss(v_andruavUnit.m_Vibration.m_clipping_0);
        var css_C1 = this.getClippingCss(v_andruavUnit.m_Vibration.m_clipping_1);
        var css_C2 = this.getClippingCss(v_andruavUnit.m_Vibration.m_clipping_2);

        
        return (
            <div className = 'row  css_margin_zero css_padding_zero fss-4'>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_VX.css} title ={'vibration X: ' + css_VX.value}>VX</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_VY.css} title ={'vibration Y: ' + css_VY.value}>VY</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_VZ.css} title ={'vibration Z: ' + css_VZ.value}>VZ</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_C0.css} title ={'clipping 0: ' + css_C0.value}>C0</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_C1.css} title ={'clipping 1: ' + css_C1.value}>C1</div>
            <div className = {'col-2  css_margin_zero css_padding_zero '+ css_C2.css} title ={'clipping 2: ' + css_C2.value}>C2</div>
            </div>
        );
    }
};