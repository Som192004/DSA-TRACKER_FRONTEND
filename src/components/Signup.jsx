// import React, {useState} from 'react'
// import {Link ,useNavigate} from 'react-router-dom'
// // import {login} from '../store/authSlice'
// import {Button, Input, Logo} from './index.js'
// // import {useDispatch} from 'react-redux'
// import {useForm} from 'react-hook-form'
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import axios from 'axios';

// function Signup() {
//     const navigate = useNavigate()
//     const [error, setError] = useState("")
//     const [msg , setMsg] = useState("")
//     // const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()
//     const [msgOnBtn , setmsgOnBtn] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [data , setData] = useState("");
    
//     const create = async(data) => {
//         const {username , email , fullname , password , collegeName , leetCodeId} = data ; 
//         setError("")
//         setmsgOnBtn(true);
//           await axios
//           .post("http://localhost:8000/users/register" , {
//             username  ,
//             email , 
//             fullname ,
//             password ,
//             collegeName,
//             leetCodeId,
//           })
//           .then((response) => {
//             console.log("response-data: " , response.data)
//             setData(response.data)
//             setmsgOnBtn(false);
//             setMsg(response.data.message)
//           })
//           .catch((error) => {
//             setmsgOnBtn(false);
//             setError(error.message)
//             console.error("Error fetching data:", error.response.data)
//           });
//     }

//     const toggleVisibility = (e) => {
//       e.preventDefault();
//       setShowPassword(!showPassword);
//     };

//   return (
//     <div className="flex items-center justify-center dark:bg-black">
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-slate-700`}>
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60 dark:text-white">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
//                     >
//                         Sign In
//                     </Link>
//                 </p>

//                 {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
//                 {msg && <p className='text-green-400 mt-8 text-center'>{msg}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                         label="Username: "
//                         placeholder="Enter your username"
//                         {...register("username", {
//                             required: true,
//                         })}
//                         />
//                         <Input
//                         label="Full Name: "
//                         placeholder="Enter your full name"
//                         {...register("fullname", {
//                             required: true,
//                         })}
//                         />
//                         <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="College Name: "
//                         placeholder="Enter your College name"
//                         {...register("collegeName", {
//                             required: true,
//                         })}
//                         />

//                         <Input
//                         label="Password: "
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />

//                         <Input
//                         label="GFG Id: "
//                         placeholder="Enter your GFG Id"
//                         {...register("leetCodeId", {
//                             required: true,
//                         })}
//                         />
//                         <div className="flex justify-center">
//                           {showPassword ? 
//                             <button onClick={toggleVisibility} ><FaEyeSlash /></button>
//                           : 
//                             <button onClick={toggleVisibility}>
//                               <FaEye/>
//                             </button>
                            
//                           }
//                         </div>
//                         {msgOnBtn ? <button
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
//                   </button> :
//                             <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>}
//                     </div>
//                 </form>
                
//             </div>

//     </div>
//   )
// }

// export default Signup ;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Button, Input, Logo } from './index.js';

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [msgOnBtn, setmsgOnBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const create = async (data) => {
    const { username, email, fullname, password, collegeName, leetCodeId } = data;
    setError("");
    setmsgOnBtn(true);

    try {
      const response = await axios.post("https://dsa-tracker-backend-oo1y.onrender.com/users/register", {
        username, email, fullname, password, collegeName, leetCodeId
      });

      console.log("response-data:", response.data);
      setmsgOnBtn(false);
      setMsg(response.data.message);

      setTimeout(() => navigate("/login"), 2000);

    } catch (error) {
      setmsgOnBtn(false);
      setError(error.response?.data?.message || "Something went wrong!");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-6">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10 border border-gray-200 dark:border-gray-700 backdrop-blur-md"
      >
        {/* Logo */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-5 flex justify-center"
        >
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-3xl font-bold dark:text-white"
        >
          Create an Account
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-2 text-center text-gray-600 dark:text-gray-300"
        >
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </motion.p>

        {/* Error & Success Messages */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        {msg && <p className="text-green-500 mt-4 text-center">{msg}</p>}

        {/* Signup Form */}
        <motion.form 
          onSubmit={handleSubmit(create)} 
          className="mt-6 space-y-4"
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Input label="Username" placeholder="Enter your username" {...register("username", { required: true })} />
          <Input label="Full Name" placeholder="Enter your full name" {...register("fullname", { required: true })} />
          <Input label="Email" type="email" placeholder="Enter your email" {...register("email", { required: true })} />
          <Input label="College Name" placeholder="Enter your college name" {...register("collegeName", { required: true })} />

          {/* Password Field with Toggle */}
          <div className="relative">
            <Input label="Password" type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register("password", { required: true })} />
            <motion.button 
              type="button" 
              className="absolute right-4 top-10 text-gray-600 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
              whileTap={{ scale: 0.8 }}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </motion.button>
          </div>

          <Input label="GFG Id" placeholder="Enter your GFG Id" {...register("leetCodeId", { required: true })} />

          {/* Submit Button */}
          <div className="mt-6">
            <motion.button
              type="submit"
              className="w-full bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {msgOnBtn ? (
                <motion.svg 
                  className="animate-spin h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </motion.svg>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Signup;
