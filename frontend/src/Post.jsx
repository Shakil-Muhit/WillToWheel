import React from 'react'
import './styles/Post.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Post({profilepicture, pictures, username, isExpanded}) {
  return (
    <div className='PostLayout'>
      <PostHeading profilepicture = {profilepicture} username = {username}/>
      <PostImage pictures={pictures}/>
      <PostText/>
      <PostInteractionTools profilepicture={profilepicture} pictures={pictures} username={username} isExpanded={isExpanded}/>
    </div>
  )
}

function PostHeading({profilepicture, username}){
  const [postOptionButtonClicked, setpostOptionButtonClicked] = useState(false);
  
  return(
    <div className='PostHeadingLayout'>
      <img src={profilepicture[0]} className = 'ProfilePictureMiniatureLayout'></img>
      <button className='PostUsernameButtonLayout'><b>{username}</b></button>
      <button className='PostOptionButtonLayout' onClick={() => setpostOptionButtonClicked(!postOptionButtonClicked)}> :: </button>
      <PostOptionDropdownMenu postOptionButtonClicked = {postOptionButtonClicked}/>
    </div>
  )
}

function PostOptionDropdownMenu({postOptionButtonClicked}){ 
  if(postOptionButtonClicked){
    return(
      <div className='PostOptionDropDownMenuLayout'>
        <button className='PostOptionButtonLayout'>Edit Post</button>
        <button className='PostOptionButtonLayout'>Delete Post</button>
        <button className='PostOptionButtonLayout'>Mark as Sold</button>
      </div> 
    )
  }
}

function PostImage({pictures}){
  const [pictureIndex, setPictureIndex] = useState(0)

  const [postVehiclePicture, setPostVehiclePicture] = useState(pictures[pictureIndex])
  

  function goToPrevPicture(){
      if(pictureIndex > 0){
        setPictureIndex(pictureIndex-1);
      }

      setPostVehiclePicture(pictures[pictureIndex]);
  }

  function goToNextPicture(){
    if(pictureIndex < pictures.length - 1){
      setPictureIndex(pictureIndex+1);
    }

    setPostVehiclePicture(pictures[pictureIndex]);
  }

  return(
    <div>
             <img src={postVehiclePicture} style={{maxWidth: '100%', marginTop: '20px', borderRadius: '40px'}}></img>
             <button onClick={goToPrevPicture}> <b> &lt; </b></button>
             <button onClick={goToNextPicture}> <b> &gt; </b></button>
    </div>
  )
}

function PostText(){
  return(
    <div>
        <p style={{overflow: 'hidden'}}>It has 1 Diesel Engine and 1 Petrol Engine on offer. The Diesel engine is 1993 cc while the Petrol engine is 1496 cc . It is available with Automatic transmission.Depending upon the variant and fuel type the C-Class has a mileage of 23.0 kmpl</p>
    </div>
  )
}

function PostInteractionTools({profilepicture, pictures, username, isExpanded}){
  const navigate = useNavigate()
  const expanded = true;
  const [commentText, setCommentText] = useState("");

  return(
    
    <div>
      <ExpandButtonComponent isExpanded={isExpanded}/>
      <input className='PostCommentBoxLayout' type='text' placeholder='Comment' onChange={e => setCommentText(e.target.value)}></input>
      <button className='PostCommentButtonLayout' onClick = {() => console.log(commentText)}> <b> &gt; </b></button>
    </div>
  )

  function ExpandButtonComponent({isExpanded}){
    if(!isExpanded){
      console.log(isExpanded)
      return(
        <button className = 'PostExpandButtonLayout' onClick={() => navigate("/ExpandedPost", {state:{profilepicture, pictures, username, expanded}})}><b>Expand</b></button>
      )
    }
  }
}