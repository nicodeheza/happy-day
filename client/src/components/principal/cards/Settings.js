import React, { useContext } from "react";
import {principalContext} from '../Principal';
import {
  isPushNotificationSupported,
  registerServiceWorker,
  askUserPermission,
  createNotificationSubscription,
  postSubscription
} from '../../../push-notifications'

export default function Settings() {

  const{emailNotification, setEmailNotification, setMessage} = useContext(principalContext);

  const emailNotificationSettings=()=>{
    setEmailNotification(prev=> !prev);

    fetch('http://localhost:4000/api/emailNotification',{
        method:'PUT',
        headers:{"Content-type": "application/json; charset=UTF-8"},
        credentials: 'include'
    })
    .then(res=> res.json())
    .then(data=>{
      console.log(data);
    })
    .catch(err => console.log(err));
  }

  const activateBnotification= async ()=>{

    try {
      if(isPushNotificationSupported()){
        registerServiceWorker();
        const permission= await askUserPermission();
      
        if(permission === 'granted'){
          const subscription= await createNotificationSubscription();
          const res= await postSubscription(subscription);
          setMessage('Notifications Activated');
          console.log(res)
        }else{
          setMessage("Something went wrong, check your browser's notification settings and try again");
        }
  
      } else{
        setMessage('Notifications are not supported by your browser');
      } 
      
    } catch (error) {
      if(error)console.log(error);
    }

  }


  return (
    <div className="card-form">

      <div className="label-st">
        <label htmlFor="emialSettings">Email Notifications</label>
        <div className="switch-btn-container">
            <p>on/off</p>
        <div className="switch-btn" name="emialSettings" data-testid="emialSettings" onClick={()=>emailNotificationSettings()}>
            <div className={emailNotification ? "switch-btn-int" : "switch-btn-int eOff"} />
        </div>
        </div>
      </div>

      <div className="label">
      <label htmlFor="browser">Browser Notifications</label>
      <button className="a-r-b" style={{padding: "5px 10px"}} onClick={()=>activateBnotification()}>Activate</button>
      </div>

    </div>
  );
}
