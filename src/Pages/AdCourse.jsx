import { useEffect, useState } from "react";
import { AdCourseList, Button, Input } from "../components/index.js";
import axios from "axios";
import UnAuthorized from "./UnAuthorized.jsx";

const AdCourse = () => {
  const [allCoursesVideos, setallCoursesVideos] = useState();
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");
  const [currCourse, setCurrCourse] = useState("");
  const [msg, setMsg] = useState("");
  const [msgOnBtn, setMsgOnBtn] = useState("Add New Course");

  const courseNames = [
    "DBMS",
    "Operating System",
    "Computer Networks"
  ];

  const addNewCourse = (currCourse) => {
    setMsgOnBtn("Processing . . . ");
    if (currCourse.trim() === "") {
      setMsg("Course name is required");
      setMsgOnBtn("Add New Course");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } else {
      axios
        .post("https://dsa-tracker-backend-oo1y.onrender.com/course/add-course", {
          Authorization: accessToken,
          courseName: currCourse,
        })
        .then((response) => {
          console.log("response-data: ", response.data.data);
          setallTopicsProblems([...allCoursesVideos, response.data.data]);
          setMsg("course added successfully");
          setMsgOnBtn("Add New Course");
          setTimeout(() => {
            setMsg("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response.data);
          setMsg("either course is already exists or internal server error");
          setMsgOnBtn("Add New Course");
          setTimeout(() => {
            setMsg("");
          }, 3000);
        });
    }
  };

  useEffect(() => {
    axios
      .post("https://dsa-tracker-backend-oo1y.onrender.com/videos/admin/get-all-videos", {
        Authorization: accessToken,
        courseNames,
      })
      .then((response) => {
        console.log("response-data: ", response.data.data);
        setallTopicsProblems(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
      });
  }, []);

  return (
    <>
      {role === "Admin" ? (
        <div className="dark:bg-black min-h-screen px-4 sm:px-6 py-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 dark:text-white">
            All Videos List
          </h1>

          <h2 className="text-xl sm:text-2xl text-center text-green-500 mb-2">{msg}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:w-1/2 mx-auto mb-4">
            <Input
              type="text"
              onChange={(e) => setCurrCourse(e.target.value)}
              className="w-full"
            />
            <Button className="w-full" onClick={() => addNewCourse(currCourse)}>
              {msgOnBtn}
            </Button>
          </div>

          <hr className="border-gray-600 mb-4" />

          <div className="space-y-4">
            {allCoursesVideos?.map((courseVideo) => (
              <AdCourseList
                name={courseVideo.name}
                videos={courseVideo.problems}
                key={courseVideo.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <UnAuthorized />
      )}
    </>
  );
};

export default AdCourse;
