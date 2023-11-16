import React from 'react'
import './styles/BigPost.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

var csrf2

export default function BigPost({postProfilePicture, postUsername,userID, postText, postID, postType, vehicleType, postImage}) {
  console.log("big post")
  console.log(postProfilePicture)
  console.log(postImage)
  
  return (
    <div className='BigPostLayout'>
      <BigPostHeading profilepicture = {postProfilePicture} username = {postUsername}/>
      <BigPostImage picture={postImage}/>
      <BigPostText postText={postText} postUsername = {postUsername}/>
      <BigPostInteractionTools postID={postID} postUsername={postUsername}/>
    </div>
  )
}

function BigPostHeading({profilepicture, username}){
  const [postOptionButtonClicked, setpostOptionButtonClicked] = useState(false);
  
  return(
    <div className='BigPostHeadingLayout'>
      <img src={profilepicture} className = 'BigProfilePictureMiniatureLayout'></img>
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

function BigPostImage({picture}){
  // const [pictureIndex, setPictureIndex] = useState(0)

  const [postVehiclePicture, setPostVehiclePicture] = useState('http://127.0.0.1:8000/api/posts' + picture)
  

  // function goToPrevPicture(){
  //     if(pictureIndex > 0){
  //       setPictureIndex(pictureIndex-1);
  //     }

  //     setPostVehiclePicture(pictures[pictureIndex]);
  // }

  // function goToNextPicture(){
  //   if(pictureIndex < pictures.length - 1){
  //     setPictureIndex(pictureIndex+1);
  //   }

  //   setPostVehiclePicture(pictures[pictureIndex]);
  // }

  return(
    <div>
             <img src={postVehiclePicture} style={{maxWidth: '100%', marginTop: '20px', borderRadius: '40px'}}></img>
             <button className="PrevPicButtonLayout" onClick={console.log("goToPrevPicture")}> <b> &lt; </b></button>
             <button className='NextPicButtonLayout'  onClick={console.log("goToNextPicture")}> <b> &gt; </b></button>
    </div>
  )
}

function BigPostText({postText, postUsername}){
  return(
    <div>
        <p style={{overflow: 'hidden'}}><b>{postUsername}</b></p>
        <p>{postText}</p>
    </div>
  )
}

function BigPostInteractionTools({postID, postUsername}){
  const [commentText, setCommentText] = useState("");
  function handleComment(){
    const uploadData = new FormData();
    uploadData.append('post_id', postID);
    uploadData.append('body', commentText);
    
    // console.log(csrf2.value)
    fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
      console.log(response.status)
      return response.json()}).then((data) => {
          // setcsrf({csrf: data.value})
          // console.log(allposts)
          csrf2= data
          fetch('http://127.0.0.1:8000/api/posts/addcomment', {
          method: 'POST',
          mode: 'same-origin',
          headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            'X-CSRFToken': csrf2.value
          },
          body: uploadData
        })
        .then( res => console.log(res))
        .catch(error => console.log(error))
      })


      const uploadData2 = new FormData();
      uploadData2.append('post_id', postID);
      uploadData2.append('receiver_name', postUsername);
      uploadData2.append('notification_type', 1);
      console.log("EXPANDED POST ID "+postID)

      fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            // setcsrf({csrf: data.value})
            // console.log(allposts)
            csrf2= data
            fetch('http://127.0.0.1:8000/api/posts/addnotification', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
              // 'Accept': 'application/json',
              // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
              'X-CSRFToken': csrf2.value
            },
            body: uploadData2
          }).then( res2 => console.log(res2))
          .catch(error2 => console.log(error2))
        })
      
      fetch('http://127.0.0.1:8000/api/posts/addnotification', {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        'X-CSRFToken': csrf2.value
      },
      body: uploadData2
    }).then( res2 => console.log(res2))
    .catch(error2 => console.log(error2))
  }

  return(
    
    <div>
      <input className='BigPostCommentBoxLayout' type='text' placeholder='Comment' onChange={e => setCommentText(e.target.value)}></input>
      <button className='BigPostCommentButtonLayout' onClick = {handleComment}> <b> &gt; </b></button>
    </div>
  )
}