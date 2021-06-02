import React, { useContext, useEffect, useState } from 'react'
import Card from './cards/Card';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar'
import './principal.css';
import Calendar from './calendar/Calendar';
import {authContext} from '../../App';


export const principalContext= React.createContext();

export default function Principal() {
    const setAuth= useContext(authContext);
    const [showCard, setShowCard]= useState('none');
    const [updateCalendar, setUpdateCalendar]= useState(false);
    const [edit, setEdit]= useState({});
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
            setAuth(data.auth);
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
         updateCalendar,
         setUpdateCalendar,
         edit, 
         setEdit,
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