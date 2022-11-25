import {CLSS_LoginControl} from './jsc_login.jsx'
import {CLSS_CTRL_Layout} from './gadgets/jsc_ctrl_layoutControl.jsx'

class CLSS_HeaderControl extends React.Component {
    constructor() {
        super ();
		this.state = {};
    }

    render() {
        return (
            <div className = 'row  css_padding_zero bg-dark'>
                <div className = 'col-lg-7  col-sm-3 css_margin_zero css_padding_zero'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">
                            <img src="./images/de/DE_logo_w_title.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                            Webclient
                        </a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="https://cloud.ardupilot.org/">Home </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id='mapeditor' href="./mapeditor.html" target='_blank'>Geo Fence</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="andruavweb" href="https://cloud.ardupilot.org/webclient-web-plugin.html" target='_blank'>Drone-Engage WEB Plugin</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://cloud.ardupilot.org/" target='_blank' >MANUAL</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://cloud.ardupilot.org/de-faq.html" target='_blank' >FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://droneengage.com/contact.html" target='_blank' >CONTACT</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="accounts.html" target='_blank' >ACCOUNT</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className='col-lg-4  col-sm-5   css_margin_zero css_padding_zero al_r'>
                    <CLSS_CTRL_Layout/>     
                </div>
                <div className='col-lg-1  col-sm-4   css_margin_zero  al_r'>
                    <CLSS_LoginControl simple='true'/>
                </div>
            </div>
        );
    }
}



ReactDOM.render(
    <CLSS_HeaderControl />,
    v_G_getElementById('header_div')
);
