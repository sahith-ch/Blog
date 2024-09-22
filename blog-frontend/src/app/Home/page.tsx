"use client";
import React, { useEffect, useState } from 'react';
import Styles from "./Home.module.css";
import Card from '../Components/Card/Card';
import Trending from '../Components/Trending/Trending';
import Link from 'next/link';
import Search from '../Components/Search/Search';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [inputVal, setInputVal] = useState<string>('');

    useEffect(() => {
        axios.get('https://blog-server2-m5k0.onrender.com/articles/', { withCredentials: true })
            .then((response) => {
                console.log(response.data.posts);
                setData(response.data.posts);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Filtered data based on input value
    const filtered = data.filter((d) => {
        return d.description && d.description.toLowerCase().includes(inputVal.toLowerCase());
    });

    return (
        <div className={Styles.container}>
            <div className={Styles.latest}>
                <div className="flex justify-center items-center w-full">
                    <Search setInputVal={setInputVal} />
                </div>

                {filtered.length > 0 ? (
                    filtered.map((post, index) => (
                        <Link key={post._id} className='flex justify-center align-center flex-row' href={`/Posts/${post._id}`}>
                            <Card title={post.Title} description={post.description} image={post.Image} author={post.author} />
                        </Link>
                    ))
                ) : (
                    <p className="text-center">No results found</p>
                )}
            </div>

            <div className={Styles.trending}>
                <div className={`flex flex-col h-96 box-border text-ellipsis m-3 w-11/12 ${Styles.cardContainer}`}>
                    
                    <Trending title={'5 amazing new JavaScript features in ES15 (2024)'} />
                    <Trending title={'5 amazing new JavaScript features in ES15 (2024)'} />
                    <Trending title={'5 amazing new JavaScript features in ES15 (2024)'} />
                    
                        <p className="flex font-bold text-green-400 justify-center items-center">See all</p>
                    
                </div>
                <p>Followed by you</p>
                <div className={`flex flex-col h-96 box-border m-3 w-11/12 ${Styles.cardContainer}`}>
                    <Trending title={'5 amazing new JavaScript features in ES15 (2024)'} />
                    <Trending title={'5 amazing new JavaScript features in ES15 (2024)'} />
                    <Trending title={'5 amazing new JavaScript features in ES15 (2024)'} />
                    <Link href="/trending">
                        <p className="flex font-bold text-green-400 justify-center items-center">See all</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
