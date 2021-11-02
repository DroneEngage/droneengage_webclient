// just extend this object to have access to this.subscribe and this.fn_dispatch

var AndruavLibs = AndruavLibs || { REVISION: 'BETA' };

(function (global)
{


    const c_EventEmitter = new function (){
        this._v_events  = {};
        this.fn_dispatch = function (p_event, p_data) {
            if (!this._v_events[p_event]) return; // no one is listening to this event
            for (var i = 0; i < this._v_events[p_event].length; i++)
            {
                var v_subscriber = this._v_events[p_event][i];
                v_subscriber.callback(v_subscriber.listner,p_data);
            }
        };
        this.fn_subscribe= function (p_event, p_listner, callback) {
        if (!this._v_events[p_event]) this._v_events[p_event] = []; // new event
        this._v_events[p_event].push({listner:p_listner,callback:callback});
        };
        this.fn_removeEvent= function (p_event)
        {
            this._v_events[p_event] = []; // all away :)
        };
        this.fn_unsubscribe= function (p_event,p_listner)
        {
            if (!this._v_events[p_event]) return; // no one is listening to this event
            for (var i = 0; i < this._v_events[p_event].length; i++)
            {
                var v_subscriber = this._v_events[p_event][i];
                if (v_subscriber.listner===p_listner)
                {
                    this._v_events[p_event].splice(i,1);
                }
            }
        }
    
    
    };

    global.EventEmitter = c_EventEmitter;

    
}) (AndruavLibs);


(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.AndruavLibs = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(AndruavLibs);