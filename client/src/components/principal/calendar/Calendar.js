import React, { useEffect, useState } from 'react';
import "./calendar.css"

const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July',
 'August', 'September', 'October', 'November', 'December'];

 const monthColors=['#216b8e', '#27a3a3','#149e84', '#00ae4d', '#69d503', '#d6df24', '#edc01c', '#faa818',
  '#f19616', '#fd6126', '#9458a9', '#6258a2'];



export default function Calendar() {
    const[calendarData , setCalendarData]= useState({});

    const fetchData=()=>{

        fetch('http://localhost:4000/api/events',{
            method:'GET',
            headers:{"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
        .then(res=> res.json())
        .then(data=>{
    
          console.log(data);
          setCalendarData(data);
          
        })
        .catch(err => console.log(err));
    }

    useEffect(()=>{
       fetchData();
    },[]);

    const getAge=(date)=>{
        const ageInMs= Date.now() - new Date(date).getTime();
        const ageInYears= Math.floor(ageInMs / (1000*60*60*24*365));
        if(ageInYears > 0){
            return `(${ageInYears} eyars)`;
        }else{
            return '';
        }
    }

    return (
        <div className="calendar">

           {
               calendarData ?
               Object.keys(calendarData).map((month, i)=>{
                   return(
                    <div className="month-container" id={"month"+month} key={i}>
                        <div className="month-header" style={{backgroundColor: monthColors[month-1]}}>
                            <h2>{monthNames[month-1]}</h2>
                        </div>

                        {
                            Object.keys(calendarData[month]).map((day, j)=>{
                                return(
                                <div key={j}>
                                <div className="day-constainer" >
                                    <h2 style={{color: monthColors[month-1]}}>{day}</h2>
                                    <div className="events-container">
                                        {
                                            calendarData[month][day].map((event, k)=>{
                                                return(
                                                    <div className="event-container" key={k}>
                                                        <p>{`${event.personName} ${event.AnniversaryType} ${event.type} ${getAge(event.date)}`}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                    <hr className="divition"/>
                            
                                
                                </div>
                                )
                            })
                        }
                        
                    </div>
                   )
               }) : (null)
             }
            
        </div>
    )
}
