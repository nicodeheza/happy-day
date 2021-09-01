import { SET_EMAIL_NOTIFICATION, TOGGLE_EMIAL_NOTIFICATION } from "../const/emialNotificationConst";

export const setEmailNotification=(activate)=>(dispatch)=>{

    dispatch({
        type: SET_EMAIL_NOTIFICATION,
        payload: activate
    });
}

export const toggleEmailNotification= ()=>(dispatch)=>{
    dispatch({type: TOGGLE_EMIAL_NOTIFICATION});
}