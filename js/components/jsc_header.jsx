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
                <div className = 'col-7  css_margin_zero css_padding_zero d-lg-block d-none d-xl-block'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand fs-3" href="#">
                            <img src="./images/de/DE_logo_w_title.png" width="48" height="48" className="d-inline-block align-top" alt="" />
                            {CONST_TITLE}
                        </a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li key="Home" className="nav-item active">
                                    <a className="nav-link" href={CONST_HOME_URL}>Home </a>
                                </li>
                                <li key="Geo" className="nav-item">
                                    <a className="nav-link" id='mapeditor' href="./mapeditor.html" target='_blank'>Geo Fence</a>
                                </li>
                                <li key="Manual" className="nav-item">
                                    <a className="nav-link" href={CONST_MANUAL_URL} target='_blank' >Manual</a>
                                </li>
                                <li key="FAQ" className="nav-item">
                                    <a className="nav-link" href={CONST_FAQ_URL} target='_blank' >FAQ</a>
                                </li>
                                <li key="Contact" className="nav-item">
                                    <a className="nav-link" href={CONST_CONTACT_URL} target='_blank' >Contact</a>
                                </li>
                                <li key="Account" className="nav-item">
                                    <a className="nav-link" href="accounts.html" target='_blank' >Account</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className='col-lg-4  col-sm-8   css_margin_zero css_padding_zero al_r'>
                    <CLSS_CTRL_Layout/>     
                </div>
                <div className='col-lg-1  col-sm-4   css_margin_zero  al_r'>
                    <CLSS_LoginControl simple='true'/>
                </div>
            </div>
        );
    }
}




    if (CONST_TEST_MODE === true)
	{
        ReactDOM.render(
            <React.StrictMode>
		    <CLSS_HeaderControl />
            </React.StrictMode>,
        	
            window.document.getElementById('header_div')
        );
    
    }
    else
    {
        ReactDOM.render(
            <CLSS_HeaderControl />,
            window.document.getElementById('header_div')
        );
    }

