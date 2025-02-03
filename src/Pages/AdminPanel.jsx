import { useEffect, useState } from "react";
import {AdminTopicList, Button, Input} from "../components/index.js"
import axios from "axios";

const AdminPanel = () => {
    const [allTopicsProblems , setallTopicsProblems] = useState();
    const role = localStorage.getItem("role")
    const accessToken = localStorage.getItem("accessToken")
    const [currTopic , setCurrTopic] = useState("");
    const [msg , setMsg] = useState("") ;
    const [msgOnBtn , setMsgOnBtn] = useState("Add New Topic");

    const topicNames = [
      "Array" , "Matrix" , "String" , "Searching and Sorting" , "Linked List" , "Binary Trees" , "Bst" , "Greedy" , "Backtracking" , "Stack and Queues" , "Heap" , "Graph" , "Trie" , "Dynamic Programing"
    ]

    const addNewTopic = (currTopic) => {
      setMsgOnBtn("Processing . . . ")
      if(currTopic.trim() === ""){
        setMsg("Topic name is required")
        setMsgOnBtn("Add New Topic")
      }
      else{
        axios
          .post("http://localhost:8000/topic/add-topic" , {Authorization : accessToken , topicName : currTopic})
          .then((response) => {
            console.log("response-data: " , response.data.data)
            setallTopicsProblems([...allTopicsProblems , response.data.data])
            setMsg("topic added successfully")
            setMsgOnBtn("Add New Topic")
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data)
            setMsg("either topic is already exists or internal server error")
            setMsgOnBtn("Add New Topic")
          });
      }

    }

    useEffect(() => {
        axios
          .post("http://localhost:8000/problems/admin/get-all-problems" , {Authorization : accessToken , topicNames})
          .then((response) => {
            console.log("response-data: " , response.data.data)
            setallTopicsProblems(response.data.data)
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response.data)
          });
    } , [])

     return <>
        {
          role === "Admin" ? 
          <div className="dark:bg-black">
            <h1 className="justify-self-center mt-1 mb-4 text-4xl dark:text-white">
                All Problems List
            </h1>
            <h1 className="justify-self-center text-2xl dark:text-white mb-2">{msg}</h1>
            <div className="grid grid-cols-2 gap-2 size-1/2 justify-self-center mb-2">
              <Input type="text" onChange={(e) => setCurrTopic(e.target.value)} className="mr-2"/>
              <Button onClick={() => addNewTopic(currTopic)}>
                {msgOnBtn}
              </Button>
            </div>
            <hr />
            {
              allTopicsProblems?.map((topicProblem) => (
                <AdminTopicList name={topicProblem.name} problems={topicProblem.problems} key={topicProblem.name}/>
              ))
            }

          </div> 
          : 
          <div>
            You are not Authorized
          </div>
        }
        
    </>
}

export default AdminPanel ;