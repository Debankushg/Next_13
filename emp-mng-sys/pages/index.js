import React from 'react'
import Home from '../components/home'
import { useRouter } from 'next/navigation'
import { FaCircleUser } from "react-icons/fa6";
import { getSession, useSession } from 'next-auth/react'
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
      <div className=' bg-slate-300'>
        <div className='bg-gray-900 relative  py-4 px-4'>
          <h3 className='text-4xl font-bold text-orange-300  text-center flex justify-center'>Welcome to Employee Management System </h3>
          <div className='flex justify-end absolute'>
            <button onClick={() => navigate('/login')} className="bg-white hover:bg-red-600  hover:text-white text-blue-500 font-semibold py-4 px-14 right-[200px] top-[10px] rounded-md mb-2 ml-2 fixed ">
              <span className='pr-[40px] right-[75px] absolute pb-1'><FaCircleUser size={30} className='text-blue-500' /></span> Log-in
            </button>

            <button onClick={() => navigate('/register')} className="bg-green-500 hover:bg-green-800 text-white font-semibold py-4 rounded-md mb-2 px-14 fixed right-[5px] top-[10px]">
              <span className='pr-[40px] right-[90px] pb-1 absolute'><FaCircleUser size={30} className='text-white' /></span> Sign-Up
            </button>
          </div>
        </div>
        {session ? <Home session={session} /> : Guest()}
        {/* <Home /> */}
      </div>
    </>
  )
}


function Guest() {


  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  return (
    <main className="container mx-auto text-center py-20">
      <div className='w-4/5 m-auto'>
        <div className='mt-10'>
         Welcome To DashBoard
        </div>
      </div>
    </main>
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