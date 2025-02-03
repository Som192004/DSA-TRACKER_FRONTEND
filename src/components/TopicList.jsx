import { useState } from "react";
import axios from "axios";
import Button from "./Header/Button";
import Input from "./Input";
import  {Oval}  from 'react-loader-spinner';
import { FaStar } from "react-icons/fa";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
//check this as well . . . 
const TopicList = ({ data }) => {
    const [editRow, setEditRow] = useState(null); // Track the row being edited
    const [editedData, setEditedData] = useState({}); // Store changes
    const [editingProblemId, setEditingProblemId] = useState(null);
    const [editedProblem, setEditedProblem] = useState({});
    const [problemList , setProblemList] = useState(data);


    const editProblem = (problem) => {
        setEditingProblemId(problem._id);
        setEditedProblem(problem); 
    };

    const handleInputChange = (e, field) => {
        setEditedProblem({ ...editedProblem, [field]: e.target.value });
    };

    const saveChanges = () => {
        const accessToken = localStorage.getItem("accessToken")
        const problemId = editingProblemId
        axios.patch(`http://localhost:8000/userprogress/update-userprogress/${problemId}`, {editedProblem , Authorization : accessToken}  )
            .then((response) => {
                console.log("UserProgress updated:", response.data.data);
    
                setProblemList(problemList.map(p => 
                    p.list._id === editingProblemId 
                        ? { ...p, list: response.data.data } // Update only the list object
                        : p
                ));
                
                setEditingProblemId(null); 
            })
            .catch((error) => {
                console.error("Error updating problem:", error.response?.data || error.message);
            });
    };

    {
        if(problemList === null){
            return <div className="justify-self-center m-1"><Oval type="Oval" color="#000000" dark:color="#FFFFFF" height="50" width="100" /></div>
        }
    }

    return ( <>
                <div className="dark:bg-black">
                    <h1 className="justify-self-center text-4xl dark:text-white pb-2">{problemList[0].problemDetails.topicName}</h1>
                </div>
                <div className="flex justify-center dark:bg-black">
                    <table className="table-auto w-5/6 border-collapse border-2 border-black dark:border-white dark:bg-black mb-2">
                        <thead>
                            <tr>
                                <th className="border-2 border-black dark:border-white dark:text-white">Topic</th>
                                <th className="border-2 border-black dark:border-white dark:text-white">Problem</th>
                                <th className="border-2 border-black dark:border-white dark:text-white">Status</th>
                                <th className="border-2 border-black dark:border-white dark:text-white">Revision</th>
                                <th className="border-2 border-black dark:border-white dark:text-white">Notes</th>
                                <th className="border-2 border-black dark:border-white dark:text-white">URL</th>
                                <th className="border-2 border-black dark:border-white dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problemList?.map((problemData) => (
                                <tr key={problemData?.list?._id}>
                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        <p className="justify-self-center">{problemData?.problemDetails?.topicName}</p>
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        <p className="justify-self-center">{problemData?.problemDetails?.name}</p>
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={editingProblemId === problemData?.list?._id ? editedProblem?.status === "Solved" : problemData?.list?.status === "Solved"}
                                            onChange={(e) => {
                                                if (editingProblemId === problemData?.list?._id) {
                                                    setEditedProblem((prev) => ({
                                                        ...prev,
                                                        status: e.target.checked ? "Solved" : "UnSolved",
                                                    }));
                                                }
                                            }}
                                            className={`w-5 h-5 accent-green-500 cursor-pointer transition-all ${
                                                editingProblemId !== problemData?.list?._id ? "cursor-not-allowed opacity-50" : ""
                                            }`}
                                            disabled={editingProblemId !== problemData?.list?._id}
                                        />
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white justify-items-center">
                                        <FaStar
                                            className={`w-9 h-9 transition-all cursor-pointer ${
                                                editingProblemId === problemData?.list?._id
                                                    ? "text-yellow-600 hover:scale-110" // Editable mode (interactive)
                                                    : "text-gray-200 cursor-not-allowed opacity-50" // View mode (non-interactive)
                                            }`}
                                            onClick={() => {
                                                if (editingProblemId === problemData?.list?._id) {
                                                    setEditedProblem((prev) => ({
                                                        ...prev,
                                                        isBookmarked: !prev.isBookmarked,
                                                    }));
                                                }
                                            }}
                                            fill={editingProblemId === problemData?.list?._id ? (editedProblem?.isBookmarked ? "yellow" : "gray") : (problemData?.list?.isBookmarked ? "yellow" : "gray")}
                                        />
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {editingProblemId === problemData?.list?._id ? (
                                            <Input
                                                type="text"
                                                value={editedProblem?.notes}
                                                onChange={(e) => handleInputChange(e, "notes")}
                                                className="w-full text-black"
                                            />
                                        ) : (
                                            <p className="justify-self-center">{problemData?.list?.notes}</p>
                                        )}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white cursor-pointer">
                                        <a href={`${problemData?.problemDetails?.link}`} target="_blank">
                                            <p className="justify-self-center">
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/GeeksforGeeks.png" alt="GeeksforGeeks"/>
                                            </p>
                                        </a>
                                    </td>
                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        <div className="justify-self-center p-1">
                                            {editingProblemId === problemData?.list?._id ? (
                                                <Button onClick={() => saveChanges()}>Save</Button>
                                            ) : (
                                                <Button onClick={() => editProblem(problemData?.list)}>Edit</Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </>
        
    );
};

export default TopicList;
