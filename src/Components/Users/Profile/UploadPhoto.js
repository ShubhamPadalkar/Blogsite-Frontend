import React, { useRef } from "react";
import { UploadIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { updateProfilePhotoAction } from "../../redux/reducers/profileSlice";

const UploadPhoto = () => {
  const dispatch = useDispatch()
  const fileRef = useRef()

  const handleFileUpload = (event) => {
    const imageFile = event.target.files[0]
    if (imageFile?.type === 'image/jpeg' || imageFile?.type === 'image/png' || imageFile?.type === 'image/jpg')
    { dispatch(updateProfilePhotoAction(imageFile))}
    else {
      alert('Select image file only..!')
    }
  }

  return (
    <>
    <input
          onChange={(event)=>handleFileUpload(event)}
          ref={fileRef}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
    <button
      className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      onClick={()=>fileRef.current.click()}
    >
      <UploadIcon
        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <span>Upload Photo</span>
    </button>
    </>
  );
};

export default UploadPhoto;
