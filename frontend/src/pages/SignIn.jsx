import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  console.log(loading, error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      //console.log(data);
      {
        message: "User created successfully";
      }

      if (data.success === false) {
        dispatch(loginFailure(data));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form action="" className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 my-2 border border-gray-300 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 my-2 border border-gray-300 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 my-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-6 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-500 pt-5">
        {error ? error.message || "Something went wrong!" : " "}
      </p>
    </div>
  );
}
