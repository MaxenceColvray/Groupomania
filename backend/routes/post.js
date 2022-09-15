const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/', auth, multer, postCtrl.postAdd);
router.get('/', auth, postCtrl.postsDisplay);



module.exports = router;
