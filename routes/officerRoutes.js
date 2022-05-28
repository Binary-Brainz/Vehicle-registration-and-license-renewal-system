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

//renew liscence
router.post('/renewLicense/:id', auth.requireAuth, officerController.update_vehicle);

//reject request
router.post('/reject/:request_id', officerController.reject_request);

//get all vehicles
router.get('/getAllVehicles', auth.requireAuth, officerController.get_vehicles);

//download documents belong to an application
router.get('/downloadDocumets/:request_id', officerController.download_documents);

module.exports = router;