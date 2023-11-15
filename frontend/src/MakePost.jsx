import React from 'react'
import './styles/MakePost.css'
import { useState } from 'react'

export default function MakePost({makePostButtonClicked, setMakePostButtonClicked}) {
    const [selectedImages, setSelectedImages] = useState([])
    const [postType, setPostType] = useState("Sale")

    function handlePostTYpeChange(e){
      setPostType(e.target.value)
      console.log(e.target.value)
    }

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        console.log(selectedFiles);

        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file)=>{
            return URL.createObjectURL(file);
        })

        console.log(imagesArray)

        setSelectedImages(imagesArray);
    }

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
      }
    
      const [postText, setPostText] = useState("")
  
    return (
    <div className='MakePostLayout'>
      <textarea className='MakePostTextBoxLayout' placeholder='Enter Post Text' onChange={e => setPostText(e.target.value)}></textarea>
      
      <button className="MakePostPageCancelButtonLayout" onClick={() => setMakePostButtonClicked(!makePostButtonClicked)}>Cancel</button>
      <button className='MakePostPagePostButtonLayout' onClick={() => console.log(selectedImages)}>Make Post</button>

      <label>Post Type:</label>

      <select className = "PostTypeChooseButtonLayout" name="Post" id="PostType" onChange={handlePostTYpeChange}>
        <option value="Sale">Sale</option>
        <option value="Rent">Rent</option>
      </select>

      <label>Select Images<input style = {{  visibility: 'hidden'}} type = 'file' name = 'images' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp'></input></label>
      

      <input type="file" multiple />

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
        ))}

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
