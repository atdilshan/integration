const mongoose = require("mongoose");

// schema for vehicle
const vehicleSchema = mongoose.Schema(
  {
    vId: {
      type: String,
      required: true,
      unique: true,
    },
    pId: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: [true, "Please add vehicle type"],
    },
    vehicleNo: {
      type: String,
      required: [true, "Please add vehicle no"],
      unique: true,
    },
    vehicleName: {
      type: String,
      required: [true, "Please add vehicle name"],
    },
    vehicleDescription: {
      type: String,
      required: [true, "Please add vehicle description"],
    },
    vehicleFuelType: {
      type: String,
      required: [true, "Please add vehicle fuel type"],
    },
    vehicleACType: {
      type: String,
      required: [true, "Please add vehicle AC Type"],
    },
    status: {
      type: String,
      required: true,
    },
    statusComment: {
      type: String,
      required: true,
    },
    tempVehicleName: {
      type: String,
      required: true,
    },
    tempVehicleDescription: {
      type: String,
    },
    tempVehicleACType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle", vehicleSchema);
