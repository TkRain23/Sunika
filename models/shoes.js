const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShoeSchema = new Schema({
    brand: { type: String },
    media: { type: Object },
    title: { type: String },
    retailPrice: { type: Number },
    urlKey: { type: String }
});

module.exports = mongoose.model('Shoe', ShoeSchema)
