import React, { useContext, useState } from "react";
import './cards.css';
import{principalContext} from '../Principal';
import {authContext} from '../../../App';

const abrMonths = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Add() {

  const setAuth= useContext(authContext);
  const { setUpdateCalendar, setMessage}= useContext(principalContext);

  const [formFields, setFormFields]= useState({
    event:'birthday',
    type:'',
    day:'',
    month:abrMonths[0],
    year:'',
    personName:'',
    reminders:[{title:'The Same Day', date:''}]
  });

  const[reminder, setReminder]= useState({
    timeBefore:'same-day',
    numBefore:''
  });

  const addReminder=(e)=>{
    e.preventDefault();

    let newReminder={
      title:'',
      date:'',
    }

    switch (reminder.timeBefore) {
      case 'same-day':
        newReminder.title= 'The Same Day';
        break;
      case 'days-before':
        newReminder.title= `${reminder.numBefore} Days Before`;
        break;
      case 'weeks-before':
        newReminder.title= `${reminder.numBefore} Weeks Before`
        break; 
    
      default:
        break;
    }

    let remindersArry= formFields.reminders;
    remindersArry.push(newReminder);

    setFormFields({...formFields, reminders: remindersArry});
  }

  const removeReminder=(i)=>{
    let remindersArry= formFields.reminders
    remindersArry.splice(i, 1);

    setFormFields({...formFields, reminders:remindersArry}); 
  }

  const submit=(e)=>{
    e.preventDefault();
    setMessage("");
    let submitForm={
      event:formFields.event,
      type: formFields.type,
      date: new Date(`${formFields.month} ${formFields.day} ${formFields.year === '' ? '9999' : formFields.year}`),
      personName: formFields.personName,
      reminders:[]
    }

    const submitReminders= formFields.reminders.map((ele)=>{
      let eleR={title: ele.title};
      if(ele.title === 'The Same Day'){
        eleR.date= submitForm.date;
      }else{
        const dateSub= ele.title.split(' ',2);
        let dateInMs= submitForm.date.getTime();
        const oneDay=1000*60*60*24;
        const oneWeek= oneDay * 7;
        if(dateSub[1]==='Days'){
          eleR.date= new Date(dateInMs - oneDay * dateSub[0]);
        }else{
          eleR.date= new Date(dateInMs - oneWeek * dateSub[0]);
        }
      }
      return eleR;
    });

    submitForm ={...submitForm, reminders: submitReminders};

    fetch('http://localhost:4000/api/add',{
                method:'POST',
                body: JSON.stringify(submitForm),
                headers:{"Content-type": "application/json; charset=UTF-8"},
                credentials: 'include'
            })
            .then(res=> res.json())
            .then(data=>{
              if(data.auth === false){
                setAuth(data.auth);
              }else{
                //console.log('fetch add.js')
                setMessage(data.message);
                setUpdateCalendar(true);
              }
              })
            .catch(err => console.log(err));

            setFormFields({
              event:'birthday',
              type:'',
              day:'',
              month:abrMonths[0],
              year:'',
              personName:'',
              reminders:[{title:'The Same Day', date:''}]
            });
  }


  return (
   
      <form className="card-form" onSubmit={(e)=>submit(e)}>

        <div className="grup">
          <div className="label">
            <label htmlFor="event">Event</label>
            <select name="event" id="event" onChange={(e)=>setFormFields({...formFields, event:e.target.value})} 
            value={formFields.event} required>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>

          {formFields.event === 'anniversary' ?
          ( <div className="label">
          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type"  onChange={(e)=>setFormFields({...formFields, type: e.target.value})}
          value={formFields.type}/>
        </div>) : (null)}
         

        </div>

        <div className="grup" >
            <div className="label">
              <label htmlFor="day">Day</label>
              <input className="day" id="day" type="number" name="day" min="1" max="31" step="1" 
              onChange={(e)=>setFormFields({...formFields, day:e.target.value})} 
              value={formFields.day} required/>
            </div>
            <div className="label">
              <label htmlFor="month">Month</label>
              <select name="month" id="month" onChange={(e)=>setFormFields({...formFields, month:e.target.value})} 
              value={formFields.month} required>
                {abrMonths.map((m, i) => {
                  return (
                    <option key={i} value={m}>
                      {m}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="label">
              <label htmlFor="year">Year</label>
              <input className="year" id="year" type="number"name="year" placeholder="any" max="9999"
              onChange={e=>setFormFields({...formFields, year:e.target.value})}
              value={formFields.year}/>
            </div>
        </div>

        <div className="label">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={e=>setFormFields({...formFields, personName: e.target.value})} 
            value={formFields.personName} required/>
        </div>

        <div className="grup">
            <div className="grup">
            <label htmlFor="time-before">Add Reminders</label>
            <select name="time-before" id="time-before" onChange={e=>setReminder({...reminder, timeBefore:e.target.value})} 
            value={reminder.timeBefore} >
                <option value="same-day">The Same Day</option>
                <option value="days-before">Days Before</option>
                <option value="weeks-before">Weeks Before</option>
            </select>
            {reminder.timeBefore !== "same-day" ?
            (<input className="a-r-n" type="number" name="num-before" min="1" step="1" data-testid="numBefore"
            onChange={e=>setReminder({...reminder, numBefore: e.target.value})}
            value={reminder.numBefore}/>) : (null)}
            
            <button className="a-r-b" onClick={(e)=>addReminder(e)}>Add</button>
            </div>
            <ul className="reminders">

              {
                formFields.reminders.map((ele,i)=>{
                  return(
                    <li key={i}>{ele.title} <img src="img/drop.svg" alt="drop" onClick={()=>removeReminder(i)} /></li>
                  );
                })
              }
            </ul>
        </div>
                <div className="card-form-submit">
                    <button type="submit">Add Event</button>
                </div>
      </form>
  );
}
