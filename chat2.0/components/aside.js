import React from 'react'
import { BiPlus, BiComment, BiTrashAlt } from "react-icons/bi"
import { useMutation, useQueryClient } from 'react-query';
import { createRoom, deleteRoom } from '../lib/request'

const Aside = ({ getRooms,handler }) => {

    const queryClient = useQueryClient()
    const createRoomMutation = useMutation(createRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms')
        }
    })

    // DELETE Room 
    const deleteRoomMutation = useMutation(deleteRoom , {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms')
        }
    })

    return (
        <aside className="fixed left-0 w-80 h-screen bg-gray-900">
            <div className="text-gray-50 flex flex-col items-center py-3 gap-5">

                <button className="border rounded-md border-gray-600 w-4/5 hover:bg-indigo-600" onClick={() => createRoomMutation.mutate()}>
                    <span className="block py-3"><BiPlus className="inline" size={20} /> New Chat</span>
                </button>

                <div className="chat_list w-full flex flex-col gap-4 px-3">
                    {getRooms.map((chat, index) => {
                        return (<div className="w-full border-0 rounded-md bg-gray-800 py-1 px-3 flex justify-center items-center" key={index}>
                            <button className="text-left truncate w-full active:bg-violet-700" onClick={() =>handler(chat._id)}>
                                <span className="block py-3 text-gray-50">
                                    <BiComment className="inline mx-2" size={20}></BiComment>
                                    {chat.name || 'chat Name here'}
                                </span>
                            </button>
                            <button className=" bg-gradient-to-l from-gray-800 py-4 px-3 hover:text-indigo-400" onClick={() => deleteRoomMutation.mutate(chat._id)}>
                                <BiTrashAlt />
                            </button>
                        </div>)
                    })}
                </div>
            </div>
        </aside>
    )
}

export default Aside