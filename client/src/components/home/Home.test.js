import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect';

describe("<Home/>", ()=>{
    
    it("does not render recover when it starts",()=>{
        const home= render(<Home/>);
        const recover= home.queryByText('Enter your email to recover your password');
        expect(recover).toBeNull();
    });
    it("Render recover when 'Recover it' is press",()=>{
        const home= render(<Home/>);
        const recoverLink= home.container.querySelector('span');
         fireEvent.click(recoverLink);
         const recover= home.getByText('Enter your email to recover your password');
         expect(recover).toBeInTheDocument();
    });
 });