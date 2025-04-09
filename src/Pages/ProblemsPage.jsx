// import { useEffect, useState } from "react";
// import { Container} from "../components/index.js";
// import {DSACard} from "../components/index.js";
// import axios from "axios"
// import {useSelector} from 'react-redux'
// import { Outlet } from "react-router-dom";
// import UnAuthorized from "./UnAuthorized";
// import {FancyLoader} from "../components/index.js";
// const ProblemsPage = () => {
//     const dsaTopics = [
//         {
//             id:0,
//             name : "Array",
//             number : 0
//         },
//         {
//             id:1,
//             name : "Matrix",
//             number : 0
//         },
//         {
//             id:2,
//             name : "String",
//             number : 0
//         },
//         {
//             id:3,
//             name : "Searching and Sorting",
//             number : 0
//         },
//         {
//             id:4,
//             name : "Linked List",
//             number : 0
//         },
//         {
//             id:5,
//             name : "Binary Trees",
//             number : 0
//         },
//         {
//             id:6,
//             name : "Bst",
//             number : 0
//         },
//         {
//             id:7,
//             name : "Greedy",
//             number : 0
//         },
//         {
//             id:8,
//             name : "Backtracking",
//             number : 0
//         },
//         {
//             id:9,
//             name : "Stack and Queues",
//             number : 0
//         },
//         {
//             id:10,
//             name : "Heap",
//             number : 0
//         },
//         {
//             id:11,
//             name : "Graph",
//             number : 0
//         },
//         {
//             id:12,
//             name : "Trie",
//             number : 0
//         },
//         {
//             id:13,
//             name : "Dynamic Programing",
//             number : 0
//         }
//     ]
//     const [data , setData] = useState(dsaTopics);
//     const accessToken = localStorage.getItem("accessToken")
//     const role = localStorage.getItem("role") 
//     const [loading , setLoading] = useState(true)
//     useEffect(() => {
//         axios
//           .post("https://dsa-tracker-backend-oo1y.onrender.com/problems/problem-numbers" , {
//             dsaTopics , Authorization : accessToken })
//           .then((response) => {
//             console.log("response-data: " , response.data.data)
//             setData(response.data.data)
//             setLoading(false)
//           })
//           .catch((error) => {
//             console.error("Error fetching data:", error.response.data)
//           });
//     } ,[])
//         {
//             if(role === "Admin"){
//                 return <UnAuthorized></UnAuthorized>
//             }
//         }

//         {
//             if(loading){
//                 return <FancyLoader />
//             }
//         }
//     return <>
//         <div className="w-full py-8 text-center dark:bg-black">
//                 <Container>
//                     <div className='flex flex-wrap'>
//                         {data?.map((dsaTopic) => (
//                                 <div key={dsaTopic.id} className='p-2 w-1/4 hover:scale-110 transition duration-300 cursor-pointer'>
//                                     <DSACard name={dsaTopic.name} number={dsaTopic.number} msg={"Total Problems"}/>
//                                 </div>
//                         ))}
//                     </div>
//                 </Container>
//             </div>
        
//     </>
// }

// export default ProblemsPage ; 

import { useEffect, useState } from "react";
import { Container } from "../components/index.js";
import { DSACard } from "../components/index.js";
import axios from "axios";
import { useSelector } from "react-redux";
import UnAuthorized from "./UnAuthorized";
import { FancyLoader } from "../components/index.js";

const ProblemsPage = () => {
  const dsaTopics = [
    { id: 0, name: "Array", number: 0 },
    { id: 1, name: "Matrix", number: 0 },
    { id: 2, name: "String", number: 0 },
    { id: 3, name: "Searching and Sorting", number: 0 },
    { id: 4, name: "Linked List", number: 0 },
    { id: 5, name: "Binary Trees", number: 0 },
    { id: 6, name: "Bst", number: 0 },
    { id: 7, name: "Greedy", number: 0 },
    { id: 8, name: "Backtracking", number: 0 },
    { id: 9, name: "Stack and Queues", number: 0 },
    { id: 10, name: "Heap", number: 0 },
    { id: 11, name: "Graph", number: 0 },
    { id: 12, name: "Trie", number: 0 },
    { id: 13, name: "Dynamic Programing", number: 0 }
  ];

  const [data, setData] = useState(dsaTopics);
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("https://dsa-tracker-backend-oo1y.onrender.com/problems/problem-numbers", {
        dsaTopics,
        Authorization: accessToken
      })
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response?.data);
      });
  }, []);

  if (role === "Admin") {
    return <UnAuthorized />;
  }

  if (loading) {
    return <FancyLoader />;
  }

  return (
    <div className="w-full py-8 text-center dark:bg-black">
      <Container>
        {/* 👇 Responsive Card Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {data?.map((dsaTopic) => (
            <div
              key={dsaTopic.id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:scale-110 transition duration-300 cursor-pointer"
            >
              <DSACard
                name={dsaTopic.name}
                number={dsaTopic.number}
                msg={"Total Problems"}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProblemsPage;
