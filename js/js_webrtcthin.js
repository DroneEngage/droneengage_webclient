var AndruavLibs = AndruavLibs || {REVISION: 'BETA' };


(function(global)
{
    
    
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // WebRTC Simple Calling API + Mobile
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    var AndruavStream = (function() {
        
        this.onOrphanDisconnect  = function ()
        {

        }

        function debugerr (msg)
        {
            fn_console_log ("webrtc ERROR: %s",msg);
            
        }

        function debugcb (msg)
        {
            fn_console_log ("webrtc: %s", JSON.stringify(msg));
            return ;
        }
        var Me = this;
        var conversations = {};
         
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // RTC Peer Connection Session (one per call)
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        var PeerConnection =
            window.RTCPeerConnection    ||
            window.mozRTCPeerConnection ;
            // || // https://stackoverflow.com/questions/53251527/webrtc-video-is-not-displaying
            // window.webkitRTCPeerConnection;
    
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // ICE (many route options per call)
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        var IceCandidate =
            window.RTCIceCandidate ||
            window.mozRTCIceCandidate
            ;
    
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Media Session Description (offer and answer per call)
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        var SessionDescription =
            window.RTCSessionDescription    ||
            window.mozRTCSessionDescription; 
            // ||  window.webkitRTCSessionDescription;
    
       
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // STUN Server List Configuration (public STUN list)
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        var rtcconfig = { 
            constraints: {
                
                mandatory: {
                    OfferToReceiveAudio: false,
                    OfferToReceiveVideo: true
                    
                },
                optional: []
            },
            candidates : {
                turn: true,
                stun: true,
                host: false
            },
            sdpSemantics: 'unified-plan',
            iceServers : [
                //{ urls: 'turn:andruav.com:3478' , 'credential':'1234', 'username':'andruav' },
                { urls: 'turn:104.131.188.164:3478' , 'credential':'1234', 'username':'andruav_ap' },
                {urls: "stun:stun1.l.google.com:19302"}
                
                ] 
            };
             
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // PHONE Events
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        
        var v_andruavClient = null;
    
       
        
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Add/Get Conversation - Creates a new PC or Returns Existing PC
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        function get_conversation(p_number,p_targetVideoTrack) {
             
            if (p_targetVideoTrack == null)
            {
                p_targetVideoTrack = "default"; 
            }
            var v_talk = (function(number,targetVideoTrack){
                var talk = {
                    closed  : false,
                    received: false,
                    number  : number,
                    status  : '',
                    started : +new Date,
                    pc      : new PeerConnection(rtcconfig),
                    onError: function () {},
                    onConnect: function () {},
                    onDisplayVideo: function () {},
                    onAddStream: function () {},
                    onRemovestream: function () {},
                    onClosing: function () {},
                    onDisconnected: function () {},
                };
                var vid = talk.number;
                talk.targetVideoTrack = targetVideoTrack;
                
           
    
                
                // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                // On ICE Route Candidate Discovery
                // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                       
                this.onicecandidate = function (event) {
                   if (!event.candidate) 
                   {
                       return;
                   }
                   transmit( this.number, talk.targetVideoTrack,event.candidate );
                };


                // Setup Event Methods
                
                talk.pc.onicecandidate = onicecandidate;
                talk.pc.number         = number;
                
    
                // Disconnect and Hangup
                talk.hangup = function(p_sendToParty) {
                    if (talk.closed) return;
                    fn_set_status(talk,'closing');
                    if (p_sendToParty === true)
                    {
                        transmit( number, talk.targetVideoTrack,{ hangup : true } );
                    }
    
                    
                    close_conversation(talk.targetVideoTrack);
                };
    
                fn_set_status(talk,'connecting');
                // Return Brand New Talk Reference
                conversations[talk.targetVideoTrack] = talk;
                
                return talk;
            })(p_number, p_targetVideoTrack);
    
            // Return Existing or New Reference to Caller
            return v_talk;
        }
    
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Remove Conversation
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        function close_conversation(talkId) {
            if (conversations[talkId] == null) return;
            conversations[talkId].closed = true;
            conversations[talkId].onDisconnected(conversations[talkId]);
            conversations[talkId].pc.close();
            fn_set_status(conversations[talkId],'closed');
            conversations[talkId] = undefined;
        }
    
        
        function fn_set_status (p_talk,p_status)
        {
            p_talk.status = p_status;
        }
       
    
         // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Visually Display New Stream
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        function onaddtrack(talk,mediaStreamEvent) {
            var stream = mediaStreamEvent.streams[0];
            fn_console_log ("WEBRTC: TRACK-muted:" + stream.getVideoTracks()[0].muted);
            
            
            var targetVideoTrack = talk.targetVideoTrack.replace(/ /g,"_").toLowerCase();
            var len  = stream.getVideoTracks().length;
            var p = [];
            
            
            if (window.chrome == true)
            {   // Multiple tracks per stream can be implemented in Chrome.
                // As in FireFox TrackID & Label are overwritten by new values so I cannot track them.
                // A proposed solution is in this link https://stackoverflow.com/questions/65408744/in-webrtc-how-do-i-label-a-local-mediastream-so-that-a-remote-peer-can-identify
                // which is to add extra data in the communication packet next to the offer.
                for (var i =0; i< len; ++ i)
                {
                if (stream.getVideoTracks()[i].id.toLowerCase() != targetVideoTrack)
                {
                    p.push (stream.getVideoTracks()[i].id);
                }
                }

                // remove tracks that are not equal to target track.
                for (var i =0; i< p.length; ++ i)
                {
                stream.removeTrack(stream.getTrackById(p[i]));
                }
            }


            talk.stream = stream;
        }
        
        
      
        this.hangup = function (number)
        {
            var talk = conversations[number];
            if (talk == null) return ;

            update_conversation( talk, 'closing' );
            talk.hangup(true);
        }

        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Ask to Join a Broadcast
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        var pv_join = function  (dialconfig)
        {
            talk = get_conversation(dialconfig.number, dialconfig.targetVideoTrack);
                // Ignore if Closed
                
                talk.onError            = (dialconfig.onError        != null? dialconfig.onError         : talk.onError);
                talk.onConnect          = (dialconfig.onConnect      != null? dialconfig.onConnect       : talk.onConnect);
                talk.onDisplayVideo     = (dialconfig.onDisplayVideo != null? dialconfig.onDisplayVideo  : talk.onDisplayVideo);
                talk.onClosing          = (dialconfig.onClosing      != null? dialconfig.onClosing       : talk.onClosing);    
                talk.onDisconnected     = (dialconfig.onDisconnected != null? dialconfig.onDisconnected  : talk.onDisconnected);
                talk.onOrphanDisconnect = (dialconfig.onOrphanDisconnect != null? dialconfig.onOrphanDisconnect  : talk.onOrphanDisconnect);
                talk.pc.onremovestream  = (dialconfig.onRemovestream != null? dialconfig.onRemovestream  : talk.onRemovestream);
                talk.pc.ontrack = function(mediaStreamEvent) {
                    talk.onConnect(talk);
                    onaddtrack (talk,mediaStreamEvent);
                    talk.onDisplayVideo (talk);
                }
                if (talk.closed) return;
                transmit( dialconfig.number, dialconfig.targetVideoTrack ,{ joinme : true} );
        }          
        this.joinStream = function(dialconfig) {
            v_andruavClient = dialconfig.v_andruavClient;
            v_andruavClient.EVT_andruavSignalling = EVT_andruavSignalling;
            
            var talk;
            var vid = dialconfig.number ;
            if (dialconfig.targetVideoTrack != undefined)
            {
                vid = dialconfig.targetVideoTrack;
            }
            if (conversations[vid] != null) 
            {
                talk = conversations[vid];
                if (talk.status == 'connecting')
                {
                    // this could be a faulty connection hat didnt start
                    fn_set_status(talk,'cancelled');
                    conversations[talk.targetVideoTrack] = undefined;
                    pv_join (dialconfig);
                }
            }
            else
            {
                pv_join (dialconfig);
            }

            return talk;
        };
        
    
    
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Send SDP Call Offers/Answers and ICE Candidates to Peer
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        function transmit( phone, channel,packet, times, time ) {
            if (!packet) return;
            fn_console_log ("WEBRTC:" + JSON.stringify (packet));
            var message = { packet : packet, channel:channel ,id : phone, number : v_andruavClient.partyID };
            
            debugcb(message);
            v_andruavClient.API_WebRTC_Signalling(phone,message);
        }
    
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // SDP Offers & ICE Candidates Receivable Processing
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
       function EVT_andruavSignalling (andruavUnit,p_signal)
       {
            fn_console_log ("WEBRTC to WEB:" + JSON.stringify (p_signal));
                   
            debugcb(p_signal);
            
            // Get Call Reference
            var talk = conversations[p_signal.channel];
                    
            // // Ignore if Closed
            // if (message.packet.hangup)
            //     {
            //         onOrphanDisconnect (message.number);
            //     }

            if (!talk || talk.closed) return;
    
            // If Hangup Request
            if (p_signal.packet.hangup) return talk.hangup(false);
    
            // If Peer Calling Inbound (Incoming) - Can determine stream + receive here.
            if ( p_signal.packet.sdp && !talk.received ) {
                talk.received = true;
                //receivercb(talk);
            }
    
            // Update Peer Connection with SDP Offer or ICE Routes
            if (p_signal.packet.sdp) 
            {
                add_sdp_offer(p_signal);
            }
            else                    
            {
                add_ice_route(p_signal);
            }
        }
    
        
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Add SDP Offer/Answers
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        async function add_sdp_offer(p_signal) {
            // Get Call Reference
            var talk = conversations[p_signal.channel];
            var pc   = talk.pc;
            var type = p_signal.packet.type == 'offer' ? 'offer' : 'answer';
    
            // Deduplicate SDP Offerings/Answers
            //if (type in talk) return;
            talk[type]  = true;
            talk.dialed = true;
    
            // Notify of Call Status
            fn_set_status(talk,'routing');

            try
            {
                await pc.setRemoteDescription(new SessionDescription(p_signal.packet));
                // Set Connected Status
                fn_set_status(talk,'connected');
                await create_answer(pc,talk);

            }
            catch (e)
            {
                fn_console_log (e);
            }
        }
        
        async function create_answer (pc,p_talk)
        {
            try
            {
            const c_answer = await pc.createAnswer();
            await pc.setLocalDescription(c_answer);
            transmit( p_talk.number,p_talk.targetVideoTrack, c_answer, 2 );
            }
            catch (e)
            {
                debugcb(e);
            }
        }
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Add ICE Candidate Routes
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        async function add_ice_route(p_signal) {
            try
            {
            // Leave if Non-good ICE Packet
            if (!p_signal.packet)           return;
            if (!p_signal.packet.candidate) return;
    
            // Get Call Reference
            var talk = conversations[p_signal.channel];
            var pc   = talk.pc;
    
            // Add ICE Candidate Routes
            await pc.addIceCandidate(new IceCandidate(p_signal.packet));
            }
            catch (e)
            {
                debugcb(e);
            }
        }

    AndruavLibs.AndruavStream = this;
    })(global);
    
    
})(AndruavLibs);
    
    
(function(lib) {
    "use strict";
    if (typeof module === "undefined" || typeof module.exports === "undefined") {
        window.AndruavLibs = lib; // in ordinary browser attach library to window
    } else {
        module.exports = lib; // in nodejs
    }
    })(AndruavLibs);
    
    
    