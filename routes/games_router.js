var express = require('express');
var router = express.Router();

var games_controller = require('../controllers/games_controller');

router.get('/', games_controller.get_games);

module.exports = router;
