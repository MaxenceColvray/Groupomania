const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/', multer,/*auth,*/ postCtrl.postAdd);
router.get('/', postCtrl.postsDisplay);



module.exports = router;
