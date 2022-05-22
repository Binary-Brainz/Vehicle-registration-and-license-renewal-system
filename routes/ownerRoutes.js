const express = require('express');
const ownerController = require('../controllers/ownerController');
const auth = require('../middleware/auth');

const router = express.Router();

//register
router.post('/register', ownerController.register_post);

//login
router.post('/login', ownerController.login_post)

module.exports = router;