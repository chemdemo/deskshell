(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function() {
    var createSocket = function() {
        var socket = io.connect('/cmd');
        socket.on('connect', function(data) {
            socket.send('client connected!');

            socket.on('message', function(msg) {
                console.log(msg);
            });

            document.addEventListener('click', function() {
                socket.send('clicked!');
            });
        });
    };

    document.querySelector('#btn').addEventListener('click', createSocket);

    var stuff = document.querySelector('#stuff');
    var box = document.querySelector('#box');

    // stuff.addEventListener('selectstart', function(e) {
    //     e.preventDefault();
    // });

    stuff.addEventListener('dragstart', function(e) {
        this.classList.add('dragstart');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', Math.random());
        e.dataTransfer.setDragImage(e.target, 0, 0);
    });

    stuff.addEventListener('dragend', function(e) {
        this.classList.remove('dragstart');
    });

    box.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    box.addEventListener('dragenter', function(e) {
        e.preventDefault();
        this.classList.add('active');
    });

    box.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('active');
        // console.log(e.dataTransfer.getData('text'));
        console.log(e.dataTransfer.files[0]);
    });
};

},{}],2:[function(require,module,exports){
'use strict';

require('./bind')();

},{"./bind":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJFOlxcc2VydmVyXFxub2RlanNcXHByb2pzXFxub2RlLXdlYi1jb25zb2xlXFxub2RlX21vZHVsZXNcXGdydW50LWJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiRTovc2VydmVyL25vZGVqcy9wcm9qcy9ub2RlLXdlYi1jb25zb2xlL2NsaWVudC9kZXYvanMvYmluZC5qcyIsIkU6L3NlcnZlci9ub2RlanMvcHJvanMvbm9kZS13ZWItY29uc29sZS9jbGllbnQvZGV2L2pzL2luaXRpYWxpemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY3JlYXRlU29ja2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNvY2tldCA9IGlvLmNvbm5lY3QoJy9jbWQnKTtcclxuICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHNvY2tldC5zZW5kKCdjbGllbnQgY29ubmVjdGVkIScpO1xyXG5cclxuICAgICAgICAgICAgc29ja2V0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24obXNnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZCgnY2xpY2tlZCEnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVNvY2tldCk7XHJcblxyXG4gICAgdmFyIHN0dWZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0dWZmJyk7XHJcbiAgICB2YXIgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JveCcpO1xyXG5cclxuICAgIC8vIHN0dWZmLmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIHN0dWZmLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2RyYWdzdGFydCcpO1xyXG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIE1hdGgucmFuZG9tKCkpO1xyXG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShlLnRhcmdldCwgMCwgMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzdHVmZi5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF0pO1xyXG4gICAgfSk7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJy4vYmluZCcpKCk7XHJcbiJdfQ==
