import React from 'react'
import './styles/Comment.css'
import { useState } from 'react'
import bugatti from './bugatti.jpg'
import Replies from './Replies'
import { useEffect } from 'react'

var csrf2

export default function Comment({commentUserID, commentText, commentID, postID, postUsername}) {
  const [commentUsername, setCommentUsername] = useState("")
  const [commentProfilePicture, setCommentProfilePicture] = useState()

  fetch("/api/users/getusername?id="+commentUserID).then((response) => {
    console.log(response.status)
    
    return response.json()}).then((data) => {
        // setAllFollowing([...allfollowing, data.following])
        console.log(data)
        console.log("/api/users/getuser?username="+data.name)
        fetch("/api/users/getuser?username="+data.name).then((response) => {
          console.log(response.status)
          return response.json()}).then((data2) => {
              // setAllFollowing([...allfollowing, data.following])
              console.log(data2)
              setCommentUsername(data2.username)
              setCommentProfilePicture('http://127.0.0.1:8000/api/users' + data2.profile_img)
          })
    })

    const [replyToComent, setReply] = useState("")
  
    const[allReplies, SetAllReplies] = useState([])

    const [name, SetName] = useState("")
    
    useEffect(() => {
    
    console.log("abiaudaihd")
    
    fetch("/api/posts/getcommentreplies?" + "comment_id=" + commentID).then((response) => {
      console.log(response.status)
      return response.json()}).then((data) => {
          SetAllReplies([...allReplies, data])
          // console.log(allposts)
      })
}, [])
  
  if(!commentUsername)
  {
    return(
      <div>

      </div>
    )
  }  
  else if(!allReplies){
  return (
    <>
    <div className='CommentLayout'>
      <CommentHeading profilepicture={commentProfilePicture} username = {commentUsername}/>
      <CommentText commentText = {commentText}/>
      <CommentInteractionTools commentUserID ={commentUserID} commentID={commentID} postID={postID} postUsername={postUsername} commentUsername = {commentUsername}/>
    </div>

    </>
  )
  }
  else {
    return (
      <>
      <div className='CommentLayout'>
        <CommentHeading profilepicture={commentProfilePicture} username = {commentUsername}/>
        <CommentText commentText = {commentText}/>
        <CommentInteractionTools commentUserID = {commentUserID} commentID={commentID} postID={postID} postUsername={postUsername} commentUsername = {commentUsername}/>
      </div>
  
      {/* repliesID, commentID, repliesText, repliesUserID, repliesUsername */}
  
  {/* 'id', 'comment', 'body', 'author', 'authorname' */}
      <div>
      {allReplies[0].map((postdetails) => (
                <Replies repliesID={postdetails.id} commentID={postdetails.comment} repliesText={postdetails.body} repliesUserID={postdetails.author} repliesUsername={postdetails.authorname}/>
              ))}
      </div>
      </>
    )
    }

  function CommentHeading({profilepicture, username}){
    const [commentOptionButtonClicked, setCommentOptionButtonClicked] = useState(false);
    
    return(
      <div className='CommentHeadingLayout'>
        <img src={profilepicture} className = 'CommentProfilePictureMiniatureLayout'></img>
        <button className='CommentUsernameButtonLayout'><b>{username}</b></button>
        <button className='CommentOptionButtonLayout' onClick={() => setCommentOptionButtonClicked(!commentOptionButtonClicked)}> :: </button>
        <CommentOptionDropdownMenu commentOptionButtonClicked = {commentOptionButtonClicked}/>
      </div>
    )
  }

  function CommentOptionDropdownMenu({commentOptionButtonClicked}){ 
    if(commentOptionButtonClicked){
      return(
        <div className='CommentOptionDropDownMenuLayout'>
          <button className='CommentOptionButtonLayout'>Edit Comment</button>
          <button className='CommentOptionButtonLayout'>Delete Comment</button>
        </div> 
      )
    }
  }

  function CommentText({commentText}){
    return(
        <div>
            {commentText}
        </div>
    )
  }

  function CommentInteractionTools({commentUserID, commentID, postID, postUsername, commentUsername}){
    const [replyText, setReplyText] = useState("")

    const handleReply = () => {
      
      console.log(commentID)
      console.log(commentUserID)      

      // const postData = {
      //     method: "POST",
      //     headers: {"Content-Type" : "application/json"},
      
      //     body: JSON.stringify({
      //       comment_id: commentID,
      //       body: replyText,
      //     })
      //   };
        const uploadData = new FormData();
        uploadData.append('comment_id', commentID);
        uploadData.append('body', replyText);
        
        fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
          console.log(response.status)
          return response.json()}).then((data) => {
              // setcsrf({csrf: data.value})
              // console.log(allposts)
              csrf2= data
              fetch('http://127.0.0.1:8000/api/posts/addreply', {
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
          uploadData2.append('receiver_name', commentUsername);
          uploadData2.append('notification_type', 2);
          console.log("COMMENTUSERNAME "+commentUsername)
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

        // fetch("/api/posts/addreply", postData).then((response) => response.json()).then((data) => console.log(data));
      
      }

    return(
      
      <div>
        <input className='CommentCommentBoxLayout' type='text' placeholder='Reply' onChange={e => setReplyText(e.target.value)}></input>
        <button className='CommentCommentButtonLayout' onClick={handleReply}> <b> -&gt; </b></button>
      </div>
    )
  }
}
