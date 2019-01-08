var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

// Serve dashboard UI
app.use(express.static('client/build'));

module.exports = app;
