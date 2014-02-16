'use strict';

// process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

module.exports = {
    'host': '127.0.0.1',
    'port': 8090,
    'maxAge': 1000 * 60 * 60 * 24 * 30,
    'cookieSecret': '',
    'users': {
        'foo': 'bar'
    },
    'https': {
        'key': './server/ca.key',
        'cert': './server/ca.crt'
    },
    'shell': 'bash',
    'cwd': '/',
    'limitPerUser': 5,
    'sessionTimeout': 600000,
    'term': {
        'termName': 'xterm',
        'geometry': [80, 24],
        'scrollback': 1000,
        'visualBell': true,
        'popOnBell': true,
        'cursorBlink': true,
        'screenKeys': true,
        'colors': [
            '#2e3436',
            '#cc0000',
            '#4e9a06',
            '#c4a000',
            '#3465a4',
            '#75507b',
            '#06989a',
            '#d3d7cf',
            '#555753',
            '#ef2929',
            '#8ae234',
            '#fce94f',
            '#729fcf',
            '#ad7fa8',
            '#34e2e2',
            '#eeeeec'
        ]
    },
    'debug': true
};
