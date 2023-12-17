import Image from 'next/image'
import React from 'react'

const Response = ({ans}) => {
    return (
        <div className='grid grid-cols-12 py-4 '>
            <div className='icon col-span-1 bg-[#10a37f] mr-auto rounded-full p-2 max-h-16'>
                <Image src='/assets/ChatGPT_logo.png' width={50} height={50} alt='profile' />
            </div>
            <div className='answer col-span-11 px-4 flex flex-col justify-center'>
                <p className='text-lg py-4'>
                    {ans}
                </p>
            </div>
        </div>
    )
}

export default Response