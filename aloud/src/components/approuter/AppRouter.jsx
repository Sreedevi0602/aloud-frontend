import React, { lazy, Suspense } from 'react'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'








const Navbar = lazy(() => import('../Navbar/Navbar'))
const Footer = lazy(() => import('../footer/Footer'))
const Layout = lazy(() => import('../layout/layout'))
const Who = lazy(() => import('../../Pages/Who/Who'))
const Booklist = lazy(() => import('../../Pages/Booklist/Booklist'))
const BookDetail = lazy(() => import('../../Pages/BookDetail/BookDetail'))
const CategoryList = lazy(() => import('../../Pages/CategoryList/CategoryList'))
const CategoryDetails = lazy(() => import('../../Pages/CategoryDetails/CategoryDetails'))
const SignupForm = lazy(() => import('../../Pages/Signup/SignupForm'))
const LoginForm = lazy(() => import('../../Pages/Login/LoginForm'))
const Loader =  lazy(() => import ('../loader/Loader')) 





const routers = createBrowserRouter([
    {

        path: "/",
        element:<><Navbar/><Outlet/><Footer/></>,
        children: [
            {
                index: true,
                element: <Layout/>
            },
            {
                path: "about",
                element: <Who/>
            },
            {
                path: "booklist",
                element: <Booklist/>
            },
            {
                path: "/book/:id",
                element: <BookDetail/>
            },
            {
                path: "/categories",
                element: <CategoryList/>
            },
            {
                path: "/category/:id",
                element: <CategoryDetails/>
            },
            {
                path: "/signup",
                element: <SignupForm/>
            },{
                path: "/login",
                element: <LoginForm/>
            },
            
        ]

    }
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader/>}>
    <RouterProvider router={routers} />
    </Suspense>
  )
}

export default AppRouter