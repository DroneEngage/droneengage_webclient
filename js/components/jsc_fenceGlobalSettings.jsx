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

class CLSS_FenceGlobalSettingsControl extends React.Component {
  
    constructor()
	{
		super ();
		this.state = {
			is_connected: false
		};

    
        window.AndruavLibs.EventEmitter.fn_subscribe (EE_onSocketStatus, this, this.fn_onSocketStatus);
    }

    fn_deleteShapesinDB ()
    {
        window.AndruavLibs.AndruavMap.fn_deleteAllEditShapes();
		
        fn_deleteShapesinDB();

        setTimeout (function ()
		{
		    v_andruavClient.API_requestReloadLocalGroupGeoFenceTasks (null);
		}, 3000);
    }

    fn_Reload()
    {
        window.AndruavLibs.AndruavMap.fn_deleteAllEditShapes();

        setTimeout (function ()
		{
		    v_andruavClient.API_requestReloadLocalGroupGeoFenceTasks (null);
		}, 3000);
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

    fn_Reload_confirmation ()
    {
        fn_do_modal_confirmation ("Clear & Reload ?", "Are you sure you want to reload shapes?", 
        function (p_approved)
        {
            if (p_approved === false) return;
			this.fn_Reload
        });
    }

    fn_delete_confirmation () 
    {
        fn_do_modal_confirmation (res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['6'], res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['7'], 
        function (p_approved)
        {
            if (p_approved === false) return;
            this.fn_deleteShapesinDB
        });
	}
  
    fn_submit_confirmation ()
    {
	    fn_do_modal_confirmation (res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['8'],res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['9'],
        function (p_approved)
        {
            if (p_approved === false) return;
			fn_submitShapes
        });
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
            v_unit.push ( 
                <div id="geofence" className="btn-group  d-flex css_margin_top_small" >
                       <button id='pre_geo_btn_generate' className='btn btn-primary  w-100'   title ={res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['1']} type="button "  onClick={ (e) => this.fn_submit_confirmation(e) } >{res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['3']}</button>
                       <button  id="geo_btn_geo_db"  className="btn btn-warning  w-100" title="Reload"  type="button" onClick={ (e) => this.fn_Reload_confirmation(e) } >Reload</button>
                       <button  id="geo_btn_geodelete_db"  className="btn btn-danger w-100" title ={res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['2']} type="button" onClick={ (e) => this.fn_delete_confirmation(e) } >{res_FenceCLSS_GlobalSettingsControl[window.AndruavLibs.LocalStorage.fn_getLanguage()]['4']}</button>
                </div>
                );
        }
       

    return (

                <div key='fgsc'>{v_unit}</div>
            );
    }
};


ReactDOM.render(
			<CLSS_FenceGlobalSettingsControl />,
			v_G_getElementById('fence_global')
		);