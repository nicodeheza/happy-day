import { UPDATE_CALENDAR } from "../const/udateCalendarConst";

export const updateCalendar= (state) => (dispatch)=>{
    dispatch({
        type: UPDATE_CALENDAR,
        payload: state 
    });
}