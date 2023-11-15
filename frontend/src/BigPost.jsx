import React from 'react'
import './styles/BigPost.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function BigPost({profilepicture, pictures, username, isExpanded}) {
  return (
    <div className='BigPostLayout'>
      <BigPostHeading profilepicture = {profilepicture} username = {username}/>
      <BigPostImage pictures={pictures}/>
      <BigPostText/>
      <BigPostInteractionTools profilepicture={profilepicture} pictures={pictures} username={username} isExpanded={isExpanded}/>
    </div>
  )
}

function BigPostHeading({profilepicture, username}){
  const [postOptionButtonClicked, setpostOptionButtonClicked] = useState(false);
  
  return(
    <div className='BigPostHeadingLayout'>
      <img src={profilepicture[0]} className = 'BigProfilePictureMiniatureLayout'></img>
      <button className='BigPostUsernameButtonLayout'><b>{username}</b></button>
      <button className='BigPostOptionButtonLayout' onClick={() => setpostOptionButtonClicked(!postOptionButtonClicked)}> :: </button>
      <BigPostOptionDropdownMenu postOptionButtonClicked = {postOptionButtonClicked}/>
    </div>
  )
}

function BigPostOptionDropdownMenu({postOptionButtonClicked}){ 
  if(postOptionButtonClicked){
    return(
      <div className='BigPostOptionDropDownMenuLayout'>
        <button className='BigPostOptionButtonLayout'>Edit Post</button>
        <button className='BigPostOptionButtonLayout'>Delete Post</button>
        <button className='BigPostOptionButtonLayout'>Mark as Sold</button>
      </div> 
    )
  }
}

function BigPostImage({pictures}){
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

function BigPostText(){
  return(
    <div>
        <p style={{overflow: 'hidden'}}>It has 1 Diesel Engine and 1 Petrol Engine on offer. The Diesel engine is 1993 cc while the Petrol engine is 1496 cc . It is available with Automatic transmission.Depending upon the variant and fuel type the C-Class has a mileage of 23.0 kmpl</p>
    </div>
  )
}

function BigPostInteractionTools({profilepicture, pictures, username, isExpanded}){
  const [commentText, setCommentText] = useState("");

  return(
    
    <div>
      <input className='BigPostCommentBoxLayout' type='text' placeholder='Comment' onChange={e => setCommentText(e.target.value)}></input>
      <button className='BigPostCommentButtonLayout' onClick = {() => console.log(commentText)}> <b> &gt; </b></button>
    </div>
  )
}