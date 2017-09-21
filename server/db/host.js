const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const connection = require('./db');

const hostSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  telephone: Number,
  location: String,
  date: Date,
  accepted: Boolean,
  created_at: Date,
  updated_at: Date
});

const Host = connection.model('Host', hostSchema, 'host');

module.exports = Host;
