var restful = require('node-restful'),
    mongoose = restful.mongoose;

// define the schema for our user model
module.exports = restful.model('comment', new mongoose.Schema({
        parent:     { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Fish' },
        user:       { type: String, required: true, ref: 'User' },
        updated:    { type: Date, default: Date.now },
        score:      { type: Number, default: 1 },
        text:       { type: String, trim: true, required: true },
        comments:   [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
    }))
    .methods(['get', 'post', 'put', 'delete']);