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
    const [loadingData, setLoadingData]= useState(true);

    const fetchData=()=>{
        //setLoadingData(true)
        fetch('http://localhost:4000/api/events',{
            method:'GET',
            headers:{"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
        .then(res=> res.json())
        .then(data=>{
    
          //console.log("fetch calendar.js ");
          setCalendarData(data);
          setLoadingData(false);
          
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
        
        //console.log(searchFilters);
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


        //console.log(filterData);
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
               Object.keys(calendarData).length > 0 && !loadingData ?
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
               }) : loadingData  ? (<svg xmlns="http://www.w3.org/2000/svg" className="loading-wheel claendar-wheel" 
               viewBox="0 0 117.49 124.88" width="100" height="100"><defs></defs>
               <title>loading</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                <path 
                 d="M78.84,18.33a49.61,49.61,0,0,0-28.75-2.12A50.63,50.63,0,0,0,24.57,30.68,51.5,51.5,0,0,0,11.19,57.34a52.14,
                 52.14,0,0,0,3.75,30.08,53.12,53.12,0,0,0,20.17,23.31A54.11,54.11,0,0,0,65.32,119a55.21,55.21,0,0,0,50-35.61,
                 1.12,1.12,0,0,1,1.45-.65,1.14,1.14,0,0,1,.67,1.4,58.76,58.76,0,0,1-19.55,28A59.79,59.79,0,0,1,65.63,124.7a60.64,
                 60.64,0,0,1-34.29-7.6A61.34,61.34,0,0,1,6.71,91.36,62.19,62.19,0,0,1,.46,55.78,63.25,63.25,0,0,1,15.23,22.27,
                 64.12,64.12,0,0,1,46.56,2.37a64.82,64.82,0,0,1,37.61.88l.08,0a8,8,0,0,1-5,15.2Z"/></g></g></svg>) 
                 : (
                     <div className="any-container">
                     <div className="any">
                     <h2>You don't have any event</h2>
                     <p>add one pressing </p>
                     <img src="img/add.svg" alt="add"/>
                     </div>
                    </div>)
             }
            
        </div>
    )
}
