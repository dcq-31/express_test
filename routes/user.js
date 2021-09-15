const express = require('express');

const router = express.Router();

const { user_list, user_create, user_read, user_update, user_delete } = require('./../controllers/user');

router.get('/user/list', user_list);

router.put('/user', user_create);

router.get('/user/:id', user_read);

router.put('/user/:id', user_update);

router.delete('/user/:id', user_delete);

module.exports = router;