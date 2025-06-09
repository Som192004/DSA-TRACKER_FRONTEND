import { useState } from "react";
import axios from "axios";
import Button from "./Header/Button";
import Input from "./Input";
import FancyLoader from "./FancyLoader";
import { FaStar, FaEdit, FaSave } from "react-icons/fa";

const CourseList = ({ data }) => {
    const [editingVideoId, setEditingVideoId] = useState(null);
    const [editedVideo, setEditedVideo] = useState({});
    const [videoList, setVideoList] = useState(data);
    const [msgOnBtn, setMsgOnBtn] = useState("Save");
    const [errorDialog, setErrorDialog] = useState(null);

    const editVideo = (video) => {
        setEditingVideoId(video._id);
        setEditedVideo(video);
    };

    const handleInputChange = (e, field) => {
        setEditedVideo({ ...editedVideo, [field]: e.target.value });
    };

    const saveChanges = () => {
        setMsgOnBtn("Saving");
        const accessToken = localStorage.getItem("accessToken");
        const videoId = editingVideoId;
        axios
            .patch(`https://dsa-tracker-backend-oo1y.onrender.com/courseprogress/update-courseprogress/${videoId}`, {
                editedVideo,
                Authorization: accessToken,
            })
            .then((response) => {
                setVideoList(
                    videoList.map((p) =>
                        p.list._id === editingVideoId
                            ? { ...p, list: response.data.data }
                            : p
                    )
                );
                setEditingVideoId(null);
                setMsgOnBtn("Save");
                setErrorDialog("UserProgress Updated Successfully");
            })
            .catch((error) => {
                console.error("Error updating problem:", error.response?.data || error.message);
                setErrorDialog("Please Reload the page and try again");
                setEditingVideoId(null);
                setMsgOnBtn("Save");
            });
    };

    if (videoList === null) {
        return <FancyLoader />;
    }

    return (
        <>
            <div className="dark:bg-black px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl text-center dark:text-white pb-2">
                    {videoList[0]?.videoDetails?.courseName}
                </h1>
            </div>
            <div className="flex justify-center dark:bg-black px-2">
                <div className="overflow-x-auto w-full">
                    <table className="table-auto w-full border-collapse border-2 border-black dark:border-white dark:bg-black mb-2 text-sm sm:text-base">
                        <thead>
                            <tr>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">Course</th>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">Video</th>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">Status</th>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">Revision</th>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">Notes</th>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">URL</th>
                                <th className="border-2 border-black dark:border-white dark:text-white px-2 py-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoList?.map((videoData) => (
                                <tr key={videoData?.list?._id}>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1">
                                        {videoData?.videoDetails?.courseName}
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1">
                                        {videoData?.videoDetails?.name}
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1 text-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                editingVideoId === videoData?.list?._id
                                                    ? editedVideo?.status === "Watched"
                                                    : videoData?.list?.status === "Watched"
                                            }
                                            onChange={(e) => {
                                                if (editingVideoId === videoData?.list?._id) {
                                                    setEditedVideo((prev) => ({
                                                        ...prev,
                                                        status: e.target.checked ? "Watched" : "NotWatched",
                                                    }));
                                                }
                                            }}
                                            className={`w-5 h-5 accent-green-500 transition-all ${
                                                editingVideoId !== videoData?.list?._id
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "cursor-pointer"
                                            }`}
                                            disabled={editingVideoId !== videoData?.list?._id}
                                        />
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1 text-center">
                                        <FaStar
                                            className={`w-6 h-6 sm:w-9 sm:h-9 transition-all ${
                                                editingVideoId === videoData?.list?._id
                                                    ? "text-yellow-800 dark:text-yellow-400 hover:scale-110 cursor-pointer"
                                                    : "text-gray-300 dark:text-gray-300 opacity-70 cursor-not-allowed"
                                            }`}
                                            onClick={() => {
                                                if (editingVideoId === videoData?.list?._id) {
                                                    setEditedVideo((prev) => ({
                                                        ...prev,
                                                        isBookmarked: !prev.isBookmarked,
                                                    }));
                                                }
                                            }}
                                            fill={
                                                editingVideoId === videoData?.list?._id
                                                    ? editedVideo?.isBookmarked
                                                        ? "yellow"
                                                        : "gray"
                                                    : videoData?.list?.isBookmarked
                                                    ? "yellow"
                                                    : "gray"
                                            }
                                        />
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1">
                                        {editingVideoId === videoData?.list?._id ? (
                                            <Input
                                                type="text"
                                                value={editedVideo?.notes}
                                                onChange={(e) => handleInputChange(e, "notes")}
                                                className="w-full text-black"
                                            />
                                        ) : (
                                            <p>{videoData?.list?.notes}</p>
                                        )}
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1 text-center">
                                        <a href={videoData?.videoDetails?.link} target="_blank" rel="noopener noreferrer">
                                            <img width="32" height="32" src="https://img.icons8.com/color/48/GeeksforGeeks.png" alt="GeeksforGeeks" />
                                        </a>
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-2 py-1 text-center">
                                        {editingVideoId === videoData?.list?._id ? (
                                            <Button onClick={saveChanges}>
                                                {msgOnBtn === "Save" ? <FaSave size="1.5em" /> : msgOnBtn}
                                            </Button>
                                        ) : (
                                            <Button onClick={() => editVideo(videoData?.list)}>
                                                <FaEdit size="1.5em" />
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {errorDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white dark:bg-black p-6 rounded shadow-lg max-w-sm w-full">
                        <p className="text-lg text-black dark:text-white">{errorDialog}</p>
                        <button
                            onClick={() => setErrorDialog(null)}
                            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseList;
