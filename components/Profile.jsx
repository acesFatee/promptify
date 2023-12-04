"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";

export default function Profile({ userId }) {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/" + userId + "/posts", {
        cache: "no-store",
      });
      const data = await response.json();
      setposts(data);
    };

    fetchUser();
  }, [session]);

  return (
    <>
      <div className="container mx-auto">
        <div className="heading flex text-left my-10">
          <img
            src={
              posts.length > 0 ? posts[0]?.creator.image : session?.user.image
            }
            className="rounded-full"
            alt=""
          />
          <h1
            className={`font-bold text-6xl ml-5 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300`}
          >
            {posts.length > 0
              ? posts[0]?.creator.username.toLowerCase().replace(" ", "")
              : session?.user.name.toLowerCase().replace(" ", "")}
          </h1>
        </div>
        <div className="grid mx-auto sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 text-left mt-4">
          {posts.length === 0 ? (
            <>No Posts Found</>
          ) : (
            posts
              .slice()
              .reverse()
              .map((post) => {
                return (
                  <div key={post._id}>
                    <FeedCard
                      isMyProfile={post.creator.email === session?.user.email}
                      post={post}
                      username={post.creator.username}
                      image={post.creator.image}
                    />
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
}
