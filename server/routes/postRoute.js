const express = require ('express');
const PostContro = require('../controllers/postContro');
const router = express.Router();

router.get("/",PostContro.getAllPosts);
router.post('/',PostContro.save);
router.get('/:id',PostContro.getPostById);
router.put('/:id',PostContro.updatePost);
router.delete('/:id',PostContro.deletePost);
module.exports = router;