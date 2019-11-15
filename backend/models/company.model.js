const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// We need numberOfRatings and sumStars to update those values in database
const companySchema = new Schema({
  numberOfRatings: {
    type: Number
  },
  sumStars: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Company', companySchema, 'mattilsyn');
