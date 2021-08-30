import { SET_EDIT } from "../const/editConst";

export const setEdit=(eventData)=> (dispatch)=>{

    dispatch({
        type: SET_EDIT,
        payload: eventData
    })
}