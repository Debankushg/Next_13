"use client"
import React from 'react'

const DeleteUser = (props) => {
    const userId = props.id
    const deleteUser = async() => {
        let result = await fetch("http://localhost:3000/api/server/"+userId,{
            method:"delete",
        })
        result = await result.json()
        if(result.success){
            alert("User Deleted Successfully")
        }
    }
    return (
        <button className='font-semibold text-lg text-red-600' onClick={deleteUser}>Delete</button>
    )
}

export default DeleteUser