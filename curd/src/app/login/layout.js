'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import "./login.css"

const Layout = ({ children }) => {
    const pathname = usePathname()

    return (
        <div>

            {pathname !== "/login/studentlogin" ? <ul className="flex space-x-4 login-menu">
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
            </ul> : <ul lassName="login-menu ">
                <li className='bg-yellow-400 text-xl'>
                    <Link href="/" className= "text-red-900 font-bold p-4 m-6 hover:underline  hover:text-blue-700">Home</Link>
                </li>
            </ul>}

            {children}
        </div>
    )
}

export default Layout