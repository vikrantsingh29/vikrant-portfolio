import React from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './modules/App'
import Article from './modules/Article'
import NotFound from './modules/NotFound'


const base = import.meta.env.BASE_URL


const router = createBrowserRouter([
    {path: base, element: <App/>},
    {path: base + 'article/:slug', element: <Article/>},
    {path: '*', element: <NotFound/>},
])


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)