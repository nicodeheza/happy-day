import React, { useContext, useEffect, useState } from 'react';
import "./calendar.css"
import {principalContext} from '../Principal';

const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July',
 'August', 'September', 'October', 'November', 'December'];

 const monthColors=['#216b8e', '#27a3a3','#149e84', '#00ae4d', '#69d503', '#d6df24', '#edc01c', '#faa818',
  '#f19616', '#fd6126', '#9458a9', '#6258a2'];
  let lastId;


export default function Calendar({setShowCard, showCard}) {
    const[calendarData , setCalendarData]= useState({});
    const {updateCalendar, setUpdateCalendar, setEdit, searchFilters}= useContext(principalContext);
    const [searchResults, setSearchResults]= useState({});

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

    useEffect(()=>{
        if(updateCalendar){
        fetchData();
        setUpdateCalendar(false);
        }
     },[updateCalendar, setUpdateCalendar]);

    useEffect(()=>{
        
        console.log(searchFilters);
        let filterData={};
        let fromMonth;
        let fromDay;
        let toMonth;
        let toDay;

        if(searchFilters.from){
            const from= searchFilters.from.split('/');
             fromMonth= parseInt(from[0]);
             fromDay= parseInt(from[1]);
        }else{
            fromMonth= 0;
            fromDay= 0;
        }
        if(searchFilters.to){
            const to= searchFilters.to.split('/');
             toMonth= parseInt(to[0]);
             toDay= parseInt(to[1]);
        }else{
            toMonth= 99;
            toDay= 99;
        }

        let i=0;
        let lastMonth;
        for(const month in calendarData){
            if(month >= fromMonth && month <= toMonth){
                i++;
                lastMonth=month;

                if(i===1){
                    filterData[month]= {};
                    for(const day in calendarData[month]){

                        if(day >= fromDay){
                            filterData[month][day]= [...calendarData[month][day]];
                        }
                    }
                }else{
                    filterData[month]={...calendarData[month]};
                    
                }
                

            }

        }

        for( const day in filterData[lastMonth]){
            if(day > toDay){
                delete filterData[lastMonth][day];
            }
        }

        if(searchFilters.name){
        for(const month in filterData){
            for(const day in filterData[month]){
                 //console.log( filterData);
               const nameFilter= filterData[month][day].filter(data=>{
                   let regExp= new RegExp(searchFilters.name.toLowerCase(), 'ig');
                   return regExp.test(data.personName);
                });
                if(nameFilter.length === 0){
                   delete filterData[month][day];
                }else{
                    filterData[month][day]= nameFilter;
                }
            }

            if(Object.keys(filterData[month]).length === 0){
                delete filterData[month];
            }
        }
     }   

     if(searchFilters.type !== "any" && searchFilters.type){

        for(const month in filterData){
            for(const day in filterData[month]){
               const typeFilter= filterData[month][day].filter(data=>{
                  if(data.type === searchFilters.type){
                      return true;
                  }else{
                      return false;
                  }
                });
                if(typeFilter.length === 0){
                   delete filterData[month][day];
                }else{
                    filterData[month][day]= typeFilter;
                }
            }

            if(Object.keys(filterData[month]).length === 0){
                delete filterData[month];
            }
        }

     }


        console.log(filterData);
        setSearchResults(filterData);

    },[searchFilters, calendarData]);
    

    const getAge=(date)=>{
        const ageInMs= Date.now() - new Date(date).getTime();
        const ageInYears= Math.floor(ageInMs / (1000*60*60*24*365));
        if(ageInYears > 0){
            return `(${ageInYears} eyars)`;
        }else{
            return '';
        }
    }


    const eventEdit=(id, event)=>{
        //ele.className="event-container selected"
        if(lastId){
            lastId.style.backgroundColor = "transparent";
        }
       const ele= document.getElementById(id);
       ele.style.backgroundColor = "white";
       lastId= document.getElementById(id);

       setShowCard('edit');
       setEdit(event);

    }
    useEffect(()=>{
        if(showCard === "none" && lastId){
            lastId.style.backgroundColor = "transparent";
           }
    },[showCard])


    return (
        <div className="calendar">

           {
               calendarData ?
               Object.keys(searchResults? searchResults : calendarData).map((month, i)=>{
                   return(
                    <div className="month-container" id={"month"+month} key={i}>
                        <div className="month-header" style={{backgroundColor: monthColors[month-1]}}>
                            <h2>{monthNames[month-1]}</h2>
                        </div>

                        {
                            Object.keys(searchResults? searchResults[month] : calendarData[month]).map((day, j)=>{
                                return(
                                <div key={j}>
                                <div className="day-constainer" >
                                    <h2 style={{color: monthColors[month-1]}}>{day}</h2>
                                    <div className="events-container">
                                        {
                                            (searchResults? searchResults[month][day] : calendarData[month][day]).map((event, k)=>{
                                                return(
                                                    <div className="event-container" id={`event-${month}-${day}-${k}`} key={k} onClick={()=> eventEdit(`event-${month}-${day}-${k}`, event)}>
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
