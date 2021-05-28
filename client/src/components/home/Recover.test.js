import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Recover from './Recover';
import '@testing-library/jest-dom/extend-expect';

describe("<Recover/>",()=>{
    global.fetch= jest.fn();
    beforeEach(()=>fetch.mockClear());
    it("email address must be sent",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({message:"ok"})});
        });

        const recover= render(<Recover/>);
        const emailFild= recover.getByPlaceholderText('Email');
        fireEvent.change(emailFild,{target: {value: "test@test"}});
        fireEvent.click(recover.getByText('Submit'));

        expect(fetch).toBeCalledTimes(1);
        expect(fetch).toBeCalledWith(expect.any(String),expect.objectContaining({body: JSON.stringify({email:"test@test"})}));
        await recover.findByText('ok');

    });
});

