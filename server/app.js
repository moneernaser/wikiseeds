/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express');
var config = require('./config/environment');
// Setup server

var app = express();
app.use(express.static('www'));

var mongoose = require('mongoose');
mongoose.connect(config.mongo.uri);

mongoose.connection.on('error', function(error) {
  console.error('Database connection error:', error);
});

mongoose.connection.once('open', function() {
  console.log('Database connected');
});

var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
