"use client"
import React, { useState, useEffect } from 'react'

const Update = ({ params }) => {
    let id = params.userid
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = async () => {
        let data = await fetch("http://localhost:3000/api/server/" + id)
        data = await data.json()
        setName(data.result.name)
        setEmail(data.result.email)
        setPhone(data.result.phone)
    }

    const updateUser = async () => {
        let result = await fetch("http://localhost:3000/api/server/" + id, {
            method: "PUT",
            body: JSON.stringify({ name, phone, email })
        })
        result = await result.json()
        if (result.success) {
            alert("user Information Updated")
        } else {
            alert("Please try with valid Input")
        }
    }

    return (
        <>
            <div className="bg-gray-100">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
                        <form action="#" method="POST">

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
                                <input type="text" id="name" name="name" className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" value={name} placeholder="Your Name" required onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                                <input type="email" id="email" name="email" className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" value={email} placeholder="Your Email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-600 font-medium">Phone</label>
                                <input type="tel" id="phone" name="phone" className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" value={phone} placeholder="Your Phone" required onChange={(e) => setPhone(e.target.value)} />
                            </div>


                            {/* <div className="mb-4">
                                <label htmlFor="contentId" className="block text-gray-600 font-medium">Content ID</label>
                                <input type="text" id="contentId" name="contentId" className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Your Content ID" required />
                            </div> */}

                            <div className="mt-6">
                                <button type="submit" className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={updateUser}>Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update