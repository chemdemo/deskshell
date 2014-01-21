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
