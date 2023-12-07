"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { loginApi } from "../api/getApi"



const Login = () => {
    const router = useRouter()
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }

    const handleLogIn = (e) => {
        e.preventDefault()
        const loginData = async () => {
            try {
                const data = await loginApi(login);
                if(data.token){
                    router.push('/login/shopping')
                }else{
                    alert("Invalid credentials Please put valid credentials ")
                }
                setLogin(data)
            } catch (error) {

            }
        }
        loginData(login);
    }
 
  console.log(login ,"LOGin");

    return (
        <>
            {(<div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6">Login</h1>
                    <form onSubmit={handleLogIn}>
                        <div className="mb-4">
                            <label value="username" className="block text-gray-600">Username</label>
                            <input type="text" id="username" name="username" className="w-full p-2 border rounded-md" autoComplete='off' onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label value="password" className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password" className="w-full p-2 border rounded-md" autoComplete='off' onChange={handleChange} />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                    </form>
                </div>
            </div>)}

        </>
    )
}

export default Login