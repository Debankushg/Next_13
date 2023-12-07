"use client"
import React, { useEffect, useState, Suspense } from 'react'
import { getEcomdata } from "../../api/getApi"
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, addItem, } from "../../redux/slice"
import { useRouter } from 'next/navigation'
import Cart from "./pages"
import Image from 'next/image'
import { signOut } from 'next-auth/react'


const Shoppinglist = ({ session }) => {

    const [data, setData] = useState([])
    const [prevData, setPrevData] = useState([]);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // for pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const router = useRouter()
    const navigate = (routeName) => {
        router.push(routeName)
    }

    const handleOpenCart = (open) => {
        dispatch(toggleCart(open));
    };

    useEffect(() => {

        const getDataAsync = async () => {
            try {
                const data = await getEcomdata();

                const actualData = data.products.map((e) => {
                    return { ...e, quantity: 1 }
                })
                setData(actualData)
                setPrevData(actualData);
            } catch (error) {

            }
        };
        getDataAsync();

    }, [])

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        if (query === '') {
            setData(prevData);
        } else {
            const filteredData = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
            setData(filteredData);
        }
    };

    const handleBuyNow = (e) => {
        dispatch(addItem(e));
        navigate('/payment')
    }

    const handleAddToCart = (e) => {
        dispatch(addItem(e));
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 300);
    }
    const cartQuantity = cartItems.length;


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    // console.log(pageNumbers, "PageNo");
    if (session && session.user) {
        return (
            <>
                <div className='bg-gradient-to-r from-blue-500 to-indigo-500 flex justify-end py-2'>
                    <div className='flex justify-end p-4 w-[70%]'>
                        <input
                            className='p-2 rounded w-[70%] focus:outline-none'
                            type="text"
                            placeholder="Search for Product"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='details  mr-10'>
                        <h5 className='text-center  '>
                            <span className=' bg-white relative left-16 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-semibold'>
                                {(session?.user?.name) ? session?.user?.name.slice(0, 1) : (session?.user?.firstName.slice(0, 1))}
                            </span>
                        </h5>
                        <h5 className=' font-semibold text-orange-100'>{session?.user?.email}</h5>
                    </div>
                    <div className="nav_menu  flex justify-end mr-14">

                        <div
                            title="Cart"
                            className="cart_icon relative top-[5px] cursor-pointer">
                            <Image
                                width={50}
                                height={50}
                                src="https://icons.veryicon.com/png/o/miscellaneous/web-4/cart-64.png"
                                alt="bag-icon"
                                onClick={() => handleOpenCart(true)}
                            />
                            <span className="badge absolute top-0 right-0 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold" onClick={() => handleOpenCart(true)}>
                                {cartQuantity}
                            </span>
                            {cartItems && <Cart />}
                        </div>

                    </div>
                    <div className="flex justify-end  mr-5 relative bottom-3">
                        <button className='mt-5 px-6 py-1 rounded-md bg-orange-500 text-gray-50' onClick={() => signOut()}>Sign Out</button>
                    </div>

                </div>
                <div className="bg-gray-200 py-8 ">
                    <div className="container mx-auto ">

                        <div className="text-center mb-8 ">
                            <h1 className="text-3xl text-orange-500 font-bold">Welcome to Our Store</h1>
                        </div>
                        {/* {isModalOpen && <Modal onClose={() => handleCloseModal(false)} />} */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {data.map((e) => (
                                <div key={e.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={e.thumbnail}
                                        alt="Product"
                                        className="w-full h-60 object-cover p-4"
                                        width={200}
                                        height={200}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{e.title}</h2>
                                        <p className="text-gray-600">Price:  ₹{e.price}</p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-yellow-400 flex items-center">
                                                {Array.from({ length: e.rating }, (_, index) => (
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
                                                <span className="ml-1 text-gray-600 font-bold">{e.rating}</span>
                                            </span>
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <button className="bg-orange-500 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleBuyNow(e)}>
                                                Buy Now
                                            </button>
                                            <button
                                                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleAddToCart(e)}
                                            >
                                                {isAdded ? 'Added' : 'Add to Cart'}
                                            </button>
                                        </div>

                                    </div>


                                </div>
                            ))}
                        </div>
                        <ul>
                            {pageNumbers.map((number) => (
                                <li key={number}>
                                    <button onClick={() => handlePageChange(number)}>{number}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </>
        )
    }
}

export default Shoppinglist