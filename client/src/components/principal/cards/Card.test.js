import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';
import {Provider} from 'react-redux';
import generateStore from '../../../redux/store';
import { SHOW_ADD, SHOW_EDIT, SHOW_HELP, SHOW_NONE, SHOW_SEARCH, SHOW_SETTINGS } from '../../../redux/const/showCardConst';
jest.mock('./Add', ()=>()=>(<div>Add card</div>));
jest.mock('./Search', ()=>()=>(<div>Search card</div>));
jest.mock('./Settings', ()=>()=>(<div>Settings card</div>));
jest.mock('./Help', ()=>()=>(<div>Help card</div>));
jest.mock('./Edit', ()=>()=>(<div>Edit card</div>));

describe("<Card/>", ()=>{
    const store= generateStore();

    it("if showCard is none card must be closed",()=>{

        store.dispatch({type: SHOW_NONE, payload: 'none'});

        const card= render(
        <Provider store={store} >
        <Card />
        </Provider>
        );
        const container= card.container.firstChild;
        expect(container).toHaveClass("off");

    });
    it("if showCard is add show add",()=>{
        store.dispatch({type:SHOW_ADD, payload: 'add' });
        const card= render(
        <Provider store={store}>
        <Card />
        </Provider>
        );
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        card.getByText('Add Event');
        card.getByText('Add card');

    });
    it("if showCard is Search show Search",()=>{
        store.dispatch({type:SHOW_SEARCH, payload: 'search' });
        const card= render(
        <Provider store={store}>
        <Card />
        </Provider>
        );
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        card.getByText('Search Event');
        card.getByText('Search card');
    });
    it("if showCard is settings show settings",()=>{
        store.dispatch({type:SHOW_SETTINGS, payload: 'settings' });
        const card= render(
        <Provider store={store}>
        <Card />
        </Provider>
        );
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        const h3=card.container.querySelector('h3');
        expect(h3).toHaveTextContent('Settings');
        card.getByText('Settings card');
    });
    it("if showCard is help show help",()=>{
        store.dispatch({type:SHOW_HELP, payload: 'help' });
        const card= render(
        <Provider store={store}>
        <Card />
        </Provider>
        );
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        const h3=card.container.querySelector('h3');
        expect(h3).toHaveTextContent('Help');
        card.getByText('Help card');
    });
    it("if showCard is edit show edit",()=>{
        store.dispatch({type:SHOW_EDIT, payload: 'edit' });
        const card= render(
        <Provider store={store}>
        <Card />
        </Provider>
        );
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        const h3=card.container.querySelector('h3');
        expect(h3).toHaveTextContent('Edit Event');
        card.getByText('Edit card');
    });
    it("on close click setShowCard none",()=>{
        store.dispatch({type:SHOW_EDIT, payload: 'edit' });
        const card= render(
        <Provider store={store}>
        <Card />
        </Provider>
        );
        const closeBtn= card.getByAltText("close card");
        fireEvent.click(closeBtn);
      
        const showCard= store.getState().showCard.card;
        expect(showCard).toBe('none');
    });
});