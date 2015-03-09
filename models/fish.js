var restful = require('node-restful'),
    mongoose = restful.mongoose;

// define the schema for our user model
var Fish = restful.model('fish', new mongoose.Schema({
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
    })).
    methods(['get', 'post', 'put', 'delete']).
    route('search', ['get'], function (req, res, next) {
        console.log('search', req.param('term'));

        var term = req.param('term');

        Fish.find().or([{'usual_name': new RegExp(term, 'i')}, {'cientific_name': new RegExp(term, 'i')}]).exec(function (err, fishs) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(fishs);
            }
        });
    });


module.exports = Fish;
