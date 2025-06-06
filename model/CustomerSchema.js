const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('customers', CustomerSchema);