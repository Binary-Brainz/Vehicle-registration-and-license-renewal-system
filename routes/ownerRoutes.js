const express = require('express');
const ownerController = require('../controllers/ownerController');
const auth = require('../middleware/auth');

const router = express.Router();

const uploader = require('../middleware/fileUploader');

//register
router.post('/register', ownerController.register_post);

//login
router.post('/login', ownerController.login_post);

//request with file upload
router.post('/request', uploader.array('documents'), ownerController.send_request);

module.exports = router;