
import React from 'react'
import Home from '../components/home'
import { useRouter } from 'next/navigation'
import { FaCircleUser } from "react-icons/fa6";
import { getSession, useSession, signOut, getCsrfToken } from 'next-auth/react'
import Dashboard from '../components/dashBoard';

import Head from 'next/head';

const Index = () => {


  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  const { data: session } = useSession()

  return (
    <>

      <Head><title>Dashboard</title></Head>
      <div className=' bg-[#100547]'>
        <div className='bg-gray-900 fixed z-10 w-full  py-5 px-4'>

          {!session?.user ? (
            <>
              <h3 className='text-4xl font-bold text-orange-300  text-center flex justify-center'>Employee Management System </h3>
              <div className='flex justify-end absolute'>
                <button onClick={() => navigate('/login')} className="bg-indigo-500 hover:bg-blue-900  hover:text-white text-white font-semibold py-4 px-14 right-[200px] top-[10px] rounded-md mb-2 ml-2 fixed ">
                  <span className='pr-[40px] right-[75px] absolute pb-1'><FaCircleUser size={30} className='text-white' /></span> Log-in
                </button>
                <button onClick={() => navigate('/register')} className="bg-green-500 hover:bg-green-800 text-white font-semibold py-4 rounded-md mb-2 px-14 fixed right-[5px] top-[10px]">
                  <span className='pr-[40px] right-[90px] pb-1 absolute'><FaCircleUser size={30} className='text-white' /></span> Sign-Up
                </button>
              </div>
            </>
          ) : (
            <>
            <h3 className='text-4xl font-bold text-orange-300  text-center flex justify-center'>Welcome to Employee Management Database </h3>
              <div className="flex justify-end absolute top-[7px] right-[260px]">
                <h5 className='text-center  '>
                  <span className=' bg-orange-300 relative left-16 text-rose-600 w-10 h-10 rounded-full flex items-center justify-center font-semibold'>
                    {(session?.user?.email) ? session?.user?.email.slice(0, 2).toUpperCase() : (session?.user?.firstName.slice(0, 2))}
                  </span>
                </h5>
                <h5 className=' font-semibold text-rose-600 relative top-10 right-5'>{session?.user?.email}</h5>
                <button className="bg-red-500 hover:bg-red-600  hover:text-white text-white font-bold py-4 px-14 right-[40px] top-[10px] rounded-md mb-2 ml-2 fixed " onClick={() => signOut()}>Sign Out</button>
              </div>
            </>


          )}
        </div>
        {session ? <Home session={session} /> : <Dashboard/>}
      </div>
    </>
  )
}




// if there is no login the redirect to login page 

// export async function getServerSideProps({req}){
//   const session = await getSession({req})

// if(!session){
//   return {
//     redirect:{
//       destination:'/login',
//       parmanent:false
//     }
//   }
// }
//   return{
//     props:{session}
//   }
// }


export default Index