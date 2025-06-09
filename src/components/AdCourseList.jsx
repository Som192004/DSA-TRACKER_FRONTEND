// import { useState } from "react";
// import Button from "./Header/Button";
// import axios from "axios";
// import Input from "./Input";
// import { FaEdit, FaSave, FaTimes ,FaTrash} from "react-icons/fa";
// const AdCourseList = ({name , videos}) => {
//     const [videoName , setVideoName] = useState() ;
//     const [link , setLink] = useState() ;
//     const [videoNumber , setVideoNumber] = useState();
//     const [showInput , setShowInput] = useState(false);
//     const [msgOnBtn , setMsgOnBtn] = useState("Save");
//     const [videoList , setVideoList] = useState(videos);
//     const [msg , setMsg] = useState("");
//     const [editingVideoId, setEditingVideoId] = useState(null);
//     const [editedVideo, setEditedVideo] = useState({});

//     const editVideo = (video) => {
//         setEditingVideoId(video._id);
//         setEditedVideo(video); 
//     };
    
//     const handleInputChange = (e, field) => {
//         setEditedVideo({ ...editedVideo, [field]: e.target.value });
//     };

//     const saveChanges = () => {
//         const accessToken = localStorage.getItem("accessToken")
//         axios.patch(`https://dsa-tracker-backend-oo1y.onrender.com/videos/edit-video/${editingVideoId}`, {editedVideo , Authorization : accessToken}  )
//             .then((response) => {
//                 console.log("Video updated:", response.data.data);
    
//                 setVideoList(videoList.map(p => 
//                     p._id === editingVideoId ? response.data.data : p
//                 ));
    
//                 setEditingVideoId(null); 
//             })
//             .catch((error) => {
//                 console.error("Error updating video:", error.response?.data || error.message);
//             });
//     };

//     const addNewVideo = () => {
//         setShowInput(!showInput)
        
//     }

//     const cancel = () => {
//         setShowInput(!showInput)
//         setMsg("")

//     }
    
//     const save = () => {
//         setMsgOnBtn(". . .")
//         if(!videoName || !name || !link || !videoNumber){
//             setMsg("All Fields are required")
//             setMsgOnBtn("Save")
//             return
//         }

//         if(!videoName.trim() ||  !name.trim() || !link.trim() || !videoNumber.trim()){
//             setMsg("All Fields are required")
//             setMsgOnBtn("Save")
//             return
//         }
//         //temporary I am accessing the accessToken directly from the localStorage
//         const accessToken = localStorage.getItem("accessToken")
//         axios
//           .post("https://dsa-tracker-backend-oo1y.onrender.com/videos/add-video" , {Authorization : accessToken , 
//         name : videoName  , courseName : name , link , videoNumber})
//           .then((response) => {
//             console.log("response-data: " , response.data.data)
//             setList([...problems , response.data.data])
//             // setData(response.data)
//             setMsgOnBtn("Saved")
//             setMsg("")
//             setShowInput(!showInput)
//             setMsgOnBtn("Save")
            
//         })
//           .catch((error) => {
//             console.error("Error fetching data:", error.message)
//             setMsg(error.message)
//             setMsgOnBtn("Save")
//         });
        
//     }

//     const deleteVideo = (videoId) => {
//         const accessToken = localStorage.getItem("accessToken")
//         console.log(accessToken)
//         axios.delete(`https://dsa-tracker-backend-oo1y.onrender.com/videos/delete-video/${videoId}` , {headers: { Authorization: accessToken },})
//           .then((response) => {
//             console.log("response-data: " , response.data.data)
//             setProblemList(problems.filter(video => video._id !== videoId));
//         })
//           .catch((error) => {
//             console.error("Error fetching data:", error.response.data)
//         });
//     }

//     return <>
//         <div className="flex-row-2 mt-2">
//                 <div className="justify-self-center grid grid-cols-2 mb-3">
//                     <div>
//                         <h2 className="text-2xl dark:text-white">
//                             {name}
//                         </h2>
//                     </div>
//                     <div>
//                         <Button onClick={addNewVideo}>
//                             Add New Problem
//                         </Button>
//                     </div>
//                 </div>
//                 <div>
//                     <h3 className="text-2xl dark:text-white justify-self-center">
//                         Video List
//                     </h3>
//                     <div className=" flex justify-center mb-2 flex-row-2">
//                         <table className="table-auto w-5/6 border-collapse border-2 border-black dark:border-white dark:bg-black">
//                             <thead>
//                                 <tr>
//                                     <th className="border-2 border-black dark:border-white dark:text-white col-span-1">VideoNumber</th>
//                                     <th className="border-2 border-black dark:border-white dark:text-white col-span-2">Name</th>
//                                     <th className="border-2 border-black dark:border-white dark:text-white">CourseName</th>
//                                     <th className="border-2 border-black dark:border-white dark:text-white">Link</th>
//                                     <th className="border-2 border-black dark:border-white dark:text-white"><FaEdit size="2.0em" className="justify-self-center"/></th>
//                                     <th className="border-2 border-black dark:border-white dark:text-white"><FaTrash size="1.8em" className="justify-self-center"/></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                             {videoList?.map((video) => (
//                                 <tr key={video.videoNumber}>
//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         {video.videoNumber}
//                                     </td>

//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         {editingVideoId === video._id ? (
//                                     <Input 
//                                         type="text"
//                                         value={editedVideo.name || ""}
//                                         onChange={(e) => handleInputChange(e, "name")}
//                                         className="border rounded px-2"
//                                     />
//                                     ) : (
//                                         video.name
//                                     )}
//                                     </td>

//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         {editingVideoId === video._id ? (
//                                             <Input 
//                                                 type="text"
//                                                 value={editedVideo.courseName || ""}
//                                                 onChange={(e) => handleInputChange(e, "courseName")}
//                                                 className="border rounded px-2"
//                                             />
//                                         ) : (
//                                             video.courseName
//                                         )}
//                                     </td>

//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         {editingVideoId === video._id ? (
//                                             <Input 
//                                                 type="text"
//                                                 value={editedVideo.link || ""}
//                                                 onChange={(e) => handleInputChange(e, "link")}
//                                                 className="border rounded px-2"
//                                             />
//                                         ) : (
//                                             video.link
//                                         )}
//                                     </td>

//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         {editingVideoId === video._id ? (
//                                             <div className="justify-self-center p-1"><Button onClick={saveChanges}><FaSave size="1.5em"/></Button></div>
//                                         ) : (
//                                             <div className="justify-self-center"><Button onClick={() => editVideo(video)}><FaEdit size="1.5em" className="justify-self-center"/></Button></div>
//                                         )}
//                                     </td>

//                                     <td className="border-2 border-black dark:border-white dark:text-white">
//                                         <div className="justify-self-center p-1"><Button onClick={() => deleteVideo(problem._id)}><FaTrash size="1.5em" className="justify-self-center"/></Button></div>
//                                     </td>
//                                 </tr>
//                             ))}
//                                 {
//                                     showInput ? 
//                                     <tr>
//                                         <td className="border-2 border-black dark:border-white dark:text-white col-span-1">
//                                             <Input type="text" onChange={(e) => setVideoNumber(e.target.value)} className="w-full h-fit"/>    
//                                         </td>
//                                         <td className="border-2 border-black dark:border-white dark:text-white col-span-2">
//                                             <Input type="text" onChange={(e) => setVideoName(e.target.value)} className="w-full"/> 
//                                         </td>
//                                         <td className="border-2 border-black dark:border-white dark:text-white">
//                                             <p className="justify-self-center">{name}</p>
//                                         </td>
//                                         <td className="border-2 border-black dark:border-white dark:text-white">
//                                             <Input type="text" onChange={(e) => setLink(e.target.value)} className="w-full"/>
//                                         </td>
//                                         <td className="border-2 border-black dark:border-white dark:text-white justify-items-center">
//                                             <Button onClick={() => cancel()} >Cancel</Button>
//                                         </td>
//                                         <td className="border-2 border-black dark:border-white dark:text-white">
//                                             <Button onClick={() => save()} className="justify-self-center">
//                                                 {msgOnBtn}
//                                             </Button>
//                                         </td>
                                        
//                                     </tr> : 
//                                         <></> 
//                                 }    
//                             </tbody>
//                         </table>
                            
//                     </div>
//                     <div className="justify-self-center">
//                         <p>{msg}</p>
//                     </div>
//                 </div>
//             <hr />
//             </div>
//     </>
// }


// export default AdCourseList ; 

import { useState } from "react";
import Button from "./Header/Button";
import axios from "axios";
import Input from "./Input";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";

const AdCourseList = ({ name, videos }) => {
  const [videoName, setVideoName] = useState("");
  const [link, setLink] = useState("");
  const [videoNumber, setVideoNumber] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [msgOnBtn, setMsgOnBtn] = useState("Save");
  const [videoList, setVideoList] = useState(videos);
  const [msg, setMsg] = useState("");
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [editedVideo, setEditedVideo] = useState({});

  const accessToken = localStorage.getItem("accessToken");

  const editVideo = (video) => {
    setEditingVideoId(video._id);
    setEditedVideo(video);
  };

  const handleInputChange = (e, field) => {
    setEditedVideo({ ...editedVideo, [field]: e.target.value });
  };

  const saveChanges = () => {
    axios
      .patch(
        `https://dsa-tracker-backend-oo1y.onrender.com/videos/edit-video/${editingVideoId}`,
        {
          ...editedVideo,
          Authorization: accessToken,
        }
      )
      .then((response) => {
        const updated = response.data.data;
        setVideoList(videoList.map((v) => (v._id === editingVideoId ? updated : v)));
        setEditingVideoId(null);
      })
      .catch((error) => {
        console.error("Error updating video:", error.response?.data || error.message);
      });
  };

  const addNewVideo = () => {
    setShowInput(!showInput);
  };

  const cancel = () => {
    setShowInput(false);
    setMsg("");
    setVideoName("");
    setLink("");
    setVideoNumber("");
  };

  const save = () => {
    setMsgOnBtn("...");
    if (!videoName || !name || !link || !videoNumber) {
      setMsg("All Fields are required");
      setMsgOnBtn("Save");
      return;
    }

    if (!videoName.trim() || !name.trim() || !link.trim() || !videoNumber.trim()) {
      setMsg("All Fields are required");
      setMsgOnBtn("Save");
      return;
    }

    if (isNaN(videoNumber)) {
      setMsg("Video Number must be a number");
      setMsgOnBtn("Save");
      return;
    }

    axios
      .post("https://dsa-tracker-backend-oo1y.onrender.com/videos/add-video", {
        Authorization: accessToken,
        name: videoName,
        courseName: name,
        link,
        videoNumber,
      })
      .then((response) => {
        setVideoList([...videoList, response.data.data]);
        setMsg("Video added successfully");
        setMsgOnBtn("Save");
        setShowInput(false);
        setVideoName("");
        setLink("");
        setVideoNumber("");
        setTimeout(() => setMsg(""), 3000);
      })
      .catch((error) => {
        setMsg(error.response?.data?.message || "Error occurred");
        setMsgOnBtn("Save");
      });
  };

  const deleteVideo = (videoId) => {
    axios
      .delete(
        `https://dsa-tracker-backend-oo1y.onrender.com/videos/delete-video/${videoId}`,
        {
          data: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        setVideoList(videoList.filter((video) => video._id !== videoId));
      })
      .catch((error) => {
        console.error("Error deleting video:", error.response?.data || error.message);
      });
  };

  return (
    <>
      <div className="flex-row-2 mt-2">
        <div className="justify-self-center grid grid-cols-2 mb-3">
          <h2 className="text-2xl dark:text-white">{name}</h2>
          <Button onClick={addNewVideo}>Add New Problem</Button>
        </div>

        <div>
          <h3 className="text-2xl dark:text-white justify-self-center">Video List</h3>
          <div className="flex justify-center mb-2 flex-row-2">
            <table className="table-auto w-5/6 border-collapse border-2 border-black dark:border-white dark:bg-black">
              <thead>
                <tr>
                  <th className="border-2 border-black dark:border-white dark:text-white">VideoNumber</th>
                  <th className="border-2 border-black dark:border-white dark:text-white">Name</th>
                  <th className="border-2 border-black dark:border-white dark:text-white">CourseName</th>
                  <th className="border-2 border-black dark:border-white dark:text-white">Link</th>
                  <th className="border-2 border-black dark:border-white dark:text-white"><FaEdit size="2em" /></th>
                  <th className="border-2 border-black dark:border-white dark:text-white"><FaTrash size="2em" /></th>
                </tr>
              </thead>
              <tbody>
                {videoList?.map((video) => (
                  <tr key={video._id}>
                    <td className="border-2 border-black dark:border-white dark:text-white">{video.videoNumber}</td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      {editingVideoId === video._id ? (
                        <Input
                          type="text"
                          value={editedVideo.name || ""}
                          onChange={(e) => handleInputChange(e, "name")}
                          className="w-full"
                        />
                      ) : (
                        video.name
                      )}
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      {editingVideoId === video._id ? (
                        <Input
                          type="text"
                          value={editedVideo.courseName || ""}
                          onChange={(e) => handleInputChange(e, "courseName")}
                          className="w-full"
                        />
                      ) : (
                        video.courseName
                      )}
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      {editingVideoId === video._id ? (
                        <Input
                          type="text"
                          value={editedVideo.link || ""}
                          onChange={(e) => handleInputChange(e, "link")}
                          className="w-full"
                        />
                      ) : (
                        video.link
                      )}
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      {editingVideoId === video._id ? (
                        <Button onClick={saveChanges}><FaSave size="1.5em" /></Button>
                      ) : (
                        <Button onClick={() => editVideo(video)}><FaEdit size="1.5em" /></Button>
                      )}
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <Button onClick={() => deleteVideo(video._id)}><FaTrash size="1.5em" /></Button>
                    </td>
                  </tr>
                ))}

                {showInput && (
                  <tr>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <Input
                        type="text"
                        value={videoNumber}
                        onChange={(e) => setVideoNumber(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <Input
                        type="text"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <p>{name}</p>
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <Input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <Button onClick={cancel}>Cancel</Button>
                    </td>
                    <td className="border-2 border-black dark:border-white dark:text-white">
                      <Button onClick={save} disabled={msgOnBtn !== "Save"}>
                        {msgOnBtn}
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="justify-self-center">
            <p className="text-red-500 text-center">{msg}</p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default AdCourseList;
