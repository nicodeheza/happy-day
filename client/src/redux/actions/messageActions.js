import { SET_MESSAGE } from "../const/messageConst";

export const setMessage=(message)=>(dispatch)=>{
    dispatch({
        type: SET_MESSAGE,
        payload: message
    });
}