var Device = require("../models/Device");

exports.getDevice = async (req, res, next) => {
    req.device = await Device.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (req.device) {
      console.log(req.device);
      next();
    } else {
      res.redirect("/?msg=deviceNotFound");
    }
  };
  
  