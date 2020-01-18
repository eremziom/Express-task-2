const Seat = require('..//models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
    req.io.emit('seatsUpdated', db.seats);    
  }
  catch(err){
    res.status(500).json(err);
  }
}

exports.getSingle = async (req, res) => {
  try{
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.statsu(404).json({message: 'Not Found'});
    else res.json(seat);
  }
  catch(err){
    res.status(500).json(err);
  }
}

exports.postSingle = async (req, res) => {
 try{
  const {day, seat, client, email} = req.body;
  const check = await Seat.findOne({ $and: [{day: day}, {seat: seat}]});
  if(check) res.json({message: 'Sorry, this seat is already taken'});
  else {
    const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
    await newSeat.save()
    res.json({message: 'OK'});
    req.io.emit('seatsUpdated', db.seats);
  }
}
  catch(err){
    res.status(500).json(err);
  }
}

exports.updatdeSingle = async (req, res) => {
  try{
    const {day, seat, client, email} = req.body;
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({message: 'Not Found'});
    else{
      await Seat.updateOne({ _id: req.params.id}, {$set: {day: day, seat: seat, client: client, email: email}});
      res.json({message: 'OK'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
}

exports.deleteSingle = async (req, res) => {
  try{
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({message: 'Not Found'});
    else{
      await Seat.deleteOne({ _id: req.params.id});
      res.json({message: 'OK'});
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
}
