import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, [])
  return (
    <div className="App">
      <h1>User Data</h1>
      {
        data.map(user => {
          return (
            <div key={user.id} className="user">
              <h3>{user.name}</h3>
              <p>{user.bio}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
