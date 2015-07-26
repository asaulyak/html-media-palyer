window.mPlayer = (function () {

	// Constructor
	function MediaPlayer() {
	}

	// Private properties

	var audio = new Audio();
	var isVolumeSliderPressed = false;
	var volumeControl = null;
	var volumeSlide = null;

	// end Private properties

	// Private methods

	function generateHtml() {
		<!-- build:markup -->

		<!-- endbuild -->
	}

	function generateCss() {
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var css = '';

		style.type = 'text/css';

		<!-- build:css -->

		<!-- endbuild -->

		if (style.styleSheet) {
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

		bindListeners();
	}

	function bindListeners() {
		volumeControl
			= window.document.querySelector('.media-player .controls .volume .progress .slider');
		volumeSlide = window.document.querySelector('.media-player .controls .volume .progress .slide');


		if (volumeControl) {
			volumeControl.addEventListener('mousedown', onVolumeSliderMouseDown, false);
			volumeControl.addEventListener('touchstart', onVolumeSliderMouseDown, false);

			window.document.addEventListener('mousemove', onDocumentMouseMove, false);
			window.document.addEventListener('touchmove', onDocumentMouseMove, false);

			window.document.addEventListener('mouseup', onVolumeSliderMouseUp, false);
			window.document.addEventListener('touchend', onVolumeSliderMouseUp, false);

		}
	}

	function setVolume(value) {
		value = Math.min(1, value);
		value = Math.max(0, value);

		audio.volume = value;

		volumeSlide.style.width = value * 100 + '%';
		volumeControl.style.left = value * 100 + '%';


	}

	// DOM event handlers

	function onVolumeSliderMouseDown(event) {
		isVolumeSliderPressed = true;
	}

	function onDocumentMouseMove(event) {
		if (isVolumeSliderPressed) {
			var controlRect = volumeControl.parentNode.getBoundingClientRect();
			var mouseX = event.touches ? event.touches[0].pageX : event.pageX;

			var value = (mouseX - controlRect.left)
				/ controlRect.width;

			console.log(value);
			setVolume(value.toFixed(2));
		}
	}

	function onVolumeSliderMouseUp(event) {
		if (isVolumeSliderPressed) {
			isVolumeSliderPressed = false;
		}
	}

	// end DOM event handlers

	// end Private methods

	MediaPlayer.prototype = {
		play: function (source) {
			audio.src = source;
			audio.play();
		}
	};

	return {
		createPlayer: function (options) {
			init(options);

			return new MediaPlayer();
		}
	};
})();
