var express = require('express');
var router = express.Router();

var games_controller = require('../controllers/games_controller');

router.get('/', games_controller.get_games);
router.post('/', games_controller.post_game);
router.patch('/:id/time', games_controller.patch_game_time);
router.patch('/:id/name', games_controller.patch_game_name);
router.put('/:id', games_controller.update_game);

module.exports = router;
