var express = require('express');
var router = express.Router();

var games_controller = require('../controllers/games_controller');

router.get('/', games_controller.get_games);
router.post('/', games_controller.post_game);
router.patch('/:id', games_controller.patch_game);

module.exports = router;
