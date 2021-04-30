import React,{useContext} from 'react'
import {authContext} from '../../../App';
import './toolbar.css'

export default function Toolbar({setShowCard}) {

    const setAuth= useContext(authContext);

    const logOut=()=>{
        fetch('http://localhost:4000/api/logout',{
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
    }

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
            <button className="toolbar-btn" onClick={()=>logOut()}>
            <img src='img/logout.svg' alt="logout icon" />
            </button>

        </footer>
    )
}