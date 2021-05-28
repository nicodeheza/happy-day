import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toolbar from './Toolbar';
import {authContext} from '../../../App';

describe("<Toolbar/>",()=>{
    global.fetch= jest.fn();
    const setShowCard= jest.fn();
    const setAuth= jest.fn();
    beforeEach(()=>{
        fetch.mockClear();
        setShowCard.mockClear();
        setAuth.mockClear();
    });
    it("logOut",()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve({auth:false})});
        });
        const toolbar= render(
            <authContext.Provider value={setAuth}>
            <Toolbar setShowCard={setShowCard}/>
            </authContext.Provider>
        );
        const logOutBtn= toolbar.getByAltText('logout icon').parentNode;
        fireEvent.click(logOutBtn);
        expect(fetch).toBeCalled();
    });
    it("search",()=>{
        const toolbar= render(
            <authContext.Provider value={setAuth}>
            <Toolbar setShowCard={setShowCard}/>
            </authContext.Provider>
        );
        const searchBtn= toolbar.getByAltText('search icon').parentNode;
        fireEvent.click(searchBtn);
        expect(setShowCard).toBeCalled();
        expect(setShowCard).toBeCalledWith('search');
    });
    it("add",()=>{
        const toolbar= render(
            <authContext.Provider value={setAuth}>
            <Toolbar setShowCard={setShowCard}/>
            </authContext.Provider>
        );
        const addBtn= toolbar.getByAltText('add icon').parentNode;
        fireEvent.click(addBtn);
        expect(setShowCard).toBeCalled();
        expect(setShowCard).toBeCalledWith('add');
    });
    it("settings",()=>{
        const toolbar= render(
            <authContext.Provider value={setAuth}>
            <Toolbar setShowCard={setShowCard}/>
            </authContext.Provider>
        );
        const settingsBtn= toolbar.getByAltText('settings icon').parentNode;
        fireEvent.click(settingsBtn);
        expect(setShowCard).toBeCalled();
        expect(setShowCard).toBeCalledWith('settings');
    });
    it("help",()=>{
        const toolbar= render(
            <authContext.Provider value={setAuth}>
            <Toolbar setShowCard={setShowCard}/>
            </authContext.Provider>
        );
        const helpBtn= toolbar.getByAltText('help icon');
        fireEvent.click(helpBtn);
        expect(setShowCard).toBeCalled();
        expect(setShowCard).toBeCalledWith('help');
    });
});