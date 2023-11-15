import React from 'react'
import './styles/Post.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import chevrolet from './chevrolet.jpg'

// profilepicture, pictures, username, isExpanded
var csrf2

export default function Post({userID, postText, postID, postType, vehicleType, postImage}) {
  const [postUsername, setPostUsername] = useState("")
  const [postProfilePicture, setPostProfilePicture] = useState()
  
  fetch("/api/users/getusername?id="+userID).then((response) => {
    console.log(response.status)
    console.log("post ID in post page is " + postID)
    return response.json()}).then((data) => {
        // setAllFollowing([...allfollowing, data.following])
        console.log(data)
        console.log("/api/users/getuser?username="+data.name)
        fetch("/api/users/getuser?username="+data.name).then((response) => {
          console.log(response.status)
          return response.json()}).then((data2) => {
              // setAllFollowing([...allfollowing, data.following])
              console.log(data2)
              setPostUsername(data2.username)
              setPostProfilePicture('http://127.0.0.1:8000/api/users' + data2.profile_img)
          })
    })
  
  if(!postUsername)
  {
    return(
      <div>

      </div>
    )
  }
  else{
    // {userID, postText, postID, postType, vehicleType, postImage}
  return (
    <div className='PostLayout'>
      <PostHeading profilepicture = {postProfilePicture} username = {postUsername} userID={userID}/>
      <PostImage picture={postImage}/>
      <PostText postText = {postText}/>
      <PostInteractionTools postProfilePicture = {postProfilePicture} postUsername = {postUsername} userID={userID} postText={postText} postID={postID} postType={postType} vehicleType={vehicleType} postImage={postImage}/>
    </div>
  )
  }
}

function PostHeading({profilepicture, username, userID}){
  const [postOptionButtonClicked, setpostOptionButtonClicked] = useState(false);
  const navigate = useNavigate()

  function goToOtherProfile(){
    navigate("/OtherProfile", {state:{username, userID}})
     
  }

  return(
    <div className='PostHeadingLayout'>
      <img src={profilepicture} className = 'ProfilePictureMiniatureLayout'></img>
      <button className='PostUsernameButtonLayout' onClick={goToOtherProfile}><b>{username}</b></button>
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

function PostImage({picture}){
  const [pictureIndex, setPictureIndex] = useState(0)

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
             <button onClick={console.log("goToPrevPicture")}> <b> &lt; </b></button>
             <button onClick={console.log("goToNextPicture")}> <b> &gt; </b></button>
    </div>
  )
}

function PostText({postText}){
  return(
    <div>
        <p style={{overflow: 'hidden'}}>{postText}</p>
    </div>
  )
}

function PostInteractionTools({postProfilePicture, postUsername, userID, postText, postID, postType, vehicleType, postImage}){
  const navigate = useNavigate()
  const expanded = true;
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
  }

  return(
    
    <div>
      <ExpandButtonComponent/>
      <input className='PostCommentBoxLayout' type='text' placeholder='Comment' onChange={e => setCommentText(e.target.value)}></input>
      <button className='PostCommentButtonLayout' onClick = {handleComment}> <b> &gt; </b></button>
    </div>
  )

  function ExpandButtonComponent(){
    console.log("post ID in expand button comp of post is " + postID)
      return(
        <button className = 'PostExpandButtonLayout' onClick={() => navigate("/ExpandedPost", {state:{postProfilePicture, postUsername, userID, postText, postID, postType, vehicleType, postImage}})}><b>Expand</b></button>
      )
  }
}