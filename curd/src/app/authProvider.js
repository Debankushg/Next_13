'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'


const Authprovider = (props) => {
    return <SessionProvider>{props.children}</SessionProvider>
}

export default Authprovider