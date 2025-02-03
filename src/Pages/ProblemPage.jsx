import axios from "axios";
import { TopicList } from "../components/index.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import  {Oval}  from 'react-loader-spinner';
const ProblemPage = () => {
    const {topic} = useParams();
    const authData = useSelector(state => state.auth.userData)
    const accessToken = localStorage.getItem("accessToken") 
    const [data , setData] = useState()
    useEffect(() => {
      const topicName = topic
        axios
          .post(`http://localhost:8000/problems/get-problems-list/${topicName}` , {Authorization : accessToken })
          .then((response) => {
            console.log("response-data: " , response.data.data)
            setData(response.data.data)
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          });
    } , [])
    return <>
        {
          data ? <TopicList data={data}/> : <div className="justify-self-center m-1"><Oval type="Oval" color="#000000" dark:color="#FFFFFF" height="50" width="100" /></div>
        }
        
    </>
}

export default ProblemPage;