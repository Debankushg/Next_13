"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../../../layout/layout'
import Link from 'next/link'
import styles from "./form.module.css"
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const Signin = () => {

    const [show, setShow] = useState(false)
    const router = useRouter()
    const navigate = (routeName) => {
      router.push(routeName)
    }

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl:"http://localhost:3000" })
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>

            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>hdhasdha</p>
                </div>
                {/* form */}
                <form className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input type='email' name='email' placeholder='Email' className={styles.input_textBox} />
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
                    </div>
                    <div className={styles.input_group}>
                        <input type={`${show ? "text" : "password"}`} name='password' placeholder='password' className={styles.input_textBox} />
                        <span className='icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]' onClick={() => setShow(!show)}><HiFingerPrint size={25} /></span>
                    </div>
                    <div className='input-button'>
                        <button type='submit' className={styles.button}> Login</button>

                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom} onClick={handleGoogleSignIn}> Sigin In with Google <Image src={'/asset/google.svg'} width={20} height={20} alt='Google_logo'></Image></button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom}> Sign In with Github <Image src={'/asset/github.svg'} width={25} height={25} alt='Github_logo'></Image></button>
                    </div>

                </form>

                <p className='text-center text-gray-400'>
                    Dont have an account? <Link href={'/register'}><span className='text-blue-700'>Sign Up</span></Link>
                </p>

            </section>

        </Layout>
    )
}

export default Signin