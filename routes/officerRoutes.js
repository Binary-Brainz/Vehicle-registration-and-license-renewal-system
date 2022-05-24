const express = require('express');
const officerController = require('../controllers/officerController');
const auth = require('../middleware/auth');

const router = express.Router();

//login
router.post('/login', officerController.login_post);

//add new vehicle
router.post('/addVehicle', auth.requireAuth, officerController.add_vehicle);

//update vehicle details
router.post('/updateVehicle/:id', auth.requireAuth, officerController.update_vehicle);

//get all vehicles
router.get('/getAllVehicles', auth.requireAuth, officerController.get_vehicles);

module.exports = router;