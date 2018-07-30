const winston = require('winston');

module.exports = function(err, req, res, next) {
    winston.error('error', err.message, err);
    // different tyoe if logs

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.')
}