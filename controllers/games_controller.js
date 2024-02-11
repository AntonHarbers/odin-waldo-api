const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Game = require('../models/game_model');

exports.get_games = (req, res, next) => {
  res.json('Games');
};
exports.get_games_level = asyncHandler(async (req, res, next) => {
  const level = req.params.level;

  const games = await Game.find({ level: level }).sort({ score: 1 }).exec();

  const completedGames = games.filter((game) => game.finish_time != 0);
  res.json(completedGames);
});

exports.post_game = [
  body('level', 'level must not be empty').trim().isLength({ min: 1 }).escape(),
  body('level', 'level must be numeric').trim().isNumeric().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const game = new Game({
      level: req.body.level,
      start_time: parseInt(Date.now()),
    });

    const savedGame = await game.save();

    console.log(savedGame._id);
    console.log(savedGame.start_time);

    res.json(savedGame._id);
  }),
];

exports.patch_game_time = [
  asyncHandler(async (req, res, next) => {
    // update the finnish time of the game with param id
    const game = await Game.findById(req.params.id).exec();

    if (game) {
      game.finish_time = parseInt(Date.now());
    }

    // ideally delete all games that are unplayed and older than a few minutes or so but well see
    const deleteGame = async (id) => {
      await Game.findByIdAndDelete(id);
      console.log('game deleted');
    };
    const unfinishedGames = await Game.find({ finish_time: 0 }).exec();
    unfinishedGames.filter((game) => {
      if (game.start_time < Date.now() - 3600000) deleteGame(game._id);
    });

    const updatedGame = await game.save();
    console.log(updatedGame.score);
    console.log(updatedGame.start_time);
    if (updatedGame) {
      res.json({ score: updatedGame.score });
    } else {
      res.json({ err: `Couldnt find game with id ${req.params.id}` });
    }
    // display score and form field on front end
    // when name is inputted call the update_game route to update the player name of that game
    // do the leaderboards based on the data
  }),
];

exports.patch_game_name = [
  body('name', 'name should not be empty').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    console.log('ye');
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const game = await Game.findById(req.params.id);
    if (game) {
      game.player_name = req.body.name;
    } else {
      return res.json(`game with id: ${req.params.id} not found`);
    }

    const updatedGame = await game.save();
    if (updatedGame) {
      return res.json(updatedGame);
    } else {
      return res.json(`game with id: ${req.params.id} not found`);
    }
  }),
];
