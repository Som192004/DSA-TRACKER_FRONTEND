import { DSACard, Container } from "./index.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FancyLoader from "./FancyLoader.jsx";
import UnAuthorized from "../Pages/UnAuthorized.jsx";

const Profile = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const dsaTopics = [
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
  const { username } = useParams();

  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    axios
      .post(
        `https://dsa-tracker-backend-oo1y.onrender.com/users/get-user-profile/${username}`,
        {
          topicNames: dsaTopics,
          Authorization: `${accessToken}`,
        }
      )
      .then((response) => {
        console.log("response-data:", response.data.data);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
  }, [username]);

  if (role === "Admin") {
    return <UnAuthorized />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 px-4 py-6">
      {loading ? (
        <FancyLoader />
      ) : (
        <Container className="w-full max-w-6xl mx-auto space-y-6">
          {/* Total Solved */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Total Problems Solved: {data?.totalProblems || 0}
            </h1>
            <hr className="mt-2 border-gray-600 dark:border-gray-400 w-1/2 mx-auto" />
          </div>

          {/* DSA Topics */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Topics Covered on (DSA TRACKER)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {dsaTopics.map((topicName, index) => (
                <DSACard
                  key={index}
                  name={topicName}
                  number={data?.result?.[index] || 0}
                  msg="Problems solved"
                />
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Profile;
