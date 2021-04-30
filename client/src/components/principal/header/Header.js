import React from 'react';
import './header.css';

const abrMonths=['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default function Header() {
    return (
        <header style={{ backgroundImage: `url(/img/header.svg)`}} className="app-header">
            <img src="img/logo2.svg" alt="Happy Day Logo"/>

            <div className="month-btn-container">
            {abrMonths.map((m,i)=>{
                return (
                    <a href={'#'+ m} key={i}><div className={'month-btn ' + m}>
                        {m}
                        </div></a>
                );
            })}
            </div>
            
        </header>
    )
}