import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';
import {Provider, useSelector} from 'react-redux';
import generateStore from '../../redux/store';
import {SET_AUTH} from '../../redux/const/authConst';

describe("<Form/>",()=>{
    global.fetch= jest.fn();


    const store= generateStore();
    
    beforeEach(()=>{ 
        fetch.mockClear();
        store.dispatch({type: SET_AUTH, payload: undefined});
    });

    it("Render default login form",()=>{
        const form= render(
            <Provider store={store}>
            <Form/>
            </Provider>
        );
        form.getByPlaceholderText('Enter your Email');
        form.getByPlaceholderText('Enter your Password');
    });
    it("submit login form and login successfully",async()=>{

        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({auth: true})});
        });
        
        const send={
            email: "test@test",
            password: '1234'
        }
        const form= render(
            <Provider store={store}>
            <Form/>
            </Provider>
        );
        const emailfild= form.getByPlaceholderText('Enter your Email');
        const passwordfild= form.getByPlaceholderText('Enter your Password');


        fireEvent.change(emailfild,{target: {value: send.email}});
        fireEvent.change(passwordfild, {target:{value: send.password}});
        fireEvent.click(form.getByText('Log In'));

        expect(fetch).toBeCalledTimes(1);
        expect(fetch).toBeCalledWith(expect.any(String),expect.objectContaining({body: JSON.stringify(send)}));

        await form.findByText('Log In');
        const rong= form.queryByText('The email address or password is incorrect.');
        expect(rong).toBeNull();
        const auth= store.getState().auth.authData;
        expect(auth).toBe(true);
    });
    it("submit login form and login unsuccessfully",async()=>{
        fetch.mockImplementation(()=>{
            return Promise.resolve( {status: 401});
        });
        const send={
            email: "test@test",
            password: 'abcde'
        }
        const form= render(
            <Provider store={store}>
            <Form/> 
            </Provider>
        );

        const emailfild= form.getByPlaceholderText('Enter your Email');
        const passwordfild= form.getByPlaceholderText('Enter your Password');

        fireEvent.change(emailfild,{target: {value: send.email}});
        fireEvent.change(passwordfild, {target:{value: send.password}});
        fireEvent.click(form.getByText('Log In'))

        await form.findByText('Log In');
        const rong= form.queryByText('The email address or password is incorrect.');
        expect(rong).toBeInTheDocument();
        const auth= store.getState().auth.authData;
        expect(auth === undefined || auth === false).toBeTruthy();
      
    });
    it("Sign up with passwords that don't match",()=>{
        const singupForm={
            email: "test@test",
            name:"test",
            birthday: new Date('4-5-1988'),
            password:'1234',
            confim:'4321'
        };
        const form= render(
            <Provider store={store}>
            <Form/>
            </Provider>
        );
        fireEvent.click(form.getByText('Sing Up'));
        

        fireEvent.change(form.getByPlaceholderText('Enter your Email'), {target:{value: singupForm.email}});
        fireEvent.change(form.getByPlaceholderText('Enter your Name'), {target:{value: singupForm.name}});
        fireEvent.change(form.getByPlaceholderText('Enter your Birthday'), {target:{value: singupForm.birthday}});
        fireEvent.change(form.getByPlaceholderText('Enter your Password'), {target:{value: singupForm.password}});
        fireEvent.change(form.getByPlaceholderText('Confirm Password'), {target:{value: singupForm.confim}})
        fireEvent.click(form.getByText('Sing Up'));

        expect(fetch).toBeCalledTimes(0);
        expect(form.queryByText("Passwords don't match")).toBeInTheDocument();
    });
    it("Sign up with passwords that match",async()=>{
        
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({auth: true})});
        });

        const singupForm={
            email: "test@test",
            name:"test",
            birthday: '4-5-1988',
            password:'1234',
            confim:'1234'
        };
        const form= render(
            <Provider store={store}>
            <Form/>
            </Provider>
        );
        fireEvent.click(form.getByText('Sing Up'));
        

        fireEvent.change(form.getByPlaceholderText('Enter your Email'), {target:{value: singupForm.email}});
        fireEvent.change(form.getByPlaceholderText('Enter your Name'), {target:{value: singupForm.name}});
        fireEvent.change(form.getByPlaceholderText('Enter your Birthday'), {target:{value: singupForm.birthday}});
        fireEvent.change(form.getByPlaceholderText('Enter your Password'), {target:{value: singupForm.password}});
        fireEvent.change(form.getByPlaceholderText('Confirm Password'), {target:{value: singupForm.confim}})
        fireEvent.click(form.getByText('Sing Up'));

        await waitFor(()=>fetch);

        expect(fetch).toBeCalledTimes(1);
        expect(fetch).toBeCalledWith(expect.any(String),expect.objectContaining({body: JSON.stringify({
            email:singupForm.email,
            name:singupForm.name,
            birthday: singupForm.birthday,
            password: singupForm.password
        })}));
        expect(form.queryByText("Passwords don't match")).toBeNull();
        const auth= store.getState().auth.authData;
        expect(auth).toBe(true);
    });
    it("Sign up with message response", async()=>{
        
        fetch.mockImplementation(()=>{
            return Promise.resolve( {json: () => Promise.resolve({message: "message"})});
        });

        const singupForm={
            email: "test@test",
            name:"test",
            birthday: new Date('4-5-1988'),
            password:'1234',
            confim:'1234'
        };
        const form= render(
            <Provider store={store}>
            <Form/>
            </Provider>
        );
        fireEvent.click(form.getByText('Sing Up'));
        

        fireEvent.change(form.getByPlaceholderText('Enter your Email'), {target:{value: singupForm.email}});
        fireEvent.change(form.getByPlaceholderText('Enter your Name'), {target:{value: singupForm.name}});
        fireEvent.change(form.getByPlaceholderText('Enter your Birthday'), {target:{value: singupForm.birthday}});
        fireEvent.change(form.getByPlaceholderText('Enter your Password'), {target:{value: singupForm.password}});
        fireEvent.change(form.getByPlaceholderText('Confirm Password'), {target:{value: singupForm.confim}})
        fireEvent.click(form.getByText('Sing Up'));

        expect(fetch).toBeCalledTimes(1);
        await form.findByText('message');
        
    })
});