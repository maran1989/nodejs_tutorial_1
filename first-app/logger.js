// (function (exports, require, module, __filename, __dirname) {

//     console.log(__filename);
//     console.log(__dirname);
//     var url = 'http://mylogger.io/log';

//     function log(message) {
//         // Send an HTTP request
//         console.log(message);
//     }

//     // module.exports.log = log;
//     module.exports = log;    
// })
const EventEmitter = require('events');
const emitter = new EventEmitter();

var url = 'http://mylogger.io/log';

function log(message) {
    // Send an HTTP request
    console.log(message);


}

// module.exports.log = log;
module.exports = log;
