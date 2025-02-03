import React from 'react'
import {Container, Logo} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { useState } from 'react'
import { useEffect } from 'react'
import LogoutBtn from './LogOut'

function Header() {
  const navigate = useNavigate()
  const [isDarkMode, setDarkMode] = useState(false)
  const authStatus = useSelector(state => state.auth.status)
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      status : true
    }, 
    {
      name : 'Problems',
      slug : '/problems',
      status : true
    },
    {
      name: "Login",
      slug: "/login",
      status : !authStatus
  },
  {
      name: "Signup",
      slug: "/signup",
      status : !authStatus
  },
  {
      name : "Profile",
      slug:"/profile",
      status : authStatus
  },
  ]

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);


  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <header className='py-3 shadow dark:bg-slate-600 border-b-2 border-b-black'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo></Logo>
            </Link>
          </div>
          <ul className={`flex ml-auto`} >
            {navItems.map((item) => 
            (
              <li key={item.name}>
                {
                  item.status && <button
                  onClick={() => navigate(item.slug)}
                  className='text-lg dark:text-white inline-bock px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                }
                
              </li>
            )
            )}
            { authStatus && <li>
              <LogoutBtn />
            </li>}
            <li key="switch">
                <button
                className='text-lg inline-bock px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'
                >
                <DarkModeSwitch onChange={toggleDarkMode} checked={isDarkMode}></DarkModeSwitch></button>
                
              </li>
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header ;