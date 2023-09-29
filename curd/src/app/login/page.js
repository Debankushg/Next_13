"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { loginApi } from "../api/getApi"



const Login = () => {
    const [login, setLogin] = useState()

    useEffect(() => {
        const loginData = async () => {
            try {
                const data = await loginApi();
                setLogin(data)
            } catch (error) {

            }
        }
        loginData()
    }, [])




    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6">Login</h1>
                    <form>
                        <div className="mb-4">
                            <label value="username" className="block text-gray-600">Username</label>
                            <input type="text" id="username" name="username" className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label value="password" className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password" className="w-full p-2 border rounded-md" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                    </form>
                </div>
            </div>






        </>
    )
}

export default Login