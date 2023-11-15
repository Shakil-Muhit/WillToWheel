import React from 'react'
import './styles/NavigationBar.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


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
    return(
        <div>
            <button>
                logout
            </button>
        </div>
    )
}
