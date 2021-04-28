import { useState, useEffect } from 'react';
import Home from './components/home/Home';
import Principal from './components/principal/Principal';

function App() {
  const [auth, setAuth]= useState(false);

  useEffect(()=>{
    
  });

  return (
    <>
    {auth? 
    (<Principal/>)
    :
    (<Home/>)
    }  
    </>
  );
}

export default App;
