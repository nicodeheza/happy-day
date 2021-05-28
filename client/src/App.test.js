import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

describe("<App/>",()=>{
    global.fetch= jest.fn();
    beforeEach(()=>fetch.mockClear());
    test("if auth is false render home", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({auth:false})});
        });

       const { findByText } = render(<App />);
       const element = await findByText('Birthdays and Anniversaries Reminder');
       expect(element).toBeInTheDocument();

    });
    test("if auth is true render pricipal", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({auth:true})});
        });

       const { findByText } = render(<App />);
       const element = await findByText('JAN');
       expect(element).toBeInTheDocument();
    });
    test("if auth is undefined render loading", async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve();
        });

       const { findByText } = render(<App />);
       const element = await findByText('Loading...');
       expect(element).toBeInTheDocument();
    });
});

