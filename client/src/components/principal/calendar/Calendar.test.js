import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer,{act} from 'react-test-renderer';
import Calendar from './Calendar';
import data from './data';
import {Provider} from 'react-redux';
import generateStore from '../../../redux/store';
import { UPDATE_CALENDAR } from '../../../redux/const/udateCalendarConst';
import { SET_SEARCH_FILTERS } from '../../../redux/const/searchfiltersConst';
import { SHOW_NONE } from '../../../redux/const/showCardConst';


describe("<Calendar/>",()=>{
    global.fetch= jest.fn();
    const store= generateStore();

    beforeEach( ()=>{
        fetch.mockClear();
        store.dispatch({type: UPDATE_CALENDAR, payload: false});
        store.dispatch({type:SET_SEARCH_FILTERS, payload: {}});
        store.dispatch({type: SHOW_NONE, payload: 'none'});

    });

    it("if not events render message", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve({})});
        });

        const calendar= render(
            <Provider store={store} >
                <Calendar/>
            </Provider>
        );

        const message= await waitFor(()=>calendar.findByText("You don't have any event")); 
        expect(message).toBeInTheDocument();
    });
    
    it("if have events render events",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        let component;

        await act(async()=>{
            component=  renderer
            .create(   
            <Provider store={store} >
                <Calendar />
            </Provider>
            );
        });
        
        const tree= component.toJSON();
        expect(tree).toMatchSnapshot();

        component.unmount();

    });


    it("edit when click in an event", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });

        const calendar= render(
            <Provider store={store}>
                <Calendar/>
            </Provider>
        );
       
        const event= await calendar.findByText(new RegExp('lololo'));
        fireEvent.click(event.parentNode);

        expect(event.parentNode).toHaveStyle('background-color: white');

        const edit= store.getState().edit.event;
        const showCard= store.getState().showCard.card;
        expect(edit).toBe(data[1][1][0]);
        expect(showCard).toBe('edit');

    });
    it("search by name",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        store.dispatch({type:SET_SEARCH_FILTERS, payload:{
            from:'',
             to:'',
            name: 'abril',
            type: 'any'
        }});

        const calendar= render(
            <Provider store={store}>
                <Calendar/>
            </Provider>
        );

        const targetEvent= await calendar.findByText(new RegExp('abril'));
        expect(targetEvent).toBeInTheDocument();

        expect(calendar.container.querySelectorAll('p')).toHaveLength(1);

    });
    it("search by date", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });

        store.dispatch({type:SET_SEARCH_FILTERS, payload:{
            from:'05/07',
            to:'10/25',
            name: '',
            type: 'any'
        }});

        const calendar= render(
            <Provider store={store}>
                <Calendar />
            </Provider>
        );


        const may= await calendar.findByText('May');
        expect(may).toBeInTheDocument();

        const oct= await calendar.findByText('October');
        expect(oct).toBeInTheDocument();
        calendar.getByText('July');
        calendar.getByText('August');
        calendar.getByText('September');

        expect(calendar.queryByText('April')).toBeNull();
        expect(calendar.queryByText('March')).toBeNull();
        expect(calendar.queryByText('February')).toBeNull();
        expect(calendar.queryByText('January')).toBeNull();
        expect(calendar.queryByText('November')).toBeNull();
        expect(calendar.queryByText('December')).toBeNull();
        
        //console.log(prettyDOM(oct.parentElement.parentElement));
        expect(may.parentElement.parentElement).toContainHTML('<h2 style="color: rgb(105, 213, 3);">7</h2>');
        expect(may.parentElement.parentElement).not.toContainHTML('<h2 style="color: rgb(105, 213, 3);">6</h2>');
        expect(oct.parentElement.parentElement).toContainHTML('<h2 style="color: rgb(253, 97, 38);">25</h2>');
        expect(oct.parentElement.parentElement).not.toContainHTML('<h2 style="color: rgb(253, 97, 38);">30</h2>');

    });
    it("search by type", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        store.dispatch({type:SET_SEARCH_FILTERS, payload:{
            from:'',
            to:'',
            name: '',
            type: 'anniversary'
        }});
    
        const calendar= render(
            <Provider store={store}>
                <Calendar />
            </Provider>
        );

        await calendar.findAllByText(new RegExp('anniversary', 'i'));
        expect(calendar.queryByText(new RegExp('birthday','i'))).toBeNull();
    });
});