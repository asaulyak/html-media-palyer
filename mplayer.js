window.mPlayer = (function () {
	function MediaPlayer() {

	}

	function generateHtml() {
		<!-- build:markup -->

		return '<div class="media-player">'
'		<div class="cover"></div>'
'		<div class="controls">'
'			<div class="playback play"></div>'
'			<div class="volume">'
'				<div class="mute"></div>'
'				<div class="max"></div>'
'				<div class="progress">'
'					<div class="slide"></div>'
'					<div class="slider"></div>'
'					<div class="side left"></div>'
'					<div class="side right"></div>'
'				</div>'
'			</div>'
'		</div>'
'		<div class="metadata">'
'			<div class="song-title">Burn it Down</div>'
'			<div class="album-title">Linkin Park</div>'
'		</div>'
'		<audio class="audio">'
'		</audio>'
'	</div>';

		<!-- endbuild -->
	}

	function generateCss() {
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var css = '';

		style.type = 'text/css';

		<!-- build:css -->

		css = '.media-player {\

		<!-- endbuild -->

		if (style.styleSheet){
			style.styleSheet.cssText = css;
		}
		else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}

	function createDomElement() {
		var element = window.document.createElement('div');
		element.innerHTML = generateHtml();
		generateCss();

		return element;
	}

	function appendToContainer(container) {
		var containerElement = window.document.querySelector(container)
			|| window.document.querySelector('body');

		containerElement.appendChild(createDomElement());
	}

	function init(options) {
		appendToContainer(options.container);
	}

	MediaPlayer.prototype = {
		play: function () {

		}
	};

	return {
		createPlayer: function (options) {
			init(options);

			return new MediaPlayer();
		}
	};
})();