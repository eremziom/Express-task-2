const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller')

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getSingle);

router.post('/testimonials', TestimonialController.postSingle);

router.put('/testimonials/:id', TestimonialController.updateSingle);

router.delete('/testimonials/:id', TestimonialController.deleteSingle);

module.exports = router
