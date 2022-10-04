const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffRegSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    position: {
        type: String,
        required: true,
    },

    nic:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },

    qualification:{
        type: String,
        required: true
    },

    tel:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },
}, {
timestamps: true
});
const staff_regSchema = mongoose.model('staff', staffRegSchema);
module.exports = staff_regSchema;