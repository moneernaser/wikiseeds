var mongoose = require('mongoose');

var TermSchema = new mongoose.Schema({
    term: {type: String, required: true},
    creator: String,
    urlAddress: String,
    createdOn: {type: Date, default: Date.now()}
});

var termModel = mongoose.model("Term", TermSchema);

module.exports = termModel;