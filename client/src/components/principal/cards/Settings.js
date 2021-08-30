import React, { useContext } from "react";
import {principalContext} from '../Principal';
import {
  isPushNotificationSupported,
  registerServiceWorker,
  askUserPermission,
  createNotificationSubscription,
  postSubscription
} from '../../../push-notifications';
//import {authContext} from '../../../App';
import { setAuth } from "../../../redux/actions/authActions";
import { useDispatch } from "react-redux";

export default function Settings() {

  //const setAuth= useContext(authContext);
  const dispatch= useDispatch();
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
      if(data.auth === false){
        dispatch(setAuth(data.auth));
      }
      //console.log(data);
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
          if(res.auth === false){
            dispatch(setAuth(res.auth));
          }else{
            setMessage('Notifications Activated');
            console.log(res);
          }
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
