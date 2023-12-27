import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePersent, setImagePersent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  //console.log(formData);
  //console.log(imagePersent);
  //console.log(image);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePersent(Math.round(progress));
      // console.log("Upload is " + progress + "% done");
      (error) => {
        setImageError(true);
      };
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      };
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    });
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-black font-semibold text-center my-7 ">
        Profile
      </h1>
      <form className="flex justify-center flex-col gap-4" action="">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          name=""
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.profilePicture}
          alt=""
          className="h-24 w-24 mt-2 self-center cursor-pointer rounded-full object-cover"
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePersent > 0 && imagePersent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePersent} %`}</span>
          ) : imagePersent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          name="username"
          id="username"
          placeholder="username"
          className="bg-slate-100 p-2 my-2 rounded-lg"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 p-2 my-2 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 p-2 my-2 rounded-lg"
        />
        <button className="bg-slate-700 text-white  p-2 my-2 rounded-lg hover:opacity-80 disabled:opacity-70 ">
          Update
        </button>
        <div className="flex justify-between mt-5">
          <button
            className="bg-red-700 text-white  p-2 my-2 rounded-lg hover:opacity-80 disabled:opacity-70 "
            type="submit"
          >
            Delete
          </button>
          <button
            className="bg-slate-700 text-white  p-2 my-2 rounded-lg hover:opacity-80 disabled:opacity-70 "
            type="submit"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
