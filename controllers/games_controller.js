const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Game = require('../models/game_model');

exports.get_games = (req, res, next) => {
  res.json('Games');
};

exports.post_game = [
  body('level', 'level must not be empty').trim().isLength({ min: 1 }).escape(),
  body('level', 'level must be numeric').trim().isNumeric().escape(),
  asyncHandler(async (req, res, next) => {
    // create a new game model
    // save it to db
    // send back the _id of that game
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const game = new Game({
      level: req.body.level,
    });

    const savedGame = await game.save();

    res.json(savedGame._id);
  }),
];

exports.patch_game = [
  asyncHandler(async (req, res, next) => {
    // ideally delete all games that are unplayed and older than a few minutes or so but well see
    // update the finnish time of the game with param id
    // return the final score
    // display score and form field on front end
    // when name is inputted call the update_game route to update the player name of that game
    // do the leaderboards based on the data
    res.json(req.params.id);
  }),
];
