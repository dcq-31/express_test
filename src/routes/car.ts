import express from 'express';

const router = express.Router();

import { cars_read, car_create, car_read, car_update, car_delete } from 'src/controllers/car';

router.get('/', cars_read);

router.post('/', ...car_create);

router.get('/:id', car_read);

router.put('/:id', car_update);

router.delete('/:id', car_delete);

export default router;