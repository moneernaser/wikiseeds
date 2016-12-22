'use strict';

var express = require('express');
var controller = require('./wikiseeds.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.save);
router.get('/data', controller.getAll);
router.get('/leaderboard', controller.topContributors);
//router.delete('/data', controller.dropAll);
router.delete('/data/:_id', controller.deleteSeed);

module.exports = router;