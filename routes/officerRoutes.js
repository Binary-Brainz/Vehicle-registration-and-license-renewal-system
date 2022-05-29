const express = require('express');
const officerController = require('../controllers/officerController');
const auth = require('../middleware/auth');

const router = express.Router();

//login
router.post('/login', officerController.login_post);

//edit officer profile
router.post('/editProfile', auth.requireAuth, officerController.edit_officer);

//add new vehicle
router.post('/addVehicle', auth.requireAuth, officerController.add_vehicle);

//update vehicle details
router.post('/updateVehicle/:id', auth.requireAuth, officerController.update_vehicle);

//renew liscence
router.post('/renewLicense/:id', auth.requireAuth, officerController.update_vehicle);

//reject request
router.post('/reject/:request_id', officerController.reject_request);

//download documents belong to an application
router.get('/downloadDocumets/:request_id', officerController.download_documents);

//get all vehicles
router.get('/allVehicles', auth.requireAuth, officerController.get_vehicles);

//get officer requests
router.get('/requests', auth.requireAuth, officerController.get_officer_requests);

module.exports = router;