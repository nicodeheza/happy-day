import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducer/authReducer';
import editReducer from './reducer/editReducer';
import emailNotificationReducer from './reducer/emailNotificationReducer';
import messageReducer from './reducer/messageReducer';
import searchFilterReducer from './reducer/searchFilterReducer';
import showCardReducer from './reducer/showCardReducer';
import updateCalendarReducer from './reducer/updateCalendarReducer';

const rootReducer= combineReducers({
     auth: authReducer,
     updateCalendar: updateCalendarReducer,
     edit: editReducer,
     showCard: showCardReducer,
     message: messageReducer,
     searchFilters: searchFilterReducer,
     emailNotification: emailNotificationReducer
});

export default function generateStore(){
    const store= createStore(rootReducer, compose(applyMiddleware(thunk)));
    return store;
}
