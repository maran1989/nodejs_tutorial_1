const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://admin:password123@ds147411.mlab.com:47411/db_vidly', { useNewUrlParser: true })
    .then(() => winston.info('Connected to MongoDB..'))
}