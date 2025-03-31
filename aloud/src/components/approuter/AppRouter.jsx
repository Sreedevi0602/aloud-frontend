import React, { lazy, Suspense } from 'react'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'



const Navbar = lazy(() => import('../Navbar/Navbar'))
const Footer = lazy(() => import('../footer/Footer'))
const Layout = lazy(() => import('../layout/layout'))
const Who = lazy(() => import('../../Pages/Who/Who'))
const Booklist = lazy(() => import('../../Pages/Booklist/Booklist'))
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
            }
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