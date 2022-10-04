const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news_category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
}, {
timestamps: true
});
const news_category_Schema = mongoose.model('news_category', news_category);
module.exports = news_category_Schema;