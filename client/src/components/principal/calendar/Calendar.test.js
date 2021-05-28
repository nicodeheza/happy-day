import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer,{act} from 'react-test-renderer';
import Calendar from './Calendar';
import {principalContext} from '../Principal';
import data from './data';


describe("<Calendar/>",()=>{
    global.fetch= jest.fn();
    const setShowCard= jest.fn();
    const setUpdateCalendar= jest.fn();
    const setEdit= jest.fn();
    beforeEach(()=>{
        fetch.mockClear();
        setShowCard.mockClear();
        setUpdateCalendar.mockClear();
        setEdit.mockClear();
    });

    it("if not events render message", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve({})});
        });
        const calendar= render(
            <principalContext.Provider value={{
                updateCalendar: false,
                setUpdateCalendar,
                setEdit,
                searchFilters: {}
            }}>
                <Calendar setShowCard={setShowCard} showCard={'none'}/>
            </principalContext.Provider>
        );

        const message= await waitFor(()=>calendar.findByText("You don't have any event")); 
        expect(message).toBeInTheDocument();
    });
    it("if have events render events",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        let component
        await act(async()=>{
        component= renderer
        .create(   <principalContext.Provider value={{
            updateCalendar: false,
            setUpdateCalendar,
            setEdit,
            searchFilters: {}
        }}>
            <Calendar setShowCard={setShowCard} showCard={'none'}/>
        </principalContext.Provider>);

        });
        
        const tree= component.toJSON();
        expect(tree).toMatchSnapshot();

    });


    it("edit when click in an event", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        const calendar= render(
            <principalContext.Provider value={{
                updateCalendar: false,
                setUpdateCalendar,
                setEdit,
                searchFilters: {}
            }}>
                <Calendar setShowCard={setShowCard} showCard={'none'}/>
            </principalContext.Provider>
        );
       
        const event= await calendar.findByText(new RegExp('lololo'));
        fireEvent.click(event.parentNode);

        expect(event.parentNode).toHaveStyle('background-color: white')

        expect(setEdit).toBeCalledTimes(1);
        expect(setEdit).toBeCalledWith(data[1][1][0]);
        expect(setShowCard).toBeCalledWith('edit');

    });
    it("search by name",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        const calendar= render(
            <principalContext.Provider value={{
                updateCalendar: false,
                setUpdateCalendar,
                setEdit,
                searchFilters: {
                    from:'',
                    to:'',
                    name: 'abril',
                    type: 'any'
                }
            }}>
                <Calendar setShowCard={setShowCard} showCard={'none'}/>
            </principalContext.Provider>
        );

        const targetEvent= await calendar.findByText(new RegExp('abril'));
        expect(targetEvent).toBeInTheDocument();

        expect(calendar.container.querySelectorAll('p')).toHaveLength(1);

    });
    it("search by date", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve(data)});
        });
        const calendar= render(
            <principalContext.Provider value={{
                updateCalendar: false,
                setUpdateCalendar,
                setEdit,
                searchFilters: {
                    from:'05/07',
                    to:'10/25',
                    name: '',
                    type: 'any'
                }
            }}>
                <Calendar setShowCard={setShowCard} showCard={'none'}/>
            </principalContext.Provider>
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
        const calendar= render(
            <principalContext.Provider value={{
                updateCalendar: false,
                setUpdateCalendar,
                setEdit,
                searchFilters: {
                    from:'',
                    to:'',
                    name: '',
                    type: 'anniversary'
                }
            }}>
                <Calendar setShowCard={setShowCard} showCard={'none'}/>
            </principalContext.Provider>
        );

        await calendar.findAllByText(new RegExp('anniversary', 'i'));
        expect(calendar.queryByText(new RegExp('birthday','i'))).toBeNull();
    });
});