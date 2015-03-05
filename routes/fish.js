var express = require('express');
var router = express.Router();

var Fish = require('../models/fish');

router.post('/', function (req, res) {
    var fish = new Fish();

    console.log(fish.id);

    fish.usual_name = req.param('usual_name');
    fish.cientific_name = req.param('cientific_name');
    fish.ph = req.param('ph');
    fish.dh = req.param('dh');
    fish.temperature = req.param('temperature');
    fish.maximum_length = req.param('maximum_length');
    fish.aquarium_liters = req.param('aquarium_liters');
    fish.alimentation = req.param('alimentation');
    fish.reproduction = req.param('reproduction');
    fish.temperament = req.param('temperament');
    fish.aquarium_setup = req.param('aquarium_setup');
    fish.swimming = req.param('swimming');
    fish.url_picture = req.param('url_picture');
    fish.region = req.param('region');
    fish.comments = [];

    // Saving it to the database.
    fish.save(function (err) {
        if (err) {
            res.status(400).json({'status': 'failed', 'err': err});
        } else {
            res.status(200).json({'status': 'success', 'msg': 'fish created'});
        }
    });

});

router.get('/search/:term', function (req, res) {
    var term = req.param('term');

    Fish.find().or([{'usual_name' : new RegExp(term, 'i')}, {'cientific_name' : new RegExp(term, 'i')}]).exec(function(err, fishs) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(fishs);
        }
    });

});

router.get('/:id', function (req, res) {
    Fish.find({ _id: req.param('id') }).exec(function(err, fish) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(fish);
        }
    });
});

/*
 Recuperar todas as informações dos peixes no servidor.
 */
router.get('/', function (req, res) {
    Fish.find({}).exec(function (err, result) {
        if (!err) {
            res.status(200).json(result);
        }
    });
});

module.exports = router;