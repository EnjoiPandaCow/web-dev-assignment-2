var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('News', NewsSchema);