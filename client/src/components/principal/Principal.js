import React, { useEffect, useState } from 'react'
import Card from './cards/Card';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar'
import './principal.css';
import Calendar from './calendar/Calendar';


export const principalContext= React.createContext();

export default function Principal() {
    const [showCard, setShowCard]= useState('none');
    const [updateCalendar, setUpdateCalendar]= useState(false);
    const [edit, setEdit]= useState({});
    const [message, setMessage]= useState("");
    const [searchFilters, setSearchFilters]=useState({});
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
         searchFilters
         }}>
        <div>
            <Header/>

            <div className="tool-card">

            <Card showCard={showCard} setShowCard={setShowCard} edit={edit}/>
        
            <Toolbar setShowCard={setShowCard}/>
            </div>

            <Calendar setShowCard={setShowCard} showCard={showCard} />

            <Message message={message} />
        </div>
        </principalContext.Provider>
    )
}


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