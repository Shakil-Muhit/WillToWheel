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
import { useEffect } from 'react'


export default function ChatPage() {
  const [allChats, setAllChats] = useState([])
  // const[allfollowing, setAllFollowing] = useState([])

  useEffect(() => {
      console.log("abiaudaihd")
      fetch("/api/posts/getcurrentuserchats").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllChats([...allChats, data])
            // console.log(allposts)
        })
  }, [])

  if(allChats.length > 0){
  return (
    <div className='ChatPageLayout'>
        <NavigationBar/>
        
        <div className='ChatPageGridLayout'>
            <Chats allChats={allChats}/>
        </div>
    </div>
  )
  }
  else{
    return(
      <div className='ChatPageLayout'>
        <NavigationBar/>
        
    </div>
    )
  }
}

function Chats({allChats}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  return(
    <div className='ChatPageChatsGridLayout'>
        <div className='ChatPageHeader'>
          Chats
        </div>

        {allChats[0].map((postdetails) => (
              <ChatComponent  chatID = {postdetails.id} chatTexter={postdetails.texter} />
            ))}
    </div>
  )
}



function ChatComponent({chatID, chatTexter}){
  const navigate = useNavigate()

  const username = chatTexter

  function handleChat(){
    navigate("/Conversation", {state:{username, chatID}})
  }

  return(
    <div className='ChatComponentLayout'>
        <button className='ChatComponentUsernameButtonLayout' onClick={handleChat}>
            <div>
              {chatTexter}
            </div>
        </button>
    </div>
  )
}