/*!
 * Copyright (c) David Bushell | @dbushell | http://dbushell.com
 */
if (/dbushell\.com/.test(window.location.hostname))
{
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-9497100-1']);
    _gaq.push(['_setDomainName', 'dbushell.com']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}

(function(window, document, undefined)
{

    var hasEventListeners = !!window.addEventListener,

        addEvent = function(el, e, callback, capture)
        {
            if (hasEventListeners) {
                el.addEventListener(e, callback, !!capture);
            } else {
                el.attachEvent('on' + e, callback);
            }
        },

        removeEvent = function(el, e, callback, capture)
        {
            if (hasEventListeners) {
                el.removeEventListener(e, callback, !!capture);
            } else {
                el.detachEvent('on' + e, callback);
            }
        },

        fireEvent = function(el, eventName, data)
        {
            var ev;

            if (document.createEvent) {
                ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, true, false);
                ev = extend(ev, data);
                el.dispatchEvent(ev);
            } else if (document.createEventObject) {
                ev = document.createEventObject();
                ev = extend(ev, data);
                el.fireEvent('on' + eventName, ev);
            }
        },

        trim = function(str)
        {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
        },

        hasClass = function(el, cn)
        {
            return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
        },

        addClass = function(el, cn)
        {
            if (!hasClass(el, cn)) {
                el.className = (el.className === '') ? cn : el.className + ' ' + cn;
            }
        },

        removeClass = function(el, cn)
        {
            el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
        };


    var console = window.console;
    if (typeof console !== 'object' || !console.log)
    {
        (function() {
            var noop    = function() {},
                methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
                length  = methods.length;
            console = {};
            while (length--) {
                console[methods[length]] = noop;
            }
        }());
    }

    // https://github.com/jashkenas/underscore/blob/master/underscore.js

    var _now = Date.now || function() { return new Date().getTime(); };

    var _throttle = function(func, wait, options)
    {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (typeof options !== 'object') {
            options = { };
        }
        var later = function() {
          previous = options.leading === false ? 0 : _now();
          timeout = null;
          result = func.apply(context, args);
          context = args = null;
        };
        return function() {
          var now = _now();
          if (!previous && options.leading === false) previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            context = args = null;
          } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
    };

    window.dbushell = (function()
    {

        var _init = 0, app = window.dbushell || { };

        var $win   = window,
            $docEl = document.documentElement;

        var _scrollers = [ ];

        // use iScroll5 for scrollbar design in Firefox and IE9+
        if (app.isFF || app.isIE) {
            window.loadScript('/assets/js/vendor/iscroll.min.js', function() {
                window.dbushell.iscroll();
            });
        }

        app.iscroll = function()
        {
            if (!window.IScroll || !_init) {
                return;
            }
            var $footer = document.getElementById('footer');
            $footer.style.overflow = 'hidden';

            var options = {
                mouseWheel            : true,
                scrollbars            : true,
                disableMouse          : true,
                interactiveScrollbars : true,
                fadeScrollbars        : true
            };

            var scroller = new window.IScroll($footer, options);
            _scrollers.push(scroller);

            var resize = function()
            {
                var position = window.getComputedStyle($footer, null).getPropertyValue('position');
                if (position === 'fixed') {
                    scroller.enable();
                } else {
                    scroller.disable();
                }
            };
            setTimeout(resize, 0);

            addEvent(window, 'resize', _throttle(resize, 300), false);
        };

        app.init = function()
        {
            if (_init++) {
                return;
            }

            var mouse = { },

                nav_open = false,
                nav_mouse = false,

                scroll_out,
                scroll_delta,
                scroll_dist = 0,
                scroll_down = false,
                scroll_top  = [0, 0],
                win_width   = 0,
                win_height  = 0;

            var $header       = document.getElementById('top'),
                header_height = 0,
                header_width  = 0;

            app.onResize = function(e)
            {
                app.onScroll(e);
            };

            app.onScroll = function(e)
            {
                mouse = { };

                scroll_top[0] = scroll_top[1];
                scroll_top[1] = window.pageYOffset || document.documentElement.scrollTop;

                scroll_down  = scroll_top[1] > scroll_top[0];
                scroll_delta = scroll_top[1] - scroll_top[0];

                if (scroll_top[1] > header_height) {
                    if (scroll_down) {
                        scroll_dist = 0;
                        addClass($header, 'header--fixed');
                        addClass($header, 'header--inactive');
                    } else {
                        scroll_dist += scroll_delta;
                        if (scroll_dist < -10) {
                            removeClass($header, 'header--inactive');
                        }
                    }
                } else {
                    removeClass($header, 'header--fixed');
                    removeClass($header, 'header--inactive');
                }

                clearTimeout(scroll_out);
                if (e) {
                    scroll_out = setTimeout(function() {
                        if ((window.pageYOffset || document.documentElement.scrollTop) <= 0) {
                            removeClass($header, 'header--fixed');
                            removeClass($header, 'header--inactive');
                        }
                    }, 300);
                }
            };

            addEvent(window, 'scroll', _throttle(app.onScroll, 100), false);
            addEvent(window, 'resize', _throttle(app.onResize, 100), false);
            addEvent(window, 'orientationchange', _throttle(app.onResize, 100), false);

            app.onResize();
            app.onScroll();

            addEvent(window, 'mousemove', _throttle(function(e)
            {
                if (nav_open) { return; }
                var pos;
                if (e.hasOwnProperty('pageX')) {
                    pos = [e.pageX, e.pageY];
                } else {
                    pos = [e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop];
                }
                if (!mouse.pos) {
                    mouse.pos = pos;
                    return;
                }
                mouse.angle = Math.atan2(pos[1] - mouse.pos[1], pos[0] - mouse.pos[0]) * 180 / Math.PI;
                mouse.pos = pos;

            }, 100), false);

            var nav_onMouseLeave = function(e)
            {
                app.closeNav();
            };

            addEvent($header, 'mouseenter', function(e)
            {
                if (nav_open || typeof mouse.angle !== 'number') {
                    return;
                }
                if (e.hasOwnProperty('pageX')) {
                    pos = [e.pageX, e.pageY];
                } else {
                    pos = [e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop];
                }
                if (mouse.angle > -180 && mouse.angle < -90) {
                    if (pos[0] < 160) {
                        nav_open = true;
                        nav_mouse = false;
                        setTimeout(function() {
                            addEvent($nav, 'mouseleave', nav_onMouseLeave, false);
                        }, 150);
                        app.openNav();
                    }
                }
            },
            false);

            var $nav     = document.getElementById('nav'),
                $overlay = document.getElementById('overlay'),
                $main    = document.getElementsByTagName('main')[0];

            app.openNav = function()
            {
                nav_open = true;
                addClass($nav, 'nav--active');
                removeClass($nav, 'nav--closed');
                removeClass($nav, 'nav--hidden');
                addClass($overlay, 'overlay--active');
            };

            app.closeNav = function()
            {
                mouse = { };
                nav_open = false;
                addClass($nav, 'nav--closed');
                removeClass($nav, 'nav--active');
                removeClass($overlay, 'overlay--active');
                removeEvent($nav, 'mouseleave', nav_onMouseLeave, false);
                setTimeout(function() {
                    addClass($nav, 'nav--hidden');
                }, 300);
            };

            addEvent(document.getElementById('nav-open'), 'click', function(e)
            {
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                app.openNav();
            },
            false);

            addEvent(document.getElementById('nav-close'), 'click', function(e)
            {
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                app.closeNav();
            },
            false);

            addEvent(document.getElementById('overlay'), 'click', app.closeNav, false);

            addEvent(window, 'keydown', function(e)
            {
                if (e.which === 27) {
                    setTimeout(function() {
                        if (nav_open) app.closeNav();
                    }, 50);
                }
            }, false);

            app.iscroll();

            return app;
        };

        return app;

    })();

})(window, window.document);

/*!
 * based on FitVids | https://github.com/davatron5000/FitVids.js
 */

(function(window, document, undefined) {

    if (!document.querySelectorAll || !Array.prototype.forEach) return;

    var videos = [ ],
        selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
    ];

    selectors.forEach(function(selector, i) {
        var el = document.querySelectorAll(selector);
        if (el.length) {
            Array.prototype.push.apply(videos, Array.prototype.slice.call(el) );
        }
    });

    if (!videos.length) return;

    if(!document.getElementById('fit-vids-style')) {
        // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
        var head = document.head || document.getElementsByTagName('head')[0];
        var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
        var div = document.createElement('div');
        div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
        head.appendChild(div.childNodes[1]);
    }

    videos.forEach(function(video, i) {

        var parent = video.parentNode,
            wrapper,
            height,
            width,
            ratio;

        if (video.tagName.toLowerCase() === 'embed' && parent.tagName.toLowerCase() === 'object') return;
        if (parent.className.indexOf('fluid-width-video-wrapper') > -1) return;

        // if (isNaN(video.getAttribute('height')) || isNaN(video.getAttribute('width'))) {
        //     video.setAttribute('height', 9);
        //     video.setAttribute('width', 16);
        // }

        height = parseInt(video.getAttribute('height'), 10);
        width = parseInt(video.getAttribute('width'), 10);

        if (isNaN(height) || isNaN(width)) {
            height = 9;
            width = 16;
        }

        ratio = height / width;

        wrapper = document.createElement('div');
        wrapper.className = 'fluid-width-video-wrapper';
        wrapper.setAttribute('style', 'padding-top: ' + (ratio * 100) + '%');

        parent.insertBefore(wrapper, video);
        wrapper.appendChild(video);

        video.removeAttribute('height');
        video.removeAttribute('width');

    });

})(window, window.document);

        //     var doc = $(document.documentElement);

        //     var grid = false,
        //         $gridEl = $("<div class='grid'> \
        //     <div class='grid__s grid__s--6'> \
        //         <div class='grid__c grid__c--1'></div> \
        //         <div class='grid__c grid__c--2'></div> \
        //         <div class='grid__c grid__c--3'></div> \
        //         <div class='grid__c grid__c--4'></div> \
        //         <div class='grid__c grid__c--5'></div> \
        //         <div class='grid__c grid__c--6'></div> \
        //     </div> \
        // </div> \
        // <div class='grid'> \
        //     <div class='grid__s grid__s--9'> \
        //         <div class='grid__c grid__c--1'></div> \
        //         <div class='grid__c grid__c--2'></div> \
        //         <div class='grid__c grid__c--3'></div> \
        //         <div class='grid__c grid__c--4'></div> \
        //         <div class='grid__c grid__c--5'></div> \
        //         <div class='grid__c grid__c--6'></div> \
        //         <div class='grid__c grid__c--7'></div> \
        //         <div class='grid__c grid__c--8'></div> \
        //         <div class='grid__c grid__c--9'></div> \
        //     </div> \
        // </div>");

        //     var $baselineEl = $('<link rel="stylesheet" href="http://basehold.it/14/ff0000">');

        //     var addGrid = function()
        //     {
        //         grid = true;
        //         $('main').append($gridEl);
        //         $('head').append($baselineEl);
        //     };

        //     var removeGrid = function()
        //     {
        //         grid = false;
        //         $gridEl.remove();
        //         $baselineEl.remove();
        //     };

        //     $win.on('keydown', function(e)
        //     {

        //         if ((e.which || e.keyCode) === 71) {
        //             if (grid) {
        //                 removeGrid();
        //             } else {
        //                 addGrid();
        //             }
        //             $docEl.toggleClass('js--grid');
        //         }
        //     });
