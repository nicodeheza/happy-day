import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Edit from './Edit';
import{principalContext} from '../Principal';

describe("<Edit/>",()=>{
    global.fetch=jest.fn();
    const setUpdateCalendar= jest.fn();
    const showCard= jest.fn(); 
    const setShowCard= jest.fn();
    const setMessage= jest.fn();
    beforeEach(()=>{
        fetch.mockClear();
        setUpdateCalendar.mockClear()
        showCard.mockClear();
        setShowCard.mockClear();
        setMessage.mockClear();
    });
    it("edit event", async ()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve({message: "Event Edited"})});
        });
        const editComponent= render(
            <principalContext.Provider value={{
                edit: {
                            type: 'birthday',
                            AnniversaryType: '',
                            date: new Date('5-4-1999'),
                            personName: 'Test',
                            reminders: [{title: "The Same Day", date: new Date('5-4-1999')}]
                },
                setMessage,
                setUpdateCalendar,
                showCard,
                setShowCard
            }}>
                <Edit/>
            </principalContext.Provider>
        );

       expect(editComponent.getByLabelText('Event')).toHaveValue('birthday');
       expect(editComponent.queryByLabelText('Type')).toBeNull();
       expect(editComponent.getByLabelText('Day')).toHaveValue(4);
       expect(editComponent.getByLabelText('Month')).toHaveValue('May');
       expect(editComponent.getByLabelText('Year')).toHaveValue(1999);
       expect(editComponent.getByLabelText('Name')).toHaveValue('Test');
       editComponent.getByText('The Same Day');

       fireEvent.change(editComponent.getByLabelText('Event'), {target:{value:'anniversary'}});
       fireEvent.change(editComponent.getByLabelText('Type'), {target:{value:'graduation'}});
       fireEvent.change(editComponent.getByLabelText('Day'), {target:{value: 8}});
       fireEvent.change(editComponent.getByLabelText('Month'), {target:{value: 'Jan'}});
       fireEvent.change(editComponent.getByLabelText('Year'), {target:{value: 1988}});
       fireEvent.change(editComponent.getByLabelText('Name'), {target:{value: 'Test edit'}});

       fireEvent.change(editComponent.getByLabelText('Add Reminders'), {target:{value: 'days-before'}});
       fireEvent.change(editComponent.getByTestId('num-before-test'), {targer:{value: 3}});
       fireEvent.click(editComponent.getByText('Add'));

       fireEvent.click(editComponent.getByText('Edit Event'));
       await waitFor(()=>fetch) ;

       expect(fetch).toBeCalledTimes(1);
       expect(fetch).toBeCalledWith(expect.any(String), {"body": "{\"event\":\"anniversary\",\"type\":\"graduation\",\"date\":\"1988-01-08T03:00:00.000Z\",\"personName\":\"Test edit\",\"reminders\":[{\"date\":\"1999-05-04T03:00:00.000Z\",\"_id\":null},{\"name\":\" Days Before\",\"date\":\"1988-01-08T03:00:00.000Z\",\"_id\":null}],\"removeReminders\":[]}",  
       "credentials": "include",
       "headers":{
        "Content-type": "application/json; charset=UTF-8",
       },
       "method": "PUT",
       });
       
      
       expect(setMessage).toBeCalled();
       expect(setMessage).toBeCalledWith('Event Edited');
       expect(setUpdateCalendar).toBeCalledTimes(1);
       expect(setUpdateCalendar).toBeCalledWith(true);

    });


    it("delete reminder",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({message: "Event Edited"})});
        });

        const editComponent= render(
            <principalContext.Provider value={{
                edit: {
                            type: 'birthday',
                            AnniversaryType: '',
                            date: new Date('5-4-1999'),
                            personName: 'Test',
                            reminders: [{title: "The Same Day", date: new Date('5-4-1999'), _id:"id"}]
                },
                setMessage,
                setUpdateCalendar,
                showCard,
                setShowCard
            }}>
                <Edit/>
            </principalContext.Provider>
        );

        fireEvent.click(editComponent.getByAltText('drop'));
        await waitFor(()=>fetch) ;
        expect(editComponent.queryByAltText('drop')).toBeNull();
            //check in fetch 
        fireEvent.click(editComponent.getByText('Edit Event'));
        expect(fetch).toBeCalledWith(expect.any(String), { "body": "{\"event\":\"birthday\",\"type\":\"\",\"date\":\"1999-05-04T03:00:00.000Z\",\"personName\":\"Test\",\"reminders\":[],\"removeReminders\":[\"id\"]}",  
       "credentials": "include",
       "headers":{
        "Content-type": "application/json; charset=UTF-8",
       },
       "method": "PUT",
       });
        
    });
    it("delete event",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({message: "Event deleted"})});
        });
        const editComponent= render(
            <principalContext.Provider value={{
                edit: {
                            type: 'birthday',
                            AnniversaryType: '',
                            date: new Date('5-4-1999'),
                            personName: 'Test',
                            reminders: [{title: "The Same Day", date: new Date('5-4-1999'), _id:"id"}],
                            _id:"eventID"
                },
                setMessage,
                setUpdateCalendar,
                showCard,
                setShowCard
            }}>
                <Edit/>
            </principalContext.Provider>
        );
        fireEvent.click(editComponent.getByTitle('drop').parentNode);
        await waitFor(()=>fetch) ;

        expect(fetch).toBeCalledWith(expect.any(String), {"body": "{\"eventId\":\"eventID\",\"remindersId\":[\"id\"]}",  
       "credentials": "include",
       "headers":{
        "Content-type": "application/json; charset=UTF-8",
       },
       "method": "DELETE",
       });

       expect(setMessage).toBeCalled();
       expect(setMessage).toBeCalledWith('Event deleted');
       expect(setUpdateCalendar).toBeCalledTimes(1);
       expect(setUpdateCalendar).toBeCalledWith(true);

    });
});