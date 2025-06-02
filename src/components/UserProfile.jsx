import { DSACard, Container } from "./index.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FancyLoader from "./FancyLoader.jsx";
import UnAuthorized from "../Pages/UnAuthorized.jsx";
import UserInfo from "./UserInfo.jsx";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

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
    { id: 13, name: "Dynamic Programing", number: 0 },
  ];

  const topicNames = [
    "Array",
    "Matrix",
    "String",
    "Searching and Sorting",
    "Linked List",
    "Binary Trees",
    "Bst",
    "Greedy",
    "Backtracking",
    "Stack and Queues",
    "Heap",
    "Graph",
    "Trie",
    "Dynamic Programing",
  ];

  const role = localStorage.getItem("role");
  const {username} = useParams();
  useEffect(() => {
    setLoading(true);
    
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post(`https://dsa-tracker-backend-oo1y.onrender.com/users/get-user-profile/${username}`, {
        topicNames,
        Authorization: `${accessToken}`,
      })
      .then((response) => {
        console.log("response-data: ", response.data.data);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
        setLoading(false);
      });
  }, []);

  if (role === "Admin") {
    return <UnAuthorized />;
  }

  return (
    <>
      {loading ? (
        <FancyLoader />
      ) : (
        <Container className="px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 h-fit">
            {/* User Progress */}
            <div className="border-2 rounded-lg p-4 dark:bg-black shadow-md">
              <div className="text-xl sm:text-2xl mb-4 dark:text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1>Total Problems Solved: {data?.totalProblems}</h1>
              </div>
  
              <hr className="border-gray-600 mb-4" />
  
              <div className="text-xl sm:text-2xl dark:text-white">
                <h1 className="mb-4">Topics Covered on (DSA TRACKER)</h1>
  
                <div className="flex flex-wrap gap-4">
                  {dsaTopics?.map((dsaTopic) => (
                    <div
                      key={dsaTopic.id}
                      className="w-full sm:w-[48%] lg:w-[23%] transition-transform duration-300 hover:scale-105"
                    >
                      <DSACard
                        name={dsaTopic.name}
                        number={data?.result[dsaTopic.id]}
                        msg={"Problems solved"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
  };

export default Profile;
