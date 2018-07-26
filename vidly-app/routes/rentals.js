const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const movie = await Rental.findById(req.params.id);

    if (!movie) return res.status(404).send('No movie found by the given ID..');

    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieIds);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not available');
  
    let rental = new Rental({ 
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Movie.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    const movie = await Rental.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });

    if (!movie) return res.status(404).send('No movie found by the given ID..');
    
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Rental.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('No movie found by the given ID..');

    res.send(movie);
});

module.exports = router;