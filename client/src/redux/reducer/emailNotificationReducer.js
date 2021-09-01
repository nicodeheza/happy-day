import { SET_EMAIL_NOTIFICATION, TOGGLE_EMIAL_NOTIFICATION } from "../const/emialNotificationConst";

export default function emailNotificationReducer(state={activate: true}, action ){

    switch(action.type){

        case SET_EMAIL_NOTIFICATION:
            return {...state,  activate: action.payload };
        case TOGGLE_EMIAL_NOTIFICATION:
            return{...state, activate: !state.activate};

        default: return state;
    }
}