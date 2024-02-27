var express = require("express");
var path = require("path");
var router = express.Router();
var controllerDir = "../controllers";
var devicesController = require(path.join(controllerDir, "device"));

router.get("/", async (req, res, next) => {
    res.redirect("/panel");
});
  
router.get("/panel", async (req, res, next) => {
    res.render("control-panel.ejs", {
      msg: "",
    });
});

router.get("/searchDevice", devicesController.getDevice, async (req, res, next) => {
    let device = req.device;   
    res.json(device);   
});
  