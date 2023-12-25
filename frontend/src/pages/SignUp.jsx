import React from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 my-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 my-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 my-2 border border-gray-300 rounded-lg"
        />
        <button
          className="bg-slate-700 text-white p-3 my-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
          type="button"
        >
          Sign Up
        </button>

        <div className=" flex gap-6 mt-5">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
