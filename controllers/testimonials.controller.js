const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.getRandom = async (req, res) => {
  try{
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand);
    if(!test) res.status(404).json({message: 'Not Found'});
    else res.json(test);
  }
  catch(err){
    res.status(500).json(err);
  }
}

exports.getSingle = async (req, res) => {
  try{
    const test = await Testimonial.findById(req.params.id);
    if(!test) res.status(404).json({message: 'Not Found'});
    else res.json(test);
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.postSingle = async (req, res) => {
  try{
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({author: author, text: text});
    await newTestimonial.save();
    res.json({message: 'OK'});
  }
  catch(err){
    res.status(500).json(err);
  }
}

exports.updateSingle = async (req, res) => {
  try{
    const { author, text } = req.body;
    const test = await Testimonial.findById(req.params.id);
    if(!test) res.status(404).json({message: 'Not Found'});
    else {
      await Testimonial.updateOne({ _id: req.params.id}, {author: author, text: text});
      res.json({message: 'OK'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.deleteSingle = async (req, res) => {
  try{
    const test = await Testimonial.findById(req.params.id);
    if(!test) res.status(404).json({message: 'Not Found'});
    else {
      await Testimonial.deleteOne({ _id: req.params.id});
      res.json({message: 'OK'});
    }
  }
  catch(err){
    res.status(500).json(err);
  }
}