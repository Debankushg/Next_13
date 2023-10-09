"use client"
import React, { useEffect, useState, Suspense } from 'react'
import { getEcomdata } from "../../api/getApi"
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/slice"
import Image from 'next/image'

const Shoppinglist = () => {

    const [data, setData] = useState([])
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const handleOpenCart = (open) => {
        dispatch(toggleCart(open));
    };


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

    const handleAddToCart = () => {
        const item = { ...props };
        dispatch(addItem(item));

        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 300);
    }
    const cartQuantity = cartItems.length;
    return (
        <>
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto">
                    <div className="nav_menu  flex justify-end">
                        <div
                            title="Cart"
                            className="cart_icon relative cursor-pointer"
                            onClick={() => handleOpenCart(true)}
                        >
                            <Image
                                width={50}
                                height={50}
                                src="https://icons.veryicon.com/png/o/miscellaneous/web-4/cart-64.png"
                                alt="bag-icon"
                            />
                            <span className="badge absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">
                                {cartQuantity}
                            </span>
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {data.map((e) => (
                            <div key={e.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={e.image}
                                    alt="Product"
                                    className="w-full h-60 object-cover p-4"
                                    width={200}
                                    height={200}
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{e.category}</h2>
                                    <p className="text-gray-600">Price: ${e.price}</p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400 flex items-center">
                                            {Array.from({ length: e.rating.rate }, (_, index) => (
                                                <svg
                                                    key={index}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 0a1 1 0 0 1 .77.36l2.52 3.06 3.93.57a1 1 0 0 1 .55 1.7l-2.85 2.77.67 3.9a1 1 0 0 1-1.45 1.05L10 13.56l-3.52 1.86a1 1 0 0 1-1.45-1.05l.67-3.9L.25 5.99a1 1 0 0 1 .55-1.7l3.93-.57L9.23.36A1 1 0 0 1 10 0z"
                                                    />
                                                </svg>
                                            ))}
                                            <span className="ml-1 text-gray-600 font-bold">{e.rating.rate}</span>
                                        </span>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <button className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
                                            Buy Now
                                        </button>
                                        <button
                                            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleAddToCart}
                                        >
                                            {isAdded ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Shoppinglist