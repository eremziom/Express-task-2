const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.getSingle = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(!conc) res.status(404).json({message: 'Not Found'});
    else res.json(conc);
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.postSingle = async (req, res) => {
  try{
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.updateSingle = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const conc = await Concert.findById(req.params.id);
    if(!conc) res.status(404).json({message: 'Not Found'});
    else {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK '})
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.deleteSingle = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if(!conc) res.status(404).json({message: 'Not Found'});
    else {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
}

