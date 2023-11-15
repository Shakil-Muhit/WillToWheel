import React from 'react'
import { useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar'
import './styles/ColumnBar.css'
import Post from './Post'
import Comment from './Comment';
import chevrolet from './chevrolet.jpg'
import './styles/ExpandedPost.css'
import { useState } from 'react'
import MakePost from './MakePost'
import BigPost from './BigPost';

export default function ExpandedPost() {
    const location = useLocation();

  return (
    <div>
        <div className='ExpandedPostLayout'>
        <NavigationBar/>
        
        <div className='ExpandedPostGridLayout'>
          <ColumnBar/>

          <div className='ExpandedPostPostsGridLayout'>
          <BigPost profilepicture = {location.state.profilepicture} pictures ={location.state.pictures} username = {location.state.username} isExpanded={location.state.expanded}/> 
          <CommentsSection/>
          </div> 

          <div>
            
          </div>  
        </div>
    </div>
    </div>
  )
}

function CommentsSection(){
  return(
    <div>
          <Comment profilepicture={chevrolet} username={"mokhles"}/> 
          <Comment profilepicture={chevrolet} username={"mokhles"}/> 
          <Comment profilepicture={chevrolet} username={"mokhles"}/> 
          <Comment profilepicture={chevrolet} username={"mokhles"}/> 
          <Comment profilepicture={chevrolet} username={"mokhles"}/>  
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

