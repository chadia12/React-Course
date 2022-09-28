 const express = require ('express');
 const userController = require('../controllers/userController');
 const router = express.Router();

 router.get('/',userController.getAllUser);
 router.get('/:id', userController.getUserById);
 router.put('/:id', userController.updateUser);
 router.put('/delete/:id', userController.deleteUser);
 
 module.exports = router;
