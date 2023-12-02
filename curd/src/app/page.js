
"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './globals.css'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Shoppinglist from './login/shopping/page'

export default function Home() {

  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  // return (
  //   <div className="bg-gray-100 p-4">
  //     <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Hello India</h1>
  //     <button
  //       onClick={() => router.push('/login')}
  //       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
  //     >
  //       Log-in
  //     </button>
  //     <br />
  //     <button
  //       onClick={() => navigate('/signup')}
  //       className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
  //     >
  //       Register Yourself
  //     </button>





  //     {/* <ul>
  //       <li>
  //         <Link href="/login" className="text-blue-600 hover:underline">
  //           Go to Login Page
  //         </Link>
  //       </li>
  //       <li>
  //         <Link href="/about" className="text-blue-600 hover:underline">
  //           Go to About Page
  //         </Link>
  //       </li>
  //     </ul> */}
  //   </div>

  // )


  const { data: session } = useSession()



  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ?<Shoppinglist session={session}/> : Guest()}
    </div>
  )
}


function Guest() {

  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  return (
    <main className="container mx-auto text-center py-20">
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>

      <div className='flex justify-center'>
        <button
          onClick={() => navigate('/signin')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
        >
          Log-in
        </button>
      </div>
    </main>
  )
}

// Authorize User
// function User({ session }) {
//   const router = useRouter()
//   const navigate = (routeName) => {
//     router.push(routeName)
//   }


//   if (session && session.user) {
//     return (
//       <main className="container mx-auto text-center py-20">
//         <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

//         <div className='details'>
//           <h5>{session?.user?.name}</h5>
//           <h5>{session?.user?.email}</h5>
//         </div>

//         <div className="flex justify-center">
//           <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50' onClick={() => signOut()}>Sign Out</button>
//         </div>

//         <div className='flex justify-center'>
//           <Link href={'/profile'}><span className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</span></Link>
//         </div>
//       </main>
//     )
//   }

// }