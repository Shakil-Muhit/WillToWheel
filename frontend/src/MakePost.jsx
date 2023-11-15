import React from 'react'
import './styles/MakePost.css'
import { useState } from 'react'
import { useEffect } from 'react'


var csrf2, img_link;

export default function MakePost() {
  const [il, setil] = useState('')
  const [csrf, setcsrf] = useState()
//   useEffect(() => {
//   // console.log("abiaudaihd")
//   fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
//     console.log(response.status)
//     return response.json()}).then((data) => {
//         setcsrf({csrf: data.value})
//         // console.log(allposts)
//         csrf2= data
//     })

//     // fetch("http://127.0.0.1:8000/api/users/getcurrentuser").then((response) => {
//     // console.log(response.status)
//     // return response.json()}).then((data) => {
//     //     setil({il: 'http://127.0.0.1:8000/api/users' + data.profile_img})
//     //     img_link= 'http://127.0.0.1:8000/api/users' + data.profile_img
//     //     console.log("GG "+data.profile_img)
//     //     console.log(il)
//     //     console.log("HERE")
//     // })
// }, [])
  
    const [selectedImages, setSelectedImages] = useState()
    const [postType, setPostType] = useState("Sale")
    const [postText, setPostText] = useState("")
    const vehicleType = "SUV"


    function handlePostTYpeChange(e){
      setPostType(e.target.value)
      console.log(e.target.value)
    }

    const onSelectFile = (event) => {
      setSelectedImages(event.target.files[0])
      console.log(selectedImages)
      console.log("noob")
    }

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
      }
    
      
    
      function sendToDB(){
        const uploadData = new FormData();
        uploadData.append('post_img', selectedImages, selectedImages.name);
        uploadData.append('post_type', postType);
        uploadData.append('car_type', vehicleType);
        uploadData.append('body', postText);
        
        // console.log(csrf2.value)
        fetch("http://127.0.0.1:8000/api/users/getcsrf").then((response) => {
          console.log(response.status)
          return response.json()}).then((data) => {
              // setcsrf({csrf: data.value})
              // console.log(allposts)
              csrf2= data
              fetch('http://127.0.0.1:8000/api/posts/addpost', {
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
  
    return (
    <div className='MakePostLayout'>
      <textarea className='MakePostTextBoxLayout' placeholder='Enter Post Text' onChange={e => setPostText(e.target.value)}></textarea>
      
      {/* <button className="MakePostPageCancelButtonLayout" onClick={() => setMakePostButtonClicked(!makePostButtonClicked)}>Cancel</button> */}
      <button className='MakePostPagePostButtonLayout' onClick={sendToDB}>Make Post</button>

      <label>Post Type:</label>

      <select className = "PostTypeChooseButtonLayout" name="Post" id="PostType" onChange={handlePostTYpeChange}>
        <option value="Sale">Sale</option>
        <option value="Rent">Rent</option>
      </select>

      <label className='UploadImageLayout'>Change<input style = {{visibility: "hidden"}} type = 'file' name = 'images' onChange={onSelectFile}></input></label>
                 
      {/* <input type="file" multiple />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))} */}

      {/* <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div> */}


    </div>
  )
}
