'use client'
import Aside from '../components/aside'
import Main from '../components/main'
import Search from '../components/search'
import { useQuery } from 'react-query'
import { getAllRooms } from '../lib/request'
import Loading from '../components/loading'
import { useState } from 'react'
import Banner from '../components/banner'


export default function Home() {

  const [roomid, setRoomid] = useState(null)
  const { isLoading, isError, data, error } = useQuery('rooms', getAllRooms)

  if (isLoading) return <div> <Loading /></div>
  if (isError) return <div className='text-center'> Error:{error.message}</div>
  if (!data) return <div className='text-center'>No Message</div>

  const onRoomClick = (roomid) => {
    data.filter((room) => {
      if (room._id === roomid) {
        setRoomid(roomid)
      }
    })
  }

  return (
    <div className='grid grid-cols-6'>
      <div className='bg-gray-900 col-span-1 aside z-10 text-gray-50'>
        {data && <Aside getRooms={data} handler={onRoomClick} />}
      </div>
      <div className='bg-gray-800 text-gray-50 col-span-5 min-h-screen h-full mb-40'>
       {roomid ? <Main roomid={roomid} />: <Banner/>}
       {roomid && <Search roomid={roomid}/>}
      </div>
    </div>
  )
}
