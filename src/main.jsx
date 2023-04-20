import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Register from './Components/Register'


const router = createBrowserRouter([
  { path: '/', element: <App /> ,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login/>},
      { path: '/register', element: <Register/>},
      { path: '/about', element: <About /> },

    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
