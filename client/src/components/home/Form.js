import React, { useContext, useState } from 'react'
import {authContext} from '../../App'

export default function Form() {
    const setAuth= useContext(authContext);
   const [formType, setFormType]= useState('logIn');
   const[message, setMessage]= useState('');
   const [brithFocus, setBirthFocus]= useState('text');
   const [singupFilds, setSingupFilds]= useState({
       email:'',
       name:'',
       birthday:'',
       password:'',
       confirm:''
   });

   const [loginFlids, setLoginFilds]= useState({
       email:'',
       password:''
   });

    const formSwitch=()=>{
        if(formType ==='logIn'){
            setFormType('singUp');
        }else{
            setFormType('logIn');
        }
    }

    const handelLogin=(e)=>{
        e.preventDefault();
            let send={
                email:loginFlids.email,
                password: loginFlids.password
            }
            fetch('http://localhost:4000/api/login',{
                method:'POST',
                body: JSON.stringify(send),
                headers:{"Content-type": "application/json; charset=UTF-8"},
                credentials: 'include'
            })
            .then(res=> {
                if(res.status === 401){
                    setMessage('The email address or password is incorrect.');
                }else{
                   return res.json()
                }
            })
            .then(data=>{ 
                
                if(data){
                    setAuth(data.auth);
                }
            })
            .catch(err => console.log(err));

            console.log(send);
    }

    const  [passwordValidate, setPasswordValidated]= useState(true);

    const handelSingup=(e)=>{
        e.preventDefault();
        if(singupFilds.password === singupFilds.confirm){
            setPasswordValidated(true);
            let send={
                email:singupFilds.email,
                name:singupFilds.name,
                birthday: singupFilds.birthday,
                password: singupFilds.password
            }
            fetch('http://localhost:4000/api/singup',{
                method:'POST',
                body: JSON.stringify(send),
                headers:{"Content-type": "application/json; charset=UTF-8"},
                credentials: 'include'
            })
            .then(res=> res.json())
            .then(data=>{
                setAuth(data.auth);
                if(data.message){
                    setMessage(data.message);
                }
                console.log(data)})
            .catch(err => console.log(err));

            console.log(singupFilds);

        }else{
            setPasswordValidated(false);
        }

    }

      let form;
    if(formType === 'logIn'){
        form= <form onSubmit= {handelLogin}>
            <input type="email" placeholder="Enter your Email" name="emial" value={loginFlids.email}
         onChange={(e)=>setLoginFilds({...loginFlids, email:e.target.value })} required/>
            <input type="password" placeholder="Enter your Password" name="password" value={loginFlids.password}
         onChange={(e)=>setLoginFilds({...loginFlids, password:e.target.value })} autoComplete="on" required/>
         {message? (<p className="alert">{message}</p>) : (null)}
            <button type="submit" value="Submit">Log In</button>
            </form>;
    }else{
        form= <form onSubmit={handelSingup}>
        <input type="email" placeholder="Enter your Email" name="email" value={singupFilds.email}
         onChange={(e)=>setSingupFilds({...singupFilds, email:e.target.value })} required/>
        <input type="text" placeholder="Enter your Name" name="name" value={singupFilds.name}
         onChange={(e)=>setSingupFilds({...singupFilds, name:e.target.value })} required/>
        <input type={brithFocus} onFocus={()=>setBirthFocus('date')} onBlur={()=>setBirthFocus('text')} 
        placeholder="Enter your Birthday" name="birthday" value={singupFilds.birthday}
         onChange={(e)=>setSingupFilds({...singupFilds, birthday:e.target.value })} required/>
        <input type="password" placeholder="Enter your Password" name="password" value={singupFilds.password}
         onChange={(e)=>setSingupFilds({...singupFilds, password:e.target.value })} required/>
        <input type="password" placeholder="Confirm Password" name="confim" value={singupFilds.confirm}
         onChange={(e)=>setSingupFilds({...singupFilds, confirm:e.target.value })} required/>
         {!passwordValidate ? (<p className="alert">Passwords don't match</p>) : (<p></p>)}
         {message? (<p className="alert">{message}</p>) : (null)}
        <button type="submit">Sing Up</button>
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
