import React, { useContext, useEffect, useState } from "react";
import './cards.css';
import{principalContext} from '../Principal';
//import {authContext} from '../../../App';
import { setAuth } from "../../../redux/actions/authActions";
import { useDispatch } from "react-redux";

const abrMonths = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function Edit() {

  //const setAuth= useContext(authContext);
  const dispatch= useDispatch();
  const {setUpdateCalendar, edit, showCard, setShowCard, setMessage}= useContext(principalContext);

  const [formFields, setFormFields]= useState({
    event:edit.type,
    type: edit.AnniversaryType,
    day: new Date(edit.date).getDate(),
    month:abrMonths[new Date(edit.date).getMonth()],
    year: new Date(edit.date).getFullYear() > 9000 ? '' :  new Date(edit.date).getFullYear(),
    personName:edit.personName,
    reminders:edit.reminders
  });
  
  //add info in fields
  useEffect(()=>{
      setFormFields({
        event:edit.type,
        type: edit.AnniversaryType,
        day: new Date(edit.date).getDate(),
        month:abrMonths[new Date(edit.date).getMonth()],
        year: new Date(edit.date).getFullYear() > 9000 ? '' :  new Date(edit.date).getFullYear(),
        personName:edit.personName,
        reminders:edit.reminders
      });
  },[edit,showCard]);

  const[reminder, setReminder]= useState({
    timeBefore:'same-day',
    numBefore:''
  });

  const addReminder=(e)=>{
    e.preventDefault();

    let newReminder={
      name:'',
      date:'',
    }

    switch (reminder.timeBefore) {
      case 'same-day':
        newReminder.name= 'The Same Day';
        break;
      case 'days-before':
        newReminder.name= `${reminder.numBefore} Days Before`;
        break;
      case 'weeks-before':
        newReminder.name= `${reminder.numBefore} Weeks Before`
        break; 
    
      default:
        break;
    }

    let remindersArry= [...formFields.reminders];
    remindersArry.push(newReminder);

    setFormFields({...formFields, reminders: remindersArry});
  }

  const removeReminder=(i)=>{
    let remindersArry= [...formFields.reminders];
    let ele= remindersArry.splice(i, 1);
    if(formFields.removeReminders){
      let rr=formFields.removeReminders;
      rr.push(ele[0]._id);
      setFormFields({...formFields, reminders:remindersArry, removeReminders: rr});
    }else{
      setFormFields({...formFields, reminders:remindersArry, removeReminders: [ele[0]._id]});
    }
  }

  const submit=(e)=>{
    e.preventDefault();
     setMessage("");
    let submitForm={
      event:formFields.event,
      type: formFields.event === "birthday"? '' : formFields.type,
      date: new Date(`${formFields.month} ${formFields.day} ${formFields.year === '' ? '9999' : formFields.year}`),
      personName: formFields.personName,
      reminders:[],
      removeReminders: formFields.removeReminders ? formFields.removeReminders : [],
      _id: edit._id
    }

    const submitReminders= formFields.reminders.map((ele)=>{
  
      let eleR={name: ele.name,
        event: edit._id,
        date: ele.date ? ele.date : null,
        _id: ele._id ? ele._id : null
      };
      if(! eleR.date){
        if(ele.name === 'The Same Day'){
          eleR.date= submitForm.date;
        }else{
          const dateSub= ele.name.split(' ',2);
          let dateInMs= submitForm.date.getTime();
          const oneDay=1000*60*60*24;
          const oneWeek= oneDay * 7;
          if(dateSub[1]==='Days'){
            eleR.date= new Date(dateInMs - oneDay * dateSub[0]);
          }else{
            eleR.date= new Date(dateInMs - oneWeek * dateSub[0]);
          }
        }
      }
      return eleR;
    });

    submitForm ={...submitForm, reminders: submitReminders};

    fetch('http://localhost:4000/api/edit',{
                method:'PUT',
                body: JSON.stringify(submitForm),
                headers:{"Content-type": "application/json; charset=UTF-8"},
                credentials: 'include'
            })
            .then(res=> res.json())
            .then(data=>{
              if(data.auth === false){
                //setAuth(data.auth);
                dispatch(setAuth(data.auth));
              }else{
                setMessage(data.message);
                if(data.message ==="Event Edited"){
                  setUpdateCalendar(true);
                }
              }
                //console.log("fetch edit.js edit");
              })
            .catch(err => console.log(err));

            setShowCard('none');
  }

  const deleteEvent=(e)=>{
    e.preventDefault();
    setMessage("");
    //console.log('delete');
    const eventToDelete={
      eventId: edit._id,
      remindersId:[]
  }

  edit.reminders.forEach(ele=>{
    eventToDelete.remindersId.push(ele._id);
  });

  fetch('http://localhost:4000/api/delete',{
    method:'DELETE',
    body: JSON.stringify(eventToDelete),
    headers:{"Content-type": "application/json; charset=UTF-8"},
    credentials: 'include'
  })
  .then(res=> res.json())
  .then(data=>{
    if(data.auth === false){
      //setAuth(data.auth);
      dispatch(setAuth(data.auth));
    }else{
      setMessage(data.message);
      setUpdateCalendar(true);
    }
   // console.log("fetch edit.js delete");
    
    })
  .catch(err => console.log(err));  
  setShowCard('none');

  } 

  return (
   
      <form className="card-form" onSubmit={(e)=>submit(e)}>

        <div className="grup">
          <div className="label">
            <label htmlFor="editEvent">Event</label>
            <select name="editEvent" id="editEvent" onChange={(e)=>setFormFields({...formFields, event:e.target.value})} 
            value={formFields.event} required>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>

          {formFields.event === 'anniversary' ?
          ( <div className="label">
          <label htmlFor="editType">Type</label>
          <input type="text" name="editType" id="editType"  onChange={(e)=>setFormFields({...formFields, type: e.target.value})}
          value={formFields.type}/>
        </div>) : (null)}
         

        </div>

        <div className="grup" >
            <div className="label">
              <label htmlFor="editDay">Day</label>
              <input className="day" type="number" name="editDay" id="editDay" min="1" max="31" step="1" 
              onChange={(e)=>setFormFields({...formFields, day:e.target.value})} 
              value={formFields.day} required/>
            </div>
            <div className="label">
              <label htmlFor="editMonth">Month</label>
              <select name="editMonth" id="editMonth" onChange={(e)=>setFormFields({...formFields, month:e.target.value})} 
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
              <label htmlFor="editYear">Year</label>
              <input className="year" type="number"name="editYear" id="editYear" placeholder="any" max="9999"
              onChange={e=>setFormFields({...formFields, year:e.target.value})}
              value={formFields.year}/>
            </div>
        </div>

        <div className="label">
            <label htmlFor="editName">Name</label>
            <input type="text" name="editName" id="editName" onChange={e=>setFormFields({...formFields, personName: e.target.value})} 
            value={formFields.personName} required/>
        </div>

        <div className="grup">
            <div className="grup">
            <label htmlFor="time-before-edit">Add Reminders</label>
            <select name="time-before-edit" id="time-before-edit" onChange={e=>setReminder({...reminder, timeBefore:e.target.value})} 
            value={reminder.timeBefore} >
                <option value="same-day">The Same Day</option>
                <option value="days-before">Days Before</option>
                <option value="weeks-before">Weeks Before</option>
            </select>
            {reminder.timeBefore !== "same-day" ?
            (<input className="a-r-n" type="number" name="num-before" min="1" step="1" data-testid="num-before-test"
            onChange={e=>setReminder({...reminder, numBefore: e.target.value})}
            value={reminder.numBefore}/>) : (null)}
            
            <button className="a-r-b" onClick={(e)=>addReminder(e)}>Add</button>
            </div>
            <ul className="reminders">

              {
                formFields.reminders.map((ele,i)=>{
                  return(
                    <li key={i}>{ele.name} <img src="img/drop.svg" alt="drop" onClick={()=>removeReminder(i)} /></li>
                  );
                })
              }
            </ul>
        </div>
                <div className="card-form-submit drop">
                    <button type="submit">Edit Event</button>
                    <button className="btn-drop" onClick={(e)=> deleteEvent(e)}>
                    <svg className="btn-drop-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.18 13.92">
                      <defs></defs>
                      <title>drop</title>
                      <g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2">
                        <path className="cls-1" d="M.87,12.61a1.31,1.31,0,0,0,1.3,1.31H10a1.31,1.31,0,0,0,1.31-1.31h0V3.48H.87Zm7.39-7a.44.44,0,0,1,.44-.43.43.43,0,0,1,.43.43v6.09a.44.44,0,0,1-.43.44.44.44,0,0,1-.44-.44Zm-2.61,0a.44.44,0,0,1,.44-.43.43.43,0,0,1,.43.43v6.09a.44.44,0,0,1-.43.44.44.44,0,0,1-.44-.44ZM3,5.65a.44.44,0,0,1,.44-.43.43.43,0,0,1,.43.43v6.09a.44.44,0,0,1-.43.44A.44.44,0,0,1,3,11.74ZM11.74.87H8.48L8.23.36A.66.66,0,0,0,7.64,0H4.53A.66.66,0,0,0,4,.36L3.7.87H.43A.43.43,0,0,0,0,1.3v.87a.44.44,0,0,0,.43.44H11.74a.44.44,0,0,0,.44-.44V1.3A.44.44,0,0,0,11.74.87Z"/>
                        </g></g>
                      </svg>
                    </button>
                </div>
      </form>
  );
}
