const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const connection = require('./db');

const donateSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  telephone: Number,
  profession: String,
  howtohelp: String,
  accepted: Boolean,
  created_at: Date,
  updated_at: Date
});

const Donate = connection.model('Donate', donateSchema, 'donate');

module.exports = Donate;
