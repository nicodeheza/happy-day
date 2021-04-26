import React, { useState } from 'react'

export default function Form() {
   const [formType, setFormType]= useState('logIn');

    const formSwitch=()=>{
        if(formType ==='logIn'){
            setFormType('singUp');
        }else{
            setFormType('logIn');
        }
    }
    let form;
    if(formType === 'logIn'){
        form= <form>
            <input type="text" placeholder="Enter your Email" name="emial"/>
            <input type="password" placeholder="Enter your Password" name="password"/>
            <button>Log In</button>
            </form>;
    }else{
        form= <form>
        <input type="text" placeholder="Enter your Email" name="email"/>
        <input type="text" placeholder="Enter your Name" name="name"/>
        <input type="text" placeholder="Enter your Birthday" name="birthday"/>
        <input type="password" placeholder="Enter your Password" name="password"/>
        <input type="password" placeholder="Confirm Password" name="confim"/>
        <button>Sing Up</button>
        </form>;
    }

    return (
        <div className="form-container">
          {form}
            <p>or</p>
            <p className="red" onClick={formSwitch}>{formType==='logIn' ? ('Sing Up') : ('Log In')}</p>
        </div>
    )
}
