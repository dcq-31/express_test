import express from 'express';

const router = express.Router();

import { users_read, user_create, user_read, user_update, user_delete } from 'src/controllers/user';

router.get('/', users_read);

router.post('/', ...user_create);

router.get('/:id', ...user_read);

router.put('/:id', user_update);

router.delete('/:id', user_delete);

export default router;