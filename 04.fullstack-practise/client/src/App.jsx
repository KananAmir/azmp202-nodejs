import './App.css'
import { Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Details from './pages/Details'
import Add from './pages/Add'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'
function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/wines/:id' element={<Details />} />
          <Route path='/add' element={<Add />} />
          <Route path='/wishlist' element={<Wishlist />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
