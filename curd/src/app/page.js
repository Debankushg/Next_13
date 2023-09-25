
"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './globals.css'

export default function Home() {

  // const Deb = (data) => {
  //   alert(data)
  // }

  // const InnerComponent = () => {
  //   return (<h1>Inner component</h1>)
  // }
  const router = useRouter()
  const navigate = (routeName) => {
    router.push(routeName)
  }

  return (
    <div className="bg-gray-100 p-4">
    <h1 className="text-4xl font-bold text-blue-600 mb-4">Hello India</h1>
    <button
      onClick={() => router.push('/login')}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
    >
      Go to Log-in Page
    </button>
    <br />
    <button
      onClick={() => navigate('/about')}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mb-2"
    >
      Go to About Page
    </button>
    <ul>
      <li>
        <Link href="/login" className="text-blue-600 hover:underline">
          Go to Login Page
        </Link>
      </li>
      <li>
        <Link href="/about" className="text-blue-600 hover:underline">
          Go to About Page
        </Link>
      </li>
    </ul>
  </div>
  
  )
}
