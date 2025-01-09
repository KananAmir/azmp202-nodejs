
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Add from './pages/Add'
import Details from './pages/Details'



function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Details />} />
          <Route path='add' element={<Add />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
