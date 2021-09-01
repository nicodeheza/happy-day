import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe("<Header/>",()=>{
    it("If there are no events that month render message",()=>{
        const header= render(<Header/>);
        const janBtn= header.getByText('JAN');
        fireEvent.click(janBtn);
        const message= header.getByText("You don't have events this month");
        expect(message.parentNode).toHaveClass('show');
    });
    it("If there are events that month don't render message and go to the event",()=>{
        window.scrollTo= jest.fn();
        const header=render(
            <>
            <Header/>
            <div id="month1">event</div>
            </>
        );
        const janBtn= header.getByText('JAN');
        fireEvent.click(janBtn);
        const message= header.getByText("You don't have events this month");
        expect(message.parentNode).toHaveClass('alert');
        expect(window.scrollTo).toBeCalled();

        window.scrollTo.mockClear();

        
    });
});