import React from 'react'
import './styles/Replies.css'
import { useState } from 'react'

export default function Replies({profilepicture, username}) {
    return (
        <>
        <div className='RepliesLayout'>
          <RepliesHeading profilepicture={profilepicture} username = {username}/>
          <RepliesText/>
        </div>
        
        <div>
            
        </div>
        </>
      )
    
      function RepliesHeading({profilepicture, username}){
        const [repliesOptionButtonClicked, setRepliesOptionButtonClicked] = useState(false);
        
        return(
          <div className='RepliesHeadingLayout'>
            <img src={profilepicture[0]} className = 'RepliesProfilePictureMiniatureLayout'></img>
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
    
      function RepliesText(){
        return(
            <div>
                Mara Khan Apni
            </div>
        )
      }
    }
