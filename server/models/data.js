const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }
    
    
    
},{timestamps: true});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;