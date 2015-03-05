var express = require('express');
var router = express.Router();

var Fish = require('../models/fish');


/*
 Recuperar todas as informações dos peixes no servidor.
 */
router.get('/all', function (req, res) {
    Fish.find({}).exec(function (err, result) {
        if (!err) {
            res.status(200).json({ 'fish': result });
        }
    });
});

module.exports = router;