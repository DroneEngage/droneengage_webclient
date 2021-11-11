/*************************************************************************************
 * 
 *   A N D R U A V - W E B  T E L E M E T R Y       JAVASCRIPT  LIB
 * 
 *   Author: Mohammad S. Hefny
 * 
 *   Date:   21 March 2017
 * 
 *   Update: Date:   23 Jul 2016
 * 
 * 
 * 
 *************************************************************************************/


"use strict";

/*jshint esversion: 6 */

class CLocalTelemetry
{

	constructor()
	{
		this.m_WebSocket  = null;
		this.m_isConnected = false;
	}

	fn_init (callback)
    {
		var Me = this;
		if (this.m_WebSocket != null)
		{
			this.m_WebSocket.close()
		}
		
		this.m_WebSocket = new WebSocket("ws://127.0.0.1:8811");
				

		this.m_WebSocket.onopen = function(p_data)
		{
			Me.m_isConnected = true;
			callback();
			Me.fn_onWebSocketOpened(p_data);
		};
					
		this.m_WebSocket.onmessage = function (p_evt) 
		{ 
		    //var received_msg = evt.data;
			//ws.send(evt.data + " Again ");
			Me.fn_onPacketReceived (p_evt.data);
		};
					
		this.m_WebSocket.onclose = function(err)
		{ 
		    // websocket is closed.
			fn_console_log("Connection is closed..."); 
			Me.m_isConnected = false;
			Me.fn_onWebSocketError(err);
		};
		
		this.m_WebSocket.onerror = function (err)
		{
		    //alert ("No Websockets Listener Found\r\n Please check https://www.npmjs.com/package/andruavwebplugin for details.");
			Me.m_isConnected = false;
			Me.fn_onWebSocketError(err);
		}
    };

	
	fn_onWebSocketOpened  (e) {};
	fn_onWebSocketError   (e) {};
	fn_onError (e) {};
	fn_onPacketReceived  (e) {};


	fn_send (p_data, p_isbinary)
	{
		try
		{
			if (this.m_WebSocket.readyState != 1) 
			{
				this.fn_onError (null);
				return;
			}
			this.m_WebSocket.send (p_data, {binary: p_isbinary});
		}
		catch (e)
		{	
			this.fn_onError(e);	
		}
	}

}


/*jshint esversion: 6 */
window.AndruavLibs = window.AndruavLibs || {REVISION: 'BETA' };

(function(lib) {
	"use strict";
	if (typeof module === "undefined" || typeof module.exports === "undefined") {
	  window.AndruavLibs.LocalTelemetry = lib; // in ordinary browser attach library to window
	} else {
	  module.exports = lib; // in nodejs
	}
  })(new CLocalTelemetry());
  
  

