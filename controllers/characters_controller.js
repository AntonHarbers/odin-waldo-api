const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Character = require('../models/character_model');
const he = require('he');

exports.get_characters = asyncHandler(async (req, res, next) => {
  const characters = await Character.find({}, '_id level name imgUrl').exec();
  res.json(characters);
});

exports.get_char_coords = asyncHandler(async (req, res, next) => {
  const character = await Character.findById(req.params.id);

  console.log(req.body);
  let correct = false;
  if (
    character.x <= req.body.x + 2 &&
    character.x >= req.body.x - 2 &&
    character.y >= req.body.y - 2 &&
    character.y <= req.body.y + 2
  ) {
    correct = true;
  }

  res.json(correct);
});

exports.post_characters = [
  body('level', 'level should not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('level', 'level should be a numeric value').trim().isNumeric().escape(),
  body('name', 'name should not be empty').trim().isLength({ min: 1 }).escape(),
  body('imageUrl', 'imageUrl should not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('x', 'x value should not be empty').trim().isLength({ min: 1 }).escape(),
  body('y', 'y value should not be empty').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json(errors.array());

    const character = new Character({
      level: req.body.level,
      name: req.body.name,
      imgUrl: he.decode(req.body.imageUrl),
      x: req.body.x,
      y: req.body.y,
    });

    const savedChar = await character.save();
    return res.json(savedChar);
  }),
];

exports.delete_characters = [
  body('level', 'level must not be empty').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const deletedCharacters = await Character.deleteMany({
      level: req.body.level,
    }).exec();
    res.json(deletedCharacters);
  }),
];
