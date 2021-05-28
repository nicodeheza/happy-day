import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';
import{principalContext} from '../Principal';

describe("<Serach/>",()=>{
    const setSearchFilters= jest.fn();
    const setShowCard= jest.fn();
    beforeEach(()=>{
        setSearchFilters.mockClear();
        setShowCard.mockClear();
    });

    it("set search filter",()=>{
        const search= render(
            <principalContext.Provider value={{
                setSearchFilters,
                setShowCard
            }}>
                <Search/>
            </principalContext.Provider>
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

        expect(setSearchFilters).toBeCalledTimes(1);
        expect(setSearchFilters).toBeCalledWith(filds);
        expect(setShowCard).toBeCalledWith('none');

    });
});