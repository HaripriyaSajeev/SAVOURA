const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    catname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;