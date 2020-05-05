const express = require('express');
const server = express();
const port = 8080;

server.use(cors());
server.use(express.json());

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

// Return user by Id
server.get('/api/users/:id', (req, res) => {
  // id not found
  const id = Number(req.params.id);
  const foundUser = users.filter(user => user.id === id);

  if (!id || foundUser.length == 0) {
    res.status(404).json({message: `User id ${id} could not be found. Please provide a valid id.`})
  } else {
    res.status(200).json(foundUser);
  }
  res.status(500).json({errorMessage: 'The user information could not be retrieved.'});
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

// Update a user
server.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);

  if (!id || users.length == 0) {
    res.status(404).json({message: `User with id, ${id}, doesn't exist.`})
  } else if (!req.body.name || !req.body.bio || req.body.id !== id) {
    res.status(400).json({errorMessage: 'Please provide the correct id, name and bio.'})
  } else {
  users[userIndex] = req.body;
  res.status(200).json()
  }
  res.status(500).json({errorMessage: 'The user information could not be modified.'});
})


// Delete user by Id
server.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  
  if (!id || users.length == 0) {
    res.status(404).json({message: `User with id, ${id}, could not be found.`});
  } else {
    res.status(200).json(1);
  }
  res.status(500).json({errorMessage: "The user could not be removed"});
})


server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))