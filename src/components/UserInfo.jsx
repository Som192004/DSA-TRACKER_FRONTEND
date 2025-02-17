import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from "axios";

const UserInfo = ({ data }) => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        username: data?.user?.username || "",
        fullname: data?.user?.fullname || "",
        email: data?.user?.email || "",
        collegeName: data?.user?.collegeName || "",
        leetCodeId: data?.user?.leetCodeId || "",
    });
    const [errorDialog, setErrorDialog] = useState(null);
    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setUserData({
            username: data?.user?.username || "",
            fullname: data?.user?.fullname || "",
            email: data?.user?.email || "",
            collegeName: data?.user?.collegeName || "",
            leetCodeId: data?.user?.leetCodeId || "",
        });
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSaveClick = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const response = await axios.patch("http://localhost:8000/users/update-profile", { username : userData.username , fullname : userData.fullname , email : userData.email , collegeName : userData.collegeName , leetCodeId : userData.leetCodeId , Authorization: `${accessToken}`});
            console.log("Updated successfully:", response.data);
            setEditMode(false);
            setErrorDialog("UserInfo Updated Successfully");
        } catch (error) {
            console.error("Error updating user data:", error);
            setErrorDialog("Error while updating the UserInfo please reload the page and try again")
        }
    };

    return (
        <div className="border-2 rounded-md p-4 dark:bg-black relative">
            {/* Edit Button */}
            {!editMode ? (
                <FaEdit 
                    size="1.5em" 
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={handleEditClick} 
                />
            ) : (
                <div className="absolute top-2 right-2 flex gap-2">
                    <FaSave 
                        size="1.5em" 
                        className="text-green-500 cursor-pointer hover:text-green-700"
                        onClick={handleSaveClick} 
                    />
                    <FaTimes 
                        size="1.5em" 
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={handleCancelClick} 
                    />
                </div>
            )}

            {/* User Profile Image */}
            <div className="flex justify-center mb-4 ">
                <FaRegCircleUser size="4em" className="dark:bg-white"/>
            </div>

            {/* User Fields */}
            {["username", "fullname", "email", "collegeName"].map((field) => (
                <div key={field} className="mb-3">
                    <p className="text-xl font-semibold dark:text-white capitalize">{field}</p>
                    {editMode ? (
                        <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            value={userData[field]}
                            onChange={handleChange}
                            className="w-full p-1 border rounded-md dark:bg-gray-800 dark:text-white"
                        />
                    ) : (
                        <p className="dark:text-white text-lg">{userData[field]}</p>
                    )}
                    <hr />
                </div>
            ))}

            {/* GFG Profile */}
            <div className="mb-3">
                <p className="text-xl font-semibold dark:text-white">GFG Profile</p>
                {editMode ? (
                    <input
                        type="text"
                        name="leetCodeId"
                        value={userData.leetCodeId}
                        onChange={handleChange}
                        className="w-full p-1 border rounded-md dark:bg-gray-800 dark:text-white"
                    />
                ) : (
                    <a 
                        href={`https://www.geeksforgeeks.org/user/${userData.leetCodeId}/`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="dark:text-white"
                    >
                        <img width="48" height="48" src="https://img.icons8.com/color/48/GeeksforGeeks.png" alt="GeeksforGeeks" />
                    </a>
                )}
                <hr />
            </div>
            {errorDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-black p-6 rounded shadow-lg max-w-sm mx-auto">
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
        </div>

        
    );
};

export default UserInfo;
