/**
 * ui.js
 * Copyright (c) 2013-2014, dmyang (MIT License)
 */

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
