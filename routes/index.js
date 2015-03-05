
/*
* GET home page.
*/

//exports.index = function(req, res){
//  res.render('index');
//};
//
//exports.partials = function (req, res) {
//  var name = req.params.name;
//  res.render('partials/' + name);
//};

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    // res.render('index', { title: 'Express' });
    // res.redirect('http://thiner-les.github.io/pomt-android-app/');
    res.render('index');
});

router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});


module.exports = router;