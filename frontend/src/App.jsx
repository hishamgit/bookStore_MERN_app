import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
