// 'use client'
// import React, { useState } from 'react'
// import Glowbutton from '../Components/Glowbutton'
// import Link from 'next/link';


// function Signup() {
//     const [username,setusername] =useState("");
//     const [password,setpassword] =useState("");

//     const signuphandler = () => {
//         fetch("http://localhost:3001/users/signup", {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             credentials: 'include', 
//             body: JSON.stringify({
//                 username: username,
//                 password: password
//             })
//         })
//         .then((response) => {
           
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
           
//         })
//         .catch((error) => console.error("Error during signup:", error));
//     }
    
//     return (
//    <div className='flex justify-center  items-center  bg-black h-screen'>
//             <div className='flex flex-col  box-border overflow-hidden break-words fixed outline  justify-center items-center h-2/4 w-9/12 xl:w-4/12 md:w-3/6 lg:w-6/12 sm:w-6/8  text-cyan-400'>
//                 <h2 className='flex text-2xl sm:text-2xl  md:text-3xl xl:text-4xl m-4'>Signup</h2>
//                 <div className='flex flex-col items-center justify-center w-3/4 m-3'>
//                     <input value={username} onChange={(e)=>setusername(e.target.value)} type='text' placeholder='Username'  className='p-2 my-2 w-full outline-none text-white border border-cyan-400  bg-black'/>
//                     <input value={password} onChange={(e)=>setpassword(e.target.value)} type='password' placeholder='Password' className='p-2 my-2 w-full outline-none border text-white border-cyan-400  bg-black'/>

// <Glowbutton onClick={signuphandler} text={"Signup"}/>   


//                 </div>
//             </div>
//    </div>
            
        
//     )
// }

// export default Signup

'use client';
import React, { useState, useEffect } from 'react';
import Glowbutton from '../Components/Glowbutton';
import Link from 'next/link';
import Home from '../page';
import { useAuth } from '@/context';


function Signup() {
    const {login} = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [session, setSession] = useState(null); // Store session here
    const [errorMessage, setErrorMessage] = useState("");

    const signuphandler = () => {
        fetch("https://blog-server2-m5k0.onrender.com/users/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include', 
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            return response.json();
        })
        .then((data) => {
            
          if(data.message =='user exists'){alert("already exist")}
          else{
            console.log('Signup successful:', data);
          login()
            setSession(data.message);  
    }})
        .catch((error) => {
            setErrorMessage("Signup failed. Please try again.");
            console.error("Error during signup:", error);
        });
    };

   
    if (session) {
        return <Home />;
    }

    return (
        <div className='flex justify-center items-center bg-black h-screen'>
            <div className='flex flex-col box-border overflow-hidden break-words fixed outline justify-center items-center h-2/4 w-9/12 xl:w-4/12 md:w-3/6 lg:w-6/12 sm:w-6/8 text-cyan-400'>
                <h2 className='flex text-2xl sm:text-2xl md:text-3xl xl:text-4xl m-4'>Signup</h2>
                <div className='flex flex-col items-center justify-center w-3/4 m-3'>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username' className='p-2 my-2 w-full outline-none text-white border border-cyan-400 bg-black' />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' className='p-2 my-2 w-full outline-none border text-white border-cyan-400 bg-black' />
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                    <Glowbutton onClick={signuphandler} text={"Signup"} />
                </div>
            </div>
        </div>
    );
}

export default Signup;
