import {GET_AUTH, SET_AUTH} from '../const/authConst';

export default function authReducer(state={ authData: undefined }, action){
    switch(action.type){
        case GET_AUTH:
        case SET_AUTH:
            return {...state, authData: action?.payload };
        
        default: return state;
    }
}