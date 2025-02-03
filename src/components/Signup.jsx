import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
// import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
// import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [msg , setMsg] = useState("")
    // const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [msgOnBtn , setmsgOnBtn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data , setData] = useState("");
    
    const create = async(data) => {
        const {username , email , fullname , password , collegeName , leetCodeId} = data ; 
        setError("")
        setmsgOnBtn(true);
          await axios
          .post("http://localhost:8000/users/register" , {
            username  ,
            email , 
            fullname ,
            password ,
            collegeName,
            leetCodeId,
          })
          .then((response) => {
            console.log("response-data: " , response.data)
            setData(response.data)
            setmsgOnBtn(false);
            setMsg(response.data.message)
          })
          .catch((error) => {
            setmsgOnBtn(false);
            setError(error.message)
            console.error("Error fetching data:", error.response.data)
          });
    }

    const toggleVisibility = (e) => {
      e.preventDefault();
      setShowPassword(!showPassword);
    };

  return (
    <div className="flex items-center justify-center dark:bg-black">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-slate-700`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-white">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline dark:text-white"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                {msg && <p className='text-green-400 mt-8 text-center'>{msg}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Username: "
                        placeholder="Enter your username"
                        {...register("username", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("fullname", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="College Name: "
                        placeholder="Enter your College name"
                        {...register("collegeName", {
                            required: true,
                        })}
                        />

                        <Input
                        label="Password: "
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />

                        <Input
                        label="LeetCode Id: "
                        placeholder="Enter your LeetCode Id"
                        {...register("leetCodeId", {
                            required: true,
                        })}
                        />
                        <div className="flex justify-center">
                          {showPassword ? 
                            <button onClick={toggleVisibility} ><FaEyeSlash /></button>
                          : 
                            <button onClick={toggleVisibility}>
                              <FaEye/>
                            </button>
                            
                          }
                        </div>
                        {msgOnBtn ? <button
                    type="button"
                    className="w-full bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2"
                    disabled
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
                  </button> :
                            <Button type="submit" className="w-full">
                            Create Account
                        </Button>}
                    </div>
                </form>
                
            </div>

    </div>
  )
}

export default Signup ;