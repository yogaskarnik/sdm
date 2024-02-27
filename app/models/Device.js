const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  area: {
    areaType: {
      type: String,
      default: "Circle" 
    },
    center: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      radius: {
        type: Number,
        required: true
      }
    },
    civicAddress: {
      country: String,
      A1: String,
      A2: String
    }
  }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
