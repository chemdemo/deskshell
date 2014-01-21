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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGVtby9kYXRhL2NvZGUvc2VydmVyL25vZGUvcHJvanMvbm9kZS13ZWItY29uc29sZS9ub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2RlbW8vZGF0YS9jb2RlL3NlcnZlci9ub2RlL3Byb2pzL25vZGUtd2ViLWNvbnNvbGUvY2xpZW50L2Rldi9qcy9pbml0aWFsaXplLmpzIiwiL1VzZXJzL2RlbW8vZGF0YS9jb2RlL3NlcnZlci9ub2RlL3Byb2pzL25vZGUtd2ViLWNvbnNvbGUvY2xpZW50L2Rldi9qcy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIG1haW4uanNcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE0LCBkbXlhbmcgKE1JVCBMaWNlbnNlKVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gcmVxdWlyZSgnLi9iaW5kJykoKTtcbnJlcXVpcmUoJy4vdWknKTtcbiIsIi8qKlxuICogdWkuanNcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE0LCBkbXlhbmcgKE1JVCBMaWNlbnNlKVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbi8vICAgICA7XG4vLyB9O1xuXG4kKCcjZ3VpJykub24oJ2NsaWNrJywgJy5uYXYtdGFicyBhJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMpLnRhYignc2hvdycpO1xufSk7XG4iXX0=
