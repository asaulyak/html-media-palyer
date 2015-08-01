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
	var playControl = null;
	var isPlaying = false;
	var metadata = {};

	// end Private properties

	// Private methods

	function generateHtml() {
		//<!-- build:markup -->

		//<!-- endbuild -->
	}

	function generateCss() {
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		var css = '';

		style.type = 'text/css';

		//<!-- build:css -->

		//<!-- endbuild -->

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
		playControl.addEventListener('click', onPlaybackButtonClicked, false);
	}

	function setDomElements() {
		volumeControl
			= window.document.querySelector('.media-player .controls .volume .progress .slider');

		volumeSlide = window.document.querySelector('.media-player .controls .volume .progress .slide');

		volumeProgressBar = window.document.querySelector('.media-player .controls .volume .progress .slider-container');

		muteVolumeControl = window.document.querySelector('.media-player .controls .volume .mute');
		maxVolumeControl = window.document.querySelector('.media-player .controls .volume .max');

		playControl = window.document.querySelector('.media-player .controls .playback');

		metadata.artist = window.document.querySelector('.media-player .metadata .artist-title');
		metadata.title = window.document.querySelector('.media-player .metadata .song-title');
		metadata.cover = window.document.querySelector('.media-player .cover');
	}

	function setVolume(value) {
		value = Math.min(1, value);
		value = Math.max(0, value);

		audio.volume = value;

		volumeSlide.style.width = value * 100 + '%';
		volumeControl.style.left = value * 100 + '%';
	}

	function setPlaying(play) {
		isPlaying = !!play;

		if(isPlaying) {
			audio.play();
		}
		else {
			audio.pause();
		}

		playControl.classList.remove('play');
		playControl.classList.remove('stop');

		playControl.classList.add(isPlaying ? 'stop' : 'play');
	}

	function togglePlay() {
		setPlaying(!isPlaying);
	}

	function setSource(source) {
		audio.src = source;
	}

	function setMetadata(data) {
		metadata.artist.textContent = data.artist || 'Anonymous';
		metadata.title.textContent = data.title || 'Anonymous';

		if(data.cover) {
			metadata.cover.style.backgroundImage = 'url(' + data.cover + ')';
		}
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

	function onPlaybackButtonClicked(event) {
		togglePlay();
	}

	// end DOM event handlers

	// end Private methods


	//Public methods

	MediaPlayer.prototype = {
		play: function (source) {
			setSource(source);
			setPlaying(true);
		},

		setVolume: function (value) {
			setVolume(value);
		},

		updateMetadata: function (metadata) {
			setMetadata(metadata);
		}
	};

	// end Public methods

	return {
		createPlayer: function (options) {
			options = options || {};
			init(options);

			return new MediaPlayer();
		}
	};
})();