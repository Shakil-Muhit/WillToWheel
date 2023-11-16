import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/SearchPage.css'
import './styles/ColumnBar.css'
import './styles/ChatPage.css'
import Post from './Post'
import merc from './merc.jpg'
import ferrari from './ferrari.jpg'
import aston from './aston.jpg'
import bugatti from './bugatti.jpg'
import agera from './agera.jpg'
import chevrolet from './chevrolet.jpg'
import { useState } from 'react'
import MakePost from './MakePost'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function SearchPage({searchKeyword}) {
  const [allposts, setAllPosts] = useState([])
  const [allUsers, setAllUsers] = useState([])

  const location = useLocation()
  console.log("SEARCH PAGE"+location.state.searchKeyword)
  useEffect(() => {
    console.log("abiaudaihd")
      fetch("/api/users/getpostsbysearch?search_string="+location.state.searchKeyword).then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllPosts([...allposts, data])
            console.log(allposts)
        })

        fetch("/api/users/getusersbysearch?search_string="+location.state.searchKeyword).then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllUsers([...allUsers, data])
            console.log(allUsers)
        })

  }, [])

    const [postClicked, setPostClicked] = useState(true)
  
    if(allposts.length > 0 || allUsers.length > 0){
    return (
    <div className='SearchPageLayout'>
        <NavigationBar/>
        
        <div className='SearchPageGridLayout'>
          <ColumnBar/>
          <ToggleBar/>
          <Posts allposts = {allposts} allUsers = {allUsers} postClicked = {postClicked}/>
        </div>
    </div>
  )
    }

    else{
      <div className='SearchPageLayout'>
        <NavigationBar/>
        
        <div className='SearchPageGridLayout'>
          <h1>GG</h1>
          <ColumnBar/>
          <ToggleBar/>
        </div>
    </div>
    }

  function ToggleBar(){
    return(
        <div className='ToggleBarLayout'>
            <button className='ToggleBarButtonsLayout' onClick={() => setPostClicked(true)}>Posts</button>
            <button className='ToggleBarButtonsLayout' onClick={() => setPostClicked(false)}>Users</button>
        </div>
    )
  }
}

function Posts({allposts, allUsers, postClicked}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  if(postClicked && allposts.length > 0)
  {
    return(
        <div className='SearchPagePostsGridLayout'>
          {allposts[0].map((postdetails) => (
              <Post userID = {postdetails.author} postText = {postdetails.body} postID = {postdetails.id} postType={postdetails.post_type} vehicleType={postdetails.car_type} postImage={postdetails.post_img}/>
            ))}
        </div>
      )
  }

  else if(!postClicked && allUsers.length > 0){
    return(
      <div className='SearchPagePostsGridLayout'>
        {allUsers[0].map((postdetails) => (
            <UserComponent username = {postdetails.username} userID = {postdetails.id}/>
          ))}
      </div>
    )
  }
}

function UserComponent({username, userID}){
  return(
    <div className='ChatComponentLayout'>
      <button className='ChatComponentUsernameButtonLayout'>
      {username}
      </button>
    </div>
  )
}

function ColumnBar() {
  const [makePostButtonClicked, setMakePostButtonClicked] = useState(false)
  
  

  return (
    <div>
          <div className='ColumnBarLayout'>
          
            <button className='SaleButtonLayout'>Sale</button>
            <button className='RentButtonLayout'>Rent</button>
          </div>

          <button className='MakePostButtonLayout' onClick={() => setMakePostButtonClicked(!makePostButtonClicked)}>
            +
          </button>
    
          <MakePostHandleComponent makePostButtonClicked={makePostButtonClicked} setMakePostButtonClicked = {setMakePostButtonClicked}/>
    </div>

    
  )
}

function MakePostHandleComponent({makePostButtonClicked, setMakePostButtonClicked}){
  if(makePostButtonClicked){
    return(
      <MakePost makePostButtonClicked = {makePostButtonClicked} setMakePostButtonClicked = {setMakePostButtonClicked}/>
    )
  }
}

