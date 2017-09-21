const env = require('dotenv').config(),
      mongoose = require('mongoose');

let connection;

// DB
if (process.env.NODE_ENV === 'production') {
  const user = process.env.DB_USER,
        pwd = process.env.DB_PASS,
        host = process.env.DB_HOST;

  connection = mongoose.createConnection("mongodb://" + user + ":" + pwd + "@" + host);
} else {
  console.log('hi');
  connection = mongoose.createConnection("mongodb://localhost:27017/diasporicans");
}

module.exports = connection;
