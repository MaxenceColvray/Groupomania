const express = require('express');
const router = express.Router();

const password = require('../middleware/password')
const auth = require('../middleware/auth')


const userCtrl = require('../controllers/user');
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/verify', auth, userCtrl.verify);




module.exports = router;
