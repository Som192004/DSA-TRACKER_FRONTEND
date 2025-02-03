import { useState } from "react";
import Button from "./Header/Button";
import axios from "axios";
import Input from "./Input";

const AdminTopicList = ({name , problems}) => {
    const [problemName , setProblemName] = useState() ;
    const [difficulty , setDifficulty] = useState() ;
    const [link , setLink] = useState() ;
    const [problemNumber , setProblemNumber] = useState();
    const [showInput , setShowInput] = useState(false);
    const [msgOnBtn , setMsgOnBtn] = useState("Save");
    const [problemList , setProblemList] = useState(problems);
    const [msg , setMsg] = useState("");
    const [editingProblemId, setEditingProblemId] = useState(null);
    const [editedProblem, setEditedProblem] = useState({});

    const editProblem = (problem) => {
        setEditingProblemId(problem._id);
        setEditedProblem(problem); 
    };
    
    const handleInputChange = (e, field) => {
        setEditedProblem({ ...editedProblem, [field]: e.target.value });
    };

    const saveChanges = () => {
        const accessToken = localStorage.getItem("accessToken")
        axios.patch(`http://localhost:8000/problems/edit-problem/${editingProblemId}`, {editedProblem , Authorization : accessToken}  )
            .then((response) => {
                console.log("Problem updated:", response.data.data);
    
                setProblemList(problemList.map(p => 
                    p._id === editingProblemId ? response.data.data : p
                ));
    
                setEditingProblemId(null); 
            })
            .catch((error) => {
                console.error("Error updating problem:", error.response?.data || error.message);
            });
    };

    const addNewProblem = () => {
        setShowInput(!showInput)
        
    }

    const cancel = () => {
        setShowInput(!showInput)
        setMsg("")

    }
    
    const save = () => {
        setMsgOnBtn("Processing . . . ")
        if(!problemName || !difficulty || !name || !link || !problemNumber){
            setMsg("All Fields are required")
            setMsgOnBtn("Save")
            return
        }

        if(!problemName.trim() || !difficulty.trim() || !name.trim() || !link.trim() || !problemNumber.trim()){
            setMsg("All Fields are required")
            setMsgOnBtn("Save")
            return
        }
        //temporary I am accessing the accessToken directly from the localStorage
        const accessToken = localStorage.getItem("accessToken")
        axios
          .post("http://localhost:8000/problems/add-problem" , {Authorization : accessToken , 
        name : problemName , difficulty , topicName : name , link , problemNumber})
          .then((response) => {
            console.log("response-data: " , response.data.data)
            setProblemList([...problems , response.data.data])
            // setData(response.data)
            setMsgOnBtn("Saved")
            setMsg("")
            setShowInput(!showInput)
            
        })
          .catch((error) => {
            console.error("Error fetching data:", error.message)
            setMsg(error.message)
            setMsgOnBtn("Save")
        });
        
    }

    const deleteProblem = (problemId) => {
        const accessToken = localStorage.getItem("accessToken")
        console.log(accessToken)
        axios.delete(`http://localhost:8000/problems/delete-problem/${problemId}` , {headers: { Authorization: accessToken },})
          .then((response) => {
            console.log("response-data: " , response.data.data)
            setProblemList(problems.filter(problem => problem._id !== problemId));
        })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data)
        });
    }

    return <>
        <div className="flex-row-2 mt-2">
                <div className="justify-self-center grid grid-cols-2 mb-3">
                    <div>
                        <h2 className="text-2xl dark:text-white">
                            {name}
                        </h2>
                    </div>
                    <div>
                        <Button onClick={addNewProblem}>
                            Add New Problem
                        </Button>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl dark:text-white justify-self-center">
                        Problem List
                    </h3>
                    <div className=" flex justify-center mb-2 flex-row-2">
                        <table className="table-auto w-5/6 border-collapse border-2 border-black dark:border-white dark:bg-black">
                            <thead>
                                <tr>
                                    <th className="border-2 border-black dark:border-white dark:text-white col-span-1">problemNumber</th>
                                    <th className="border-2 border-black dark:border-white dark:text-white col-span-2">name</th>
                                    <th className="border-2 border-black dark:border-white dark:text-white">difficulty</th>
                                    <th className="border-2 border-black dark:border-white dark:text-white">topicName</th>
                                    <th className="border-2 border-black dark:border-white dark:text-white">link</th>
                                    <th className="border-2 border-black dark:border-white dark:text-white">Edit</th>
                                    <th className="border-2 border-black dark:border-white dark:text-white">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {problemList.map((problem) => (
                                <tr key={problem.problemNumber}>
                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {problem.problemNumber}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {editingProblemId === problem._id ? (
                                    <Input 
                                        type="text"
                                        value={editedProblem.name || ""}
                                        onChange={(e) => handleInputChange(e, "name")}
                                        className="border rounded px-2"
                                    />
                                    ) : (
                                        problem.name
                                    )}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {editingProblemId === problem._id ? (
                                            <Input 
                                                type="text"
                                                value={editedProblem.difficulty || ""}
                                                onChange={(e) => handleInputChange(e, "difficulty")}
                                                className="border rounded px-2"
                                            />
                                        ) : (
                                            problem.difficulty
                                        )}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {editingProblemId === problem._id ? (
                                            <Input 
                                                type="text"
                                                value={editedProblem.topicName || ""}
                                                onChange={(e) => handleInputChange(e, "topicName")}
                                                className="border rounded px-2"
                                            />
                                        ) : (
                                            problem.topicName
                                        )}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {editingProblemId === problem._id ? (
                                            <Input 
                                                type="text"
                                                value={editedProblem.link || ""}
                                                onChange={(e) => handleInputChange(e, "link")}
                                                className="border rounded px-2"
                                            />
                                        ) : (
                                            problem.link
                                        )}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        {editingProblemId === problem._id ? (
                                            <div className="justify-self-center p-1"><Button onClick={saveChanges}>Save</Button></div>
                                        ) : (
                                            <div className="justify-self-center"><Button onClick={() => editProblem(problem)}>Edit</Button></div>
                                        )}
                                    </td>

                                    <td className="border-2 border-black dark:border-white dark:text-white">
                                        <div className="justify-self-center p-1"><Button onClick={() => deleteProblem(problem._id)}>Delete</Button></div>
                                    </td>
                                </tr>
                            ))}
                                {
                                    showInput ? 
                                    <tr>
                                        <td className="border-2 border-black dark:border-white dark:text-white col-span-1">
                                            <Input type="text" onChange={(e) => setProblemNumber(e.target.value)} className="w-full h-fit"/>    
                                        </td>
                                        <td className="border-2 border-black dark:border-white dark:text-white col-span-2">
                                            <Input type="text" onChange={(e) => setProblemName(e.target.value)} className="w-full"/> 
                                        </td>
                                        <td className="border-2 border-black dark:border-white dark:text-white">
                                            <Input type="text" onChange={(e) => setDifficulty(e. target.value)} className="w-full"/> 
                                        </td>
                                        <td className="border-2 border-black dark:border-white dark:text-white">
                                            <p className="justify-self-center">{name}</p>
                                        </td>
                                        <td className="border-2 border-black dark:border-white dark:text-white">
                                            <Input type="text" onChange={(e) => setLink(e.target.value)} className="w-full"/>
                                        </td>
                                        <td className="border-2 border-black dark:border-white dark:text-white justify-items-center">
                                            <Button onClick={() => cancel()} >Cancel</Button>
                                        </td>
                                        <td className="border-2 border-black dark:border-white dark:text-white">
                                            <Button onClick={() => save()} className="justify-self-center">
                                                {msgOnBtn}
                                            </Button>
                                        </td>
                                        
                                    </tr> : 
                                        <></> 
                                }    
                            </tbody>
                        </table>
                            
                    </div>
                    <div className="justify-self-center">
                        <p>{msg}</p>
                    </div>
                </div>
            <hr />
            </div>
    </>
}


export default AdminTopicList ; 