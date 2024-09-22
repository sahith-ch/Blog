'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useAuth } from '@/context';


interface Props {}

 function Navbar (props: any) {

const {isAuthenticated} = useAuth()
// if(session.data?.user){
// return(<></>)
// } 
if(isAuthenticated){

    return (
        
        <div className=' flex w-full justify-between items-center bg-black  p-2'>
            <Link href='/' className='text-cyan-400 text-2xl'>Logo</Link>
            <div className='flex items-center justify-around'>
 
                <Link className='flex justify-around  mx-2 p-3 hover:bg-cyan-400  rounded-2xl hover:text-black text-cyan-500' href='/Profile' >
                Profile
                </Link>
                <Link className='flex justify-around  mx-2 p-3 hover:bg-cyan-400  rounded-2xl hover:text-black text-cyan-500' href='/write' >
                Write
                </Link>               
                <Link className='flex justify-around  mx-2 p-3 hover:bg-cyan-400  rounded-2xl hover:text-black text-cyan-500' href='/Home' >
                Home
                </Link>   
            </div>
        </div>


    )
}
else{
    return (
        
        <div className=' flex w-full justify-between items-center bg-black  p-2'>
            <Link href='/' className='text-cyan-400 text-2xl'>Logo</Link>
            <div className='flex items-center justify-around'>                    
                    <Link className='flex justify-around  mx-2 p-3 hover:bg-cyan-400  rounded-2xl hover:text-black text-cyan-500' href='/Signup' >
                Signup
                </Link>
                <Link className='flex justify-around  mx-2 p-3 hover:bg-cyan-400  rounded-2xl hover:text-black text-cyan-500' href='/Login' >
                Login
                </Link>
               

            </div>
        </div>


    )

}
}

export default Navbar
