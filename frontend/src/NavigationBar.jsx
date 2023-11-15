import React from 'react'
import './styles/NavigationBar.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

var csrf2

export default function NavigationBar() {
  return (
    <div className='TopNavigationLayout'>
        <ActualNavigationBar/>
        <SearchBar/>
        <LogoutComponent/>
    </div>
  )
}

function ActualNavigationBar(){
    const navigate = useNavigate()
    const username = "doraemon"

    return (
        <div className='NavigationBarLayout'>
            <button className='NavigationBarExploreButton' onClick={() => navigate("/explore")}>
                Explore
            </button>

            <button className='NavigationBarMyWheelsButton' onClick={() => navigate("/Following")}>
                Following
            </button>

            <button className='NavigationBarProfileButton' onClick={() => navigate("/Profile", {state:{username}})}>
                Profile
            </button>
        </div>
    )
}

function SearchBar()
{
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate()

    function HandleSearch(){
        console.log(searchKeyword);
        navigate("/Search", {state:{searchKeyword}});    
    }
    
    return(
        <div className='SearchBarLayout'>
            <input type='text' placeholder='Enter Search Key' className='SearchTextBoxLayout' onChange={e => {setSearchKeyword(e.target.value)}}></input>
            <button className='SearchButtonLayout' onClick={HandleSearch}>Search</button>
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
            <button onClick={handleLogOut}>
                logout
            </button>
        </div>
    )
}
