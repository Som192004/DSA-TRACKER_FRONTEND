// import axios from "axios";
// import { TopicList } from "../components/index.js";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {useSelector} from 'react-redux'
// import  {Oval}  from 'react-loader-spinner';
// import {FancyLoader} from "../components/index.js";
// const ProblemPage = () => {
//     const {topic} = useParams();
//     const authData = useSelector(state => state.auth.userData)
//     const accessToken = localStorage.getItem("accessToken") 
//     const [data , setData] = useState()
//     useEffect(() => {
//       const topicName = topic
//         axios
//           .post(`https://dsa-tracker-backend-oo1y.onrender.com/problems/get-problems-list/${topicName}` , {Authorization : accessToken })
//           .then((response) => {
//             console.log("response-data: " , response.data.data)
//             setData(response.data.data)
//           })
//           .catch((error) => {
//             console.error("Error fetching data:", error)
//           });
//     } , [])
//     {
//       if(data && data.length == 0){
//         return <h1 className="text-center text-3xl dark:bg-black dark:text-white p-6">
//           No Problems added for this topic
//         </h1>
//       }
//     }
//     return <>
//         {
//           data ? <TopicList data={data}/> : <FancyLoader />
//         }
        
//     </>
// }

// export default ProblemPage;

import axios from "axios";
import { TopicList } from "../components/index.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { FancyLoader } from "../components/index.js";

const ProblemPage = () => {
    const { topic } = useParams();
    const authData = useSelector(state => state.auth.userData);
    const accessToken = localStorage.getItem("accessToken");
    const [data, setData] = useState();

    useEffect(() => {
        const topicName = topic;
        axios
            .post(`https://dsa-tracker-backend-oo1y.onrender.com/problems/get-problems-list/${topicName}`, { Authorization: accessToken })
            .then((response) => {
                console.log("response-data: ", response.data.data);
                setData(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Responsive wrapper
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
            {
                data && data.length === 0 ? (
                    <h1 className="text-center text-2xl sm:text-3xl dark:bg-black dark:text-white py-6">
                        No Problems added for this topic
                    </h1>
                ) : (
                    data ? <TopicList data={data} /> : <FancyLoader />
                )
            }
        </div>
    );
};

export default ProblemPage;
