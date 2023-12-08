"use client"
import React, { useReducer } from 'react'
import AddUserForm from './addUserForm'
import UpdateUserForm from './updateUserForm'



const Form = () => {

    const flag = true

    return (
        <div className='container mx-auto py-5'>
            {flag ? <AddUserForm /> : <UpdateUserForm />}
        </div>
    )
}
export default Form