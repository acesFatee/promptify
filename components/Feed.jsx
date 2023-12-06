"use client";

import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import { useSession } from "next-auth/react";

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt/get", { cache: "no-store" });
      const data = await response.json();
      setPosts(data);
      setOriginalPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim() !== "") {
        const response = await fetch(`/api/prompt/search/${searchTerm}`, {
          cache: "no-store",
        });
        const data = await response.json();
        setPosts(data);
      } else {
        const delay = setTimeout(() => {
          setPosts(originalPosts);
        }, 300);
        return () => clearTimeout(delay);
      }
    };

    handleSearch();
  }, [searchTerm, originalPosts]);

  return (
    <>
      <div className="container mx-auto">
        <div className="container px-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for anything"
            className="input w-full input-bordered my-5 "
          />
        </div>
        <h1 className="text-left my-5 font-bold ml-3 text-3xl">All Posts</h1>
        <div className="container grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          {posts.length === 0 ? (
            <>No Posts</>
          ) : (
            posts
              .slice()
              .reverse()
              .map((post) => (
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
    </>
  );
}
