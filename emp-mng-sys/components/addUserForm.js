"use client"
import React, { useReducer } from 'react'
import { BiPlus } from 'react-icons/bi'
import Success from './success'
import Bug from './bug'

const formReducer = (state, event) => {
    return {
        ...state, [event.target.name]: event.target.value
    }
}

const AddUserForm = () => {

    const [formData, setFormData] = useReducer(formReducer, {})
    const handelSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(formData) == 0) {
            return console.log('Dont have Data');
        }
        console.log(formData);
    }
    
        if(Object.keys(formData).length>0){
           return <Success message={'Data Added...!!'}/>
        }

    return (
        <form className='grid lg:grid-col-2 w-4/6 gap-4 ' onSubmit={handelSubmit}>
            <div className='input-type'>
                <input type='text' onChange={setFormData} placeholder='First Name' name='firstname' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='text' onChange={setFormData} placeholder='Last Name' name='lastname' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='email' onChange={setFormData} placeholder='Email' name='email' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='text' onChange={setFormData} placeholder='Salary' name='salary' className='w-full px-5 py-3  focus:outline-none rounded-md border' />
            </div>
            <div className='input-type'>
                <input type='date' onChange={setFormData} placeholder='date' name='date' className=' px-5 py-3 focus:outline-none rounded-md border' />
            </div>

            <div className='flex gap-10 items-center'>
                <div className='form-check'>
                    <input type='radio' name='status'
                        value='Active'
                        onChange={setFormData}
                        id='radioDefault1'
                        className='from-check-input rounded-full appearance-none h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 float-left cursor-pointer' />
                    <label htmlFor='radioDefault1' className='inline-block text-gray-800'>Active</label>
                </div>
                <div className='form-check'>
                    <input type='radio' name='status'
                        value='Inactive'
                        onChange={setFormData}
                        id='radioDefault2'
                        className='from-check-input rounded-full appearance-none h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 float-left cursor-pointer' />
                    <label htmlFor='radioDefault2' className='inline-block text-gray-800'>In active</label>
                </div>
            </div>

            <button className='flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:text-green-500 hover:border-green-500 '><span className='px-1'><BiPlus size={30} /></span>Add </button>
        </form>
    )
}
export default AddUserForm