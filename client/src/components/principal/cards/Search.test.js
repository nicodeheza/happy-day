import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';
import {Provider} from 'react-redux';
import generateStore from '../../../redux/store';

describe("<Serach/>",()=>{
 
    const store= generateStore();


    it("set search filter",()=>{

        const search= render(
            <Provider store={store}>
                <Search/>
            </Provider>
        );
        const filds={
            from:'02/20',
            to:'05/20',
            name: 'Test',
            type: 'birthday'
        }
        fireEvent.change(search.getByLabelText('From'), {target:{value: filds.from}});
        fireEvent.change(search.getByLabelText('To'), {target:{value: filds.to}});
        fireEvent.change(search.getByLabelText('Name'), {target:{value: filds.name}});
        fireEvent.change(search.getByLabelText('Type'), {target:{value: filds.type}});
        fireEvent.click(search.getByText('Search'));

        const searchFilters= store.getState().searchFilters.filters;
        expect(searchFilters).toMatchObject(filds);

        const showCard= store.getState().showCard.card;
        expect(showCard).toBe('none');

    });
});