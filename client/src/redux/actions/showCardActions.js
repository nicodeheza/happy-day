import { SHOW_HELP, SHOW_NONE, SHOW_EDIT, SHOW_ADD, SHOW_SEARCH, SHOW_SETTINGS } from "../const/showCardConst";

export const showHelp=()=>(dispatch)=>{
    dispatch({
        type: SHOW_HELP,
        payload: "help"
    });
}

export const showNone=()=>(dispatch)=>{
    dispatch({
        type: SHOW_NONE,
        payload: "none"
    });
}

export const showEdit=()=>(dispatch)=>{
    dispatch({
        type: SHOW_EDIT,
        payload: "edit"
    });
}

export const showAdd=()=>(dispatch)=>{
    dispatch({
        type: SHOW_ADD,
        payload: "add"
    });
}

export const showSearch=()=>(dispatch)=>{
    dispatch({
        type: SHOW_SEARCH,
        payload: "search"
    });
}

export const showSettings=()=>(dispatch)=>{
    dispatch({
        type: SHOW_SETTINGS,
        payload: "settings"
    });
}