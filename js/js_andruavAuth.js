/* ********************************************************************************
*   Mohammad Hefny
*
*   2 Aug 2016
*
*********************************************************************************** */

/*jshint esversion: 6 */
var AndruavLibs = AndruavLibs || {REVISION: 'BETA' };


const EE_Auth_Logined      		 	 = "_EA_96A4ED6B1E1_";
const EE_Auth_BAD_Logined      		 = "_EA_96A4ED6B1E2_";
const EE_Auth_Account_Created		 = "_EA_96A4ED6B1E3_";
const EE_Auth_Account_Regenerated	 = "_EA_96A4ED6B1E4_";
const EE_Auth_Account_BAD_Operation	 = "_EA_96A4ED6B1E5_";


const CONST_WEB_FUNCTION					= '/w';
const CONST_WEB_LOGIN_COMMAND				= '/wl/';
const CONST_ACCOUNT_MANAGMENT       		= '/am/';
const CONST_CMD_CREATE_ACCESSCODE   		= 'c';
const CONST_CMD_REGENERATE_ACCESSCODE       = 'r';

const CONST_ACCOUNT_NAME_PARAMETER          = 'acc';
const CONST_ACCESS_CODE_PARAMETER           = 'pwd';
const CONST_SUB_COMMAND               		= 'scm';  
const CONST_ERROR_MSG						= 'em';
const CONST_ACTOR_TYPE						='at'; 

(function (global)
{

  

	var v_AndruavAuth = function () {
		window._localserver 	= false;
		window._localserverIP 	= "127.0.0.1";
		window._localserverPort = 9211;

		var Me = this;
		var ver = '5.0.0';
		var m_auth_ip =   'andruav.com';  //'192.168.2.42'; // 'andruav.com'; //
		if (CONST_TEST_MODE == true)  
		{
			m_auth_ip = CONST_TEST_MODE_IP;
		}
		var auth_port = '19408';
		var auth_ports = '19408';
		var _permissions_ = '';

		this.logined = false;
		const C_ERR_SUCCESS_DISPLAY_MESSAGE = 1001;

		function fn_init ()
		{
			Me.logined = false;
		} 
		
		this.fn_getPermission = function  ()
		{
			return _permissions_;
		}
		
		this.fn_do_canGCS = function ()
		{
			if (_permissions_.length >2)
			{
				return _permissions_[2] =='G';
			}
			return false;
		}

		this.fn_do_canTele = function ()
		{
			if (_permissions_.length >4)
			{
				return _permissions_[4] =='T';
			}
			return false;
		}

		this.fn_do_canControl = function ()
		{
			if (_permissions_.length >6)
			{
				return _permissions_[6] =='R';
			}
			return false;
		}



		this.fn_do_loginAccount = function (p_userName,p_accessCode)
		{
			if ((p_userName == null)  || (p_userName.length==0) || (p_accessCode == null)  || (p_userName.accessCode==0)) 
			{
				Me.logined = false;
				return ;
			}

			if (window._localserver)
			{
				Me.logined 			= true;
				Me.sid 				= p_accessCode;
				Me.m_server_port 	= window._localserverPort;
				Me.m_server_ip 		= window._localserverIP;
				Me.username			= p_userName;
				return;
			}
			
			/*
			COLLAPSES WHEN INFRAME
			try
			{
				window.parent.document.title; 	
			}
			catch (e) 
			{
				'Andruav';
			}
			*/
			var _url;
			if (location.protocol == 'https:') {
				//eval ("2341357932c42d9004000e89040005f12a4034903490310033a90d2408a108a105f104000739040024c1357934902a4023412b113100040004000739040005f10d2405f104000739040024c1357934902a4023413100302132c4349033a904000739040005f10f8126492e6927100e89366405a424c1264926490e8905f1040007390400357933a927d932c417c424c12e6927d904000739040005f105a43100375127100e8905f104000739040024c12649264927d933a933a911893021271027d904000739040005f105a424c1310031000e8924c12f44271032c4357924c1366405a4366427d932c40e8905f1040007390400366427d932c404000739040005f105a427d938400e8905f104000739040027d9366424c12d900400064004840a290a900cb109000a2909c426490a900a290cb10a2909610a29258409610cb10a290bd10af9096109c425840961096109c428a40a900a9009c40bd1096109000a29090009c409610a290bd10af9096109000c400a900a900a2909610900090009c40a90264909610a2909c426490a9009c40bd127100cb109c428a40a900a900a290a900cb1090009000c400a900a9009c40bd1096109000a29090009c4096109c40b640a900cb10a290af90bd10cb109c427d90b640cb109c40bd127100cb109c428a40a900a900a290a900cb1090009000c400a900a900a290a900cb1090009c42584096109610a290a900cb1090009c427100cb1090009c40bd127100cb1090027100cb10cb109000a9009000900090009000af909610a29271009000cb109c40b640a900cb109c40a90264909610a290a900cb1090009c40b640a900cb109c424c10a90090009000a900900090009000b640a90090009c40bd127100cb109000b640cb1096109000a90090009000a29258409610cb109000af928a40961096109000c40096109c428a40a900a9009c40bd1096109000a2909c426490a900a290af90bd10cb109c40a90264909610a290b640b640a9009000af928a40961090027100cb10cb10a29271009000cb104840844234128a42f4423412a4027d93840121027d926493021271027d90640069106910d99"._fn_hexDecode());
				_url = 'https://' + m_auth_ip  + ':' + auth_ports + CONST_WEB_FUNCTION + CONST_WEB_LOGIN_COMMAND; //   + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
		
			}
			else
			{
				
				//eval ("2341357932c42d9004000e89040005f12a403490349031000d2408a108a105f104000739040024c1357934902a4023412b113100040004000739040005f10d2405f104000739040024c1357934902a4023413100302132c43490040004000739040005f10f8126492e6927100e89366405a424c1264926490e8905f1040007390400357933a927d932c417c424c12e6927d904000739040005f105a43100375127100e8905f104000739040024c12649264927d933a933a911893021271027d904000739040005f105a424c1310031000e8924c12f44271032c4357924c1366405a4366427d932c40e8905f1040007390400366427d932c404000739040005f105a427d938400e8905f104000739040027d9366424c12d900400064004840a290a900cb109000a2909c426490a900a290cb10a2909610a29258409610cb10a290bd10af9096109c425840961096109c428a40a900a9009c40bd1096109000a29090009c409610a290bd10af9096109000c400a900a900a2909610900090009c40a90264909610a2909c426490a9009c40bd127100cb109c428a40a900a900a290a900cb1090009000c400a900a9009c40bd1096109000a29090009c4096109c40b640a900cb10a290af90bd10cb109c427d90b640cb109c40bd127100cb109c428a40a900a900a290a900cb1090009000c400a900a900a290a900cb1090009c42584096109610a290a900cb1090009c427100cb1090009c40bd127100cb1090027100cb10cb109000a9009000900090009000af909610a29271009000cb109c40b640a900cb109c40a90264909610a290a900cb1090009c40b640a900cb109c424c10a90090009000a900900090009000b640a90090009c40bd127100cb109000b640cb1096109000a90090009000a29258409610cb109000af928a40961096109000c40096109c428a40a900a9009c40bd1096109000a2909c426490a900a290af90bd10cb109c40a90264909610a290b640b640a9009000af928a40961090027100cb10cb10a29271009000cb104840844234128a42f4423412a4027d93840121027d926493021271027d90640069106910d99"._fn_hexDecode());
				_url = 'http://' + m_auth_ip  + ':' + auth_port + CONST_WEB_FUNCTION + CONST_WEB_LOGIN_COMMAND; //  + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
			
			}
			

			var p_keyValues = {
				'acc': p_userName,
				'pwd': p_accessCode,
				'gr': "1",	
				'app': 'andruav',
				'ver': ver,
				'ex' : fn_eval (("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09")._fn_hexDecode()),
				'at' : 'g'  // GCS
			};

			var v_res=null;
			$.ajax({
				url: _url,
				type: 'POST',
				data: p_keyValues,
				dataType: "text",
				
				success: function(v__res) {
					v_res = fn_json_parse(v__res);
					
					if (v_res.e == 0)
					{
						Me.logined 	= true;
						Me.sid 				= v_res.sid;
						Me.m_server_port 	= v_res.cs.h;
						Me.m_server_ip 		= v_res.cs.g;
						Me.server_AuthKey 	= v_res.cs.f;  // authentication key of WS
						Me.username			= p_userName;
						_permissions_		= v_res.per;
						window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Logined,v_res);
					}
					else
					{
						Me.logined = false;
						Me.m_error = v_res.e;
						Me.m_errorMessage = "118924c12f442f443021349004001690302129712b112f44040008440844"._fn_hexDecode() + v_res.em;
						window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_BAD_Logined,v_res);
				
					}
				},
				error: function ( jqXHR, textStatus, errorThrown)
				{
					Me.logined = false;
					Me.m_error = C_ERR_SUCCESS_DISPLAY_MESSAGE; 
					Me.m_errorMessage = "118924c12f442f443021349004001690302129712b112f440400084408440400110424c127100400118930212f442f4427d9264934902b1130212f44"._fn_hexDecode();
					window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_BAD_Logined,v_res);
				
				},
				async: false    // remove it later when you SYNC with 2eN
			});
		};


		this.fn_generateAccessCode = function (p_accessCode)
        {
            if ((p_accessCode == null)  || (p_accessCode.length==0))
			{
				return ;
            }
            
            
            var _url;
			if (location.protocol == 'https:') {
				_url = 'https://' + m_auth_ip  + ':' + auth_ports + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; //   + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
			}
			else
			{
				_url = 'http://' + m_auth_ip  + ':' + auth_port + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; //  + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
            }
            

			var p_keyValues = {};
			p_keyValues [CONST_SUB_COMMAND.toString()] = CONST_CMD_CREATE_ACCESSCODE;
			p_keyValues [CONST_ACCOUNT_NAME_PARAMETER.toString()] = p_accessCode;
            
            

            var v_res=null;
			$.ajax({
				url: _url,
				type: 'POST',
				data: p_keyValues,
				dataType: "text",
				
				success: function(v__res) {
					v_res = fn_json_parse(v__res);
					
					if (v_res.e == 0)
					{
						window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Account_Created,v_res);
					}
					else
					{
						window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Account_BAD_Operation,v_res);
					}
				},
				error: function ( jqXHR, textStatus, errorThrown)
				{
					Me.logined = false;
					Me.m_error = C_ERR_SUCCESS_DISPLAY_MESSAGE; 
					window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Account_BAD_Operation,v_res);
				},
				async: false    // remove it later when you SYNC with 2eN
			});
        

            return ;
        }

        this.fn_regenerateAccessCode = function (p_accessCode)
        {
            if ((p_accessCode == null)  || (p_accessCode.length==0))
			{
				return ;
            }
            
            
            var _url;
			if (location.protocol == 'https:') {
				_url = 'https://' + m_auth_ip  + ':' + auth_ports + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; //   + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
			}
			else
			{
				_url = 'http://' + m_auth_ip  + ':' + auth_port + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; //  + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
            }
            

            var p_keyValues = {};
			p_keyValues [CONST_SUB_COMMAND.toString()] = CONST_CMD_REGENERATE_ACCESSCODE;
			p_keyValues [CONST_ACCOUNT_NAME_PARAMETER.toString()] = p_accessCode;
            

            var v_res=null;
			$.ajax({
				url: _url,
				type: 'POST',
				data: p_keyValues,
				dataType: "text",
				
				success: function(v__res) {
					v_res = fn_json_parse(v__res);
					
					if (v_res.e == 0)
					{
						window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Account_Regenerated,v_res);
					}
					else
					{
						window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Account_BAD_Operation,v_res);
					}
				},
				error: function ( jqXHR, textStatus, errorThrown)
				{
					Me.logined = false;
					Me.m_error = C_ERR_SUCCESS_DISPLAY_MESSAGE; 
					window.AndruavLibs.EventEmitter.fn_dispatch (EE_Auth_Account_BAD_Operation,v_res);
				},
				async: false    // remove it later when you SYNC with 2eN
            });
            
            
            return ;
		}
		

		this.fn_do_logoutAccount = function (p_userName,p_accessCode)
		{
			Me.logined = false;
		}
		
		fn_init();
		
	};

    global.AndruavAuth = new v_AndruavAuth;
	
}) (AndruavLibs);


(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.AndruavLibs = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(AndruavLibs);

