import React, { useState, useEffect } from 'react';
import Home from './components/home/Home';
import Loading from './components/loading/Loading';
import Principal from './components/principal/Principal';

export const authContext= React.createContext();

function App() {
  const [auth, setAuth]= useState(undefined);

  useEffect(()=>{
    fetch('http://localhost:4000/api',{
      method:'GET',
      headers:{"Content-type": "application/json; charset=UTF-8"},
      credentials: 'include'
  })
  .then(res=> res.json())
  .then(data=>{
    setAuth(data.auth);
    console.log(data);
  })
  .catch(err => console.log(err));
  });

  return (
    <authContext.Provider value={setAuth}>
    
    {auth === undefined ?
    (<Loading/>) :
    auth ? 
    (<Principal/>)
    :
    (<Home/>)
    }  
    </authContext.Provider>
  );
}

export default App;
