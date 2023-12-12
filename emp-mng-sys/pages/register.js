"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from "../styles/form.module.css"
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import { useFormik } from 'formik'
import { register_validate } from "../lib/validate"
import { useMutation } from 'react-query'


const Register = () => {

  const handleSubmit = (val) => {
    console.log(val);
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: ""
    },
    validate: register_validate,
    onSubmit: handleSubmit
  })



  const [show, setShow] = useState({ password: false, cpassword: false })

  return (
    <Layout>
      <Head>
        <title>Register Yourself</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className='title'>
          <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
          <p className='w-3/4 mx-auto text-gray-400'>hdhasdha</p>
        </div>
        {/* form */}
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
            <input
              type='text'
              name='username'
              placeholder='UserName'
              className={styles.input_textBox}
              {...formik.getFieldProps('username')}
            />
            <span className='icon flex items-center px-4'><HiOutlineUser size={25} /></span>
          </div>
          {/* {formik.errors.username && formik.touched.username? <span  className='text-rose-500'>{formik.errors.username}</span>:<></>} */}
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className={styles.input_textBox}
              {...formik.getFieldProps('email')}
            />
            <span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
          <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ""}`}>
            <input
              type={`${show.password ? "text" : "password"}`}
              name='password'
              placeholder='password'
              className={styles.input_textBox}
              {...formik.getFieldProps('password')}
            />
            <span className='icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]' onClick={() => setShow({ ...show, password: !show.password })}><HiFingerPrint size={25} /></span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
          <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600':''}`}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name='cpassword'
              placeholder='Confirm Password'
              className={styles.input_textBox}
              {...formik.getFieldProps('cpassword')}
            />
            <span className='icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}><HiFingerPrint size={25} /></span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}
          <div className='input-button'>
            <button type='submit' className={styles.button}> Register</button>
          </div>

        </form>

        <p className='text-center text-gray-400'>
          Have an account? <Link href={'/login'}><span className='text-blue-700'>Sign In</span></Link>
        </p>

      </section>
    </Layout>
  )
}

export default Register