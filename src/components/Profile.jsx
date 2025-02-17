
import {DSACard , Container} from "./index.js"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FancyLoader from "./FancyLoader.jsx"
import UnAuthorized from "../Pages/UnAuthorized.jsx";
import UserInfo from "./UserInfo.jsx";
const Profile = () => {
    const [data , setData] = useState();
    const [loading, setLoading] = useState(false);
    const dsaTopics = [
        {
            id:0,
            name : "Array",
            number : 0
        },
        {
            id:1,
            name : "Matrix",
            number : 0
        },
        {
            id:2,
            name : "String",
            number : 0
        },
        {
            id:3,
            name : "Searching and Sorting",
            number : 0
        },
        {
            id:4,
            name : "Linked List",
            number : 0
        },
        {
            id:5,
            name : "Binary Trees",
            number : 0
        },
        {
            id:6,
            name : "Bst",
            number : 0
        },
        {
            id:7,
            name : "Greedy",
            number : 0
        },
        {
            id:8,
            name : "Backtracking",
            number : 0
        },
        {
            id:9,
            name : "Stack and Queues",
            number : 0
        },
        {
            id:10,
            name : "Heap",
            number : 0
        },
        {
            id:11,
            name : "Graph",
            number : 0
        },
        {
            id:12,
            name : "Trie",
            number : 0
        },
        {
            id:13,
            name : "Dynamic Programing",
            number : 0
        }
    ]
    const topicNames = [
        "Array" , "Matrix" , "String" , "Searching and Sorting" , "Linked List" , "Binary Trees" , "Bst" , "Greedy" , "Backtracking" , "Stack and Queues" , "Heap" , "Graph" , "Trie" , "Dynamic Programing"
    ]

    // const authData = useSelector(state => state.auth.userData)
    //above can be done in future following is the temporary basis
    
    const role = localStorage.getItem("role")
    useEffect(() => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken")
        axios
          .post("https://dsa-tracker-backend-oo1y.onrender.com/users/profile" , {topicNames , 
            Authorization: `${accessToken}`} )
          .then((response) => {
            console.log("response-data: " , response.data.data)
            setData(response.data.data)
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data)
            setLoading(false);
          });
    } , [])
    {
        if(role === "Admin"){
            return <UnAuthorized></UnAuthorized>
        }
    }
    return <>
        {
            loading ? 
            // <div className="justify-self-center m-1"><Oval type="Oval" color="#000000" dark:color="#FFFFFF" height="50" width="100" /></div>
            <FancyLoader />
            : 
            <div className="grid grid-cols-[25%_75%] h-fit">
            {/* UserPersonal Info */}
            {/* <div className="border-2 rounded-md ml-1 dark:bg-black">
                <div className="justify-self-center mb-2 mt-1 dark:bg-white">
                    <FaRegCircleUser size="4em"/>
                </div>
                    <p className="mb-3 ml-1 dark:text-white text-2xl justify-self-center">Username</p>
                    <p className="ml-1 dark:text-white text-2xl">{data?.user?.username}</p>
                    <hr/>
                    <p className="mb-3 ml-1 dark:text-white text-2xl justify-self-center">Name</p>
                    <p className="ml-1 dark:text-white text-2xl">{data?.user?.fullname}</p>
                    <hr/>
                <div className="mb-3 ml-1 mt-1 dark:text-white text-2xl justify-self-center">
                    Email
                </div>
                    <a href={`mailto:${data?.user?.email}`} target="_blank" className="ml-1 dark:text-white text-2xl">{data?.user?.email}</a>
                    <hr />
                <div className="mb-3 ml-1 dark:text-white text-2xl justify-self-center">
                    CollegeName
                </div>
                    <p className="ml-1 dark:text-white text-2xl">{data?.user?.collegeName}</p>
                    <hr />
                <div className="mb-2 ml-1 dark:text-white text-2xl justify-self-center">
                    GFG Profile
                </div>
                <div className="justify-self-center">
                    <a href={`https://www.geeksforgeeks.org/user/${data?.user?.leetCodeId}/`} target="_blank"
                    className="ml-1 dark:text-white">
                        <img width="96" height="96" src="https://img.icons8.com/color/48/GeeksforGeeks.png" alt="GeeksforGeeks"/>
                    </a>
                </div>

            </div> */}
            <UserInfo data={data}/>

            {/* UserProgress */}
            <div className="grid border-2 rounded-md mr-1 dark:bg-black">
                <div className="pl-1 text-2xl mb-1 dark:text-white mt-2">
                    <h1>Total Problems Solved: {data?.totalProblems}</h1>
                </div>
                <hr />
                <div className="pl-1 text-2xl ">
                    <h1 className="mb-1 dark:text-white mt-1">Topics Covered on (DSA TRACKER)</h1>
                        <div className='flex flex-wrap'>
                            {dsaTopics?.map((dsaTopic) => (
                                    <div key={dsaTopic.id} className='p-2 w-1/4 hover:scale-110 transition duration-300 cursor-pointer'>
                                        <DSACard name={dsaTopic.name} number={data?.result[dsaTopic.id]} msg={"Problems solved"}/>
                                    </div>
                            ))}
                        </div>
                </div>
            </div>
            </div>
        }
    </>
}

export default Profile ;