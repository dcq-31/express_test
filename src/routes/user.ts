import express from 'express';

const router = express.Router();

import { user_list, user_create, user_read, user_update, user_delete } from 'src/controllers/user';

router.put('/user', user_create);

router.get('/user/:id', user_read);

router.get('/user/list', user_list);

router.post('/user/:id', user_update);

router.delete('/user/:id', user_delete);

export default router;