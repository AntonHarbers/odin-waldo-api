const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const GameSchema = new Schema({
  start_time: { type: Date, default: Date.now(), required: true },
  finish_time: { type: Date, default: 0, required: true },
  level: { type: Number, required: true },
  player_name: { type: String, default: 'Unknown', required: true },
});

GameSchema.virtual('start_time_formatted').get(function () {
  return DateTime.fromJSDate(this.start_time).toLocaleString(DateTime.DATE_MED);
});

GameSchema.virtual('finish_time_formatted').get(function () {
  return DateTime.fromJSDate(this.finish_time).toLocaleString(
    DateTime.DATE_MED
  );
});

GameSchema.virtual('Score').get(function () {
  return parseInt(this.finish_time - this.start_time).toFixed(0);
});

module.exports = mongoose.model('Game', GameSchema);
