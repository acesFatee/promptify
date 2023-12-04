'use client'
import FeedCard from "@/components/FeedCard";
import React, { useEffect, useState } from "react";

export default function page({ params }) {

  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchTaggedPosts = async () =>{
      const response = await fetch('/api/tags/'+params.tagName);
      const data = await response.json(); 
      setposts(data)
    }
    fetchTaggedPosts();
  }, [])
  

  return (
    <div className="container mx-auto ">
      <h1 className="font-bold text-6xl py-5 ml-5 my-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-200">
        #{params.tagName}
      </h1>
      <div className="container grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-left mt-4">
        {posts.length === 0 ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          posts.map((post) => (
            <FeedCard
              isMyProfile={false}
              key={post._id}
              post={post}
              username={post.creator.username}
              image={post.creator.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
