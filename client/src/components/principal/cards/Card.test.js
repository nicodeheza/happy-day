import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';
jest.mock('./Add', ()=>()=>(<div>Add card</div>));
jest.mock('./Search', ()=>()=>(<div>Search card</div>));
jest.mock('./Settings', ()=>()=>(<div>Settings card</div>));
jest.mock('./Help', ()=>()=>(<div>Help card</div>));
jest.mock('./Edit', ()=>()=>(<div>Edit card</div>));

describe("<Card/>", ()=>{
    const setShowCard= jest.fn();

    beforeEach(()=>{
        setShowCard.mockClear();
    });

    it("if showCard is none card must be closed",()=>{
        const card= render(<Card showCard={'none'} setShowCard={setShowCard} />);
        const container= card.container.firstChild;
        expect(container).toHaveClass("off");

    });
    it("if showCard is add show add",()=>{
        const card= render(<Card showCard={'add'} setShowCard={setShowCard} />);
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        card.getByText('Add Event');
        card.getByText('Add card');

    });
    it("if showCard is Search show Search",()=>{
        const card= render(<Card showCard={'search'} setShowCard={setShowCard} />);
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        card.getByText('Search Event');
        card.getByText('Search card');
    });
    it("if showCard is settings show settings",()=>{
        const card= render(<Card showCard={'settings'} setShowCard={setShowCard} />);
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        const h3=card.container.querySelector('h3');
        expect(h3).toHaveTextContent('Settings');
        card.getByText('Settings card');
    });
    it("if showCard is help show help",()=>{
        const card= render(<Card showCard={'help'} setShowCard={setShowCard} />);
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        const h3=card.container.querySelector('h3');
        expect(h3).toHaveTextContent('Help');
        card.getByText('Help card');
    });
    it("if showCard is edit show edit",()=>{
        const card= render(<Card showCard={'edit'} setShowCard={setShowCard} />);
        const container= card.container.firstChild;
        expect(container).not.toHaveClass("off");
        const h3=card.container.querySelector('h3');
        expect(h3).toHaveTextContent('Edit Event');
        card.getByText('Edit card');
    });
    it("on close click setShowCard none",()=>{
        const card= render(<Card showCard={'edit'} setShowCard={setShowCard} />);
        const closeBtn= card.getByAltText("close card");
        fireEvent.click(closeBtn);
        expect(setShowCard).toBeCalledTimes(1);
        expect(setShowCard).toBeCalledWith('none');
    });
});