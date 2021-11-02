class LoginControl extends React.Component {
	constructor()
	{
		super ();
		this.state = {
			is_connected: false,
			btnConnectText: 'Login',
			initialized: false,
		};
	}


    fn_EE_permissionReceived (me,params) {
       
            
            window.AndruavLibs.LocalStorage.fn_setEmail($('#txtEmail').val());
            window.AndruavLibs.LocalStorage.fn_setAccessCode($('#txtAccessCode').val());
           // $('#loginCtrl').hide();
            
            me.setState({'is_connected':true});
   
    }

    fn_EE_permissionBadLogin (me,params) {
    
            me.setState({'is_connected':false});

			gui_alert ('Bad Login', params.msg, 'danger');
    }

	fn_EE_permissionDeleted (me,params)
	{
		window.AndruavLibs.AndruavAuth.fn_retrieveLogin($('#txtEmail').val(),$('#txtAccessCode').val());
	}

	

    fn_clickConnect (e) {
			   
		
		fn_do_modal_confirmation ("<strong>Attention: </strong>Access Code" ,
				"Create New Access Code.<br>You will need to define the new accesscode in ALL your Andruav units.<br> \
				Make sure you use a valid email because the access code will be sent to it.",function () {
					if (fn_validCaptcha() === true)
					{
						window.AndruavLibs.AndruavAuth.fn_generateAccessCode($('#txtEmail').val());
					}
					
				}, "Create", "bg-danger");
		
		fn_displayCaptcha();
	}

	fn_clickRegenerate (e) {
		fn_do_modal_confirmation ("<strong>Attention: </strong>Access Code" ,
				"Create New Access Code.<br>You will get a new Access Code via email only, abd the current one will be invalid. You need to copy and paste the new Access Code in all other Andruav mobiles.",function () {
					if (fn_validCaptcha() === true)
					{
						window.AndruavLibs.AndruavAuth.fn_regenerateAccessCode($('#txtEmail').val());
					}
					
				}, "Create", "bg-danger");
		
		fn_displayCaptcha();
	}

	  

    componentWillMount () {
				fn_console_log ('REACT:Event componentWillMount');
				//window.AndruavLibs.EventEmitter.fn_subscribe ( EE_permissionReceived, this, this.fn_EE_permissionReceived);
                //window.AndruavLibs.EventEmitter.fn_subscribe ( EE_permissionBadLogin, this, this.fn_EE_permissionBadLogin);
                //window.AndruavLibs.EventEmitter.fn_subscribe ( EE_permissionDeleted,  this, this.fn_EE_permissionDeleted);
		}

    componentWillUnmount () {
				//window.AndruavLibs.EventEmitter.fn_unsubscribe ( EE_permissionReceived,this);
                //window.AndruavLibs.EventEmitter.fn_unsubscribe ( EE_permissionBadLogin,this);
                //window.AndruavLibs.EventEmitter.fn_unsubscribe ( EE_permissionDeleted,this);
		}

    componentDidMount () {
	
			 if (this.state.initialized == true) 
			 {
				 return;
			 }

			 this.state.initialized = true;
				 
			$('#txtEmail').val(window.AndruavLibs.LocalStorage.fn_getEmail());
		}





	render() {

			var login = "Access Code Generator";
			if (this.state.is_connected == true)
			{
				login += "ed - As " + $('#txtEmail').val();
			}
		return (
      <div>
		<p className="bg-warning  text-center"><strong>{login}</strong></p>
        <div id='login_form' >
				<div className="form-group al_l">
					<label className htmlFor="txtEmail" id="email">Email</label>
					<input type="email" id="txtEmail" name="txtEmail" className="form-control" defaultValue={window.AndruavLibs.LocalStorage.fn_getEmail()}/>
				</div>
        		<br/>
        </div>

				<div  className="row">
				<div className="col-xs-6 al_l">
				<a href="#" id='login_btn' className="btn btn-sm btn-primary" onClick={ (e) => this.fn_clickConnect(e) }><span className="glyphicon glyphicon-download-alt"  ></span> AccessCode</a>
				</div>
				<div className="col-xs-6 al_l">
				<a href="#" className="btn btn-sm btn-danger" data-toggle="modal" href="#regeneratemodal" onClick={ (e) => this.fn_clickRegenerate(e) }><span className="glyphicon glyphicon-retweet"></span> Regenerate</a>
				</div>  
				</div>
      </div>
    );
	}

}






ReactDOM.render(
			<LoginControl date={new Date()} />,
			v_G_getElementById('loginCtrl')
		);

