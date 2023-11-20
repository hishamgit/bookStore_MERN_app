import React,{useEffect, useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const  [title,setTitle]=useState('');
  const  [author,setAuthor]=useState('');
  const  [publishYear,setPublishYear]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar()
 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/book/${id}`)
      .then((response) => {
        setTitle(response.data.book.title);
        setAuthor(response.data.book.author);
        setPublishYear(response.data.book.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  
  const handleEditBook=()=>{
    setLoading(true);
    const data={
      title,
      author,
      publishYear
    }
    axios.put(`http://localhost:5555/book/${id}`,data).then(()=>{
      setLoading(false);
      enqueueSnackbar('Book updated successfully',{ variant:'info'})
      navigate('/');
    }).catch((err)=>{
      console.log(err);
      enqueueSnackbar('Error occurred',{ variant: 'error'})
      // alert('error occurred,check console')
      setLoading(false);
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (<Spinner/>) : ''}
      <div className='flex flex-col border-2 border-sky-800 rounded-xl p-4 mx-auto w-[600px]'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
             />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text"
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' 
            />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="text"
            value={publishYear}
            onChange={(e)=> setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' 
            />
        </div>
        <button className='p-2 bg-sky-300' onClick={handleEditBook}>
          Edit
        </button>
      </div>
      
    </div>
  )
}

export default EditBook
