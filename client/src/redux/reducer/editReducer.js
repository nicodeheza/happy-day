import { SET_EDIT } from "../const/editConst";

export default function editReducer(state={event:{}}, action){
    switch(action.type){
        case SET_EDIT:
            return {...state, event: action.payload };

        default: return state;
    }
}