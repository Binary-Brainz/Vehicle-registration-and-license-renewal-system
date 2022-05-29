const express = require('express');
const ownerController = require('../controllers/ownerController');
const auth = require('../middleware/auth');

const router = express.Router();

//register
router.post('/register', ownerController.register_post);

//login
router.post('/login', ownerController.login_post)

//--------------------------------------------
router.get('/',services.homeRoutes);
router.get('/update-user',services.update_user);

//API
router.get('/api/users',controller.find);
router.put('/api/users/:id',controller.update);

module.exports = router;