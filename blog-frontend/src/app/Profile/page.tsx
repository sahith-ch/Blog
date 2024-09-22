'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import axios from 'axios';

interface Article {
  _id: string;
  title: string;
  image: string; // URL for the image
  description: string;
}

interface UserData {
  name: string;
  email: string;
  articles: Article[];
}

interface Props {
  courses: string[];
}

const Profile = (props: Props) => {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    axios.get("https://blog-server2-m5k0.onrender.com/users/me", { withCredentials: true })
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const router = useRouter();
  const { logout } = useAuth();

  const logoutHandler = () => {
    fetch("https://blog-server2-m5k0.onrender.com/users/logout", {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          logout();
          router.replace("/");
        } else {
          throw new Error("Logout failed");
        }
      })
      .catch(error => console.error("Error during logout:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
        {data ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">{data.username}</h2>
            <button 
              onClick={logoutHandler} 
              className='mt-4 w-full p-3 bg-black text-cyan-600 hover:bg-white hover:text-black-100 hover:outline-1-black rounded-2xl '
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-center">Loading...</p>
        )}
      </div>

      <div className="w-full max-w-4xl p-4">
        <h3 className="text-xl font-semibold mb-4">Published Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.Articles_published && data.Articles_published.length > 0 ? (
            data.Articles_published.map((article) => (
              <div key={article._id} className="bg-white shadow-md rounded-lg p-4">
                <img src={article.Image} alt={article.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h4 className="font-bold text-lg mb-2">{article.title}</h4>
                <p className="text-gray-600 mb-2">{article.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No articles published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
