"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { loginApi } from '../../api/getApi';

const Modal = ({ onClose }) => {

  const { isCartOpen, isModalOpen, cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("")

  const handleTextChange = (e) => {
    setAddress(e.target.value)
  }

  const [selectedOption, setSelectedOption] = useState('');

  const selectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotalQuantity = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);


  const handleProceed = () => {
    const data = {
      Gtotal: cartTotal.toLocaleString(),
      address: address,
      totalItems: cartTotalQuantity.toLocaleString(),
      paymentMode: selectedOption
    }

    console.log(data, "DATA");
  }


  return (
    // Your modal markup and styles go here
    <div className=''>
      <div className={`modal ${isModalOpen ? 'open' : 'closed'} h-auto  bg-white flex justify-center items-center overflow-y-scroll `}>
        <div className="modal-content h-[500px] w-[800px] p-10">
          <button onClick={onClose}><IoCloseSharp size={30} /></button>
          {cartItems.map((item) => {
            const { id, thumbnail, title, price, quantity } = item;
            const itemTotal = price * quantity;
            return (
              <>
                <div className='border border-blue-900  rounded-md flex p-4 m-4' key={id}>
                  <div className="cart_items_img w-24 h-24">
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

                </div>
              </>
            )
          })}

          <div className=' bg-blue-300 m-4 p-4 rounded-md'>
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
                <small className='text-blue-900'>Grand Total:</small>
              </span>
              <span>
                <b>₹ {cartTotal.toLocaleString()}</b>
              </span>
            </h3>
          </div>
          <div className='m-4'>
            <h1 className='font-bold'>Enter Your Shipping Address:</h1>
            <textarea className='h-[100px] w-full border border-blue-500 rounded-md px-2' onChange={handleTextChange} />
          </div>
          <div className='m-4'>
            <h1 className='font-bold'>Mode of Payment</h1>
            {/* <div className='flex flex-col'>
              <label>
                <input type="radio" name="options" onChange={selectOption} />
                <span className='px-4'>COD</span>
              </label>
              <label>
                <input type="radio" name="options" onChange={selectOption} />
                <span className='px-4'>UPI</span>
              </label>
              <label>
                <input type="radio" name="options" onChange={selectOption} />
                <span className='px-4'>Credit Card</span>
              </label>
              <label>
                <input type="radio" name="options" onChange={selectOption} />
                <span className='px-4'>Debit Card</span>
              </label>
            </div> */}
            <div className='flex flex-col'>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="COD"
                  onChange={selectOption}
                  checked={selectedOption === 'COD'}
                />
                <span className='px-4'>COD</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="UPI"
                  onChange={selectOption}
                  checked={selectedOption === 'UPI'}
                />
                <span className='px-4'>UPI</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="Credit Card"
                  onChange={selectOption}
                  checked={selectedOption === 'Credit Card'}
                />
                <span className='px-4'>Credit Card</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="Debit Card"
                  onChange={selectOption}
                  checked={selectedOption === 'Debit Card'}
                />
                <span className='px-4'>Debit Card</span>
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

        </div>
      </div>
    </div>
  );
};

export default Modal;