import React, { useContext } from "react";
import {principalContext} from '../Principal';

export default function Settings() {

  const{emailNotification, setEmailNotification} = useContext(principalContext);

  const emailNotificationSettings=()=>{
    setEmailNotification(prev=> !prev);

    fetch('http://localhost:4000/api/emailNotification',{
        method:'PUT',
        headers:{"Content-type": "application/json; charset=UTF-8"},
        credentials: 'include'
    })
    .then(res=> res.json())
    .then(data=>{
     // setEmailNotification(data.mailNotification);
      console.log(data);
    })
    .catch(err => console.log(err));
  }


  return (
    <div className="card-form">

      <div className="label-st">
        <label htmlFor="emial">Email Notifications</label>
        <div className="switch-btn-container">
            <p>on/off</p>
        <div className="switch-btn"  name="email" onClick={()=>emailNotificationSettings()}>
            <div className={emailNotification ? "switch-btn-int" : "switch-btn-int eOff"}/>
        </div>
        </div>
      </div>

      <div className="label">
      <label htmlFor="browser">Browser Notifications</label>
      <button className="a-r-b" style={{padding: "5px 10px"}}>Activate</button>
      </div>

    </div>
  );
}
