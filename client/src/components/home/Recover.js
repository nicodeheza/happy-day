import React, { useState } from 'react'

export default function Recover({setShowRecover}) {
    const [email, setEmail]= useState('');
    const[message, setMessage]= useState('');

    const handelSubmit=(e)=>{
        e.preventDefault();
        setMessage("Loading...");
        console.log(email);
        fetch('http://localhost:4000/recover',{
            method:'POST',
            body: JSON.stringify({email}),
            headers:{"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
                setMessage(data.message);   
        });
        setEmail('');
    }
    return (
        <div className="recover-container">
        <div className="recover">
            <img src="img/exit.svg" alt="close" onClick={()=>setShowRecover(false)}/>
            <h3>Enter your email to recover your password</h3>
            <form onSubmit={handelSubmit}>
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
            <p>You are going to receive an email with a link to recover your password, this link is valid for 24hs.</p>
            
        </div>
        </div>
    )
}
