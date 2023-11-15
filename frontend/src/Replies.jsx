import React from 'react'
import './styles/Replies.css'
import { useState } from 'react'
import chevrolet from './chevrolet.jpg'
import { useEffect } from 'react'

export default function Replies({repliesID, commentID, repliesText, repliesUserID, repliesUsername}) {
  const [repliesProfilePicture, setRepliesProfilePicture] = useState()
  
  fetch("/api/users/getusername?id="+repliesUserID).then((response) => {
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
              
              setRepliesProfilePicture('http://127.0.0.1:8000/api/users' + data2.profile_img)
          })
    })
  
  return (
        <>
        <div className='RepliesLayout'>
          <RepliesHeading profilepicture={repliesProfilePicture} username = {repliesUsername}/>
          <RepliesText repliesText={repliesText}/>
        </div>
        
        <div>
            
        </div>
        </>
      )
    
      function RepliesHeading({profilepicture, username}){
        const [repliesOptionButtonClicked, setRepliesOptionButtonClicked] = useState(false);
        
        return(
          <div className='RepliesHeadingLayout'>
            <img src={profilepicture} className = 'RepliesProfilePictureMiniatureLayout'></img>
            <button className='RepliesUsernameButtonLayout'><b>{username}</b></button>
            <button className='RepliesOptionButtonLayout' onClick={() => setRepliesOptionButtonClicked(!repliesOptionButtonClicked)}> :: </button>
            <RepliesOptionDropdownMenu repliesOptionButtonClicked = {repliesOptionButtonClicked}/>
          </div>
        )
      }
    
      function RepliesOptionDropdownMenu({repliesOptionButtonClicked}){ 
        if(repliesOptionButtonClicked){
          return(
            <div className='RepliesOptionDropDownMenuLayout'>
              <button className='RepliesOptionButtonLayout'>Edit Reply</button>
              <button className='RepliesOptionButtonLayout'>Delete Reply</button>
            </div> 
          )
        }
      }
    
      function RepliesText({repliesText}){
        return(
            <div>
                {repliesText}
            </div>
        )
      }
    }
