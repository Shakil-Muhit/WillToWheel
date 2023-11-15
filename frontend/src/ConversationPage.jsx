import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/ConversationPage.css'
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
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function ConversationPage({username, chatID}) {
  const location = useLocation();

  const [allChatTexts, setAllChatTexts] = useState([])
  // const[allfollowing, setAllFollowing] = useState([])

  useEffect(() => {
      console.log("abiaudaihd")
      fetch("/api/posts/getchattexts?chat_id="+location.state.chatID).then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllChatTexts([...allChatTexts, data])
            // console.log(allposts)
        })
  }, [])

  console.log("Conversations username " + location.state.username)

  if(allChatTexts.length > 0){
  return (
    <div className='ConversationPageLayout'>
        <NavigationBar/>
        
        <div className='ConversationPageGridLayout'>
            <Conversations texter={location.state.username} allChatTexts = {allChatTexts}/>
        </div>
    </div>
  )
  }

  else{
    return(
      <div className='ConversationPageLayout'>
        <NavigationBar/>
        
    </div>
    )
  }
}

var csrf2
function Conversations({texter, allChatTexts}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]
  const [chatText, setChatText] = useState("")

  function handleSubmit(){
    const uploadData = new FormData();

    console.log("texter " + texter)

    uploadData.append('texter', texter);
    uploadData.append('body', chatText);
    fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
          console.log(response.status)
          return response.json()}).then((data) => {
              // setcsrf({csrf: data.value})
              // console.log(allposts)
              csrf2= data
              fetch('http://127.0.0.1:8000/api/posts/addchattext', {
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
    <div className='ConversationPageConversationsGridLayout'>
        <div className='ConversationPageHeader'>
          {texter}
        </div>

        <div>
          <textarea placeholder='Enter a Text' onChange={e => setChatText(e.target.value)}></textarea>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        
        
        {allChatTexts[0].map((postdetails) => (
              <ConversationComponent chatText = {postdetails.body} chatPerson = {postdetails.person} chatTextID = {postdetails.id} texter = {texter}/>
            ))}
    </div>
  )
}


function ConversationComponent({chatText, chatPerson, chatTextID, texter}){
  
  if(chatPerson == 1)
  return(
    <div>
      {/* <div className='ConversationComponentReceiverComponentLayout'>
              This is a receiver component
      </div> */}

      <div className='ConversationComponentSenderComponentLayout'>
              {chatText}
      </div>

      {/* <div className='ConversationComponentReceiverComponentLayout'>
              This is a receiver component
      </div>

      <div className='ConversationComponentSenderComponentLayout'>
              This is a sender component
      </div> */}
    </div>
  )

  else{
    return(
      <div>
          <div className='ConversationComponentReceiverComponentLayout'>
              {chatText}
      </div>
      </div>
    )
  }
}