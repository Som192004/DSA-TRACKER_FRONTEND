import { useDebugValue, useEffect } from "react";
import { Footer, Header } from "./components";
import { Outlet } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {login} from "./store/authSlice.js"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("accessToken")
    if(userData){
      dispatch(login(userData))
    }
  } , [])
  return <>
    <div>
        <Header></Header>
          <Outlet />
        <Footer></Footer>
    </div>
  </>
}
export default App ;