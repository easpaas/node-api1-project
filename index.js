const express = require('express');
const server = express();
const port = 8080;

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

server.get('/api/users/', (req, res) => {
  res.status(200).json(users);
})

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))