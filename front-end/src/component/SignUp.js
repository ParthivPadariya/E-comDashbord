import React,{useState,useEffect, memo} from 'react'
import {useNavigate} from 'react-router-dom'
// import axios from 'axios'

function SignUp() {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    // useNavigate use for navigate 
    // If user Aleady login then it not show signup button
    const navigate = useNavigate();
    useEffect(()=>{
      let auth = localStorage.getItem('user');
      if(auth){
        navigate('/');
      }
    })

    const collectData = async () => {
        // console.log(name,password,email);
        let obj = {name,password,email};
        // Api integreat hear using fetch(Core Module) or axios(npm module)
        // using api pass string data
        
        let result = await fetch("http://localhost:5000/register",{
          method:'post',
          body: JSON.stringify(obj),
          headers:{'Content-type':'application/json'},
        });

        result = await result.json();
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result));
        if (result) {
          navigate('/');
        }
        
        // using axios
        // axios.post("http://localhost:5000/register",{name,email,password})
        // .then(response => {console.log(response)})
        // .catch((err)=>{console.log(err);})

        // let result = await axios.post("http://localhost:5000/register",{name,email,password})
        // console.log(result);
        // if(result){
        //   navigate("/");
        // }


        // show result in localStorage in application
        // console.log(result.body);
        // localStorage.setItem("users",JSON.stringify(result));


        setName("");
        setPassword("");
        setEmail("");
    }

  return (  
    <div className='signup'>
        <h1>Register</h1>
        <input className='inputBox' type="text" value={name} onChange={(e) => {setName(e.target.value);}} placeholder='Enter Name '/>
        <input className='inputBox' type="email" value={email} onChange={(e) => {setEmail(e.target.value);}} placeholder='Enter Email '/>
        <input className='inputBox' type="text" value={password} onChange={(e) => {setPassword(e.target.value);}} placeholder='Enter Password '/>
        <button style={{width:'100px', height:"30px", cursor:"pointer"}} onClick={collectData}>SignUp</button>
    </div>
  )
}

export default memo(SignUp)
