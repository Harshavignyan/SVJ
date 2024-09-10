const mongoose = require("mongoose");

const vaaramuSchema = new mongoose.Schema({
    "0": [{ type: String }],
    "1": [{ type: String }],
    "2": [{ type: String }],
    "3": [{ type: String }],
    "4": [{ type: String }],
    "5": [{ type: String }],
    "6": [{ type: String }],
    _id: mongoose.Schema.Types.ObjectId  // Default MongoDB ObjectId
}, { collection: 'Vaaramu' });

const Vaaramu = mongoose.model('Vaaramu', vaaramuSchema);

module.exports = Vaaramu;
