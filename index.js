var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Router = require('./dist/server/router');

// ****** Express CONFIG ****** //
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ****** Express Handle ****** //
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use('/', Router);

// Send 404 error code for other paths 
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle internal errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
    .send({
      message: err.message,
      error: err
    });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});