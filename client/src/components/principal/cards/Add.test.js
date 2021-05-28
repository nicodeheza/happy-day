import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Add from './Add';
import{principalContext} from '../Principal';

describe("<Add/>",()=>{
    global.fetch= jest.fn();
    const setUpdateCalendar= jest.fn();
    const setMessage= jest.fn();

    beforeEach(()=>{
        fetch.mockClear();
        setUpdateCalendar.mockClear();
        setMessage.mockClear();
    });
    it("add birthday with reminder", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({message: "event Added"})});
        });
        const newEvent={
            event: 'birthday',
            day: 5,
            month: 'Jul',
            year: 1999,
            name: 'Test'
        }
        const newReminder={
            timeBefore: 'days-before',
            numBefore: 2
        }
        const add= render(
            <principalContext.Provider value={{
                setUpdateCalendar,
                setMessage
            }}>
                <Add/>
            </principalContext.Provider>
                );

       fireEvent.change(add.getByLabelText('Event'), {target:{value: newEvent.event}});
       expect(add.queryByLabelText('Type')).toBeNull();
       fireEvent.change(add.getByLabelText('Day'), {target:{value: newEvent.day}});
       fireEvent.change(add.getByLabelText('Month'), {target:{value: newEvent.month}});
       fireEvent.change(add.getByLabelText('Year'), {target:{value: newEvent.year}});
       fireEvent.change(add.getByLabelText('Name'), {target:{value: newEvent.name}});

       fireEvent.change(add.getByLabelText('Add Reminders'), {target:{value: newReminder.timeBefore}});
       fireEvent.change(add.getByTestId('numBefore'), {target:{value: newReminder.numBefore}});
       fireEvent.click(add.getByText('Add'));
       add.getByText("2 Days Before");

       fireEvent.click(add.getByText('Add Event'));

       await waitFor(()=>fetch);
       expect(fetch).toBeCalledTimes(1);
       expect(fetch).toBeCalledWith(expect.any(String), {"body": "{\"event\":\"birthday\",\"type\":\"\",\"date\":\"1999-07-05T03:00:00.000Z\",\"personName\":\"Test\",\"reminders\":[{\"title\":\"The Same Day\",\"date\":\"1999-07-05T03:00:00.000Z\"},{\"title\":\"2 Days Before\",\"date\":\"1999-07-03T03:00:00.000Z\"}]}", "credentials": "include", "headers": {"Content-type": "application/json; charset=UTF-8"}, "method": "POST"});
       expect(setUpdateCalendar).toBeCalledTimes(1);
       expect(setUpdateCalendar).toBeCalledWith(true);
       expect(setMessage).toBeCalledTimes(2);
       expect(setMessage).toBeCalledWith('event Added');

    });
    it("add Anniversary with reminder",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({message: "event Added"})});
        });
        const newEvent={
            event: 'anniversary',
            type: 'graduation',
            day: 5,
            month: 'Jul',
            year: 1999,
            name: 'Test'
        }
        const newReminder={
            timeBefore: 'days-before',
            numBefore: 2
        }
        const add= render(
            <principalContext.Provider value={{
                setUpdateCalendar,
                setMessage
            }}>
                <Add/>
            </principalContext.Provider>
                );

       fireEvent.change(add.getByLabelText('Event'), {target:{value: newEvent.event}});
       fireEvent.change(add.getByLabelText('Type'), {target:{value: newEvent.type}});
       fireEvent.change(add.getByLabelText('Day'), {target:{value: newEvent.day}});
       fireEvent.change(add.getByLabelText('Month'), {target:{value: newEvent.month}});
       fireEvent.change(add.getByLabelText('Year'), {target:{value: newEvent.year}});
       fireEvent.change(add.getByLabelText('Name'), {target:{value: newEvent.name}});

       fireEvent.change(add.getByLabelText('Add Reminders'), {target:{value: newReminder.timeBefore}});
       fireEvent.change(add.getByTestId('numBefore'), {target:{value: newReminder.numBefore}});
       fireEvent.click(add.getByText('Add'));
       add.getByText("2 Days Before");

       fireEvent.click(add.getByText('Add Event'));

       await waitFor(()=>fetch);

       expect(fetch).toBeCalledTimes(1);
       expect(fetch).toBeCalledWith(expect.any(String), {"body": "{\"event\":\"anniversary\",\"type\":\"graduation\",\"date\":\"1999-07-05T03:00:00.000Z\",\"personName\":\"Test\",\"reminders\":[{\"title\":\"The Same Day\",\"date\":\"1999-07-05T03:00:00.000Z\"},{\"title\":\"2 Days Before\",\"date\":\"1999-07-03T03:00:00.000Z\"}]}", "credentials": "include", "headers": {"Content-type": "application/json; charset=UTF-8"}, "method": "POST"});
       expect(setUpdateCalendar).toBeCalledTimes(1);
       expect(setUpdateCalendar).toBeCalledWith(true);
       expect(setMessage).toBeCalledTimes(2);
       expect(setMessage).toBeCalledWith('event Added');
    });
    it("add and delete reminders",()=>{
        const newReminder={
            timeBefore: 'days-before',
            numBefore: 2
        }
        const add= render(
            <principalContext.Provider value={{
                setUpdateCalendar,
                setMessage
            }}>
                <Add/>
            </principalContext.Provider>
                );

       fireEvent.change(add.getByLabelText('Add Reminders'), {target:{value: newReminder.timeBefore}});
       fireEvent.change(add.getByTestId('numBefore'), {target:{value: newReminder.numBefore}});
       fireEvent.click(add.getByText('Add'));
       add.getByText("2 Days Before");

        fireEvent.click(add.getAllByAltText('drop')[1]);
        expect(add.queryByText('2 Days Before')).toBeNull();
        expect(add.getAllByAltText('drop')).toHaveLength(1);

    });
});