import React, { useState } from 'react';
import './header.css';

const abrMonths=['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default function Header() {
    const [alertClass, setAlertClass]= useState('alert');

    //handel month btns click
    const goToMonth=(month)=>{

            var elem = document.getElementById(`month${month}`);
            if(elem){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let elemRect=elem.getBoundingClientRect();
                let elePos= elemRect.top +scrollTop
                window.scrollTo(0, elePos -200);
            }else{
                   
                setAlertClass('show');
                 
            }

    }

    return (
        <header style={{ backgroundImage: `url(/img/header.svg)`}} className="app-header">
            <img src="img/logo2.svg" alt="Happy Day Logo"/>

            <div className="month-btn-container">
            {abrMonths.map((m,i)=>{
                return (
                    <div className={'month-btn ' + m} key={i} onClick={()=>goToMonth(i+1)}>
                        {m}
                        </div>
                );
            })}
            </div>
       
            <div className={alertClass} onAnimationEnd={()=>setAlertClass('alert')}>
            <p>You don't have events this month</p>
            </div> 
    
        </header>
    )
}