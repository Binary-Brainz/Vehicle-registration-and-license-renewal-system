const express = require('express');
const ownerController = require('../controllers/ownerController');
const auth = require('../middleware/auth');

const router = express.Router();

const uploader = require('../middleware/fileUploader');

//register
router.post('/register', ownerController.register_post);

//login
router.post('/login', ownerController.login_post);

//get owner ralated data
router.get('/dashboard', auth.requireAuth, ownerController.get_dashboard);
router.get('/vehicles', auth.requireAuth, ownerController.get_owner_vehicles);
router.get('/notifications', auth.requireAuth, ownerController.get_owner_notifications);
router.get('/requests', auth.requireAuth, ownerController.get_owner_requests);

//edit officer profile
router.post('/editProfile', auth.requireAuth, ownerController.edit_owner);

//request with file upload
router.post('/request', uploader.array('documents'), ownerController.send_request);

//download pdf document sent by an officer
router.get('/downloadFile/:notificationID', ownerController.download_file);

module.exports = router;