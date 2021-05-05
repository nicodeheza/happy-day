import React, { useState } from 'react'
import Card from './cards/Card';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar'
import './principal.css';
import Calendar from './calendar/Calendar';


export const updateCalendarContext= React.createContext();

export default function Principal() {
    const [showCard, setShowCard]= useState('none');
    const [updateCalendar, setUpdateCalendar]= useState(false);
    return (
        <updateCalendarContext.Provider value={{updateCalendar, setUpdateCalendar}}>
        <div>
            <Header/>

            <div className="tool-card">

            <Card showCard={showCard} setShowCard={setShowCard}/>
        
            <Toolbar setShowCard={setShowCard}/>
            </div>

            <Calendar/>
        </div>
        </updateCalendarContext.Provider>
    )
}
