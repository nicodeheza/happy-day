import React, { useState } from 'react'
import Card from './cards/Card';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar'
import './principal.css';
import Calendar from './calendar/Calendar';




export default function Principal() {
    const [showCard, setShowCard]= useState('none');
    return (
        <div>
            <Header/>

            <div className="tool-card">

            <Card showCard={showCard} setShowCard={setShowCard}/>
        
            <Toolbar setShowCard={setShowCard}/>
            </div>

            <Calendar/>
        </div>
    )
}
