import React from 'react'
import "./styles/RegisterPage.css"
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

export default function RegisterPage() {
  return (
    <div className='RegisterPageGridLayout'>
        <RegisterPageGridRightComponent/> 
        <RegisterPageGridLeftComponent/>
    </div>
  )
}

function RegisterPageGridLeftComponent()
{
    const navigate = useNavigate()
    return(
        <div className='RegisterPageGridLeftComponentLayout'>
            <div className='RegisterPageMessegeCardLayout'>
                <h1 style={{fontSize : '90px'}}>Join Us</h1>
                <p style={{fontSize: '30px'}}>To fulfill your needs of vehicle transactions</p>
                
                <div style = {{marginTop: '60px' ,display : 'flex',flexDirection: 'row'}}>
                    <text style={{fontSize: '20px', alignSelf: 'center'}}>Already have an account?</text>
                    
                    <button className='RegisterPageLoginButtonLayout' onClick = {() => navigate("/")}>
                        <text>Go to Login</text>
                    </button>
                </div>
            </div>
        </div>
    )
}

function RegisterPageGridRightComponent()
{
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [passcode, setPasscode] = useState("");
    const [email, setEmail] = useState("");

    const seeAll = () => {
        console.log(username)
        console.log(email)
        console.log(passcode)
        
    
        //navigate("/login")
        const postRegisterData = {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
    
          body: JSON.stringify({
            username: username,
            password: passcode,
            email: email
          })
        };
    
        fetch("/api/users/createuser", postRegisterData).then((response) => response.json()).then((data) => {
            console.log(data)
            navigate("/explore")
        });
        
      }

    function registerUser(){
        seeAll()

    }

    return(
        <div className='RegisterPageGridRightComponentLayout'>
            <div className='RegisterPageRegisterCardLayout'>
                <h1 style={{marginLeft: '150px'}}>Register</h1>

                <p>Enter your username</p>
                <input className='RegisterPageUsernameBoxLayout' type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}></input>

                <p>Enter your email</p>
                <input className='RegisterPageUsernameBoxLayout' type= 'email' placeholder='email' onChange={e => setEmail(e.target.value)}></input>
                
                <p>Enter your password</p>
                <input className='RegisterPagePasswordBoxLayout' type= 'password' placeholder='Password' onChange={e => setPasscode(e.target.value)}></input>
            

                <button className='RegisterPageRegisterButtonLayout' onClick = {registerUser}>Register</button>        
            </div>
        </div>
    )
}





