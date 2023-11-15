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
import './styles/FollowingPage.css'


export default function FollowingPage() {
  return (
    <div className='FollowingPageLayout'>
        <NavigationBar/>
        
        <div className='FollowingPageGridLayout'>
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
    <div className='FollowingPagePostsGridLayout'>
      <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>  
      <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
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