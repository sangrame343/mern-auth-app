import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-black font-semibold text-center my-7 ">
        Profile
      </h1>
      <form className="flex justify-center flex-col gap-4" action="">
        <img
          src={currentUser.profilePicture}
          alt=""
          className="h-24 w-24 mt-2 self-center cursor-pointer rounded-full object-cover"
        />
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
