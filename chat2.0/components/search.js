'use client'
import React,{useState} from 'react'
import { BiNavigation } from 'react-icons/bi'
import { useMutation, useQueryClient } from 'react-query'
import {sentMessages} from '../lib/request'
import Loading from './loading'

const Search = ({roomid}) => {

    const [search , setSearch]= useState('')
    const queryClient =useQueryClient();

    const mutation = useMutation((arg)=>{
        return sentMessages(arg)
    },{
        onSuccess:()=>{
            queryClient.invalidateQueries('messages')
        }
    })

    const onSubmit =(e) =>{
        e.preventDefault()
        console.log(search);
        mutation.mutate({roomid,message:search})
        setSearch('')
    }

    if (mutation.isLoading) return <div> <Loading /></div>
    if (mutation.isError) return <div> Error:{mutation.error.message}</div>

        return (
        <div className="fixed bottom-0 left-0 w-full z-0 h-40 text-gray-50 bg-gradient-to-t from-gray-800">
        <div className="grid grid-cols-6 absolute bottom-10 w-full">
            <div className="col-start-2 col-span-6 flex justify-center items-center w-full">
                <div className=" w-2/3 px-5 bg-gray-800 border border-gray-700 rounded-lg flex items-center">
                    <form className="flex w-full shadow-2xl" onSubmit={onSubmit}>
                        <input type="text"
                            className="w-full py-3 bg-transparent focus:outline-none text-lg"
                            autoFocus="autofocus"
                            placeholder="What are you looking "
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <button type="submit">
                            <BiNavigation className="text-2xl hover:text-[#10a37f]"></BiNavigation>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Search