import React, { useEffect } from 'react';
import Home from './components/home/Home';
import Loading from './components/loading/Loading';
import Principal from './components/principal/Principal';
import {Provider, useSelector, useDispatch} from 'react-redux';
import generateStore from './redux/store';
import { getAuth } from './redux/actions/authActions';

function App() {
  const store= generateStore();
  return (
    <Provider store={store}>
      <Main /> 
    </Provider>
  );
}

export default App;

function Main() {
 // const [auth, setAuth]= useState(undefined);
  const auth= useSelector(store=> store.auth.authData);

  const dispatch= useDispatch();

  //check auth in the server
  useEffect(()=>{
    if(auth === undefined){
      dispatch(getAuth());
    }
  });

  return (
    <>
    {auth === undefined ?
    (<Loading/>) :
    auth ? 
    (<Principal/>)
    :
    (<Home/>)
    }  
    </>
  );
}
