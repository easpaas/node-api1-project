import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(res => {
        console.log(res.data);
        // setData(res.data);
      })
      .catch(err => console.log(err));
  })
  return (
    <div className="App">
      <h1>User Data</h1>
      <div className="user">
        <h3>{data.name}</h3>
        <p>{data.bio}</p>
      </div>
    </div>
  );
}

export default App;
