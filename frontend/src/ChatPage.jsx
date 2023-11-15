import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/ChatPage.css'
import './styles/ColumnBar.css'
import Post from './Post'
import merc from './merc.jpg'
import ferrari from './ferrari.jpg'
import aston from './aston.jpg'
import bugatti from './bugatti.jpg'
import agera from './agera.jpg'
import chevrolet from './chevrolet.jpg'
import { useState } from 'react'
import MakePost from './MakePost'
import { useNavigate } from 'react-router-dom'


export default function ChatPage() {
  return (
    <div className='ChatPageLayout'>
        <NavigationBar/>
        
        <div className='ChatPageGridLayout'>
            <Chats/>
        </div>
    </div>
  )
}

function Chats(){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  return(
    <div className='ChatPageChatsGridLayout'>
        <div className='ChatPageHeader'>
          Chats
        </div>

        <ChatComponent username={"doraemon"}/>
    </div>
  )
}

function ChatComponent({username}){
  const navigate = useNavigate()

  return(
    <div className='ChatComponentLayout'>
        <button className='ChatComponentUsernameButtonLayout' onClick={() => navigate("/Conversation")}>
            <div>
              {username}
            </div>
        </button>
    </div>
  )
}