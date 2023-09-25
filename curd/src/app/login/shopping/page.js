"use client"
import React, { useEffect, useState } from 'react'
import { getEcomdata } from "../../api/getApi"

const Shoppinglist = () => {
    const [data, setData] = useState([])

    useEffect(() => {

        const getDataAsync = async () => {
            try {
                const data = await getEcomdata();
                setData(data)
            } catch (error) {

            }
        };

        getDataAsync();

    }, [])
    console.log(data,);

    return (
        <>

            <div className="bg-gray-100 p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Welcome to Our Store</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data.map((e) => (
                        <div key={e.id} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                            <img src={e.image} alt="Product" className="w-full h-45 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{e.category}</h2>
                                <p className="text-gray-600">Price: ${e.price}</p>
                                <div className="flex items-center mt-2 ">
                                    <span className="text-yellow-400 flex flex-1 p-2 ">
                                        {Array.from({ length: e.rating.rate }, (_, index) => (
                                            <svg
                                                key={index}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 0a1 1 0 0 1 .77.36l2.52 3.06 3.93.57a1 1 0 0 1 .55 1.7l-2.85 2.77.67 3.9a1 1 0 0 1-1.45 1.05L10 13.56l-3.52 1.86a1 1 0 0 1-1.45-1.05l.67-3.9L.25 5.99a1 1 0 0 1 .55-1.7l3.93-.57L9.23.36A1 1 0 0 1 10 0z"
                                                />
                                            </svg>
                                        ))}
                                    </span>
                                    <span className="ml-1 text-gray-600 font-bold">{e.rating.rate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Shoppinglist