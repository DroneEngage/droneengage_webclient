
const res_CLSS_LoginControl =
{
	'en':
	{
		'1': 'Login',
		'2': 'Logout',
		'3': 'Login',
		'4': 'Password:',
		'5': 'Connection URL'
	},
	'ar':
	{
		'1': 'دخول',
		'2': 'خروج',
		'3': ' بيانات الاتصال ',
		'4': 'كود الاتصال:',
		'5': 'رابط الاتصال'
	}

}

export class CLSS_LoginControl extends React.Component {
	constructor() {
		super();
		this.state = {
			is_connected: false,
			btnConnectText: res_CLSS_LoginControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['1'],
			initialized: false,
		};
		window.AndruavLibs.EventEmitter.fn_subscribe(EE_onSocketStatus, this, this.fn_onSocketStatus);
	}


	fn_onSocketStatus(me, params) {
		fn_console_log('REACT:' + JSON.stringify(params));

		if (params.status == CONST_SOCKET_STATUS_REGISTERED) {
			me.state.is_connected = true;
			me.setState({ btnConnectText: res_CLSS_LoginControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['2'] });
			//	$('#btnConnect').removeClass('btn-success');
			//	$('#btnConnect').addClass('btn-danger');
			//	$('div#login').hide();
			v_SpeakEngine.fn_speak('Connected');


		}
		else {

			me.state.is_connected = false;
			me.setState({ btnConnectText: res_CLSS_LoginControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['1'] });

			window.AndruavLibs.LocalStorage.fn_setEmail($('#txtEmail').val());
			window.AndruavLibs.LocalStorage.fn_setAccessCode($('#txtAccessCode').val());
			var s = $('#txtUnitID').val();
			if (s != null) {
				window.AndruavLibs.LocalStorage.fn_setUnitID(s.slice(0, s.indexOf('#')));
			}
			window.AndruavLibs.LocalStorage.fn_setGroupName($('#txtGroupName').val());

		}
	}

	clickConnect(e) {
		// Getting an array of DOM elements
		// Then finding which element was clicked
		if (v_connectState == true) {
			v_connectState = false;
			v_connectRetries = 0;
		}

		fn_connect();
		// EventEmitter.fn_unsubscribe ('Oppa',this.state.Me);
	}

	clickCopyURL(e) {

		window.AndruavLibs.LocalStorage.fn_setEmail($('#txtEmail').val());
		window.AndruavLibs.LocalStorage.fn_setAccessCode($('#txtAccessCode').val());
		window.AndruavLibs.LocalStorage.fn_setGroupName($('#txtGroupName').val());
		var un = $('#txtUnitID').val();
		window.AndruavLibs.LocalStorage.fn_setUnitID(un.slice(0, un.indexOf('#')));

		var connectURL = 'http://' + window.location.hostname + ':' + window.location.port + '/' + window.location.pathname + '?accesscode=' + $('#txtAccessCode').val() + '&email=' + $('#txtEmail').val() + '&groupName=' + $('#txtGroupName').val() + '&unitName=' + $('#txtUnitID').val();
		fn_copyToClipboard(connectURL);
	}


	componentWillUnmount() {
		window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_onSocketStatus, this);
	}

	componentDidMount() {
		//EventEmitter.fn_dispatch(EE_updateLogin,{});

		if (this.state.initialized == true) {
			return;
		}

		this.state.initialized = true;

		if (QueryString.accesscode != null) {

			$('#account').val(QueryString.accesscode);
			$('#email').val(QueryString.email);
			$('#group').val(QueryString.groupName);
			$('#unitID').val(QueryString.unitName);

		}
		else {

			$('#txtEmail').val(window.AndruavLibs.LocalStorage.fn_getEmail());
			$('#txtAccessCode').val(window.AndruavLibs.LocalStorage.fn_getAccessCode());
			$('#txtGroupName').val(window.AndruavLibs.LocalStorage.fn_getGroupName());
			$('#txtUnitID').val(window.AndruavLibs.LocalStorage.fn_getUnitID() + "#" + fn_generateRandomString(2));

		}

		if (QueryString.connect != undefined) {

			this.clickConnect(null);
		}


	}

	componentDidUpdate() {


	}


	render() {


		var login = "Login";
		if (this.state.is_connected == true) {
			login += " - " + $('#txtUnitID').val();
		}
		if (this.props.simple == null) {
			return (
				<div className="card text-white border-light mb-3" >
					<div className="card-header  text-center"> <strong>{login}</strong></div>
					<div id='login_form' className="card-body">
						<div className={this.state.is_connected == true ? "hidden" : " "} >
							<div className="form-group al_l"><label htmlFor="txtEmail" id="email" className="text-white">Email</label><input type="email" id="txtEmail" name="txtEmail" className="form-control" defaultValue={QueryString.email != null ? QueryString.email : window.AndruavLibs.LocalStorage.fn_getEmail()} /></div>
							<div className="form-group al_l"><label htmlFor="txtAccessCode" id="account" className="text-white">Access Code</label><input type="password" id="txtAccessCode" name="txtAccessCode" className="form-control" defaultValue={QueryString.accesscode != null ? QueryString.accesscode : window.AndruavLibs.LocalStorage.fn_getAccessCode()} /></div>
							<div className="form-group al_l hidden"><label id="group" className="text-white">Group Name</label> <input type="text" id="txtGroupName" name="txtGroupName" className="form-control" defaultValue={QueryString.groupName != null ? QueryString.groupName : window.AndruavLibs.LocalStorage.fn_getGroupName()} /></div>
							<div className="form-group al_l"><label id="unitID" className="text-muted">Unit ID</label><input type="text" id="txtUnitID" name="txtUnitID" className="form-control" defaultValue={QueryString.unitName != null ? QueryString.unitName : window.AndruavLibs.LocalStorage.fn_getUnitID() + "_" + fn_generateRandomString(2)} /></div>
							<br />
						</div>
						<div id='login_btn mb-2 ' className='text-center'>
							<button className={"button  button_large  rounded-3 m-2 user-select-none " + (this.state.is_connected == false ? 'btn-success' : 'btn-danger')} id="btnConnect" onClick={(e) => this.clickConnect(e)}>{this.state.btnConnectText}</button>

						</div>
					</div>
				</div>
			);
		}
		else {
			var control = [];
			var title = "Login";
			var css = "bg-success";
			if (this.state.is_connected == true) {
				title = "Logout";
				css = "bg-danger";
			}
			control.push(
				<div className="dropdown">
					<button className={'btn btn-secondary dropdown-toggle ' + css} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						{title}
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<div id='login_form' className="card-body">
							<div className={this.state.is_connected == true ? "hidden" : " "} >
								<div className="form-group al_l"><label htmlFor="txtEmail" id="email" className="text-white">Email</label><input type="email" id="txtEmail" name="txtEmail" className="form-control" defaultValue={QueryString.email != null ? QueryString.email : window.AndruavLibs.LocalStorage.fn_getEmail()} /></div>
								<div className="form-group al_l"><label htmlFor="txtAccessCode" id="account" className="text-white" title="Access Code" >Password</label><input type="password" id="txtAccessCode" title="Access Code" name="txtAccessCode" className="form-control" defaultValue={QueryString.accesscode != null ? QueryString.accesscode : window.AndruavLibs.LocalStorage.fn_getAccessCode()} /></div>
								<div className="form-group al_l hidden"><label id="group" className="text-white">Group Name</label> <input type="text" id="txtGroupName" name="txtGroupName" className="form-control" defaultValue={QueryString.groupName != null ? QueryString.groupName : window.AndruavLibs.LocalStorage.fn_getGroupName()} /></div>
								<div className="form-group al_l"><label id="unitID" className="text-muted">GCS ID</label><input type="text" id="txtUnitID" name="txtUnitID" className="form-control" defaultValue={QueryString.unitName != null ? QueryString.unitName : window.AndruavLibs.LocalStorage.fn_getUnitID() + "_" + fn_generateRandomString(2)} /></div>
								<br />
							</div>
							<div id='login_btn mb-2 ' className='text-center'>
								<button className={"button  button_large  rounded-3 m-2 user-select-none " + (this.state.is_connected == false ? 'btn-success' : 'btn-danger')} id="btnConnect" onClick={(e) => this.clickConnect(e)}>{this.state.btnConnectText}</button>
							</div>
						</div>
					</div>
				</div>
			);

			return (
				control
			);
		}
	}

}




if ($('#login_div').length != 0) {

	if (CONST_TEST_MODE === true)
	{
		ReactDOM.render(
			<React.StrictMode>
			<CLSS_LoginControl />
			</React.StrictMode>,
			
			v_G_getElementById('login_div')
		);
	}
	else
	{
		ReactDOM.render(
			<CLSS_LoginControl />,
			
			v_G_getElementById('login_div')
		);
	}
}

