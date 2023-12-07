"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const RegistrationPage = () => {
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
    }); // To store validation errors


    const validateEmail = (email) => {
        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password validation regex (requires at least one special character and alphanumeric)
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch("http://localhost:3000/api/server", {
            method: "Post",
            body: JSON.stringify({ formData })
        })
        res = await res.json()
        if(res.success){
            alert("new user created")
        }else{
            alert("Something went wrong")
        }

        const validationErrors = {};

        if (!formData.name.trim()) {
            validationErrors.name = 'Name is required';
        }

        if (!formData.age.trim()) {
            validationErrors.age = 'Age is required';
        }

        if (!validateEmail(formData.email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (!validatePassword(formData.password)) {
            validationErrors.password =
                'Password must be at least 8 characters and contain at least one special character and one alphanumeric character';
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // If there are no validation errors, proceed with registration logic here
            // console.log('Form data:', formData);
            if(res.success){
                router.push('/user')
            }

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register for an Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="sr-only">
                                Age
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="text-red-500 text-xs mt-2">
                        {errors.name && (<p className="text-red-500 text-xs mt-1">{errors.name}</p>)}
                        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
