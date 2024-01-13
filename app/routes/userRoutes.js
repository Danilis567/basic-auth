const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Tüm kullanıcıları getirme için route
router.get('/', userController.getUsers);

// Belirli bir kullanıcıyı getirme için route
router.get('/:username', userController.getUserByUsername);

// Kullanıcı kaydı için route
router.post('/register', userController.registerUser);

// Kullanıcı girişi için route
router.post('/login', userController.loginUser);




module.exports = router;
