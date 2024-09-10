const mongoose = require("mongoose");

const amsaSchema = new mongoose.Schema({
    "0": [{ type: String }],
    "1": [{ type: String }],
    "2": [{ type: String }],
    "3": [{ type: String }],
    "4": [{ type: String }],
    "5": [{ type: String }],
    "6": [{ type: String }],
    "7": [{ type: String }],
    "8": [{ type: String }],
    _id: mongoose.Schema.Types.ObjectId  // MongoDB ObjectId
}, { collection: 'Amsa' });

const Amsa = mongoose.model('Amsa', amsaSchema);

module.exports = Amsa;
