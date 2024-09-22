"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';
import { headers } from 'next/headers';
interface Props {}

function Page(props: Props) {
  const {} = props;
  const [data, setData] = useState<any>();
  const params = useParams().id;
  const [likes, setLikes] = useState<number>(0);
  useEffect(() => {
    if (params) {
      axios
        .get(`http://localhost:3001/articles/${params}`, { withCredentials: true })
        .then((response) => {
          setData(response.data.post);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [params]);
  const handleLike = async() => {
    if(likes<=0){
    setLikes(likes + 1);
    try {
        const res = await axios.put(
          "http://localhost:3001/articles/likes",
          {},
          {
            headers: {
              postid: params,
            },
            withCredentials: true,
          }
        );
        console.log(res.data); 
      } catch (error) {
        console.error("Error liking the article:", error);
      }   
}
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 sm:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Title */}
        <h1
          className="text-3xl font-bold text-center py-6 px-4 text-gray-800"
          dangerouslySetInnerHTML={{ __html: (data?.Title) || 'Loading...' }}
        />

        {/* Author & Meta Info */}
        <div className="px-6 py-4 text-gray-600">
          <p className="text-sm">
            <strong>Author ID:</strong> {data?.author || 'Unknown'}
          </p>
        </div>

        {/* Image */}
        {data?.Image && (
          <div className="w-full">
            <img
              src={data.Image}
              alt="Post Image"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-700">Description:</h3>
          <p className="text-gray-600 mt-2">{data?.description || 'No description available'}</p>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-700">Content:</h3>
          <div
            className="prose prose-sm text-gray-600 mt-4"
            dangerouslySetInnerHTML={{ __html: data?.content || 'Content not available' }}
          />
        </div>

        {/* Likes */}
        <div className="px-6 py-4 flex justify-between items-center text-gray-700 border-t border-gray-200">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            <FaThumbsUp /> 
            <span>Like</span>
          </button>
          <p>
            <strong>Likes:</strong> {data?.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
