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

// single GamePad status that is stored inside this.v_controllers
class fn_Obj_padStatus {
    constructor() 
    {
    this.p_axes = [-1, 0, 0, 0];

    this.p_buttons = [];

    this.p_connected = false;

    this.p_vibration = false;

    for (var i = 0; i < 6; ++ i) {
        var v_obj = {};
        v_obj.m_pressed = false;
        v_obj.m_timestamp = 0;
        v_obj.m_longPress = false;
        this.p_buttons.push(v_obj);
    }
    }
};

class CAndruavGamePad {

    constructor() {
        this.c_haveEvents = '13b124c12e6927d9310024c127101299366427d92f443490'._fn_hexDecode(); // /* 'GamepadEvent' */ in window;
        this.v_lastUpdateSent = Date.now();
        this.v_controllers = {};
        

        if (this.c_haveEvents) {
            window.addEventListener('297124c12e6927d9310024c12710264930212f442f4427d92649349027d92710'._fn_hexDecode() /* "gamepadconnected" */, this.fn_onConnect);
            window.addEventListener('297124c12e6927d9310024c1271027102b1133a9264930212f442f4427d92649349027d92710'._fn_hexDecode() /* "gamepaddisconnected" */, this.fn_onDisconnect);
            
        } else {
            setInterval(this.fn_scangamepads, 500);
        }

    }

    

    fn_getGamePad(index) {
        if (isNaN(index)) 
            return;
        
        return this.v_controllers[index];
    }


    /**
         * true if a gamepad is defined in v_controller.
         * note that a gamePad might be connected but not yet detected so v_controller is empty.
         */
    fn_isGamePadDefined() {
        return Object.keys(this.v_controllers).length >= 1;
    }

    /**
         * Generate vibration if supported
         */
    fn_makeVibration(p_duration) {
        if (isNaN(p_duration)) 
            return;
        

        p_duration = Math.min(Math.max(p_duration, 0), 2000);
        if (this.c_padStatus.p_vibration === true) {
            let pads = navigator.getGamepads();
            pads[0].vibrationActuator.playEffect("dual-rumble", {
                startDelay: 0,
                duration: p_duration,
                weakMagnitude: 0.5,
                strongMagnitude: 0.5
            });
        }
    }

    fn_onConnect(e) {
        fn_console_log(e);

        var gp = navigator.getGamepads()[e.gamepad.index];
        fn_console_log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);

        window.AndruavLibs.AndruavGamePad.fn_addgamepad(window.AndruavLibs.AndruavGamePad,e.gamepad);
        window.AndruavLibs.EventEmitter.fn_dispatch(EE_GamePad_Connected, e.gamepad);
    };


    fn_onDisconnect(e) {
        fn_console_log(e);
        window.AndruavLibs.AndruavGamePad.fn_removeGamepad(window.AndruavLibs.AndruavGamePad,e.gamepad);
        window.AndruavLibs.EventEmitter.fn_dispatch(EE_GamePad_Disconnected, e.gamepad);
    }

    fn_updateStatus() {
        window.AndruavLibs.AndruavGamePad.fn_scangamepads();
        window.requestAnimationFrame(window.AndruavLibs.AndruavGamePad.fn_updateStatus);
    }

    fn_addgamepad(me, p_gamepad) {
        var v_padStatus = new fn_Obj_padStatus();
        me.v_controllers[p_gamepad.index] = v_padStatus;
        v_padStatus.p_connected = true;
        v_padStatus.p_vibration = (p_gamepad.vibrationActuator != null);
        window.requestAnimationFrame(me.fn_updateStatus);
    }

    fn_removeGamepad(me, p_gamepad) {
        if ((p_gamepad != null) && (me.v_controllers[p_gamepad.index] != null)) {
            delete me.v_controllers[p_gamepad.index];
        }
    }

    fn_scangamepads() {
        const c_gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < c_gamepads.length; i++) {
            if (c_gamepads[i]) {
                if (!(c_gamepads[i].index in this.v_controllers)) {
                    this.addgamepad(this,c_gamepads[i]);
                } else {
                    if (this.v_controllers[c_gamepads[i].index] == null) {
                        this.v_controllers[c_gamepads[i].index] = c_gamepads[i];
                    }
                    this.fn_universalPad(c_gamepads[i]);
                }
            }
        }
    }

    fn_universalPad(p_gamepad) {
        const c_padStatus = this.v_controllers[p_gamepad.index];
        c_padStatus.p_connected = true;

        var v_axesChanged = false;
        const c_now = Date.now();

        for (var j = 0; j < 4; ++ j) {
            if (c_padStatus.p_axes[j] != p_gamepad.axes[j]) {
                v_axesChanged = true;
                c_padStatus.p_axes[j] = p_gamepad.axes[j].toFixed(2);

            }
        }

        if ((v_axesChanged === true) || ((c_now - this.v_lastUpdateSent) > 1000)) {
            window.AndruavLibs.EventEmitter.fn_dispatch(EE_GamePad_Axes_Updated);
            this.v_lastUpdateSent = c_now;
        }

        var v_buttonChanged = false;

        for (var i = 0; i <= 5; ++ i) {
            const c_pressed = p_gamepad.buttons[i].pressed;
            if (c_padStatus.p_buttons[i].m_pressed != c_pressed) {
                v_buttonChanged = true;
                c_padStatus.p_buttons[i].m_pressed = p_gamepad.buttons[i].pressed;
                c_padStatus.p_buttons[i].m_timestamp = Date.now();
                c_padStatus.p_buttons[i].m_longPress = false;
                if (v_buttonChanged === true) {
                    var v_Packet = {};
                    v_Packet.p_buttonIndex = i;
                    v_Packet.p_buttons = c_padStatus.p_buttons;
                    window.AndruavLibs.EventEmitter.fn_dispatch(EE_GamePad_Button_Updated, v_Packet);
                }
            } else {
                if ((c_pressed === true) && (c_padStatus.p_buttons[i].m_longPress === false) && ((Date.now() - c_padStatus.p_buttons[i].m_timestamp) > CONST_GAMEPAD_LONG_PRESS)) { // long press
                    var v_Packet = {};
                    v_Packet.p_buttonIndex = i;
                    v_Packet.p_buttons = c_padStatus.p_buttons;
                    c_padStatus.p_buttons[i].m_longPress = true;
                    window.AndruavLibs.EventEmitter.fn_dispatch(EE_GamePad_Button_Updated, v_Packet);
                    fn_console_log("button " + i + " long press");
                }
            }

        }
    }


};

var AndruavLibs = AndruavLibs || {
    REVISION: 'BETA'
};

(function (lib) {
    "use strict";
    if (typeof module === "undefined" || typeof module.exports === "undefined") {
        window.AndruavLibs.AndruavGamePad = lib; // in ordinary browser attach library to window
    } else {
        module.exports = lib; // in nodejs
    }
})(new CAndruavGamePad());
