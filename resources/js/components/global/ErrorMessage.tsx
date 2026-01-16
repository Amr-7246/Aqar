import React from 'react'

const ErrorMessage = ({message = 'there is some thing wrong' } : {message? : string}) => {
  return (
    <h2 className='w-full flex-center text-2xl font-black text-rose-500'>{message}</h2>
  )
}

export default ErrorMessage