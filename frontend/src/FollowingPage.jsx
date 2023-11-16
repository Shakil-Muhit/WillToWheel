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
import './styles/FollowingPage.css'
import { useEffect } from 'react'

export default function FollowingPage() {
  const [allposts, setAllPosts] = useState([])
  // const[allfollowing, setAllFollowing] = useState([])

  useEffect(() => {
      console.log("abiaudaihd")
      fetch("/api/users/getcommunityposts").then((response) => {
        console.log(response.status)
        return response.json()}).then((data) => {
            setAllPosts([...allposts, data])
            // console.log(allposts)
        })

  }, [])

  if(allposts.length > 0){
  return (
    <div className='FollowingPageLayout'>
        <NavigationBar/>
        
        <div className='FollowingPageGridLayout'>
          <ColumnBar/>

          <Posts allposts={allposts}/>
        </div>
    </div>
  )
}
else{
  return(
    <div className='FollowingPageLayout'>
        <NavigationBar/>
        
        <div className='FollowingPageGridLayout'>
          <ColumnBar/>
        </div>
    </div>
  )
}
}


function Posts({allposts}){
  const profilepicture = [aston]
  const picturearray = [merc, bugatti, ferrari]
  return(
    <div className='FollowingPagePostsGridLayout'>
      {allposts[0].map((postdetails) => (
              <Post userID = {postdetails.author} postText = {postdetails.body} postID = {postdetails.id} postType={postdetails.post_type} vehicleType={postdetails.car_type} postImage={postdetails.post_img}/>
            ))}
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