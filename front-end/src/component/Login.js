import React, {memo, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookies'

const Login = () => {
    // console.log(Cookies);
    
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        let auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const login = async () => {
        // console.log(name,email);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({name,email}),
            headers:{'Content-type':'application/json'}
        });

        result = await result.json();

        console.log(result.token);

        if (result) {
            localStorage.setItem('user',JSON.stringify(result._doc));
            const cookie = Cookies.setItem("token",result.token);
            // console.log(cookie);
            navigate('/');
        }
        else{
            alert("Please Enter Correct Details");
        }
    }
  return (
    <div className='signup'>
        <h1>Login</h1>
        <input className='inputBox' type="text" value={name} onChange={(e) => {setName(e.target.value);}} placeholder='Enter Name '/>
        <input className='inputBox' type="text" value={email} onChange={(e) => {setEmail(e.target.value);}} placeholder='Enter Email '/>
        <button style={{width:'100px', height:"30px", cursor:"pointer"}} onClick={login}>Login</button>
    </div>
  )
}

export default memo(Login)
