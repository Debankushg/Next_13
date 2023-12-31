"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import { BiUserPlus, BiCheck, BiX } from 'react-icons/bi'
import Table from '../components/table'
import Form from '../components/form'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, deleteAction } from "../redux/reducer";
import { deleteUser, getUsers } from '../lib/helper'
import { useQueryClient } from 'react-query'


export default function Home({ session }) {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector((state) => state.app.client.deleteId)
  const queryClient = useQueryClient()
  const dispatch = useDispatch()


  const handleAddEmp = () => {
    dispatch(toggleChangeAction(visible))
  }

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId)
      await queryClient.prefetchQuery('users', getUsers)
      await dispatch(deleteAction(null))
    }
  }

  const cancelHandler = async () => {
    await dispatch(deleteAction(null))
  }




  return (
    <section>
      <Head>
        <title>Employee Management System</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='py-5 bg-slate-300'>
        {/* <h1 className='text-xl md:text-5xl text-center font-bold py-10'> Employee Management</h1> */}
        <div className='container mx-auto flex justify-between py-5 border-b'>
          
          {!visible && <div className='left flex gap-3'>
            <button className='flex bg-indigo-500 text-white px-[10px] py-[15px] border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover hover:text-indigo-500' onClick={handleAddEmp}>Add Employee <span className='px-1'><BiUserPlus size={23} /> </span> </button>
          </div>}
          {deleteId && Delete({ deleteHandler, cancelHandler })}
       
        </div>
        {/* form */}

        {visible ? <Form /> : <></>}

        <div className='container mx-auto'>
          <Table></Table>
        </div>
      </main>
    </section>
  )
}



export function Delete({ deleteHandler, cancelHandler }) {
  return (
    <div className='flex gap-5'>
      <p>Are you sure</p>
      <button className='flex px-4 py-[15px] border rounded-md text-white bg-rose-600 hover:bg-white hover:text-rose-500 hover:border-red-500 ' onClick={deleteHandler}>Yes<span className='px-1'><BiX size={25} /></span></button>
      <button className='flex px-4 py-[15px] border rounded-md text-white bg-green-600 hover:bg-white hover:text-green-500 hover:border-green-500' onClick={cancelHandler} >No<span className='px-1'><BiCheck size={25} /></span> </button>
    </div>
  )
}