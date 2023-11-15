import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/ProfilePage.css'
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

import CSRFToken from './csrftoken';

var csrf2, img_link;

export default function ProfilePage({username}) {
    const location = useLocation();
    const [csrf, setcsrf] = useState()
    const [il, setil] = useState('')
    useEffect(() => {
      // console.log("abiaudaihd")
      fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setcsrf({csrf: data.value})
            // console.log(allposts)
            csrf2= data
        })

        fetch("http://127.0.0.1:8000/api/users/getcurrentuser").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setil({il: 'http://127.0.0.1:8000/api/users' + data.profile_img})
            img_link= 'http://127.0.0.1:8000/api/users' + data.profile_img
            console.log("GG "+data.profile_img)
            console.log(il)
            console.log("HERE")
        })
  }, [])
  
  if(!il)return null;
  return (
    <div className='ProfilePageLayout'>
        <NavigationBar/>
        
        <div className='ProfilePageGridLayout'>
          <ColumnBar/>

          <Posts username ={location.state.username} imglink= {il}/>
        </div>
    </div>
  )
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// function getCookie(name) {
//   var cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//       var cookies = document.cookie.split(';');
//       for (var i = 0; i < cookies.length; i++) {
//           var cookie = jQuery.trim(cookies[i]);
//           if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// }

// var csrftoken = getCookie('csrftoken');

function Posts({username}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]
  return(
    <div className='ProfilePagePostsGridLayout'>
      <ProfileCard username = {username}/>

      <div style={{marginLeft: "900px"}}>
            <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
            <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
            <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
            <Post profilepicture = {profilepicture} pictures ={picturearray} username = {"doraemon"} isExpanded = {false}/>   
      </div>
           
    </div>
  )
}

function ProfileInteractionTools({flag}){
    return(
        <div>
            <EditProfileSection flag={flag}/>
            <FollowAndChatButtons flag={flag}/>
        </div>
    )
}

function EditProfileSection({flag}){
    const [selectedImages, setSelectedImages] = useState()

    const onSelectFile = (event) => {
        setSelectedImages(event.target.files[0])
        console.log(selectedImages)
        console.log("bryuh")
    }

    function sendToDB(){
        const uploadData = new FormData();
        uploadData.append('profile_img', selectedImages, selectedImages.name);
        console.log(csrf2.value)
        
        fetch('http://127.0.0.1:8000/api/users/updatedp', {
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
    }

    if(flag){
        return(
            <div style={{marginLeft: "250px"}}>
                {/* <form action="http://127.0.0.1:8000/api/users/updatedp" method= "post">
                  <CSRFToken /> */}
                  <label className='UploadImageLayout'>Change<input style = {{visibility: "hidden"}} type = 'file' name = 'images' onChange={onSelectFile}></input></label>
                  <button className='ProfileInteractionButtonsLayout'>Change Bio</button>
                  <button onClick={sendToDB}>Submit</button>
                {/* </form> */}
            </div>
        )
    }
}

function FollowAndChatButtons({flag}){
    if(!flag){
        return(
            <div style={{marginLeft: "230px"}}>
                <button className='ProfileInteractionButtonsLayout'>Follow</button>
                <button className='ProfileInteractionButtonsLayout'>Send a Message</button>
            </div>
        )
    }
}

function ProfileCard({username}, {imglink}){
    console.log("THERE")
    console.log({img_link})
    return(
        <div className='ProfileCardLayout'>
            <img src={img_link} className='ProfilePictureLayout'></img>
            <text style={{marginLeft: "380px"}}>{username}</text>
            <ProfileInteractionTools flag={true}/>
            <h1 style = {{marginLeft: "390px"}}>Bio</h1>
            <text className='ProfileBioLayout'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet provident distinctio ipsa, aspernatur fuga consectetur corporis beatae explicabo nulla doloribus quidem commodi, deleniti, quae ipsum officia maiores velit omnis. Accusantium?</text>
      </div>
    )
}

function ColumnBar() {
  const [makePostButtonClicked, setMakePostButtonClicked] = useState(false)
  
  

  return (
    <div>
          <div className='ColumnBarLayout'>
          
            <button className='SaleButtonLayout'>Sale</button>
            <button className='RentButtonLayout'>Rent</button>
          </div>

          <button className='MakePostButtonLayout' onClick={() => setMakePostButtonClicked(!makePostButtonClicked)}>
            +
          </button>
    
          <MakePostHandleComponent makePostButtonClicked={makePostButtonClicked} setMakePostButtonClicked = {setMakePostButtonClicked}/>
    </div>

    
  )
}

function MakePostHandleComponent({makePostButtonClicked, setMakePostButtonClicked}){
  if(makePostButtonClicked){
    return(
      <MakePost makePostButtonClicked = {makePostButtonClicked} setMakePostButtonClicked = {setMakePostButtonClicked}/>
    )
  }
}