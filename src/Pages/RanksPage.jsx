import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserRankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.post(
          "https://dsa-tracker-backend-oo1y.onrender.com/users/get-rankings",
          {
            Authorization: `${accessToken}`,
          }
        );
        setRankings(res.data.data);
      } catch (err) {
        console.error("Error fetching user rankings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = rankings.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(rankings.length / usersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl w-full mx-auto flex-grow">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          🏆 User Rankings
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300 text-lg mt-10">
            Loading rankings...
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-400 text-lg mt-10">
            No users found.
          </div>
        ) : (
          <>
            {/* Table wrapper scrolls horizontally on small screens */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm sm:text-base dark:border-gray-700">
                <thead className="bg-gray-200 dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">GfG Profile</th>
                    <th className="px-4 py-2">Avatar</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">College</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Solved</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user.username}
                      className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                        {indexOfFirstUser + index + 1}
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-700">
                        <a
                          href={`https://www.geeksforgeeks.org/user/${user.leetCodeId}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            width="32"
                            height="32"
                            src="https://img.icons8.com/color/48/GeeksforGeeks.png"
                            alt="GeeksforGeeks"
                          />
                        </a>
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-700">
                        <Link to={`/profile/${user.username}`}>
                          <img
                            src={
                              user.avatar ||
                              `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                            }
                            alt="avatar"
                            className="h-10 w-10 rounded-full mx-auto hover:scale-110 transition-transform duration-200"
                          />
                        </Link>
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                        {user.fullname}
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                        @{user.username}
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                        {user.collegeName}
                      </td>
                      <td className="border px-4 py-2 dark:border-gray-700">
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.email}
                        </a>
                      </td>
                      <td className="border px-4 py-2 font-semibold dark:border-gray-700 dark:text-white">
                        {user.solvedCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                Prev
              </button>
              <span className="text-sm sm:text-base dark:text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserRankings;
