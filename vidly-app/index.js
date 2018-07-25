const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://admin:password123@ds147411.mlab.com:47411/db_vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Cannot connect to database..', err));

const genres = require('./routes/genres');
const customers = require('./routes/customers');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${ port }...`));