var Term = require('./models/term.model.js');
'use strict';

var _ = require('lodash');
// Get list of things
exports.index = function(req, res) {
  res.json({message: "hello!"});
};

exports.deleteSeed = function (req, res) {
  Term.findByIdAndRemove(req.params._id, {}, function (err, deleted) {
    res.json({message: 'element deleted'})
  });
};

exports.save = function (req, res) {
  var db= req.db;
  if (!req.body.name || !req.body.name.trim()) {
    res.status(400).json({"Error": "name not provided"});
  } else {
    var term = new Term({
      term: req.body.name,
      creator:  req.body.sender,
      urlAddress: req.body.urlfrom
    });

    term.save(function (err, saved) {
      if( err || !saved ) {
        console.error("suggestion not saved");
        res.status(400).json(JSON.stringify(err));
      }
      else console.log("suggestion " + req.body.name + " saved");
      res.json({message: 'element saved'})
    });
  }
}

exports.getAll = function (req, res) {

  Term.find({}).sort({createdOn: -1}).exec(function (err, data) {
    if( err ) console.log("could not load data");
    else {
      res.json(data);
    }
  });
}

exports.dropAll = function (req, res) {
  var db= req.db;
  db.suggestions.drop(function (err, data) {
    if( err ) console.log("could not drop collection");
    res.json({message: "dropped collection"});
  });
}

exports.topContributors = function (req, res) {
  var topLimit = req.params.limit;
    Term.aggregate([
        { $match: { } },
        { $group: {
            _id: '$creator',
            count: { $sum: 1}}
        }
]).sort({count : -1}).exec(function ( e, result) {
    res.json(result);
});

};