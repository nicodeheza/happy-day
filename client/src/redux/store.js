import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducer/authReducer';
import editReducer from './reducer/editReducer';
import updateCalendarReducer from './reducer/updateCalendarReducer';

const rootReducer= combineReducers({
     auth: authReducer,
     updateCalendar: updateCalendarReducer,
     edit: editReducer
});

export default function generateStore(){
    const store= createStore(rootReducer, compose(applyMiddleware(thunk)));
    return store;
}
