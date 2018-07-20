// function sayHello(name) {
//     console.log('Hello ' + name);
// }


// sayHello('Mark');
// console.log(window);

//console.log(); // global object.. can access anywhere



// global object in js
// setTimeout();
// clearTimeout();
// setInterval();
// clearInterval();

// nodejs uses 'global' instead of 'window'


// console.log(module);

// const log = require('./logger');

// console.log(logger);
// logger.log('message');

// log('message');


// PATH
// const path = require('path');

// var pathObj = path.parse(__filename);

// console.log(pathObj);


// OS
// const os = require('os');

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log('Total Memory: ' + totalMemory);

// Template string
// ES6 / ES2015 : ECMAScript 6

// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// File System
// const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);

// fs.readdir('./', function(err, files) {
//     if(err) console.log('Error', err);
//     else console.log('Result', files);
// });

const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', function() {
    console.log('Listener called');
});

// Raise an event
emitter.emit('messageLogged'); // Making a noise. produce - signalling that an event happens

