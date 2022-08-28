const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");

const vehicleProtect = asyncHandler(async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ pId: req.page.pId });

    if (vehicles) {
      page;
    } else {
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

module.exports = { vehicleProtect };
