// import { useState } from "react";
// import axios from "axios";
// import Button from "./Header/Button";
// import Input from "./Input";
// import FancyLoader from "./FancyLoader";
// import { FaStar } from "react-icons/fa";
// import { FaPencilAlt, FaPlus } from "react-icons/fa";
// import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
// //check this as well . . . 
// const TopicList = ({ data }) => {
//     const [editRow, setEditRow] = useState(null); // Track the row being edited
//     const [editedData, setEditedData] = useState({}); // Store changes
//     const [editingProblemId, setEditingProblemId] = useState(null);
//     const [editedProblem, setEditedProblem] = useState({});
//     const [problemList , setProblemList] = useState(data);
//     const [msgOnBtn , setMsgOnBtn] = useState("Save") ;
//     const [errorDialog, setErrorDialog] = useState(null);

//     const editProblem = (problem) => {
//         setEditingProblemId(problem._id);
//         setEditedProblem(problem); 
//     };

//     const handleInputChange = (e, field) => {
//         setEditedProblem({ ...editedProblem, [field]: e.target.value });
//     };

//     const saveChanges = () => {
//         setMsgOnBtn("Saving")
//         const accessToken = localStorage.getItem("accessToken")
//         const problemId = editingProblemId
//         axios.patch(`http://localhost:8000/userprogress/update-userprogress/${problemId}`, {editedProblem , Authorization : accessToken}  )
//             .then((response) => {
//                 console.log("UserProgress updated:", response.data.data);
    
//                 setProblemList(problemList.map(p => 
//                     p.list._id === editingProblemId 
//                         ? { ...p, list: response.data.data } // Update only the list object
//                         : p
//                 ));
//                 setMsgOnBtn("Saved")
//                 setEditingProblemId(null); 
//                 setMsgOnBtn("Save")
//                 setErrorDialog("UserProgress Updated Successfully");
//             })
//             .catch((error) => {
//                 console.error("Error updating problem:", error.response?.data || error.message);
//                 setErrorDialog("Please Reload the page and try again");
//                 setEditingProblemId(null); 
//                 setMsgOnBtn("Save")
//             });
//     };

//     {
//         if(problemList === null){
//             return <FancyLoader />
//         }
//     }

//     return ( <>
//                 <div className="dark:bg-black">
//                     <h1 className="justify-self-center text-4xl dark:text-white pb-2">{problemList[0]?.problemDetails?.topicName}</h1>
//                 </div>
//                 <div className="flex justify-center dark:bg-black">
//                     <table className="table-auto w-5/6 border-collapse border-2 border-black dark:border-white dark:bg-black mb-2">
//                         <thead>
//                             <tr>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Topic</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Problem</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Difficulty</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Status</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Revision</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Notes</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">URL</th>
//                                 <th className="border-2 border-black dark:border-white dark:text-white">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {problemList?.map((problemData) => (
//                                 <tr key={problemData?.list?._id}>
//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         <p className="justify-self-center">{problemData?.problemDetails?.topicName}</p>
//                                     </td>
//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         <p className="justify-self-center">{problemData?.problemDetails?.name}</p>
//                                     </td>
//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         <p className="justify-self-center">{problemData?.problemDetails?.difficulty}</p>
//                                     </td>
//                                     <td className="border-2 border-black dark:border-white dark:text-white px-4 py-2 text-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={editingProblemId === problemData?.list?._id ? editedProblem?.status === "Solved" : problemData?.list?.status === "Solved"}
//                                             onChange={(e) => {
//                                                 if (editingProblemId === problemData?.list?._id) {
//                                                     setEditedProblem((prev) => ({
//                                                         ...prev,
//                                                         status: e.target.checked ? "Solved" : "UnSolved",
//                                                     }));
//                                                 }
//                                             }}
//                                             className={`w-5 h-5 accent-green-500 cursor-pointer transition-all ${
//                                                 editingProblemId !== problemData?.list?._id ? "cursor-not-allowed opacity-50" : ""
//                                             }`}
//                                             disabled={editingProblemId !== problemData?.list?._id}
//                                         />
//                                     </td>
//                                     <td className="border-2 border-black dark:border-white dark:text-white justify-items-center">
//                                         <FaStar
//                                             className={`w-9 h-9 transition-all cursor-pointer ${
//                                                 editingProblemId === problemData?.list?._id
//                                                     ? "text-yellow-800 dark:text-yellow-400 hover:scale-110" // Brighter yellow in both modes
//                                                     : "text-gray-200 dark:text-gray-200 cursor-not-allowed opacity-70" // Darker gray for better contrast
//                                             }`}
//                                             onClick={() => {
//                                                 if (editingProblemId === problemData?.list?._id) {
//                                                     setEditedProblem((prev) => ({
//                                                         ...prev,
//                                                         isBookmarked: !prev.isBookmarked,
//                                                     }));
//                                                 }
//                                             }}
//                                             fill={
//                                                 editingProblemId === problemData?.list?._id
//                                                     ? editedProblem?.isBookmarked
//                                                         ? "yellow"
//                                                         : "gray" // Darker color when not bookmarked
//                                                     : problemData?.list?.isBookmarked
//                                                     ? "yellow"
//                                                     : "gray"
//                                             }
//                                     />
//                                     </td>
//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         {editingProblemId === problemData?.list?._id ? (
//                                             <Input
//                                                 type="text"
//                                                 value={editedProblem?.notes}
//                                                 onChange={(e) => handleInputChange(e, "notes")}
//                                                 className="w-full text-black"
//                                             />
//                                         ) : (
//                                             <p className="justify-self-center">{problemData?.list?.notes}</p>
//                                         )}
//                                     </td>

//                                     <td className="border-2 border-black dark:border-white dark:text-white cursor-pointer">
//                                         <a href={`${problemData?.problemDetails?.link}`} target="_blank">
//                                             <p className="justify-self-center">
//                                             <img width="48" height="48" src="https://img.icons8.com/color/48/GeeksforGeeks.png" alt="GeeksforGeeks"/>
//                                             </p>
//                                         </a>
//                                     </td>
//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         <div className="justify-self-center p-1">
//                                             {editingProblemId === problemData?.list?._id ? (
//                                                 <Button onClick={() => saveChanges()}>{
//                                                     msgOnBtn === "Save" ? <FaSave size="1.5em"/> : msgOnBtn
//                                                     }</Button>
//                                             ) : (
//                                                 <Button onClick={() => editProblem(problemData?.list)}><FaEdit size="1.5em"/></Button>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 {errorDialog && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white dark:bg-black p-6 rounded shadow-lg max-w-sm mx-auto">
//                     <p className="text-lg text-black dark:text-white">{errorDialog}</p>
//                     <button
//                         onClick={() => setErrorDialog(null)}
//                         className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Ok
//                     </button>
//                     </div>
//                 </div>
//                 )}

//         </>
        
//     );
// };

// export default TopicList;


import { useState } from "react";
import axios from "axios";
import Button from "./Header/Button";
import Input from "./Input";
import FancyLoader from "./FancyLoader";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaEdit, FaSave } from "react-icons/fa";

const TopicList = ({ data }) => {
    const [editingProblemId, setEditingProblemId] = useState(null);
    const [editedProblem, setEditedProblem] = useState({});
    const [problemList, setProblemList] = useState(data);
    const [msgOnBtn, setMsgOnBtn] = useState("Save");
    const [errorDialog, setErrorDialog] = useState(null);

    const editProblem = (problem) => {
        setEditingProblemId(problem._id);
        setEditedProblem(problem);
    };

    const handleInputChange = (e, field) => {
        setEditedProblem({ ...editedProblem, [field]: e.target.value });
    };

    const saveChanges = () => {
        setMsgOnBtn("Saving");
        const accessToken = localStorage.getItem("accessToken");
        const problemId = editingProblemId;
        axios.patch(`http://localhost:8000/userprogress/update-userprogress/${problemId}`, { editedProblem, Authorization: accessToken })
            .then((response) => {
                console.log("UserProgress updated:", response.data.data);
                setProblemList(problemList.map(p => 
                    p.list._id === editingProblemId 
                        ? { ...p, list: response.data.data } 
                        : p
                ));
                setMsgOnBtn("Saved");
                setEditingProblemId(null);
                setMsgOnBtn("Save");
                setErrorDialog("UserProgress Updated Successfully");
            })
            .catch((error) => {
                console.error("Error updating problem:", error.response?.data || error.message);
                setErrorDialog("Please Reload the page and try again");
                setEditingProblemId(null);
                setMsgOnBtn("Save");
            });
    };

    if (!problemList) {
        return <FancyLoader />;
    }

    return (
        <>
            <motion.div 
                className="dark:bg-black text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl dark:text-white pb-2 font-semibold">{problemList[0]?.problemDetails?.topicName}</h1>
            </motion.div>

            <div className="flex justify-center dark:bg-black">
                <motion.table 
                    className="table-auto w-5/6 border-collapse border-2 border-black dark:border-white dark:bg-black mb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <thead>
                        <tr>
                            {["Topic", "Problem", "Difficulty", "Status", "Revision", "Notes", "URL", "Actions"].map((header, index) => (
                                <th 
                                    key={index} 
                                    className="border-2 border-black dark:border-white dark:text-white p-2"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {problemList?.map((problemData) => (
                            <motion.tr 
                                key={problemData?.list?._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                            >
                                <td className="border-2 border-black dark:border-white dark:text-white p-2">{problemData?.problemDetails?.topicName}</td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2">{problemData?.problemDetails?.name}</td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2">{problemData?.problemDetails?.difficulty}</td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={editingProblemId === problemData?.list?._id ? editedProblem?.status === "Solved" : problemData?.list?.status === "Solved"}
                                        onChange={(e) => {
                                            if (editingProblemId === problemData?.list?._id) {
                                                setEditedProblem((prev) => ({ ...prev, status: e.target.checked ? "Solved" : "UnSolved" }));
                                            }
                                        }}
                                        className="w-5 h-5 accent-green-500 cursor-pointer"
                                        disabled={editingProblemId !== problemData?.list?._id}
                                    />
                                </td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2 justify-items-center">
                                    <FaStar
                                        className={`w-6 h-6 cursor-pointer transition-all ${
                                            editingProblemId === problemData?.list?._id ? "text-yellow-400 hover:scale-110" : "text-gray-400 opacity-50"
                                        }`}
                                        onClick={() => {
                                            if (editingProblemId === problemData?.list?._id) {
                                                setEditedProblem((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
                                            }
                                        }}
                                        fill={editingProblemId === problemData?.list?._id ? (editedProblem?.isBookmarked ? "yellow" : "gray") : (problemData?.list?.isBookmarked ? "yellow" : "gray")}
                                    />
                                </td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2">
                                    {editingProblemId === problemData?.list?._id ? (
                                        <Input
                                            type="text"
                                            value={editedProblem?.notes}
                                            onChange={(e) => handleInputChange(e, "notes")}
                                            className="w-full text-black"
                                        />
                                    ) : (
                                        <p>{problemData?.list?.notes}</p>
                                    )}
                                </td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2 text-center">
                                    <a href={problemData?.problemDetails?.link} target="_blank">
                                        <img width="32" height="32" src="https://img.icons8.com/color/48/GeeksforGeeks.png" alt="GeeksforGeeks"/>
                                    </a>
                                </td>
                                <td className="border-2 border-black dark:border-white dark:text-white p-2 text-center">
                                    {editingProblemId === problemData?.list?._id ? (
                                        <Button onClick={saveChanges} className="bg-green-500 hover:bg-green-600 transition-all px-3 py-2 rounded">
                                            {msgOnBtn === "Save" ? <FaSave size="1.5em" /> : msgOnBtn}
                                        </Button>
                                    ) : (
                                        <Button onClick={() => editProblem(problemData?.list)} className="bg-blue-500 hover:bg-blue-600 transition-all px-3 py-2 rounded">
                                            <FaEdit size="1.5em" />
                                        </Button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            </div>

            <AnimatePresence>
                {errorDialog && (
                    <motion.div 
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="bg-white dark:bg-black p-6 rounded shadow-lg max-w-sm mx-auto">
                            <p className="text-lg text-black dark:text-white">{errorDialog}</p>
                            <button
                                onClick={() => setErrorDialog(null)}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Ok
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TopicList;

