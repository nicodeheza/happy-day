import { SET_SEARCH_FILTERS } from "../const/searchfiltersConst";

export default function searchFilterReducer(state={filters:{}}, action){
    switch(action.type){
        case SET_SEARCH_FILTERS:
            return {...state, filters: action.payload};
        default: return state;
    }
}