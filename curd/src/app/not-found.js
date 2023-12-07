import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-3xl mb-4 text-white font-bold">
        <span className="text-indigo-500 animate-pulse">4</span>
        <span className="text-red-500 animate-pulse">0</span>
        <span className="text-yellow-500 animate-pulse">4</span>
      </h1>
      <h1 className="text-3xl mb-4 font-bold text-orange-400 animate-bounce"> This page is Not available</h1>
    </div>
  )
}

export default NotFound