
/*! ready.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/ready */
/**
 * Run functions after the DOM is ready.
 * @param  {Function} fn Callback function
 */
var ready = function ( fn ) {

    // Sanity check
    if ( typeof fn !== 'function' ) return;

    // If document is already loaded, run method
    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener( 'DOMContentLoaded', fn, false );

};

ready(function(){

	"use strict";

    /**
     * data-useragent for CSS targeting IE10.  See CSS.
     */
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

    /**
     * Mobile Menu
     */
	var ssMobileMenu = function() {
	    var opts = {toggleActiveClass: 'is-clicked'};
        astro.init(opts);

        /**
         * Ensure clicks to nav links close the nav menu.
         */
        Array.prototype.forEach.call(document.querySelectorAll('#header-nav-wrap a'), function(e){
           e.addEventListener('click', function(evt){
               astro.toggleNav(document.querySelector('.header-menu-toggle'), '#header-nav-wrap', opts);
           });
        });
	}; 

    /**
     * Gumshoe
     *
     * https://github.com/cferdinandi/gumshoe
     */
	var ssWaypoints = function() {
	    // using offset instead of 'selectorHeader' option, because we want it occur earlier than it would
        gumshoe.init({activeClass: 'current', /*'selectorHeader': '#header',*/ offset: 100});
	};

    /**
     * Smooth Scroll
     *
     * https://github.com/cferdinandi/smooth-scroll
     */
	var ssSmoothScroll = function() {
        new SmoothScroll('.smoothscroll', {header: '#header'});
	};

    /**
     * AOS
     */
    var ssAOS = function() {
        AOS.init({
            offset: 120,
            duration: 400,
            easing: 'ease-in-sine',
            delay: 0,
            once: true,
            disable: 'mobile'
        });
    };

    var scrollTop = function(){
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    /**
     * Back to top button
     */
    var ssBackToTop = function() {

		var pxShow  = 500, // height on which the button will show
		goTopButton = document.querySelector("#go-top")
        ;

		// Show or hide the sticky footer button
        window.addEventListener('scroll', function(){
            if (scrollTop() >= pxShow){
                goTopButton.className = 'visible';
            } else {
                goTopButton.className = '';
            }
        });

	};

    var updateStatus = function(){
         var xhr = new XMLHttpRequest();
         xhr.open('GET', '/status/api/status');

         xhr.onreadystatechange = function () {
             var DONE = 4; // readyState 4 means the request is done.
             var OK = 200; // status 200 is a successful return.
             if (xhr.readyState === DONE) {
                 if (xhr.status === OK) {

                     var r = JSON.parse(xhr.responseText);

                     document.getElementById('status').setAttribute('class', r.status);
                     document.getElementById('status').setAttribute('title', new Date().toLocaleString());

                 } else {
                     document.getElementById('status').setAttribute('class', 'error');
                 }
             } else {
                 document.getElementById('status').setAttribute('class', 'error');
                 console.log('Error: ' + xhr.status); // An error occurred during the request.
             }
         };

         xhr.send(null);
    };

    /**
     * Init
     */
	(function ssInit() {

	    ssMobileMenu();
		ssWaypoints();
		ssSmoothScroll();
		ssAOS();
		ssBackToTop();

		updateStatus();

	})();


});