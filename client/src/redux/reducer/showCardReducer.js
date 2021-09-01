import { SHOW_HELP,  SHOW_NONE, SHOW_EDIT, SHOW_ADD, SHOW_SEARCH, SHOW_SETTINGS } from "../const/showCardConst";

export default function showCardReducer(state={card: 'none'}, action){
    switch(action.type){

        case SHOW_HELP:
        case SHOW_NONE:
        case SHOW_EDIT:
        case SHOW_ADD:
        case SHOW_SEARCH:
        case SHOW_SETTINGS:        
            return {...state, card: action.payload }


        default: return state;
    }
}