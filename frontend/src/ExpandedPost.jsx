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
import { useEffect } from 'react';

export default function ExpandedPost({postProfilePicture, postUsername, userID, postText, postID, postType, vehicleType, postImage}) {
    const location = useLocation();
    const[allComments, SetAllComments] = useState([])
    

  useEffect(() => {
    console.log("abiaudaihd")
    console.log(location.state.postProfilePicture)
    fetch("/api/posts/getpostcomments?" + "post_id=" + location.state.postID).then((response) => {
      console.log(response.status)
      return response.json()}).then((data) => {
          SetAllComments([...allComments, data])
          // console.log(allposts)
      })
}, [])

    // {postProfilePicture, postUsername,userID, postText, postID, postType, vehicleType, postImage}
    if(allComments.length > 0){
      console.log(location.state.postProfilePicture)
  return (
    <div>
        <div className='ExpandedPostLayout'>
        <NavigationBar/>
        
        <div className='ExpandedPostGridLayout'>
          <ColumnBar/>
          {/* postProfilePicture, postUsername,userID, postText, postID, postType, vehicleType, postImage */}
          <div className='ExpandedPostPostsGridLayout'>
          <BigPost postProfilePicture = {location.state.postProfilePicture} postUsername ={location.state.postUsername} userID = {location.state.userID} postText={location.state.postText} postID = {postID} postType={location.state.postType} vehicleType ={location.state.vehicleType} postImage = {location.state.postImage}/> 
          <CommentsSection allComments= {allComments}/>
          </div> 

          <div>
            
          </div>  
        </div>
    </div>
    </div>
  )
    }
    else{
      return(
        <div>
        <div className='ExpandedPostLayout'>
        <NavigationBar/>
        
        <div className='ExpandedPostGridLayout'>
          <ColumnBar/>

          <div className='ExpandedPostPostsGridLayout'>
          <BigPost profilepicture = {location.state.postProfilePicture} postUsername ={location.state.postUsername} userID = {location.state.userID} postText={location.state.postText} postType={location.state.postType} vehicleType ={location.state.vehicleType} postImage = {location.state.postImage}/> 
          
          </div> 

          <div>
            
          </div>  
        </div>
    </div>
    </div>
      )
    }
}

function CommentsSection({allComments}){
  return(
    <div>
          {allComments[0].map((postdetails) => (
              <Comment commentUserID = {postdetails.author} commentText = {postdetails.body} commentID = {postdetails.id}/>
            ))}
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

