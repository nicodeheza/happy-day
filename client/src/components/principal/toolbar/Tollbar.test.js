import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toolbar from './Toolbar';
import {Provider} from 'react-redux';
import generateStore from '../../../redux/store';
import { SET_AUTH } from '../../../redux/const/authConst';

describe("<Toolbar/>",()=>{
    global.fetch= jest.fn();
    const store= generateStore();
   
    beforeEach(()=>{
        fetch.mockClear();
    });
    it("logOut",async ()=>{
        store.dispatch({type:SET_AUTH, payload: true});
        fetch.mockImplementation(()=>{
            return Promise.resolve({json: () => Promise.resolve({auth:false})});
        });
        const toolbar= render(
            <Provider store={store}>
            <Toolbar />
            </Provider>
        );
        const logOutBtn= toolbar.getByAltText('logout icon').parentNode;
        fireEvent.click(logOutBtn);
        await waitFor(()=>expect(fetch).toBeCalledTimes(1));
        const auth= store.getState().auth.authData;
        expect(auth).toBe(false);
    });
    it("search",()=>{
        const toolbar= render(
            <Provider store={store}>
            <Toolbar/>
            </Provider>
        );
        const searchBtn= toolbar.getByAltText('search icon').parentNode;
        fireEvent.click(searchBtn);
        const showCard= store.getState().showCard.card;
        expect(showCard).toBe('search');
    });
    it("add",()=>{
        const toolbar= render(
            <Provider store={store}>
            <Toolbar/>
            </Provider>
        );
        const addBtn= toolbar.getByAltText('add icon').parentNode;
        fireEvent.click(addBtn);
        const showCard= store.getState().showCard.card;
        expect(showCard).toBe('add');
    });
    it("settings",()=>{
        const toolbar= render(
            <Provider store={store}>
            <Toolbar/>
            </Provider>
        );
        const settingsBtn= toolbar.getByAltText('settings icon').parentNode;
        fireEvent.click(settingsBtn);

        const showCard= store.getState().showCard.card;
        expect(showCard).toBe('settings');
    });
    it("help",()=>{
        const toolbar= render(
            <Provider store={store}>
            <Toolbar/>
            </Provider>
        );
        const helpBtn= toolbar.getByAltText('help icon');
        fireEvent.click(helpBtn);

        const showCard= store.getState().showCard.card;
        expect(showCard).toBe('help');
    });
});