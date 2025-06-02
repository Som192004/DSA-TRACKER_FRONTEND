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
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 md:gap-2 h-fit p-2 dark:bg-black">
          {/* User Info */}
          <UserInfo data={data} />

          {/* User Progress */}
          <div className="grid border-2 rounded-md p-2 dark:bg-black">
            <div className="text-xl sm:text-2xl mb-1 dark:text-white mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1>Total Problems Solved: {data?.totalProblems}</h1>
            </div>
            <hr />
            <div className="text-xl sm:text-2xl mt-2 dark:text-white">
              <h1 className="mb-2">Topics Covered on (DSA TRACKER)</h1>
              <div className="flex flex-wrap">
                {dsaTopics?.map((dsaTopic) => (
                  <div
                    key={dsaTopic.id}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4 hover:scale-105 transition duration-300 cursor-pointer"
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
      )}
    </>
  );
};

export default Profile;
