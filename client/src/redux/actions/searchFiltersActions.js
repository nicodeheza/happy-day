import { SET_SEARCH_FILTERS } from "../const/searchfiltersConst";

export const setSearchfilters=(filters)=>(dispatch)=>{

    dispatch({
        type: SET_SEARCH_FILTERS,
        payload: filters
    });
}