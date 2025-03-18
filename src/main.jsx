import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import { AuthLayout, Login, Profile , Signup} from './components/index.js'
import ProblemPage from "./Pages/ProblemPage"
import ProblemsPage from './Pages/ProblemsPage'
import { Provider } from 'react-redux'
import AdminPanel from './Pages/AdminPanel'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/profile",
            element : (
                <AuthLayout authentication={true}>
                    <Profile />
                </AuthLayout>
            )
        },
        {
            path:"/problems",
            element:(
                <AuthLayout authentication={true}>
                    <ProblemsPage />
                </AuthLayout>
            )
        },
        {
            path:"/problems/:topic",
            element:(
                <AuthLayout authentication={true}>
                    <ProblemPage />
                </AuthLayout>
            )
        },
        {
            path:"/admin-panel",
            element : (
                <AuthLayout authentication={true}>
                    <AdminPanel />
                </AuthLayout>)
        },
        {
            path:"/blog" ,
            element : (
                <BlogPage />
            )
        }
    ],
},
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider>
)
