(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function() {
    var createSocket = function() {
        var socket = io.connect('http://localhost:8888');
        socket.on('connect', function(data) {
            socket.send('client connected!');

            socket.on('message', function(msg) {
                console.log(msg);
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

console.log(111);

},{"./bind":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGVtby9kYXRhL2NvZGUvc2VydmVyL25vZGUvcHJvanMvbm9kZWNvbnNvbGUvbm9kZV9tb2R1bGVzL2dydW50LWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kZW1vL2RhdGEvY29kZS9zZXJ2ZXIvbm9kZS9wcm9qcy9ub2RlY29uc29sZS9jbGllbnQvZGV2L2pzL2JpbmQuanMiLCIvVXNlcnMvZGVtby9kYXRhL2NvZGUvc2VydmVyL25vZGUvcHJvanMvbm9kZWNvbnNvbGUvY2xpZW50L2Rldi9qcy9pbml0aWFsaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3JlYXRlU29ja2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzb2NrZXQgPSBpby5jb25uZWN0KCdodHRwOi8vbG9jYWxob3N0Ojg4ODgnKTtcbiAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgc29ja2V0LnNlbmQoJ2NsaWVudCBjb25uZWN0ZWQhJyk7XG5cbiAgICAgICAgICAgIHNvY2tldC5vbignbWVzc2FnZScsIGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZVNvY2tldCk7XG5cbiAgICB2YXIgc3R1ZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3R1ZmYnKTtcbiAgICB2YXIgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JveCcpO1xuXG4gICAgLy8gc3R1ZmYuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB9KTtcblxuICAgIHN0dWZmLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdkcmFnc3RhcnQnKTtcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UoZS50YXJnZXQsIDAsIDApO1xuICAgIH0pO1xuXG4gICAgc3R1ZmYuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnc3RhcnQnKTtcbiAgICB9KTtcblxuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF0pO1xuICAgIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9iaW5kJykoKTtcblxuY29uc29sZS5sb2coMTExKTtcbiJdfQ==
