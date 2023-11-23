import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <div >
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/book/create' element={<CreateBook />} />
      <Route path='/book/details/:id' element={<ShowBook />} />
      <Route path='/book/edit/:id' element={<EditBook />} />
      <Route path='/book/delete/:id' element={<DeleteBook />} />
      <Route path='/auth/signup' element={<Signup/>}/>
      <Route path='/auth/login' element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
