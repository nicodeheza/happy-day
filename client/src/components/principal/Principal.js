import React, { useEffect, useState } from 'react'
import Card from './cards/Card';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar'
import './principal.css';
import Calendar from './calendar/Calendar';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../redux/actions/authActions';


export const principalContext= React.createContext();

export default function Principal() {
    
    const dispatch = useDispatch();

    const [showCard, setShowCard]= useState('none');
    const [message, setMessage]= useState("");
    const [searchFilters, setSearchFilters]=useState({});

    const [emailNotification, setEmailNotification]= useState(true);
    const [firstFetch, setFirstFetch]= useState(true);
  
    //get email notification status
    useEffect(()=>{
      if(firstFetch){
      fetch('http://localhost:4000/api/emailNotification',{
          method:'GET',
          headers:{"Content-type": "application/json; charset=UTF-8"},
          credentials: 'include'
      })
      .then(res=> res.json())
      .then(data=>{
        if(data.auth === false){
            dispatch(setAuth(data.auth));
        }else{
            setEmailNotification(data.mailNotification);
            setFirstFetch(false);
            //console.log("fetch principal.js email notification");
        }
      })
      .catch(err => console.log(err));
    }
  // eslint-disable-next-line
    }, [firstFetch]);

    return (
        <principalContext.Provider value={{
         showCard,
         setShowCard,
         setMessage,
         setSearchFilters,
         searchFilters,
         emailNotification,
         setEmailNotification
         }}>
        <div>
            <Header/>

            <div className="tool-card">

            <Card showCard={showCard} setShowCard={setShowCard} />
        
            <Toolbar setShowCard={setShowCard}/>
            </div>

            <Calendar setShowCard={setShowCard} showCard={showCard} />

            <Message message={message} />
        </div>
        </principalContext.Provider>
    )
}

//message component
function Message({message}){
    const [style, setStyle]=useState({display: 'flex'});
    useEffect(()=>{
        if(message){
            setStyle({display: 'flex'});
        }else{
            setStyle({display: "none"});
        }
    },[message]);
    return(
        <>
       <div className="message" onAnimationEnd={()=>setStyle({display: "none"})} style={style}><p>{message}</p></div>
        </>
    )
}