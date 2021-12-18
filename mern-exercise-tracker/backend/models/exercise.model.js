const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * So this is the data to be pushed/pulled to the MongoDB
 * it has multiple variables and multiple requirements.
 */
const exerciseSchema = new Schema ({ //should note these can be done on 1 line each
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, //new type of number import
        required: true
    },
    date: {
        type: Date, //date import (seen before)
        required: true
    },
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;