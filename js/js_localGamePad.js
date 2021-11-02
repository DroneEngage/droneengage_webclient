/*************************************************************************************
 * 
 *   A N D R U A V - G A M E P A D       JAVASCRIPT  LIB
 * 
 *   Author: Mohammad S. Hefny
 * 
 *   Date:   06 March 2020
 * 
 * 
 * 
 *************************************************************************************/

"use strict";

var AndruavLibs = AndruavLibs || {REVISION: 'BETA' };



(function (global)
{
    
    var v_andruavGamePad = function fn_GamePad ()
    {
        const Me = this;
        const c_haveEvents = 'GamepadEvent' in window;
        var v_lastUpdateSent = Date.now();
        var v_controllers = {};
        var rAF = window.requestAnimationFrame;
      
        // single GamePad status that is stored inside v_controllers
        var fn_Obj_padStatus = function (){
            this.p_axes= [-1,0,0,0];

            this.p_buttons= [];

            this.p_connected = false;

            this.p_vibration= false;

            for (var i=0; i<6 ;++i)
            {
                var v_obj = {};
                v_obj.m_pressed = false;
                v_obj.m_timestamp = 0;
                v_obj.m_longPress = false;
                this.p_buttons.push (v_obj);
            }
        };

        this.fn_getGamePad = function (index)
        {
            if (isNaN(index)) return ;
            return v_controllers[index];
        }

        
        /**
         * true if a gamepad is defined in v_controller.
         * note that a gamePad might be connected but not yet detected so v_controller is empty.
         */
        this.fn_isGamePadDefined = function ()
        {
            return Object.keys(v_controllers).length >=1;
        }

        /**
         * Generate vibration if supported
         */
        this.fn_makeVibration = function (p_duration)
        {
            if (isNaN(p_duration)) return ;
            p_duration = Math.min(Math.max (p_duration,0),2000);
            if (this.c_padStatus.p_vibration === true)
            {
                let pads = navigator.getGamepads();
                pads[0].vibrationActuator.playEffect("dual-rumble", {
                    startDelay: 0,
                    duration: p_duration,
                    weakMagnitude: 0.5,
                    strongMagnitude: 0.5
                });
            }
        }

        function fn_onConnect(e)
        {
            fn_console_log (e);

            var gp = navigator.getGamepads()[e.gamepad.index];
            fn_console_log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                gp.index, gp.id,
                gp.buttons.length, gp.axes.length);
            
                fn_addgamepad(e.gamepad);
                window.AndruavLibs.EventEmitter.fn_dispatch (EE_GamePad_Connected,e.gamepad);
        };

        function fn_onDisconnect(e)
        {
            fn_console_log (e);
            fn_fn_removeGamepad(e.gamepad);
            window.AndruavLibs.EventEmitter.fn_dispatch (EE_GamePad_Disconnected,e.gamepad);
        };

        function fn_updateStatus() {
            fn_scangamepads();
            rAF(fn_updateStatus);
        }

        function fn_addgamepad (p_gamepad)
        {
            var v_padStatus = new fn_Obj_padStatus();
            v_controllers[p_gamepad.index] = v_padStatus;
            v_padStatus.p_connected = true;
            v_padStatus.p_vibration = (p_gamepad.vibrationActuator!=null);
            rAF(fn_updateStatus);
        };

        function fn_fn_removeGamepad(p_gamepad) {
            if ((p_gamepad != null) && (v_controllers[p_gamepad.index]!= null))
            {
                delete v_controllers[p_gamepad.index];
            }
        };

        


        function fn_scangamepads() {
            const c_gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
            for (var i = 0; i < c_gamepads.length; i++) {
              if (c_gamepads[i]) {
                if (!(c_gamepads[i].index in v_controllers)) {
                  addgamepad(c_gamepads[i]);
                } else {
                    if (v_controllers[c_gamepads[i].index] == null)
                    {
                        v_controllers[c_gamepads[i].index] = c_gamepads[i];
                    }
                    fn_universalPad(c_gamepads[i]);
                }
              }
            }
        }

        function fn_universalPad(p_gamepad)
        {
            const c_padStatus = v_controllers[p_gamepad.index];
            c_padStatus.p_connected = true;
            
            var v_axesChanged = false;
            const c_now = Date.now();
            
            for (var j=0;j<4;++j)
            {
                if (c_padStatus.p_axes[j] != p_gamepad.axes[j])
                {
                    v_axesChanged = true;
                    c_padStatus.p_axes[j] = p_gamepad.axes[j].toFixed(2);
                    
                }
            }

            if ((v_axesChanged === true) || ((c_now - v_lastUpdateSent) > 1000))
            {
                window.AndruavLibs.EventEmitter.fn_dispatch (EE_GamePad_Axes_Updated);
                v_lastUpdateSent = c_now;
            }

            var v_buttonChanged = false;

            for (var i =0; i<=5; ++i)
            {
                const c_pressed = p_gamepad.buttons[i].pressed;
                if (c_padStatus.p_buttons[i].m_pressed != c_pressed)
                {
                    v_buttonChanged = true;
                    c_padStatus.p_buttons[i].m_pressed = p_gamepad.buttons[i].pressed;    
                    c_padStatus.p_buttons[i].m_timestamp = Date.now();
                    c_padStatus.p_buttons[i].m_longPress = false;
                    if (v_buttonChanged === true)
                    {
                        var v_Packet = {};
                        v_Packet.p_buttonIndex = i;
                        v_Packet.p_buttons =  c_padStatus.p_buttons;window.AndruavLibs.EventEmitter.fn_dispatch (EE_GamePad_Button_Updated, v_Packet);
                    }
                }
                else
                {
                    if ((c_pressed===true) 
                    && (c_padStatus.p_buttons[i].m_longPress===false)
                    && ((Date.now() - c_padStatus.p_buttons[i].m_timestamp) > CONST_GAMEPAD_LONG_PRESS)
                    )
                    {
                        // long press
                        var v_Packet = {};
                        v_Packet.p_buttonIndex = i;
                        v_Packet.p_buttons =  c_padStatus.p_buttons;
                        c_padStatus.p_buttons[i].m_longPress = true;
                        window.AndruavLibs.EventEmitter.fn_dispatch (EE_GamePad_Button_Updated, v_Packet);
                        fn_console_log ("button "  + i + " long press");
                    }
                }
        
            }
        }


        function fn_init()
        {
            if (c_haveEvents) {
                window.addEventListener("gamepadconnected", fn_onConnect);
                window.addEventListener("gamepaddisconnected", fn_onDisconnect);
            } 
            else {
                setInterval(fn_scangamepads, 500);
              }


        };

        fn_init();
        
    };
    
    global.AndruavGamePad = new v_andruavGamePad;

}) (AndruavLibs);

(function(lib) {
    "use strict";
    if (typeof module === "undefined" || typeof module.exports === "undefined") {
      window.AndruavLibs = lib; // in ordinary browser attach library to window
    } else {
      module.exports = lib; // in nodejs
    }
  })(AndruavLibs);
  
  