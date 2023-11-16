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
import { useEffect } from 'react'

export default function NotificationPage() {

  const [allNottifications, setAllNotifications] = useState([])
  // const[allfollowing, setAllFollowing] = useState([])

  useEffect(() => {
      console.log("abiaudaihd")
      fetch("/api/posts/getcurrentusernotifications").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllNotifications([...allNottifications, data])
            // console.log(allposts)
        })
  }, [])

  if(allNottifications.length > 0){
  return (
    <div className='NotificationPageLayout'>
        <NavigationBar/>
        
        <div className='NotificationPageGridLayout'>
            <Notifications allNottifications={allNottifications}/>
        </div>
    </div>
  )
  }

  else{
    return(
      <div className='NotificationPageLayout'>
        <NavigationBar/>
        
    </div>
    )
  }
}

function Notifications({allNottifications}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  return(
    <div className='NotificationPageNotificationsGridLayout'>
        <div className='NotificationPageHeader'>
          Notifications
        </div>

        {allNottifications[0].map((postdetails) => (
              <NotificationComponent postID = {postdetails.post_id} notifier = {postdetails.notifier} notificationID = {postdetails.id} notificationType={postdetails.notification_type}/>
            ))}
    </div>
  )
}

function NotificationComponent({postID, notifier, notificationID, notificationType}){
  console.log("Notification type " + notificationType)

  if(notificationType == 3){
    return(
      <div className='NotificationComponentLayout'>
        <button className='NotificationComponentUsernameButtonLayout'>
            <div>
              {notifier}
            </div>
        </button>

        <div className='NotificationComponentTextLayout'>
               has followed you
        </div>
    </div>
    )
  }
  
  else if(notificationType == 1){
    return(
      <div className='NotificationComponentLayout'>
          <button className='NotificationComponentUsernameButtonLayout'>
              <div>
                {notifier}
              </div>
          </button>
  
          <div className='NotificationComponentTextLayout'>
                 has commented on
  
                 <button className='NotificationComponentPostLinkLayout'>
                    your post
                 </button>
          </div>
      </div>
    )
  }

  return(
    <div className='NotificationComponentLayout'>
        <button className='NotificationComponentUsernameButtonLayout'>
            <div>
              {notifier}
            </div>
        </button>

        <div className='NotificationComponentTextLayout'>
               replied to your comment on

               <button className='NotificationComponentPostLinkLayout'>
                  this post
               </button>
        </div>
    </div>
  )
}