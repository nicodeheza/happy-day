import { SET_MESSAGE } from "../const/messageConst";

export default function messageReducer(state={text: ""}, action){

    switch(action.type){
        case SET_MESSAGE:
            return { ...state, text:action.payload };
        default: return state;
    }
}