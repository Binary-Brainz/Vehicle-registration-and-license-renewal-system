const express = require('express');
const ownerController = require('../controllers/ownerController');
const auth = require('../middleware/auth');

const router = express.Router();

const uploadS3 = require('../middleware/uploader');

//register
router.post('/register', ownerController.register_post);

//login
router.post('/login', ownerController.login_post);

//get owner ralated data
router.get('/dashboard/:id', auth.requireRouteAuth, ownerController.get_dashboard);
router.get('/expiredVehicles/:id', auth.requireRouteAuth, ownerController.expired_vehicles);
router.get('/vehicles', auth.requireAuth, ownerController.get_owner_vehicles);
router.get('/unreadNotificationCount/:id', auth.requireRouteAuth, ownerController.unread_notification_count);
router.get('/reservedDates/:id', auth.requireRouteAuth, ownerController.get_owner_reservedDates);
router.get('/notifications/:id', auth.requireAuth, ownerController.get_owner_notifications);
router.get('/requests', auth.requireAuth, ownerController.get_owner_requests);

//edit officer profile
router.post('/editProfile', auth.requireAuth, ownerController.edit_owner);

//request with file upload
router.post('/request', uploadS3.array('documents'), ownerController.send_request);

//reserve date
router.post('/reserve', auth.requireAuth, ownerController.reserve_post);

//upload a vehicle image
router.post('/vehicleImg', uploadS3.array('documents'), ownerController.upload_vehicle_image);

module.exports = router;