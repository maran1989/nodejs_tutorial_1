require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('unhandledRejection', (ex) => {
    // winston.error(ex.message, ex); --> instead using this, throw the unhandle rejections so we can handle it on the handle Exceptions above
    // process.exit(1);
    throw ex;
});


winston.add(winston.transports.File, { filename: 'logfile.log'} );
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://admin:password123@ds147411.mlab.com:47411/db_vidly',
    level: 'error'
});


// const p = Promise.reject(new Error('Something failed miserably'));
// p.then(() => console.log('Done'));

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://admin:password123@ds147411.mlab.com:47411/db_vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Cannot connect to database..', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${ port }...`));