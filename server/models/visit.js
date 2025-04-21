const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    building: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Visit = mongoose.model('Visit', dataSchema);
module.exports = Visit;