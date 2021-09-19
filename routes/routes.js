const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");

router.get('/users', userController.get_all_users);
router.get('/users/:id', userController.get_user);
router.post('/users', userController.add_user);
router.put('/users/:id', userController.update_user);
router.delete('/users/:id', userController.delete_user);

module.exports = router;