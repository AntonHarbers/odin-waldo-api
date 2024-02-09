var express = require('express');
var router = express.Router();

var characters_controller = require('../controllers/characters_controller');

router.get('/', characters_controller.get_characters);

module.exports = router;
