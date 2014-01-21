(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * main.js
 * Copyright (c) 2013-2014, dmyang (MIT License)
 */

'use strict';

// require('./bind')();
require('./ui');

},{"./ui":2}],2:[function(require,module,exports){
/**
 * ui.js
 * Copyright (c) 2013-2014, dmyang (MIT License)
 */

'use strict';

// module.exports = function() {
//     ;
// };

$('#gui').on('click', '.nav-tabs a', function(e) {
    e.preventDefault();
    $(this).tab('show');
});

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJFOlxcc2VydmVyXFxub2RlanNcXHByb2pzXFxub2RlLXdlYi1jb25zb2xlXFxub2RlX21vZHVsZXNcXGdydW50LWJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiRTovc2VydmVyL25vZGVqcy9wcm9qcy9ub2RlLXdlYi1jb25zb2xlL2NsaWVudC9kZXYvanMvaW5pdGlhbGl6ZS5qcyIsIkU6L3NlcnZlci9ub2RlanMvcHJvanMvbm9kZS13ZWItY29uc29sZS9jbGllbnQvZGV2L2pzL3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBtYWluLmpzXHJcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE0LCBkbXlhbmcgKE1JVCBMaWNlbnNlKVxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIHJlcXVpcmUoJy4vYmluZCcpKCk7XHJcbnJlcXVpcmUoJy4vdWknKTtcclxuIiwiLyoqXG4gKiB1aS5qc1xuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQsIGRteWFuZyAoTUlUIExpY2Vuc2UpXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIDtcbi8vIH07XG5cbiQoJyNndWknKS5vbignY2xpY2snLCAnLm5hdi10YWJzIGEnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcykudGFiKCdzaG93Jyk7XG59KTtcbiJdfQ==
