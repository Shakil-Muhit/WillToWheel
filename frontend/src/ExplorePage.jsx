import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/ExplorePage.css'
import './styles/ColumnBar.css'
import Post from './Post'
import merc from './merc.jpg'
import ferrari from './ferrari.jpg'
import aston from './aston.jpg'
import bugatti from './bugatti.jpg'
import agera from './agera.jpg'
import chevrolet from './chevrolet.jpg'
import { useState } from 'react'
import MakePost from './MakePost'
import { useNavigate } from 'react-router-dom'


export default function ExplorePage() {
  return (
    <div className='ExplorePageLayout'>
        <NavigationBar/>
        
        <div className='ExplorePageGridLayout'>
          <ColumnBar/>

          <Posts/>
        </div>
    </div>
  )
}

function Posts(){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]
  return(
    <div className='ExplorePagePostsGridLayout'>
      <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
      <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
      <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
      <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
    </div>
  )
}

function ColumnBar() {
  const [makePostButtonClicked, setMakePostButtonClicked] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
          <div className='ColumnBarLayout'>
          
            <button className='SaleButtonLayout'>Sale</button>
            <button className='RentButtonLayout'>Rent</button>
          </div>

          <button className='ViewChatButtonLayout' onClick={() => navigate("/Chat")}>
            C
          </button>

          <button className='ViewNotificationButtonLayout' onClick={() => navigate("/Notification")} >
            *
          </button>

          <button className='MakePostButtonLayout' onClick={() => setMakePostButtonClicked(!makePostButtonClicked)}>
            D
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