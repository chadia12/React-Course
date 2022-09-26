const express = require ('express');
const CategoriesContro = require('../controllers/categoriesContro');
const router = express.Router();

router.get("/",CategoriesContro.getCategories);
router.post('/',CategoriesContro.save);

module.exports = router;