var express = require('express');
var router = express.Router();
var authAdmin = require('../middleware/authAdmin');

var games_controller = require('../controllers/games_controller');

router.get('/', games_controller.get_games);
router.get('/:level', games_controller.get_games_level);

router.post('/', games_controller.post_game);

router.patch('/:id/time', games_controller.patch_game_time);
router.patch('/:id/name', games_controller.patch_game_name);

router.delete('/', authAdmin, games_controller.delete_games);

module.exports = router;
