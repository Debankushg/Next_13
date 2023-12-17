import React from 'react'

const Notfound = () => {
    return (
        <div className='flex justify-center items-center pt-52'>
            <div className='text-center title'>
                <span className='text-md text-gray-300'>OOps...</span>
                <h1 className='text-2xl text-gray-200 font-bold '>Chat Not Found</h1>
                <p className='w-3/4 mx-auto py-5 text-gray-400'> No chat yet click on  <span className='text-indigo-400'>New Chat</span> button to create chat</p>
            </div>
        </div>
    )
}

export default Notfound