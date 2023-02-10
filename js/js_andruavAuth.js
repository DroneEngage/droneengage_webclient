/* ********************************************************************************
*   Mohammad Hefny
*
*   2 Aug 2016
*
*********************************************************************************** */


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
const CONST_ACTOR_TYPE						= 'at'; 
const CONST_SESSION_ID                      = 'sid';


class CAndruavAuth {
    constructor() {
        window._localserverIP = "127.0.0.1";
        window._localserverPort = 9211;

        this._m_ver = '5.0.0';
        if (CONST_TEST_MODE === true)
        {
            this.m_auth_ip = CONST_TEST_MODE_IP; 
        }
        else
        {
            this.m_auth_ip = CONST_PROD_MODE_IP;
        }
        this._m_auth_port = '19408';
        this._m_auth_ports = '19408'; 
        this._m_permissions_ = '';
        this._m_session_ID = null;
        this._m_logined = false;
        this.C_ERR_SUCCESS_DISPLAY_MESSAGE = 1001;

    }

    fn_getSessionID()
    {
        return this._m_session_ID;
    }

    fn_logined()
    {
        return this._m_logined;
    }

    fn_getPermission() {
        return this._m_permissions_;
    }

    fn_do_canGCS() {
        if (this._m_permissions_.length > 2) {
            return this._m_permissions_[2] == 'G';
        }
        return false;
    }

    fn_do_canTele() {
        if (this._m_permissions_.length > 4) {
            return this._m_permissions_[4] == 'T';
        }
        return false;
    }


	fn_do_canControl = function () {
		if (this._m_permissions_.length > 6) {
			return this._m_permissions_[6] == 'R';
		}
		return false;
	}



	fn_do_loginAccount (p_userName, p_accessCode) {
    if ((p_userName == null) || (p_userName.length == 0) || (p_accessCode == null) || (p_userName.accessCode == 0)) {
        this._m_logined = false;
        return;
    }

    var _url;
    if (location.protocol == 'https:') {
	    _url = 'https://' + this.m_auth_ip  + ':' + this._m_auth_ports + CONST_WEB_FUNCTION + CONST_WEB_LOGIN_COMMAND; //   + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
		
	}
	else {
	    _url = 'http://' + this.m_auth_ip  + ':' + this._m_auth_port + CONST_WEB_FUNCTION + CONST_WEB_LOGIN_COMMAND; //  + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
	}


    var p_keyValues = {
        'acc': p_userName,
        'pwd': p_accessCode,
        'gr': "1",
        'app': 'andruav',
        'ver': this._m_ver,
        'ex': fn_eval("try{window.parent.document.title; \t}catch (e) {'Andruav';}"),
        'at': 'g' // GCS
    };

    var v_res = null;
	var Me = this;
    $.ajax({
        url: _url,
        type: 'POST',
        data: p_keyValues,
        dataType: 'text',

        success: function (v__res) {
            v_res = JSON.parse(v__res);

            if (v_res.e == 0) {
                Me._m_logined = true;
                Me._m_session_ID = v_res.sid;
                Me.m_server_port = v_res.cs.h;
                Me.m_server_ip = v_res.cs.g;
                Me.server_AuthKey = v_res.cs.f; // authentication key of WS
                Me.m_username = p_userName;
                Me._m_permissions_ = v_res.per;
                window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Logined, v_res);
            } else {
                Me._m_logined = false;
                Me.m_error = v_res.e;
                Me.m_errorMessage = 'Cannot Login .. ' + v_res.em;
                window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_BAD_Logined, v_res);

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Me._m_logined = false;
            Me.m_error = Me.C_ERR_SUCCESS_DISPLAY_MESSAGE;
            Me.m_errorMessage = 'Cannot Login .. Bad Connection';
            window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_BAD_Logined, v_res);

        },
        async: false // remove it later when you SYNC with 2eN
    });
	};


	fn_generateAccessCode (p_accountName) 
	{
		if ((p_accountName == null) || (p_accountName.length == 0)) {
			return;
		}


		var _url;
		if (location.protocol ==  'https:') {
			_url = 'https://'+ this.m_auth_ip + ':' + this._m_auth_ports + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; // + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
		} else {
			_url = 'http://'  + this.m_auth_ip + ':' + this._m_auth_port + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; // + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
		}


		var p_keyValues = {};
		p_keyValues[CONST_SUB_COMMAND.toString()] = CONST_CMD_CREATE_ACCESSCODE;
		p_keyValues[CONST_ACCOUNT_NAME_PARAMETER.toString()] = p_accountName;
        p_keyValues[CONST_SESSION_ID.toString()] = this._m_session_ID;


		var v_res = null;
		var Me = this;
    	$.ajax({
			url: _url,
			type: 'POST',
			data: p_keyValues,
			dataType: "text",

			success: function (v__res) {
				v_res = JSON.parse(v__res);

				if (v_res.e == 0) {
					window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Account_Created, v_res);
				} else {
					window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Account_BAD_Operation, v_res);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				Me._m_logined = false;
				Me.m_error = Me.C_ERR_SUCCESS_DISPLAY_MESSAGE;
				window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Account_BAD_Operation, v_res);
			},
			async: false // remove it later when you SYNC with 2eN
		});


		return;
	}

	fn_regenerateAccessCode = function (p_accountName) 
	{
    if ((p_accountName == null) || (p_accountName.length == 0)) {
        return;
    }


    var _url;
    if (location.protocol == 'https:') {
        _url = 'https://' + this.m_auth_ip + ':' + this._m_auth_ports + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; // + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
    } else {
        _url = 'http://' + this.m_auth_ip + ':' + this._m_auth_port + CONST_WEB_FUNCTION + CONST_ACCOUNT_MANAGMENT; // + '?cmd=v&acc=' + userName + '&pwd=' + accessCode + '&app=andruav&ver=' + ver + '&ex=' + fn_eval ("349032c439313b1937512b112f442710302137510844310024c132c427d92f443490084427103021264935792e6927d92f443490084434902b1134902d9027d90d99040000513d09264924c1349026492a400400064027d9069104003b1905f110812f44271032c4357924c1366405f10d993d09"._fn_hexDecode());
    }


    var p_keyValues = {};
    p_keyValues[CONST_SUB_COMMAND.toString()] = CONST_CMD_REGENERATE_ACCESSCODE;
    p_keyValues[CONST_ACCOUNT_NAME_PARAMETER.toString()] = p_accountName;


    var v_res = null;
    var Me = this;
    $.ajax({
        url: _url,
        type: 'POST',
        data: p_keyValues,
        dataType: "text",

        success: function (v__res) {
            v_res = JSON.parse(v__res);

            if (v_res.e == 0) {
                window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Account_Regenerated, v_res);
            } else {
                window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Account_BAD_Operation, v_res);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Me._m_logined = false;
            Me.m_error = Me.C_ERR_SUCCESS_DISPLAY_MESSAGE;
            window.AndruavLibs.EventEmitter.fn_dispatch(EE_Auth_Account_BAD_Operation, v_res);
        },
        async: false // remove it later when you SYNC with 2eN
    });


    return;
}


fn_do_logoutAccount(p_userName, p_accessCode) {
    this._m_logined = false;
}
}


/*jshint esversion: 6 */
window.AndruavLibs = window.AndruavLibs || {REVISION: 'BETA' };

(function(lib) {
	"use strict";
	if (typeof module === "undefined" || typeof module.exports === "undefined") {
	  window.AndruavLibs.AndruavAuth = lib; // in ordinary browser attach library to window
	} else {
	  module.exports = lib; // in nodejs
	}
  })(new CAndruavAuth());
  
  

