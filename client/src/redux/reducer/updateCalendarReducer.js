import { UPDATE_CALENDAR } from "../const/udateCalendarConst";

export default function updateCalendarReducer (state={ update: false }, action){
    switch(action.type){
        case UPDATE_CALENDAR:
            return {...state, update: action.payload }

        default: return state;
    }
}