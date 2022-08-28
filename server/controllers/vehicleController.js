const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Page = require("../models/pageModel");
const Vehicle = require("../models/vehicleModel");

const mainID = "7777";

// @desc    Get my vehicles
// @route   GET /api/mypage/vehicles
// @access  Private
const allVehicles = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const vehicles = await Vehicle.find({ pId: req.page.pId });
      res.status(202).json(vehicles);
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

// @desc    Get my vehicle
// @route   GET /api/mypage/vehicle
// @access  Private
const vehicle = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const vehicle = await Vehicle.findOne({ vId: req.params.vId });
      if (!vehicle) {
      }
      res.status(202).json(vehicles);
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

// @desc    ADD vehicle
// @route   POST /api/mypage/vehicles/add
// @access  Private
const addVehicle = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const {
        vehicleType,
        vehicleNo,
        vehicleName,
        vehicleDescription,
        vehicleFuelType,
        vehicleACType,
      } = req.body;

      if (
        !vehicleType ||
        !vehicleNo ||
        !vehicleName ||
        !vehicleDescription ||
        !vehicleFuelType ||
        !vehicleACType
      ) {
        res.status(201).json("Please add all fields");
      } else {
        // Check if vehicle exists
        const vehicleExists = await Vehicle.findOne({
          vehicleNo: req.body.vehicleNo,
        });
        if (vehicleExists) {
          res.status(201).json("Vehicle already exists");
        } else {
          const utcTimestamp = new Date().getTime();

          // Add vehicle
          const vehicle = await Vehicle.create({
            vId: mainID + utcTimestamp,
            pId: req.page.pId,
            vehicleType,
            vehicleNo,
            vehicleName,
            vehicleDescription,
            vehicleFuelType,
            vehicleACType, // AC=1, NonAC=0
            status: "1", // wait=0, active=1, block=2, active&pending=3 deleted=4
            statusComment: "User create",
            tempVehicleName: vehicleName,
            tempVehicleDescription: vehicleDescription,
            tempVehicleACType: vehicleACType,
          });

          if (vehicle) {
            res.status(201).json({ vehicle });
          } else {
            res.status(400);
            throw new Error("Invalid vehicle data");
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

// @desc    Update vehicle details
// @route   PUT /api/mypage/vehicles/update/:id
// @access  Private
const updateVehicle = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const vehicle = await Vehicle.findOne({ vId: req.params.vId });
      if (!vehicle) {
        res.status(201).json("Something went wrong!");
      } else {
        if (vehicle.status == 0) {
          res.status(201).json("This vehicle under reviewing!");
        } else {
          if (vehicle.status == 2) {
            res.status(201).json("This vehicle blocked!");
          } else {
            if (vehicle.status == 4) {
              res.status(201).json("This vehicle deleted!");
            } else {
              const {
                tempVehicleName,
                tempVehicleDescription,
                tempVehicleACType,
              } = req.body;

              if (
                tempVehicleName ||
                tempVehicleDescription ||
                tempVehicleACType
              ) {
                const updateData = {
                  tempVehicleName: tempVehicleName,
                  tempVehicleDescription: tempVehicleDescription,
                  tempVehicleACType: tempVehicleACType, // AC=1, NonAC=0
                  status: "3", // wait=0, active=1, block=2, active&pending=3, deleted=4
                  statusComment: "User update vehicle details",
                };
                const updatedVehicle = await Vehicle.findOneAndUpdate(
                  { vId: req.params.vId },
                  updateData
                );
                if (updatedVehicle) {
                  res
                    .status(201)
                    .json(await Vehicle.findOne({ vId: req.params.vId }));
                } else {
                  res.status(201).json("Something went wrong in update!");
                }
              } else {
                res.status(201).json("Something went wrong");
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

// @desc    Delete mpage details
// @route   PUT /api/mypage/vehicles/delete:id
// @access  Private
const deleteVehicle = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const vehicle = await Vehicle.findOne({ vId: req.params.vId });
      if (!vehicle) {
        res.status(201).json("Something went wrong!");
      } else {
        if (vehicle.status == 0) {
          res.status(201).json("This vehicle under reviewing!");
        } else {
          if (vehicle.status == 2) {
            res.status(201).json("This vehicle blocked!");
          } else {
            if (vehicle.status == 4) {
              res.status(201).json("This vehicle deleted!");
            } else {
              const deleteData = {
                status: "4", // wait=0, active=1, block=2, active&pending=3, deleted=4
                statusComment: "User delete vehicle",
              };
              const deletedVehicle = await Vehicle.findOneAndUpdate(
                { vId: req.params.vId },
                deleteData
              );
              if (deletedVehicle) {
                res
                  .status(201)
                  .json(`Vehicle deleted successfully! ${req.params.vId}`);
              } else {
                res.status(201).json("Something went wrong");
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
});

module.exports = {
  allVehicles,
  vehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
