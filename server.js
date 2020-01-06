const express = require('express');
const path = require('path');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.send(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  for(let post of db.testimonials){
    if(post.id == req.params.id){
      res.send(post);
    };
  };
});

app.get('/post/random', (req, res) => { //endpoint /testimonials/random nie działa...
  const randomPost = Math.floor(Math.random() * db.testimonials.length);
  res.send(db.testimonials[randomPost]);
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  const newPost = {author: author, text: text, id: uuidv1()};
  db.testimonials.push(newPost);
  res.send({message: 'OK'});
})

app.put('/testimonials/:id', (req, res) => {
  const {author, text} = req.body;
  for(let post of db.testimonials){
    if(post.id == req.params.id){
      post.author = author;
      post.text = text;
    };
  };
  res.send({message: 'OK'});
})

app.delete('/testimonials/:id', (req, res) => {
  for(let post of db.testimonials){
    if(post.id == req.params.id){
      db.testimonials.splice(db.testimonials.indexOf(post));
    };
  };
  res.send({message: 'OK'});
})

app.get('/concerts', (req, res) => {
  res.send(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  for(let post of db.concerts){
    if(req.params.id == post.id){
      res.send(post);
    };
  };
});

app.post('/concerts', (req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const newPost = {performer: performer, genre: genre, price: price, day: day, image: image, id: uuidv1()};
  db.concerts.push(newPost);
  res.send({message: 'OK'});
});

app.put('/concerts/:id', (req, res) => {
  const {performer, genre, price, day, image} = req.body;
  for(let post of db.concerts){
    if(post.id == req.params.id){
      post.performer = performer;
      post.genre = genre;
      post.price = price;
      post.day = day;
      post.image = image;
    };
  };
  res.send({message: 'OK'});
});

app.delete('/concerts/:id', (req, res) => {
  for(let post of db.concerts){
    if(post.id == req.params.id){
      db.concerts.splice(db.concerts.indexOf(post));
    };
  };
  res.send({message: 'OK'});
});

app.get('/seats', (req, res) => {
  res.send(db.seats);
});

app.get('/seats/:id', (req, res) => {
  for(let post of db.seats){
    if(req.params.id == post.id){
      res.send(post);
    };
  };
});

app.post('/seats', (req, res) => {
  const {day, seat, client, email} = req.body;
  const newPost = {day: day, seat: seat, client: client, email: email, id: uuidv1()};
  db.seats.push(newPost);
  res.send({message: 'OK'});
});

app.put('/seats/:id', (req, res) => {
  const {day, seat, client, email} = req.body;
  for(let post of db.seats){
    if(post.id == req.params.id){
      post.day = day;
      post.seat = seat;
      post.client = client;
      post.email = email;
    };
  };
  res.send({message: 'OK'});
});

app.delete('/seats/:id', (req, res) => {
  for(let post of db.seats){
    if(post.id == req.params.id){
      db.seats.splice(db.seats.indexOf(post));
    };
  };
  res.send({message: 'OK'});
});

app.use((req, res) => {
  res.status(404).send({message: '404 not found...'});
})

app.listen(8000, () => {
  console.log('server is running on port: 8000');
});