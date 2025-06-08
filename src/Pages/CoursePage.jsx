import axios from "axios";
import { CourseList } from "../components/index.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { FancyLoader } from "../components/index.js";

const VideoPage = () => {
    const { course } = useParams();
    const authData = useSelector(state => state.auth.userData);
    const accessToken = localStorage.getItem("accessToken");
    const [data, setData] = useState();

    useEffect(() => {
        const courseName = course;
        axios
            .post(`https://dsa-tracker-backend-oo1y.onrender.com/videos/get-videos-list/${courseName}`, { Authorization: accessToken })
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
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 dark:bg-black">
            {
                data && data.length === 0 ? (
                    <h1 className="text-center text-2xl sm:text-3xl dark:bg-black dark:text-white py-6">
                        No Videos added for this course
                    </h1>
                ) : (
                    data ? <CourseList data={data} /> : <FancyLoader />
                )
            }
        </div>
    );
};

export default VideoPage;
