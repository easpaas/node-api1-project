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
    id: shortid.generate(), 
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane",  
  }
]

server.get('/', (req, res) => res.send('Hello World!'));

// Returns all users 
server.get('/api/users/', (req, res) => {
  res.status(200).json(users);
})

// Add a new user
server.post('/api/users/', (req, res) => {
  let newUser = req.body;

  // Assign newUser an id
  newUser = Object.assign({id: shortid.generate()}, newUser);

  // Check if status code is correct

  users.push(newUser);
  res.status(201).json(newUser);
})



server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))