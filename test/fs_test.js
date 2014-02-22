var fs = require('fs');

var sss = fs.stat('./', function(err, stats) {
    console.log(stats.isFile());
    console.log(stats.isDirectory());
    console.log(stats.isBlockDevice());
    console.log(stats.isCharacterDevice());
    console.log(stats.isSymbolicLink());
    console.log(stats.isFIFO());
    console.log(stats.isSocket());
});
