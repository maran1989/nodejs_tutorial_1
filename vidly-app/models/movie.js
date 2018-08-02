const Joi = require('joi');
const mongoose = require('mongoose');

const { genreSchema } = require('../models/genre');

const Movie = mongoose.model('Movie', mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre : {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(req) {
    const schema = {
        title: Joi.string().min(5).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(req, schema);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;