const express = require('express');

const router = express.Router();

const { car_list, car_create, car_read, car_update, car_delete } = require('./../controllers/car');

router.get('/car/list', car_list);

router.put('/car', car_create);

router.get('/car/:id', car_read);

router.put('/car', car_update);

router.delete('/car/:id', car_delete);

module.exports = router;
