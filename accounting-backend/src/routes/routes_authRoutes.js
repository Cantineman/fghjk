const express = require('express');
const { setup, loginController } = require('../controllers/authController');

const router = express.Router();

router.post('/setup', setup);
router.post('/login', loginController);

module.exports = router;