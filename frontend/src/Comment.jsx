import React from 'react'
import './styles/Comment.css'
import { useState } from 'react'
import bugatti from './bugatti.jpg'
import Replies from './Replies'

export default function Comment({profilepicture, username}) {
    return (
    <>
    <div className='CommentLayout'>
      <CommentHeading profilepicture={profilepicture} username = {username}/>
      <CommentText/>
      <CommentInteractionTools/>
    </div>

    <div>
        <Replies profilepicture={bugatti} username = {"doraemon"}/>
    </div>
    </>
  )

  function CommentHeading({profilepicture, username}){
    const [commentOptionButtonClicked, setCommentOptionButtonClicked] = useState(false);
    
    return(
      <div className='CommentHeadingLayout'>
        <img src={profilepicture[0]} className = 'CommentProfilePictureMiniatureLayout'></img>
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

  function CommentText(){
    return(
        <div>
            Bhai eitar daam komano jabe?
        </div>
    )
  }

  function CommentInteractionTools(){
    const [replyText, setReplyText] = useState("")
    return(
      
      <div>
        <input className='CommentCommentBoxLayout' type='text' placeholder='Reply' onChange={e => setReplyText(e.target.value)}></input>
        <button className='CommentCommentButtonLayout' onClick={() => console.log(replyText)}> <b> -&gt; </b></button>
      </div>
    )
  }
}
