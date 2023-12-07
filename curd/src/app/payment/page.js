"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaCreditCard, FaCcMastercard } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { useRouter } from 'next/navigation'
import {
  removeItem,
} from "../redux/slice";


const Payment = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  const handleTextChange = (e) => {
    setAddress(e.target.value)
  }

  const [selectedOption, setSelectedOption] = useState('');

  const selectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  console.log(cartItems, "cartItems");
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotalQuantity = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const GST = parseInt((cartTotal * 0.15).toFixed())

  const deliveryCharges = (cartTotal < 500 && cartTotal > 0) ? 400 : (cartTotal < 1000 && cartTotal > 500) ? 200 : 0;

  const gTotal = parseInt(cartTotal) + parseInt(GST) + parseInt(deliveryCharges)


  const handleProceed = () => {
    const data = {
      Gtotal: gTotal.toLocaleString(),
      address: address,
      totalItems: cartTotalQuantity.toLocaleString(),
      paymentMode: selectedOption
    }

    console.log(data, "DATA");
  }


  return (
    // Your modal markup and styles go here
    <div className=''>

      <div className={` h-auto bg-gray-200 flex justify-center items-center`}>

        <div className="modal-content w-full p-16">
          <h1 className='text-4xl text-center font-bold font-mono text-blue-600'>Shopping Details Page</h1>
          {/* <button onClick={onClose}><IoCloseSharp size={30} /></button> */}
          {cartItems.map((item) => {
            const { id, thumbnail, title, price, quantity } = item;
            const itemTotal = price * quantity;
            return (
              <>
                <div className='border border-blue-900  rounded-md flex p-4 m-4' key={id}>
                  <div className="cart_items_img w-24 h-24" >
                    <Image
                      src={thumbnail}
                      alt="Product"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="cart_items_info  flex-grow ml-4">
                    <h4 className="text-lg font-semibold text-blue-500 ">{title}</h4>
                    <h4 className="text-lg"><span className='text-orange-500 font-bold'>Items Selected -</span> {quantity}</h4>
                    <h3 className="price font-bold mt-2">₹ {itemTotal.toLocaleString()}</h3>
                  </div>

                  <div>
                    {cartItems.length > 0 ? <buton className=" bg-blue-900 text-white text-xl px-8 py-2 mt-4 rounded-md m-6 cursor-pointer" onClick={() => handleRemove(id)}>Remove</buton> :
                      <buton className=" bg-blue-900 text-white text-xl px-8 py-2 mt-4 rounded-md m-6 cursor-pointer" onClick={() => navigate('/')}>Back</buton>}
                  </div>

                </div>
              </>
            )
          })}

          <div className=' bg-blue-300 m-4 p-4 rounded-md my-10'>
            <h3 className="text-2xl font-semibold flex justify-between items-center">
              <span>
                <small className='text-blue-900'>Total Item Purchased:</small>
              </span>
              <span>
                <span>{cartTotalQuantity.toLocaleString()}</span>
              </span>
            </h3>
            <h3 className="text-2xl font-semibold flex justify-between items-center">
              <span>
                <small className='text-blue-900'>Total Price:</small>
              </span>
              <span>
                <span>₹ {cartTotal.toLocaleString()}</span>
              </span>
            </h3>
            <h3 className="text-2xl font-semibold flex justify-between items-center">
              <span>
                <small className='text-blue-900'>Delivery Charges:</small>
              </span>
              <span>
                <span>₹{deliveryCharges.toLocaleString()}</span>
              </span>
            </h3>
            <h3 className="text-2xl font-semibold flex justify-between items-center">
              <span>
                <small className='text-blue-900'>GST(15%):</small>
              </span>
              <span>
                <span>₹{GST.toLocaleString()}</span>
              </span>
            </h3>
            <h3 className="text-2xl font-semibold flex justify-between items-center">
              <span>
                <small className='text-blue-900'>Total Amount:</small>
              </span>
              <span>
                <b>₹ {gTotal.toLocaleString()}</b>
              </span>
            </h3>
          </div>
          <div className='m-4'>
            <h1 className='font-bold'>Enter Your Shipping Address:</h1>
            <textarea className='h-[100px] w-full border border-blue-500 rounded-md px-2 outline-none' onChange={handleTextChange} />
          </div>
          <div className='m-4'>
            <h1 className='font-bold'>Mode of Payment</h1>
            <div className='flex flex-col'>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="COD"
                  onChange={selectOption}
                  checked={selectedOption === 'COD'}
                />
                <span className='px-4 flex items-center'>COD(Cash On Delivery)
                  <span className="ml-4"><BsCashCoin color='blue' size={30} /></span>
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="UPI"
                  onChange={selectOption}
                  checked={selectedOption === 'UPI'}
                />
                <span className='px-4 flex items-center'>UPI
                  <span className="ml-[10rem]"><Image src={'/upi.png'} alt="logo" width={50} height={50} /></span>
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="Credit Card"
                  onChange={selectOption}
                  checked={selectedOption === 'Credit Card'}
                />
                <span className='px-4 flex items-center'>
                  Credit Card
                  <span className="ml-[6.5rem]"><FaCreditCard color='blue' size={30} /></span>
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="Debit Card"
                  onChange={selectOption}
                  checked={selectedOption === 'Debit Card'}
                />
                <span className='px-4 flex items-center' >Debit Card
                  <span className="ml-[6.5rem]"><FaCcMastercard color='red' size={30} /></span>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="checkout_btn bg-orange-500 text-white text-xl px-10 py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed m-6"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>

          </div>
          <Image src={'/card.png'} alt="logo" width={700} height={650} />

        </div>
      </div>
    </div>
  );
};

export default Payment;