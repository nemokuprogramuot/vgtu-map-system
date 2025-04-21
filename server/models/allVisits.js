const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
});

const AllVisits = mongoose.model('AllVisits', dataSchema);
module.exports = AllVisits;