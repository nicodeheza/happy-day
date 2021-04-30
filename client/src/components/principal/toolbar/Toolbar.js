import React from 'react'
import './toolbar.css'

export default function Toolbar({setShowCard}) {
    return (
        <footer className="toolbar">
            <button className="toolbar-btn" onClick={()=>setShowCard('search')}>
            <img src='img/search.svg' alt="search icon" />
            </button>
            <button className="toolbar-btn" onClick={()=>setShowCard('add')}>
            <img src='img/add.svg' alt="add icon" />
            </button>
            <button className="toolbar-btn" onClick={()=>setShowCard('settings')}>
            <img src='img/settings.svg' alt="settings icon" />
            </button>
            <button className="toolbar-btn">
            <img src='img/help.svg' alt="help icon" onClick={()=>setShowCard('help')}/>
            </button>
            <button className="toolbar-btn">
            <img src='img/logout.svg' alt="logout icon" />
            </button>

        </footer>
    )
}
