var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    cStreet: {
      type: String,
      required: false
    },
    cTown: {
        type: String,
        required: false
    },
    cCounty: {
        type: String,
        required: false
    },
    cCoordinates: {
        type: [Number],
        index: '2dsphere'
    },
    dStreet: {
        type: String,
        required: false
    },
    dTown: {
        type: String,
        required: false
    },
    dCounty: {
        type: String,
        required: false
    },
    dCoordinates: {
        type: [Number],
        index: '2dsphere'
    },
    dTime: {
        type: Date,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    photos: {
        type: [String],
        required: false
    },
    userId: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Job', JobSchema);