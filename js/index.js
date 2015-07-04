window.mPlayer = (function () {
	function MediaPlayer() {

	}

	function generateHtml() {
		return '<div class="media-player">'
			+ '<div class="cover"></div>'
			+ '<div class="controls">'
			+ '<div class="playback play"></div>'
			+ '<div class="volume">'
			+ '<div class="mute"></div>'
			+ '<div class="max"></div>'
			+ '<div class="progress">'
			+ '<div class="slide"></div>'
			+ '<div class="slider"></div>'
			+ '<div class="side left"></div>'
			+ '<div class="side right"></div>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			+ '<div class="metadata">'
			+ '<div class="song-title">Burn it Down</div>'
			+ '<div class="album-title">Linkin Park</div>'
			+ '</div>'
			+ '<audio class="audio">'
			+ '</audio>'
			+ '</div>';
	}

	function createDomElement() {
		var element = window.document.createElement('div');
		element.innerHTML = generateHtml();

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
