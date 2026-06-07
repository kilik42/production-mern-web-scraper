const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    ranking: { type: Number, required: true },
    pLang: { type: String, required: true, trim: true }, //trim: true removes whitespace from both ends of a string
    imagePath: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});


const Language = mongoose.model('Language', languageSchema);

module.exports = Language;  