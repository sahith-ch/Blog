"use client";
import React, { useState } from 'react';
import Styles from "../../Login/Loginipage.module.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';

function LoginFormCard() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
const {login} = useAuth()
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        setLoading(true); // Start loading

        try {
            const { data } = await axios.post("http://localhost:3001/users/login", { username, password }, { withCredentials: true });

            if (data.message === "loggedin") {
                login()
                router.replace("/");
            } else {
                setError('Invalid username or password'); 
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError('Login failed. Please try again.'); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='text-white text-4xl'>Login</h1>
            {error && <p className="text-red-500">{error}</p>} 
            <div className={Styles.newUser}>
                <input name='username' placeholder='Username' className={Styles.inputfield} required />
                <input name='password' type='password' placeholder='Password' className={Styles.inputfield} required />
                <button type='submit' className='text-cyan-50' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    );
}

export default LoginFormCard;
