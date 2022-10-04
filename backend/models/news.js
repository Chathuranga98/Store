const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    Trending : {
        type: String,
        required: true
    },
    Breaking : {
        type: String,
        required: true
    },
    SlidShow : {
        type: String,
        required: true
    },
    Top : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
}, {
timestamps: true
});
const news_Schema = mongoose.model('news', news);
module.exports = news_Schema;