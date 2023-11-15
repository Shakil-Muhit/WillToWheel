import React from 'react'
import NavigationBar from './NavigationBar'
import './styles/ExplorePage.css'
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


export default function ExplorePage() {
  const [allposts, setAllPosts] = useState([])
  // const[allfollowing, setAllFollowing] = useState([])

  useEffect(() => {
      console.log("abiaudaihd")
      fetch("/api/posts/allposts").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllPosts([...allposts, data])
            // console.log(allposts)
        })

      fetch("/api/users/getcurrentuser").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllFollowing([...allfollowing, data.following])
            console.log(data)
        })
  }, [])
  if(allposts.length > 0)
  {

    return (
      <div className='ExplorePageLayout'>
          <NavigationBar/>
          
          <div className='ExplorePageGridLayout'>
            <ColumnBar/>
  
            <Posts allposts={allposts}/>
          </div>
      </div>
    )
  }

  else{
    return(
      <div className='ExplorePageLayout'>
          <NavigationBar/>
          
          <div className='ExplorePageGridLayout'>
            <ColumnBar/>
          </div>
      </div>
    )
  }
  
}

function Posts({allposts}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]

  // // username, postText, postType, vehicleType, postImage
  // fields= ('id','author','body','is_reported','upvotes','downvotes','post_img')
  return(
    <div className='ExplorePagePostsGridLayout'>
      {allposts[0].map((postdetails) => (
              <Post userID = {postdetails.author} postText = {postdetails.body} postID = {postdetails.id} postType={postdetails.post_type} vehicleType={postdetails.car_type} postImage={postdetails.post_img}/>
            ))}
    </div>
  )
}

function ColumnBar() {
  const [makePostButtonClicked, setMakePostButtonClicked] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
          <div className='ColumnBarLayout'>
          
            <button className='SaleButtonLayout'>Sale</button>
            <button className='RentButtonLayout'>Rent</button>
          </div>

          <button className='ViewChatButtonLayout' onClick={() => navigate("/Chat")}>
            C
          </button>

          <button className='ViewNotificationButtonLayout' onClick={() => navigate("/Notification")} >
            *
          </button>

          <button className='MakePostButtonLayout' onClick={() => navigate("/MakePost")}>
            +
          </button>
    </div>

    
  )
}
