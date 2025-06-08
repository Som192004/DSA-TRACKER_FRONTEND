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
import BlogDashBoard from "./Pages/BlogDashboard"
import TopicDetails from "./Pages/TopicDetails"
import BlogDetail from './Pages/BlogDetail'
import UserRankings from "./Pages/RanksPage"
import UserProfile from "./components/UserProfile"
import ContactUs from './Pages/ContactUs'
import ComingSoon from "./components/ComingSoon"
import CoursePage from "./Pages/CoursePage"
import CoursesPage from "./Pages/CoursesPage"
import AdCourse from "./Pages/AdCourse"

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
            path:"/courses",
            element:(
                <AuthLayout authentication={true}>
                    <CoursesPage />
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
            path:"/videos/:course",
            element:(
                <AuthLayout authentication={true}>
                    <CoursePage />
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
            path:"/ad-course",
            element: (
                <AuthLayout authentication={true}>
                    <AdCourse />
                </AuthLayout>
            )
        },
        {
            path : "/blog" ,
            element : (
                    <BlogDashBoard />
            )  
        },
        {
            path : "/blog/topic/:id" , 
            element : (
                <TopicDetails />
            )
            
        },
        {
            path : "/blog/topic/:topicId/:blogId" ,
            element : (
                <BlogDetail />
            )
        },
        {
            path: "/my-rank",
            element: (
                <AuthLayout authentication={true}><UserRankings /></AuthLayout>
            )
        },

        {
            path : "/profile/:username",
            element: (
                <AuthLayout authentication={true}><UserProfile /></AuthLayout>
            )
        },
        {
            path: "/contact-us",
            element: (
                <ContactUs></ContactUs>
            )
        },
        {
            path: "/contest",
            element: (
                <ComingSoon></ComingSoon>
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
