const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    process.on('unhandledRejection', (ex) => {
        // winston.error(ex.message, ex); --> instead using this, throw the unhandle rejections so we can handle it on the handle Exceptions above
        // process.exit(1);
        throw ex;
    });

    winston.add(winston.transports.File, {
        filename: 'logfile.log'
    });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://admin:password123@ds147411.mlab.com:47411/db_vidly',
        level: 'error'
    });

    // const p = Promise.reject(new Error('Something failed miserably'));
    // p.then(() => console.log('Done'));
}