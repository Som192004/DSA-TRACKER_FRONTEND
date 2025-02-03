import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        const accessToken = localStorage.getItem("accessToken")
        localStorage.removeItem('accessToken')
        localStorage.removeItem("role")
        dispatch(logout()); // Dispatch logout action on success
        navigate("/")
    };

    return (
        <div>
            <button
                className="text-lg dark:text-white inline-block px-6 py-4 duration-200 hover:bg-blue-100 rounded-full"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    );
}

export default LogoutBtn;
