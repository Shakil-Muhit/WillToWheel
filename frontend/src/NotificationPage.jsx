import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/NotificationPage.css'
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


export default function NotificationPage() {
  return (
    <div className='NotificationPageLayout'>
        <NavigationBar/>
        
        <div className='NotificationPageGridLayout'>
            <Notifications/>
        </div>
    </div>
  )
}

function Notifications(){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  return(
    <div className='NotificationPageNotificationsGridLayout'>
        <div className='NotificationPageHeader'>
          Notifications
        </div>

        <NotificationComponent username={"doraemon"}/>
    </div>
  )
}

function NotificationComponent({username}){
  return(
    <div className='NotificationComponentLayout'>
        <button className='NotificationComponentUsernameButtonLayout'>
            <div>
              {username}
            </div>
        </button>

        <div className='NotificationComponentTextLayout'>
               commented on

               <button className='NotificationComponentPostLinkLayout'>
                  your post
               </button>
        </div>
    </div>
  )
}