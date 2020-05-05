const express = require('express');
const server = express();
const port = 8080;

// required to read json from the body of a HTTP request
server.use(express.json());

// From shortid npm package 
var shortid = require('shortid');

// Global initalization of Users
let users = [
  {
    id: Math.floor(Math.random() * 200 + 1), 
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane",  
  }
]

server.get('/', (req, res) => res.send('Hello World!'));

// Returns all users 
server.get('/api/users/', (req, res) => {
  res.status(200) ?
    res.status(200).json(users) :
    res.status(500).json({ errorMessage: 'Error connecting to database'})
})

// Add a new user
server.post('/api/users/', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({message: 'Please provide name and bio for the user.'})
  } else {
    let newUser = req.body;

    // Assign newUser an id
    newUser = Object.assign({id:  Math.floor(Math.random() * 200 + 1)}, newUser);

    users.push(newUser);
    res.status(201).json(newUser);
  }
  res.status(500).json({errorMessage: 'There was an error while saving the user to the databse'})
})

// Return user by Id
server.get('/api/users/:id', (req, res) => {
  // id not found
  const id = Number(req.params.id);
  const foundUser = users.filter(user => user.id == id);

  if (!id) {
    res.status(404).json({message: `User id ${id} could not be found. Please provide a valid id.`})
  } else {
    res.status(200).json(foundUser);
  }
})


server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))