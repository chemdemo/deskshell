this["JST"] = this["JST"] || {};

this["JST"]["fileList"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul>\n';
 list.forEach(function(item) { ;
__p += '\n';
 var tMap = {0: 'folder', 1: 'file', 2: 'briefcase'}; ;
__p += '\n<li data-path="' +
((__t = ( item.p )) == null ? '' : __t) +
'" data-type="' +
((__t = ( item.t )) == null ? '' : __t) +
'" title="' +
((__t = ( item.n )) == null ? '' : __t) +
'">\n<i class="fa fa-' +
((__t = ( tMap[item.t] )) == null ? '' : __t) +
'"></i>\n<span class="path-name">' +
((__t = ( item.n )) == null ? '' : __t) +
'</span>\n</li>\n';
 }); ;
__p += '\n</ul>';

}
return __p
};

this["JST"]["pathTree"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 list.forEach(function(item) { ;
__p += '\n<li>\n<a href="javascript: void(0);"\ndata-type="' +
((__t = ( item.t )) == null ? '' : __t) +
'"\ndata-path="' +
((__t = ( item.p )) == null ? '' : __t) +
'"\ntitle="' +
((__t = ( item.n )) == null ? '' : __t) +
'"\n>\n';
 if(item.t === 0) { ;
__p += '\n<i class="fa fa-caret-' +
((__t = ( (item.dir || 'right') )) == null ? '' : __t) +
'"></i>\n';
 } ;
__p += '\n<span class="path-name">' +
((__t = ( item.n )) == null ? '' : __t) +
'</span>\n</a>\n</li>\n';
 }); ;


}
return __p
};