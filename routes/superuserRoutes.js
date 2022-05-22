const express = require('express');
const superuserController = require('../controllers/superuserController');
const auth = require('../middleware/auth');

const router = express.Router();

//login
router.post('/login', superuserController.login_post);

//add officer
router.post('/addOfficer', auth.requireAuth, superuserController.addOfficer_post);

//edit account - officer
router.post('/editOfficer/:id', superuserController.editOfficer);

//edit account - owner
router.post('/editOwner/:id', superuserController.editOwner);

//get all notifications
router.get('/allNotifications', superuserController.getNotifications);

//send notification
router.post('/send/:type', superuserController.sendNotifications);

//temp
router.post('/register', superuserController.register_post);

module.exports = router;