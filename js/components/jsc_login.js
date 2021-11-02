
const res_CLSS_LoginControl =
{
	'en':
	{
		'1': 'Connect',
		'2': 'Disconnect',
		'3': 'Login',
		'4': 'Access Code:',
		'5': 'Connection URL'
	},
	'ar':
	{
		'1': 'اتصال',
		'2': 'قطع الاتصال',
		'3': ' بيانات الاتصال ',
		'4': 'كود الاتصال:',
		'5': 'رابط الاتصال'
	}

}

class CLSS_LoginControl extends React.Component {
	constructor()
	{
		super ();
		this.state = {
			is_connected: false,
			btnConnectText: res_CLSS_LoginControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['1'],
			initialized: false,
		};
	}


fn_onSocketStatus (me,params) {
	fn_console_log ('REACT:' + JSON.stringify(params));

	if (params.status == CONST_SOCKET_STATUS_REGISTERED)
	{				
				me.state.is_connected=true;
				me.setState({btnConnectText: res_CLSS_LoginControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['2']});
				//	$('#btnConnect').removeClass('btn-success');
				//	$('#btnConnect').addClass('btn-danger');
				//	$('div#login').hide();
				v_SpeakEngine.fn_speak ('Connected');
					
			
	}
	else
	{				
		
			   me.state.is_connected=false;
			   me.setState({btnConnectText: res_CLSS_LoginControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['1']});
			
			    window.AndruavLibs.LocalStorage.fn_setEmail($('#txtEmail').val());
				window.AndruavLibs.LocalStorage.fn_setAccessCode($('#txtAccessCode').val());
				var s = $('#txtUnitID').val();
				if (s!= null)
				{
					window.AndruavLibs.LocalStorage.fn_setUnitID(s.slice(0,s.indexOf('#')));
				}
				window.AndruavLibs.LocalStorage.fn_setGroupName($('#txtGroupName').val());
				
	}
}

clickConnect (e) {
        // Getting an array of DOM elements
        // Then finding which element was clicked
				if (v_connectState == true)
				{
					v_connectState = false;
					v_connectRetries =0;	
				}
				
				fn_connect();
			// EventEmitter.fn_unsubscribe ('Oppa',this.state.Me);
    }

clickCopyURL (e) {
			
			window.AndruavLibs.LocalStorage.fn_setEmail($('#txtEmail').val());
			window.AndruavLibs.LocalStorage.fn_setAccessCode($('#txtAccessCode').val());
			window.AndruavLibs.LocalStorage.fn_setGroupName($('#txtGroupName').val());
			var un = $('#txtUnitID').val();
			window.AndruavLibs.LocalStorage.fn_setUnitID(un.slice(0,un.indexOf('#')));
			
			var connectURL = 'http://' + window.location.hostname + ':' + window.location.port + '/' + window.location.pathname + '?accesscode='  + $('#txtAccessCode').val() + '&email=' + $('#txtEmail').val() + '&groupName=' + $('#txtGroupName').val() + '&unitName=' + $('#txtUnitID').val();
			fn_copyToClipboard	(connectURL);
		}

componentWillMount () {
				window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
		}

componentWillUnmount () {
				window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onSocketStatus,this);
		}

componentDidMount () {
			//EventEmitter.fn_dispatch(EE_updateLogin,{});

			 if (this.state.initialized == true) 
			 {
				 return;
			 }

			 this.state.initialized = true;
				 
			 if (QueryString.accesscode != null) 
			 {
						
				$('#account').val(QueryString.accesscode);
				$('#email').val(QueryString.email);
				$('#group').val(QueryString.groupName);
				$('#unitID').val(QueryString.unitName);
		
			}
			else
			{
					
				$('#txtEmail').val(window.AndruavLibs.LocalStorage.fn_getEmail());
				$('#txtAccessCode').val(window.AndruavLibs.LocalStorage.fn_getAccessCode());
				$('#txtGroupName').val(window.AndruavLibs.LocalStorage.fn_getGroupName());
				$('#txtUnitID').val(window.AndruavLibs.LocalStorage.fn_getUnitID() + "#" + fn_generateRandomString(2));
		
			}
			
			if (QueryString.connect != undefined) 
			{
				
 				this.clickConnect(null)	;
			}	

			
		}

 componentDidUpdate() {
	 			
				
 }


render() {


			var login = "Login";
			if (this.state.is_connected == true)
			{
				login += " - " + $('#txtUnitID').val();
			}



		return (
      <div>
		<p className="bg-warning  text-center"><strong>{login}</strong></p>
        <div id='login_form' className={this.state.is_connected==true?"hidden":" gray_border"}>
		<div className="form-group al_l"><label  htmlFor="txtEmail" id="email">Email</label><input type="email" id="txtEmail" name="txtEmail" className="form-control" defaultValue={QueryString.email!=null?QueryString.email:window.AndruavLibs.LocalStorage.fn_getEmail()}/></div>
        <div className="form-group al_l"><label  htmlFor="txtAccessCode" id="account">Access Code</label><input type="password" id="txtAccessCode" name="txtAccessCode" className="form-control" defaultValue={QueryString.accesscode!=null?QueryString.accesscode:window.AndruavLibs.LocalStorage.fn_getAccessCode()}/></div>
        <div className="form-group al_l hidden"><label  id="group">Group Name</label> <input type="text" id="txtGroupName" name="txtGroupName" className="form-control" defaultValue={QueryString.groupName!=null?QueryString.groupName:window.AndruavLibs.LocalStorage.fn_getGroupName()} /></div>
        <div className="form-group al_l"><label  id="unitID">Unit ID</label><input type="text" id="txtUnitID" name="txtUnitID" className="form-control" defaultValue={QueryString.unitName!=null?QueryString.unitName:window.AndruavLibs.LocalStorage.fn_getUnitID()+ "_" + fn_generateRandomString(2)} /></div>
        <br/>
        </div>
				<div id='login_btn'>
				<button className={"button  button_large " + (this.state.is_connected == false? 'btn-success' : 'btn-danger')} id="btnConnect" onClick={ (e) => this.clickConnect(e) }>{this.state.btnConnectText}</button>
        		
				</div>
      </div>
    );
	}

}






ReactDOM.render(
			<CLSS_LoginControl  />,
			v_G_getElementById('login_div')
		);

