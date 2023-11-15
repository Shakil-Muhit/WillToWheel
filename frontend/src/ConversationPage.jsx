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


export default function ConversationPage() {
  return (
    <div className='ConversationPageLayout'>
        <NavigationBar/>
        
        <div className='ConversationPageGridLayout'>
            <Conversations/>
        </div>
    </div>
  )
}

function Conversations(){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  return(
    <div className='ConversationPageConversationsGridLayout'>
        <div className='ConversationPageHeader'>
          Doraemon
        </div>

        <ConversationComponent username={"doraemon"}/>
    </div>
  )
}

function ConversationComponent({username}){
  return(
    <div>
      <div className='ConversationComponentReceiverComponentLayout'>
              This is a receiver component
      </div>

      <div className='ConversationComponentSenderComponentLayout'>
              This is a sender component
      </div>

      <div className='ConversationComponentReceiverComponentLayout'>
              This is a receiver component
      </div>

      <div className='ConversationComponentSenderComponentLayout'>
              This is a sender component
      </div>
    </div>
  )
}