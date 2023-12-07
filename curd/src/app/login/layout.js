'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import "./login.css"
import Image from 'next/image';
import { FaHome } from "react-icons/fa";


const Layout = ({ children }) => {
    const pathname = usePathname()

    return (
        <div>

            {pathname !== "/login" ? <ul className="flex space-x-4 login-menu">
                <li>
                    <h4 className="text-lg font-bold">Login Navbar</h4>
                </li>
                <li>
                    <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                </li>
                <li>
                    <Link href="/login" className="text-blue-600 hover:underline">Login Main</Link>
                </li>
                <li>
                    <Link href="/login/studentlogin" className="text-blue-600 hover:underline">Login Student</Link>
                </li>
                <li>
                    <Link href="/login/shopping" className="text-blue-600 hover:underline">Shopping</Link>
                </li>
            </ul> : <ul className="flex space-x-4 login-menu ">
                <li className='bg-white p-2 rounded-full'>
                <Image src={'/asset/google.svg'} width={30} height={30} alt='Google_logo' ></Image>
                </li>
                <li className='px-4 py-2'>
                    <Link href="/" className="font-bold hover:underline  hover:text-pink-200"><FaHome size={30}/></Link>
                </li>
            </ul>}

            {children}
        </div>
    )
}

export default Layout