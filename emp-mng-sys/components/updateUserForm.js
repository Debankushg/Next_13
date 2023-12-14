"use client"
import React, { useReducer } from 'react'
import { BiBrush } from 'react-icons/bi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUser, updateUser ,getUsers } from '../lib/helper'
import Success from './success'



const UpdateUserForm = ({ formId, formData, setFormData }) => {

    const { isError, isLoading, data, error } = useQuery(['users', formId], () => getUser(formId))

    const queryClient = useQueryClient()
    const updateMutation = useMutation((newData) => updateUser(formId, newData), {
        onSuccess: async (data) => {
            // queryClient.setQueryData('users', (old) => [data])
            queryClient.prefetchQuery('users', getUsers)
        }
    })


    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    if (updateMutation.isSuccess) return <Success message={'Added Successfully...'} />


    const { name, avatar, salary, email, status, date } = data
    const [firstname, lastname] = name ? name.split(' ') : formData

    const handelSubmit = async (e) => {
        e.preventDefault()
        let userName = `${formData.firstname ?? firstname}${formData.lastname ?? lastname}`
        let updated = Object.assign({}, data, formData, { name: userName })
        await updateMutation.mutate(updated)
    }




    return (
        <form className='grid lg:grid-col-2 w-4/6 gap-4 ' onSubmit={handelSubmit}>
        <h1  className='flex justify-center text-2xl font-bold'>Update Employee Details</h1>
            <div className='input-type'>
                <input type='text' onChange={setFormData} placeholder='First Name' name='firstname' defaultValue={firstname} className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='text' defaultValue={lastname} onChange={setFormData} placeholder='Last Name' name='lastname' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='email' onChange={setFormData} defaultValue={email} placeholder='Email' name='email' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='text' onChange={setFormData} defaultValue={salary} placeholder='Salary' name='salary' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='date' onChange={setFormData} defaultValue={date} placeholder='date' name='date' className=' px-5 py-3 focus:outline-none rounded-md border' />
            </div>

            <div className='flex gap-10 items-center'>
                <div className='form-check'>
                    <input type='radio' name='status'
                        value='Active'
                        defaultChecked={status == 'Active'}
                        onChange={setFormData}
                        id='radioDefault1'
                        className='from-check-input rounded-full appearance-none h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 float-left cursor-pointer' />
                    <label htmlFor='radioDefault1' className='inline-block text-gray-800'>Active</label>
                </div>
                <div className='form-check'>
                    <input type='radio' name='status'
                        value='Inactive'
                        onChange={setFormData}
                        defaultChecked={status !== 'Active'}
                        id='radioDefault2'
                        className='from-check-input rounded-full appearance-none h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 float-left cursor-pointer' />
                    <label htmlFor='radioDefault2' className='inline-block text-gray-800'>In active</label>
                </div>
            </div>

            <button className='flex justify-center text-md w-2/6 bg-blue-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:text-blue-500 hover:border-blue-500 '><span className='px-1'><BiBrush size={30} /></span>Update </button>
        </form>
    )
}
export default UpdateUserForm