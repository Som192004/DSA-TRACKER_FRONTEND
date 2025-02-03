import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    //below can be implemented in future . . . 
    // const authStatus = useSelector(state => state.auth.status)

    //temporary basis . . . 
    const authStatus = localStorage.getItem("accessToken") ? true : false
    console.log(authStatus)
    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return <>{ loader ? <h1>Loading...</h1> : children}</>
}
