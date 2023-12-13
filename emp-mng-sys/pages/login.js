
"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from "../styles/form.module.css"
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { signIn ,getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import login_validate from "../lib/validate"

const Login = () => {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const navigate = (routeName) => {
        router.push(routeName)
    }


    const handleSubmit = async (values) => {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "http://localhost:3000"
        })
        const token = await getCsrfToken();

        if(status.ok && token) navigate(status.url)
        
       }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: login_validate,
        onSubmit:handleSubmit
    })






    //Google login
    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: "http://localhost:3000" })
    }
    //Github Login
    const handelGitHubLogin = () => {
        signIn('github', { callbackUrl: "http://localhost:3000" })
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
                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            autoComplete='off'
                            className={styles.input_textBox}
                            // onChange={formik.handleChange}
                            // value={formik.values.email} 
                            {...formik.getFieldProps('email')}

                        />
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
                    </div>
                    {/* <div className={`${styles.input_group}`}>
                        <input
                            type='text'
                            name='username'
                            placeholder='User Name'
                            autoComplete='off'
                            className={styles.input_textBox}
                        // onChange={formik.handleChange}
                        // value={formik.values.email} 
                        // {...formik.getFieldProps('email')}

                        />
                        <span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
                    </div> */}
                    {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password  ? 'border-rose-600' : ''}`}>
                        <input
                            type={`${show ? "text" : "password"}`}
                        name='password'
                        placeholder='password'
                        className={styles.input_textBox}
                        // onChange={formik.handleChange}
                        // value={formik.values.password}
                        {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]' onClick={() => setShow(!show)}><HiFingerPrint size={25} /></span>
                </div>
                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
                <div className='input-button'>
                    <button type='submit' className={styles.button}> Login</button>

                </div>
                <div className='input-button'>
                    <button type='button' className={styles.button_custom} onClick={handleGoogleSignIn}> Sigin In with Google <Image src={'/asset/google.svg'} width={20} height={20} alt='Google_logo'></Image></button>
                </div>
                <div className='input-button'>
                    <button type='button' className={styles.button_custom} onClick={handelGitHubLogin}> Sign In with Github <Image src={'/asset/github.svg'} width={25} height={25} alt='Github_logo'></Image></button>
                </div>

            </form>

            <p className='text-center text-gray-400'>
                Dont have an account? <Link href={'/register'}><span className='text-blue-700'>Sign Up</span></Link>
            </p>

        </section>

        </Layout >
    )

}

export default Login