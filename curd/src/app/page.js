
"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEcomdata } from "./api/getApi"
import { useRouter } from 'next/navigation'
import styles from './globals.css'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Shoppinglist from './login/shopping/page'
import Image from 'next/image'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaCircleUser } from "react-icons/fa6";

export default function Home() {



  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  //   return (
  //     <div className="bg-gray-100 p-4">
  //       <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Hello India</h1>
  //       <button
  //         onClick={() => router.push('/login')}
  //         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
  //       >
  //         Log-in
  //       </button>
  //       <br />
  //       <button
  //         onClick={() => navigate('/signup')}
  //         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
  //       >
  //         Register Yourself
  //       </button>

  //       </div>

  // )
  // }








  const { data: session } = useSession()

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className='bg-blue-500 relative  py-4 px-4'>
        <h3 className='text-4xl font-bold text-orange-300  text-center flex justify-center'>EKNEE </h3>
        <div className='flex justify-end absolute'>
          <button onClick={() => navigate('/signin')} className="bg-white hover:bg-orange-600  hover:text-white text-blue-500 font-semibold py-4 px-14 right-[200px] top-[10px] rounded-md mb-2 ml-2 fixed ">
            <span className='pr-[40px] right-[75px] absolute pb-1'><FaCircleUser size={30} className='text-blue-500' /></span> Log-in
          </button>

          <button onClick={() => navigate('/register')} className="bg-green-500 hover:bg-green-800 text-white font-semibold py-4 rounded-md mb-2 px-14 fixed right-[5px] top-[10px]">
            <span className='pr-[40px] right-[90px] pb-1 absolute'><FaCircleUser size={30} className='text-white' /></span> Sign-Up
          </button>
        </div>
      </div>
        <marquee className="bg-black text-yellow-400 h-10 text-2xl font-bold ">Free Shipping   |   Discount   |   Fast Delivery    |    100% Genuine   |    Branded    |    Offers</marquee>

      {session ? <Shoppinglist session={session} /> : Guest()}
    </div>
  )
}


function Guest() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  }

  const [imgData, setImgData] = useState([])

  useEffect(() => {

    const getDataAsync = async () => {
      try {
        const data = await getEcomdata();

        const actualData = data.products.map((e) => {
          return { ...e, quantity: 1 }
        })
        setImgData(actualData)
      } catch (error) {

      }
    };
    getDataAsync();

  }, [])


  console.log(imgData, "ImgData");

  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  return (
    <main className="container mx-auto text-center py-20 bg-slate-300">
      <div className='w-4/5 m-auto'>
        <div className='mt-10'>
          <Slider {...settings}>
            {imgData.map((d) => (
              <div key={d.id} className=' bg-indigo-500 h-[350px]'>
                <div className='rounded-t-xl flex justify-center items-center h-[300px] m-6'>
                  {/* {d.images.map((e) => (<Image alt='product' src={e} height={100} width={500} key={e.id}/>))} */}
                  <Image alt='product' src={d.thumbnail} height={100} width={600} className=' rounded-xl h-[300px]' />
                </div>
                <div>

                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </main>
  )
}
