/***************************************************

	Mohammad Said Hefny
	mohammad.hefny@gmail.com
	30 Jul 2016

*****************************************************/

function fn_SpeakEngine () 
{
	const Me = this
	var v_speakmsg ;
	var _toSpeak = {};
	var _index = 0;
	var _curIndex = 0;
	function fn_initSpeak () 
	{
		speechSynthesis.cancel()
		v_speakmsg = new SpeechSynthesisUtterance();

		var voices = window.speechSynthesis.getVoices();
		v_speakmsg.voice = voices[10]; // Note: some voices don't support altering params
		v_speakmsg.voiceURI = 'native';
		v_speakmsg.volume = 1; // 0 to 1
		v_speakmsg.rate = 1; // 0.1 to 10
		v_speakmsg.pitch = 1; //0 to 2
		v_speakmsg.lang = 'en-US';

		var elapsedTime = 0;
		if ((event != null) && (event.elapsedTime != null))
		{
			elapsedTime = event.elapsedTime;
		}
		v_speakmsg.onend = function(e) {
			fn_console_log('Finished in ' + elapsedTime + ' seconds.');
			if (_index < _curIndex)
			{
				v_speakmsg.text = _toSpeak[_curIndex];
				delete _toSpeak[_curIndex];
				_curIndex = _curIndex + 1;
				speechSynthesis.speak(v_speakmsg);	
			}
		};
	};

	this.fn_speak = function fn_speak (text)
	{
		if (v_enable_speak == false) return ;
		if (v_speakmsg == null) return ; // not defined
		if ((text == null) || (text == '')) return ;
		v_speakmsg.text = text;
		if (speechSynthesis.speaking == true)
		{
			_toSpeak[_index] = text;
			_index = _index + 1;
			return ;
		}
		speechSynthesis.speak(v_speakmsg);	
	};

fn_initSpeak();

};

var v_SpeakEngine = new fn_SpeakEngine();
