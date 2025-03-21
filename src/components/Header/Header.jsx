// import React from 'react'
// import {Container, Logo} from '../index'
// import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { DarkModeSwitch } from 'react-toggle-dark-mode'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import LogoutBtn from './LogOut'

// function Header() {
//   const navigate = useNavigate()
//   const [isDarkMode, setDarkMode] = useState(false)
//   const authStatus = useSelector(state => state.auth.status)
//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       status : true
//     }, 
//     {
//       name : 'Problems',
//       slug : '/problems',
//       status : true
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       status : !authStatus
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       status : !authStatus
//   },
//   {
//       name : "Profile",
//       slug:"/profile",
//       status : authStatus
//   },
//   ]

//   useEffect(() => {
//     document.body.className = isDarkMode ? "dark" : "";
//   }, [isDarkMode]);


//   const toggleDarkMode = () => {
//     setDarkMode(!isDarkMode);
//   };

//   return (
//     <header className='py-3 shadow dark:bg-slate-600 border-b-2 border-b-black'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo></Logo>
//             </Link>
//           </div>
//           <ul className={`flex ml-auto`} >
//             {navItems.map((item) => 
//             (
//               <li key={item.name}>
//                 {
//                   item.status && <button
//                   onClick={() => navigate(item.slug)}
//                   className='text-lg dark:text-white inline-bock px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'
//                   >{item.name}</button>
//                 }
                
//               </li>
//             )
//             )}
//             { authStatus && <li>
//               <LogoutBtn />
//             </li>}
//             <li key="switch">
//                 <button
//                 className='text-lg inline-bock px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'
//                 >
//                 <DarkModeSwitch onChange={toggleDarkMode} checked={isDarkMode}></DarkModeSwitch></button>
                
//               </li>
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

// export default Header ;

import React, { useState, useEffect } from 'react';
import { Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import LogoutBtn from './LogOut';

function Header() {
  const navigate = useNavigate();
  const [isDarkMode, setDarkMode] = useState(false);
  const authStatus = useSelector(state => state.auth.status);

  const navItems = [
    { name: 'Home', slug: "/", status: true },
    { name: 'Problems', slug: '/problems', status: true },
    { name: "Login", slug: "/login", status: !authStatus },
    { name: "Signup", slug: "/signup", status: !authStatus },
    { name: "Profile", slug: "/profile", status: authStatus },
    {name : "Blog" , slug : "/blog" , status: true}
  ];

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <header className="py-4 shadow-md bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div>
            <Link to="/">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex items-center space-x-6">
            {navItems.map((item) =>
              item.status && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-lg font-medium text-gray-800 dark:text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}

            {/* Logout Button (only for authenticated users) */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

            {/* Dark Mode Toggle */}
            <li>
              <button
                className="flex items-center px-4 py-2 rounded-md transition duration-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                onClick={toggleDarkMode}
              >
                <DarkModeSwitch onChange={toggleDarkMode} checked={isDarkMode} size={24} />
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

