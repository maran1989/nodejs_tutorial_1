const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express(); 

// View Engine
app.set('view engine', 'pug');


// Built-in Middlerware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Third Party Middleware
app.use(helmet());

if(app.get(`env`) === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
    
}

// Customer Middleware
app.use(logger);

app.use('/', home);
app.use('/api/courses', courses);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password')); not working

// environment variable -> PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));