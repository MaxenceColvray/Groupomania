const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/', auth, multer, postCtrl.postAdd);
router.get('/', auth, postCtrl.postsDisplay);

router.get('/:id', auth, postCtrl.postDisplay)
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);


router.put('/:id/like', auth, postCtrl.Liked);





module.exports = router;
