const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const GameSchema = new Schema({
  start_time: { type: Number, default: parseInt(Date.now()), required: true },
  finish_time: { type: Number, default: 0, required: true },
  level: { type: Number, required: true },
  player_name: { type: String, default: 'Unknown', required: true },
});

GameSchema.virtual('score').get(function () {
  return this.finish_time - this.start_time;
});

module.exports = mongoose.model('Game', GameSchema);
