import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate=useNavigate();

  const handleDeleteBook=()=>{
    setLoading(true)
    axios.delete(`http://localhost:5555/book/${id}`).then(()=>{
      setLoading(false)
      navigate('/')
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
      alert('error occurred,check console')
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> :''}
      <div className='flex flex-col border-2 border-sky-500 rounded-xl p-8 mx-auto w-[600px] items-center'>
        <h3 className='text-2xl'>Are you sure ,You want to delete this book</h3>
        <button className='p-4 bg-rose-600 text-white m-8 w-full' onClick={
          handleDeleteBook
        }>Yes,Delete</button>
      </div>

    </div>
  )
}

export default DeleteBook
