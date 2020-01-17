const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller')

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getSingle);

router.post('/seats', SeatController.postSingle);

router.put('/seats/:id', SeatController.updatdeSingle);

router.delete('/seats/:id', SeatController.deleteSingle);

module.exports = router
