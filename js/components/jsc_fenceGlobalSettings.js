const res_FenceCLSS_GlobalSettingsControl =
{
	'en':
	{
		'1': 'Approve and save fence data into system',
		'2': 'Remove fence data permanently from system',
		'3': 'Save into System',
		'4': 'Delete from System',
        '5': 'Connection URL',
        '6': '<strong>Attention:</strong> Delete Operation',
        '7': '<p>Are you sure you want to delete current active Geo-Fence and replace it with new ones ?</p>',
        '8': '<strong>Attention:</strong> Save Operation',
        '9': '<p>Are you sure you want to delete current active Geo-Fence and replace it with new ones ?</p>'
	},
	'ar':
	{
		'1': 'اعتماد و تسجيل البيانات بقاعدة البيانات',
		'2': 'مسح بيانات الأسياج من قاعدة البيانات',
		'3': 'تسجيل',
		'4': 'مسح دائم',
        '5': 'رابط الاتصال',
        '6': '<strong>انتباه:</strong> عملية مسح',
        '7': '<p>هل أنت متأكد أنك تريد مسح البيانات بالنظام و استبداله بالمعلومات الموجودة على الخريطة ؟</p>',
        '8': '<strong>انتباه:</strong> عملية حفظ',
        '9': '<strong>انتباه:</strong> هل تريد مسح بيانات المسارات و الأسوجة من النظام؟ '
        
	}

}

class CLSS_FenceCLSS_GlobalSettingsControl extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
			is_connected: false
		};

    
	}



    fn_onSocketStatus (me,p_params) {
        fn_console_log ('REACT:' + JSON.stringify(p_params));

        if (p_params.status == CONST_SOCKET_STATUS_REGISTERED)
        {				
                    me.setState({is_connected:true});
                    //$('#andruavUnits').show();
                        
                
        }
        else
        {				
            
                me.setState({is_connected:false});
                   
                //$('#andruavUnits').hide();
        }
    }

    
    fn_delete () 
    {
        	fn_do_modal_confirmation (res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['6'], res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['7'], fn_deleteShapesinDB);
	}
  
    fn_submit ()
    {
	        fn_do_modal_confirmation (res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['8'],res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['9'],fn_submitShapes);
	}

    componentWillMount () {
   			window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
	 }

    componentWillUnmount () {
    		window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_onSocketStatus,this);
	}

    
    render() {
   
        var v_unit = [];
        

        if (this.state.is_connected == false)
        {
          
        }
        else
        {
            v_unit.push ( <div key='fgsc_g' id="geofence" className ="geo_fence row margin_zero">
                         <div id="row12" className="col col-xs-6 ">
                            <button id='pre_geo_btn_generate' className='button button_large btn-primary'   title ={res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['1']} type="button "  onClick={ (e) => this.fn_submit(e) } >{res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['3']}</button>
                         </div>
                         <div id="row12" className="col col-xs-6 ">
                            <button  id="geo_btn_geodelete_db"  className="button button_large btn-danger" title ={res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['2']} type="button" onClick={ (e) => this.fn_delete(e) } >{res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['4']}</button>
                        </div>
                    </div>);
        }
       

    return (

                <div key='fgsc'>{v_unit}</div>
            );
    }
};


ReactDOM.render(
			<CLSS_FenceCLSS_GlobalSettingsControl />,
			v_G_getElementById('fence_global')
		);