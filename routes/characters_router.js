var express = require('express');
var router = express.Router();
var authAdmin = require('../middleware/authAdmin');

var characters_controller = require('../controllers/characters_controller');

router.get('/', characters_controller.get_characters);
router.post('/:id', characters_controller.get_char_coords);
router.post('/', authAdmin, characters_controller.post_characters);
router.delete('/', authAdmin, characters_controller.delete_characters);

module.exports = router;
