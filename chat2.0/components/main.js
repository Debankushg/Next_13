import React from 'react'
import Ask from './ask'
import Response from './response'
import { useQuery } from 'react-query'
import { getMessages } from '../lib/request'
import Loading from './loading'
import Notfound from './notFound'

const Main = ({ roomid }) => {


  const { isLoading, isError, error, data: messages } = useQuery(['messages', roomid], () => getMessages(roomid))

  if (isLoading) return <div> <Loading /></div>
  if (isError) return <div className='text-center'> Error:{error.message}</div>
  if (messages.length === 0) return <div className='text-center'><Notfound/> </div>


  return (
    <main className='container mx-auto w-3/5 py-5'>

      {
        messages && messages.map((msg, index) => {
          return (
            <div key={index}>
              <Ask question={msg.question}/>
              <Response ans={msg.answer}/>
            </div>
          )
        })
      }


    </main>
  )
}

export default Main