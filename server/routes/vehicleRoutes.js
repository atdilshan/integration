const express = require('express')
const router = express.Router()
const {
    allVehicles,
    vehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicleController')

const { authProtect } = require('../middleware/authMiddleware')
const { pageProtect } = require('../middleware/pageMiddleware')

router.get('/vehicles', authProtect, pageProtect, allVehicles)
router.get('/vehicle', authProtect, pageProtect, vehicle)
router.post('/vehicle/add', authProtect, pageProtect, addVehicle)
router.put('/vehicle/update/:vId', authProtect, pageProtect, updateVehicle)
router.put('/vehicle/delete/:vId', authProtect, pageProtect, deleteVehicle)

module.exports = router