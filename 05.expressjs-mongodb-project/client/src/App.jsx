import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { BASE_URL } from './constants'
import ProductForm from './components/AddProduct'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Client/Home'
import Dashboard from './pages/Admin/Dashboard'
import Login from './pages/Admin/Login'
import Products from './pages/Admin/Products'
import PrivateRoute from './layouts/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route element={<PrivateRoute roles={["user", "admin"]} />}>
            <Route index element={<Dashboard />} />
            <Route path='products' element={<Products />} />
          </Route>
          <Route path='login' element={<Login />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
