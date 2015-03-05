var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
//
//function validatorEnum(v) {
//    return (v == 'EMPTY' || v == 'OFFLINE' || v == 'ALMOST_EMPTY' || v == 'NORMAL' || v == 'BLOCKED');
//};

// define the schema for our user model
var fishSchema = new mongoose.Schema({
    usual_name: { type: String, trim: true, required: true, lowercase: true, unique: true },
    cientific_name: { type: String, trim: true, required: true, lowercase: true, unique: true },
    ph: Number,
    dh: Number,
    temperature: Number,
    maximum_length: Number,
    aquarium_liters: Number,
    aquarium_light: String,
    alimentation: String,
    reproduction: String,
    temperament: String,
    aquarium_setup: String,
    swimming: String,
    url_picture: String,
    comments: [],
    region: String
});

// Apply the uniqueValidator plugin to userSchema.
//fishSchema.plugin(uniqueValidator);

// create the model for users and expose it to our app
module.exports = mongoose.model('Fish', fishSchema);