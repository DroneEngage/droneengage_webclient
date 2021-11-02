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

_localTelemetry.prototype.fn_onWebSocketOpened     = function (e) { };
_localTelemetry.prototype.fn_onWebSocketError      = function (e) { };
_localTelemetry.prototype.fn_onError               = function (e) { };
_localTelemetry.prototype.fn_onPacketReceived      = function (data) { };


function _localTelemetry()
{
	var Me = this;
	this.m_WebSocket  = null;
	this.m_isConnected = false;

    this.fn_init =  function init (callback)
    {
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

	//this.init();

}

_localTelemetry.prototype.fn_send = function (p_data, p_isbinary)
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


var LocalTelemetry = new _localTelemetry();