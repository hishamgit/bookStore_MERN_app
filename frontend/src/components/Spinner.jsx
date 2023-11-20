import React from 'react'

const Spinner = () => {
  return (<div className='h-screen w-full flex justify-center items-center'>
    <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
    </div>
  )
}

export default Spinner