const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

const mongoose = require('mongoose');
const Fawn = require('fawn')
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    res.send(rentals);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const movie = await Rental.findById(req.params.id);

    if (!movie) return res.status(404).send('No rental found by the given ID..');

    res.send(movie);
});

router.post('/', validate(validateRental), async (req, res) => {    
    // if(!mongoose.Types.ObjectId.isValid(req.body.customerId))
    //     return res.status(400).send('Invalid customer.')

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
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

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental);
    } catch(err) {
        res.status(500).send('Something failed.');
    }
    
});

router.put('/:id', [validateObjectId, validate(validateRental)], async (req, res) => {
    const genre = await Movie.findById(req.body.genreId);
    if(!genre) return res.status(400).send('No genre found by the given ID.');

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

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const movie = await Rental.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('No rental found by the given ID..');

    res.send(movie);
});

module.exports = router;