var restful = require('node-restful'),
    mongoose = restful.mongoose;

// define the schema for our user model
var Comment= restful.model('comment', new mongoose.Schema({
        parent:     { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Fish' },
        user:       { type: String, required: true, ref: 'User' },
        updated:    { type: Date, default: Date.now },
        likes:      [ { type: String, trim: true } ],
        text:       { type: String, trim: true, required: true },
        comments:   [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
    })).
    methods(['get', 'post', 'put', 'delete']).
    route('like', {
        detail: true,
        methods: ['get', 'put'],
        handler: function(req, res) {
            if (req.param('user')) {

                Comment.findByIdAndUpdate(req.param('id'), {
                    $addToSet: {
                        likes: req.param('user').toLowerCase()
                    }
                }, function(err, comment) {
                    if (err) {
                        res.status(400).json(restful.objectNotFound());
                    } else {
                        res.status(200).json(comment);
                    }
                });
            }
        }
    }).
    route('test/', {
        detail: true,
        handler: function(req, res, next) {
            console.log(req.param('id'), req.param('user'));
        }
    });


module.exports = Comment;