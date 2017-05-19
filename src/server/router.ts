import express = require('express');
import _ = require('lodash');
import path = require('path');

var router = express.Router();

router.get('/data', function (req, res) {
  res.send(JSON.stringify([
    {title: 'A', text: 'aaa'},
    {title: 'B', text: 'bbb'},
    {title: 'C', text: 'ccc'}
  ]));
});

router.get('/*', function (req, res) {
  console.log('server call request: ' + req.originalUrl);
  res.sendFile('index.html');
});

module.exports = router;

