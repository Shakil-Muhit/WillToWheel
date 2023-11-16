import React from 'react'
import "./styles/LoginPage.css"
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

var csrf2

export default function LoginPage() {
    return (
    <div className='LoginPageGridLayout'>
        <LoginPageGridLeftComponent/>
        <LoginPageGridRightComponent/> 
    </div>
  )
}

function LogoutComponent(){
    const navigate = useNavigate()
    

    const handleLogOut = () => {
        const postRegisterData = {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
    
          body: JSON.stringify({
            
          })
        };

        const uploadData = new FormData();
    
        fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
          console.log(response.status)
          return response.json()}).then((data) => {
              // setcsrf({csrf: data.value})
              // console.log(allposts)
              csrf2= data
              fetch('http://127.0.0.1:8000/api/users/logout', {
              method: 'POST',
              mode: 'same-origin',
              headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                'X-CSRFToken': csrf2.value
              },
              body: uploadData
            })
            .then( res => {
                console.log(res)
                navigate("/")
          })
            .catch(error => console.log(error))
          })

    //   fetch("/api/users/logout", postRegisterData).then((response) => response.json()).then((data) => {console.log(data);navigate("/")});     
      }
    
    return(
        <div>
            <button style={{ backgroundColor: "black", color: "white"}} onClick={handleLogOut}>
                logout
            </button>
        </div>
    )
}

function LoginPageGridLeftComponent()
{

    const navigate = useNavigate()
    return(
        
        <div className='LoginPageGridLeftComponentLayout'>
            <div className='LoginPageMessegeCardLayout'>
                <h1 style={{fontSize : '90px'}}>WillToWheel</h1>
                <p style={{fontSize: '30px'}}>Where your demand meets our supply</p>
                
                <div style = {{marginTop: '60px' ,display : 'flex',flexDirection: 'row'}}>
                    <text style={{fontSize: '20px', alignSelf: 'center'}}>Not registered yet?</text>
                    
                    <button className='LoginPageRegisterButtonLayout' onClick={() => navigate("/Register")}>
                        <text>Register Now</text>
                    </button>
                </div>
            </div>

            <LogoutComponent/>
        </div>
    )
}

function LoginPageGridRightComponent()
{
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [passcode, setPasscode] = useState("")

    function goToExplore(){
        seeAll()
        // navigate("/Explore")
    }

    const seeAll = () =>
    {
        console.log(username)
        console.log(passcode)

        const postLoginData = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
      
            body: JSON.stringify({
              username: username,
              password: passcode
            })
          };
      
          fetch("/api/users/login", postLoginData).then((response) => {
            console.log(response.status)
            if(response.status === 200 || response.status === 201)
            {
                return response.json()
            }
            else 
            {
                throw new Error("Something went wrong")
            }
          }).then((data) => {
            
            navigate("/Explore");
        }).catch((error) => console.log(error));
    }

    return(
        <div className='LoginPageGridRightComponentLayout'>
            <div className='LoginPageLoginCardLayout'>
                <h1 style={{marginLeft: '200px'}}>Login</h1>

                <p>Enter your username</p>
                <input className='LoginPageUsernameBoxLayout' type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}></input>
                
                <p>Enter your password</p>
                <input className='LoginPagePasswordBoxLayout' type= 'password' placeholder='Password' onChange={e => setPasscode(e.target.value)}></input>
            

                <button className='LoginPageSignInButtonLayout' onClick={goToExplore}>Sign In</button>
                
            
            </div>
        </div>
    )
}


