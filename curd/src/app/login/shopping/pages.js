"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import Payment from '../../payment/page'
import { useRouter } from 'next/navigation'
import {
    toggleCart,
    removeItem,
    incrementItem,
    decrementItem,
    toggleModal,
} from "../../redux/slice";
import Image from 'next/image'


const Cart = () => {
    const { isCartOpen, isModalOpen, cartItems } = useSelector((state) => state.cart);

    const router = useRouter()
    const navigate = (routeName) => {
        router.push(routeName)
    }

    const dispatch = useDispatch();

    const handleCloseCart = (close) => {
        dispatch(toggleCart(close));
    };

    const handleOpenModal = () => {
        navigate('/payment')
    }

    const handleCloseModal = (close) => {
        dispatch(toggleModal(close));
    };

    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleIncrement = (itemId) => {
        dispatch(incrementItem(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementItem(itemId));
    };


    // disable the body-scroll when the Cart is open
    useEffect(() => {
        const docBody = document.body;

        isCartOpen
            ? docBody.classList.add("overflow_hide")
            : docBody.classList.remove("overflow_hide");
    }, [isCartOpen]);

    const cartQuantity = cartItems.length;

    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prevValue, currValue) => prevValue + currValue, 0);

    return (
        <>
            {isCartOpen && (<div id="cart" className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                <div className="cart_content bg-white fixed top-0 right-0 max-w-md w-full h-full flex flex-col justify-start overflow-hidden">
                    <div className="cart_head p-4 text-center shadow relative bg-orange-500">
                        <h2 className="text-lg font-semibold text-white">
                            Cart <small>({cartQuantity})</small>
                        </h2>
                        <div
                            title="Close"
                            className="close_btn absolute top-2 left-2  hover:bg-gray-200 text-black p-1 cursor-pointer opacity-80 hover:opacity-100"
                            onClick={() => handleCloseCart(false)}
                        >

                            <span className="text-xl leading-2" ><IoCloseSharp size={30} /></span>

                        </div>
                    </div>

                    <div className="cart_body p-4 pb-6 max-h-80vh overflow-x-hidden overflow-y-auto">
                        {cartQuantity === 0 ? (
                            <h2 className="text-lg font-semibold text-center py-8">Cart is empty</h2>
                        ) : (
                            cartItems.map((item) => {
                                const { id, thumbnail, title, price, quantity } = item;
                                const itemTotal = price * quantity;

                                return (
                                    <div className="cart_items flex items-center justify-between mb-6" key={id}>
                                        <div className="cart_items_img w-24 h-24">
                                            <Image
                                                src={thumbnail}
                                                alt="Product"
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        <div className="cart_items_info flex-grow ml-4">
                                            <h4 className="text-lg font-semibold">{title}</h4>
                                            <h3 className="price font-bold mt-2">₹ {itemTotal.toLocaleString()}</h3>
                                        </div>

                                        <div className="cart_items_quantity flex flex-col items-center justify-center bg-red text-black p-2">
                                            <span
                                                onClick={() => handleDecrement(id)}
                                                className="text-3xl font-bold cursor-pointer opacity-75 hover:opacity-100"
                                            >
                                                &#8722;
                                            </span>
                                            <b className="text-lg">{quantity}</b>
                                            <span
                                                onClick={() => handleIncrement(id)}
                                                className="text-3xl font-bold cursor-pointer opacity-75 hover:opacity-100"
                                            >
                                                &#43;
                                            </span>
                                        </div>

                                        <div
                                            title="Remove Item"
                                            className="cart_items_delete text-2xl text-center cursor-pointer opacity-70 hover:opacity-100"
                                            onClick={() => handleRemove(id)}
                                        >
                                            <span>&times;</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="cart_foot p-4 shadow bg-blue-500 text-white">
                        <h3 className="text-2xl font-semibold flex justify-between items-center">
                            <span>
                                <small>Total:</small>
                            </span>
                            <span>
                                <b>₹ {cartTotal.toLocaleString()}</b>
                            </span>
                        </h3>

                        <button
                            type="button"
                            className="checkout_btn bg-orange-500 text-white text-xl px-10 py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartQuantity === 0}
                            onClick={() => handleOpenModal()}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>)}

        </>
    );
};


export default Cart;
