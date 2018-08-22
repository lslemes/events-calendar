var express = require('express');
var router = express.Router();

var event_controller = require('../controllers/eventController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
