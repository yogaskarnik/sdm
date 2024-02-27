const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
