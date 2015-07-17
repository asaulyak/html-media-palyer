window.mPlayer = (function () {
	function MediaPlayer() {

	}

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
