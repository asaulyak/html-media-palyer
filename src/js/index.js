window.mPlayer = (function () {

	// Constructor
	function MediaPlayer() {
	}

	// Private properties

	var audio = new Audio();
	var isVolumeSliderPressed = false;
	var volumeControl = null;
	var volumeSlide = null;
	var volumeProgressBar = null;
	var muteVolumeControl = null;
	var maxVolumeControl = null;

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

		setDomElements();
		bindListeners();
	}

	function bindListeners() {

		// Bind volume controls
		volumeControl.addEventListener('mousedown', onVolumeSliderMouseDown, false);
		volumeControl.addEventListener('touchstart', onVolumeSliderMouseDown, false);
		window.document.addEventListener('mousemove', onDocumentMouseMove, false);
		window.document.addEventListener('touchmove', onDocumentMouseMove, false);
		window.document.addEventListener('mouseup', onVolumeSliderMouseUp, false);
		window.document.addEventListener('touchend', onVolumeSliderMouseUp, false);

		volumeProgressBar.addEventListener('click', onVolumeSlideClicked, false);

		muteVolumeControl.addEventListener('click', onMuteVolumeClicked, false);
		maxVolumeControl.addEventListener('click', onMaxVolumeClicked, false);


		// Bind playback controls

	}

	function setDomElements() {
		volumeControl
			= window.document.querySelector('.media-player .controls .volume .progress .slider');

		volumeSlide = window.document.querySelector('.media-player .controls .volume .progress .slide');

		volumeProgressBar = window.document.querySelector('.media-player .controls .volume .progress .slider-container');

		muteVolumeControl = window.document.querySelector('.media-player .controls .volume .mute');
		maxVolumeControl = window.document.querySelector('.media-player .controls .volume .max');
	}

	function setVolume(value) {
		value = Math.min(1, value);
		value = Math.max(0, value);

		audio.volume = value;

		volumeSlide.style.width = value * 100 + '%';
		volumeControl.style.left = value * 100 + '%';


	}

	// DOM event handlers

	function onVolumeSliderMouseDown() {
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

	function onVolumeSliderMouseUp() {
		if (isVolumeSliderPressed) {
			isVolumeSliderPressed = false;
		}
	}

	function onVolumeSlideClicked(event) {
		var slideRect = event.currentTarget.getBoundingClientRect();
		var mouseX = event.touches ? event.touches[0].pageX : event.pageX;

		var value = (mouseX - slideRect.left) / slideRect.width;

		setVolume(value.toFixed(2));
	}

	function onMuteVolumeClicked() {
		setVolume(0);
	}

	function onMaxVolumeClicked() {
		setVolume(1);
	}

	// end DOM event handlers

	// end Private methods

	MediaPlayer.prototype = {
		play: function (source) {
			audio.src = source;
			audio.play();
		},

		setVolume: function (value) {
			setVolume(value);
		},

		updateMetadata: function (metadata) {

		}
	};

	return {
		createPlayer: function (options) {
			init(options);

			return new MediaPlayer();
		}
	};
})();