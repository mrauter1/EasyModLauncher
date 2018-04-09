/*
 * ouibounce
 * https://github.com/carlsednaoui/ouibounce
 *
 * Copyright (c) 2014 Carl Sednaoui
 * MIT license
 */
function ouibounce(el, config) {
  var config     = config || {},
	aggressive   = config.aggressive || false,
	sensitivity  = setDefault(config.sensitivity, 20),
	timer        = setDefault(config.timer, 1000),
	delay        = setDefault(config.delay, 0),
	callback     = config.callback || function() {},
	cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
	cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
	cookieName   = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
	sitewide     = config.sitewide === true ? ';path=/' : '',
	_delayTimer  = null,
	_html        = document.documentElement;

  function setDefault(_property, _default) {
	return typeof _property === 'undefined' ? _default : _property;
  }

  function setDefaultCookieExpire(days) {
	// transform days to milliseconds
	var ms = days*24*60*60*1000;

	var date = new Date();
	date.setTime(date.getTime() + ms);

	return "; expires=" + date.toUTCString();
  }

  setTimeout(attachOuiBounce, timer);
  function attachOuiBounce() {
	_html.addEventListener('mouseleave', handleMouseleave);
	_html.addEventListener('mouseenter', handleMouseenter);
	_html.addEventListener('keydown', handleKeydown);
  }

  function handleMouseleave(e) {
	if (e.clientY > sensitivity || (checkCookieValue(cookieName, 'true') && !aggressive)) return;

	_delayTimer = setTimeout(_fireAndCallback, delay);
  }

  function handleMouseenter(e) {
	if (_delayTimer) {
	  clearTimeout(_delayTimer);
	  _delayTimer = null;
	}
  }

  var disableKeydown = false;
  function handleKeydown(e) {
	if (disableKeydown || checkCookieValue(cookieName, 'true') && !aggressive) return;
	else if(!e.metaKey || e.keyCode !== 76) return;

	disableKeydown = true;
	_delayTimer = setTimeout(_fireAndCallback, delay);
  }

  function checkCookieValue(cookieName, value) {
	return parseCookies()[cookieName] === value;
  }

  function parseCookies() {
	// cookies are separated by '; '
	var cookies = document.cookie.split('; ');

	var ret = {};
	for (var i = cookies.length - 1; i >= 0; i--) {
	  var el = cookies[i].split('=');
	  ret[el[0]] = el[1];
	}
	return ret;
  }

  function _fireAndCallback() {
	fire();
	callback();
  }

  function fire() {
	// You can use ouibounce without passing an element
	// https://github.com/carlsednaoui/ouibounce/issues/30
	if (el) el.style.display = 'block';
	disable();
  }

  function disable(options) {
	var options = options || {};

	// you can pass a specific cookie expiration when using the OuiBounce API
	// ex: _ouiBounce.disable({ cookieExpire: 5 });
	if (typeof options.cookieExpire !== 'undefined') {
	  cookieExpire = setDefaultCookieExpire(options.cookieExpire);
	}

	// you can pass use sitewide cookies too
	// ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
	if (options.sitewide === true) {
	  sitewide = ';path=/';
	}

	// you can pass a domain string when the cookie should be read subdomain-wise
	// ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
	if (typeof options.cookieDomain !== 'undefined') {
	  cookieDomain = ';domain=' + options.cookieDomain;
	}

	if (typeof options.cookieName !== 'undefined') {
	  cookieName = options.cookieName;
	}

	document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;

	// remove listeners
	_html.removeEventListener('mouseleave', handleMouseleave);
	_html.removeEventListener('mouseenter', handleMouseenter);
	_html.removeEventListener('keydown', handleKeydown);
  }

  return {
	fire: fire,
	disable: disable
  };
}

jQuery(document).ready(function($) {
	var $theBody = $( 'body' );

	function mobileMenuToggle() {
		var toggleTarget = $(this).parent().children('.nav-primary');

		$(toggleTarget).slideToggle('fast', function() {
			return false;
		});
	}

	function mobileMenu() {
		var $menuButton = $( '.menu-toggle a' ),
			$menuToggle = $( '.menu-toggle' );

		// Show/hide the main navigation
		$menuToggle.click( mobileMenuToggle );

		// Stop the navigation link moving to the anchor
		$menuButton.click(function(e) {
			e.preventDefault();
		});
	}

	function exitPopup() {
		var $modalContent = $( '#basement-modal .modal-content' ),
			$popupDiv     = $( '#basement-modal' ),
			$main         = $( '#main-content' ),
			$optin        = $( '#optin-content' ),
			$yesButton    = $( '#yes-button' ),
			$noButton     = $( '#no-button' ),
			$nevermind    = $( '#nevermind' ),
			_ouibounce    = null;

		// Return early if we're on a mobile device.
		if ( $theBody.hasClass( 'touch' ) || 0 === $popupDiv.length ) {
			return;
		}

		function hidePopup(e) {
			e.preventDefault();
			$popupDiv.hide();
		}

		// Save OuiBounce to an object.
		_ouibounce = ouibounce( $popupDiv[0], {
			sitewide: true,
			aggressive: false,
			callback: function() {
				$modalContent.addClass( 'fadeInUp' );
			}
		});

		$noButton.on('click', hidePopup );
		$nevermind.on('click', hidePopup );

		$yesButton.on('click', function(e) {
			e.preventDefault();
			$main.hide();
			$optin.addClass( 'bounceInDown' );
		});

	}

	// Detect touch devices.
	$theBody.addClass( 'ontouchstart' in window || 'onmsgesturechange' in window ? 'touch' : 'no-touch' );

	// Show/hide the main navigation
	mobileMenu();

	// Fire the exit popup.
	exitPopup();
});
