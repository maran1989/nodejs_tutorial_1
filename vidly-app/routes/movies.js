const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ name: 1 });
    res.send(movies);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('No movie found with the given ID.');

    res.send(movie);
});

router.post('/', validate(validateMovie), async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid movie.');
  
    const movie = new Movie({ 
        title: req.body.title, 
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();
    
    res.send(movie);
});

router.put('/:id', [validateObjectId, validate(validateMovie)], async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('No movie found with the given ID.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
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
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('No movie found by the given ID..');

    res.send(movie);
});

module.exports = router;