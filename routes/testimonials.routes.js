const express = require('express');
const db = require('../db');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const TestimonialController = require('../controllers/testimonials.controller')

router.get('/testimonials', TestimonialController.getAll);

router.route('/testimonials/random').get((req, res) => { //endpoint /testimonials/random nie działa...
  const randomPost = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomPost]);
});

router.get('/testimonials/:id', TestimonialController.getSingle);

router.post('/testimonials', TestimonialController.postSingle);

router.put('/testimonials/:id', TestimonialController.updateSingle);

router.delete('/testimonials/:id', TestimonialController.deleteSingle);

module.exports = router
