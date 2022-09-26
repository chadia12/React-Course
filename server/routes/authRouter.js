const express = require ('express');
const authControler= require("../controllers/auth");
const router = express.Router();

router.post('/register', authControler.save);
router.post('/login', authControler.loginUser);

module.exports = router;