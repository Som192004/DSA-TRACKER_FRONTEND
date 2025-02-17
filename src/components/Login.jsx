// import React, {useState} from 'react'

// import {Link, useNavigate} from 'react-router-dom'
// import {Button, Input, Logo} from "./index"
// import {useDispatch} from "react-redux"
// import {useForm} from "react-hook-form"
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import axios from 'axios';
// import {login as authLogin} from "../store/authSlice"
// import Dropdown from "./Dropdown"
// function Login() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {register, handleSubmit} = useForm();
//     const [error, setError] = useState("");
//     const [msgOnBtn , setmsgOnBtn] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [data , setData] = useState("");
//     const [msg , setMsg] = useState("");
//     const [showRole , setShowRole] = useState(false)
    
//     const login = async (data) => {
//       const { email, password } = data;
//       setError("");
//       setmsgOnBtn(true);
      
//       try {
//         const role = localStorage.getItem("role")
//         if(role === "User"){
//           const response = await axios.post(
//             "http://localhost:8000/users/login",
//             { email, password },
//           );
//           localStorage.setItem('accessToken', response.data.data.accessToken);
//           dispatch(
//             authLogin({
//               userData: response.data.data.accessToken,
//             })
//           );
//           setMsg("Login successful!");
//           setmsgOnBtn(false);
//         }
//         else{
//           const response = await axios.post(
//             "http://localhost:8000/admin/login",
//             { email, password },
//           );
//           localStorage.setItem('accessToken', response.data.data.accessToken);
//           dispatch(
//             authLogin({
//               userData: response.data.data.accessToken,
//             })
//           );
//           setMsg("Login successful!");
//           setmsgOnBtn(false);
//         }
//         navigate("/")
        
//       } catch (error) {
//         setError("Invalid Credentials or Selected the wrong role");
//         setmsgOnBtn(false);
        
//       }
//     };
//     const toggleVisibility = (e) => {
//       e.preventDefault();
//       setShowPassword(!showPassword);
//     };

//   return (
//     <div
//     className='flex items-center justify-center w-full dark:bg-black'
//     >
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-slate-700`}>
//         <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">Sign in to your account</h2>
//         <p className="mt-2 text-center text-base text-black/60 dark:text-white">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
//                     >
//                         Sign Up
//                     </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         {msg && <p className='text-green-400 mt-8 text-center'>{msg}</p>}

//         <form className='mt-8' onSubmit={handleSubmit(login)}>
//             <div className='space-y-5'>
//                 <Input
//                 label="Email: "
//                 placeholder="Enter your email"
//                 type="email"
//                 {...register("email", {
//                     required: true,
//                     validate: {
//                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                         "Email address must be a valid address",
//                     }
//                 })}
//                 />
//                 <Input
//                 label="Password: "
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 {...register("password", {
//                     required: true,
//                 })}
//                 />
//                 <div className="flex justify-center">
//                   {showPassword ? 
//                     <button onClick={toggleVisibility} ><FaEyeSlash /></button>
//                           : 
//                     <button onClick={toggleVisibility}><FaEye/></button>
//                   }
//                 </div>
//                 <Dropdown />
//                 {
//                     msgOnBtn ? <button
//                     type="button"
//                     className="w-full bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2"
//                     disabled
//                   >
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8H4z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </button>
//                    : <Button
//                    type="button"
//                 className="w-full"
//                 > Sign in </Button>
//                 }
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Login ;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { login as authLogin } from "../store/authSlice";
import Dropdown from "./Dropdown";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [msgOnBtn, setMsgOnBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");

  const login = async (data) => {
    const { email, password } = data;
    setError("");
    setMsgOnBtn(true);

    try {
      const role = localStorage.getItem("role");
      const endpoint = role === "User" ? "users/login" : "admin/login";
      const response = await axios.post(`https://dsa-tracker-backend-oo1y.onrender.com/${endpoint}`, {
        email,
        password,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);
      dispatch(authLogin({ userData: response.data.data.accessToken }));
      setMsg("Login successful!");
      setMsgOnBtn(false);
      navigate("/");
    } catch (error) {
      setError("Invalid Credentials or Selected the wrong role");
      setMsgOnBtn(false);
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full min-h-screen dark:bg-black px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-slate-700 shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo with animation */}
        <motion.div
          className="mb-2 flex justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </motion.div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">
          Sign in to your account
        </h2>

        {/* Signup Link */}
        <p className="mt-2 text-center text-base text-black/60 dark:text-white">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
          >
            Sign Up
          </Link>
        </p>

        {/* Error or Success Messages */}
        {error && (
          <motion.p
            className="text-red-600 mt-4 text-center"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        {msg && (
          <motion.p
            className="text-green-400 mt-4 text-center"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg}
          </motion.p>
        )}

        {/* Login Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit(login)}>
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          {/* Password Input with Visibility Toggle */}
          <div className="relative">
            <Input
              label="Password: "
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <motion.button
              onClick={toggleVisibility}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-white"
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.button>
          </div>

          {/* Role Selection */}
          <Dropdown />

          {/* Submit Button with Loader */}
          {msgOnBtn ? (
            <motion.button
              type="button"
              className="w-full bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2"
              disabled
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Login;


