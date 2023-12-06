"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({params}) {
  const search = params.id
  const router = useRouter();
  const {data: session} = useSession();
  const [prompt, setPrompt] = useState("");
  const [tag, setTag] = useState("");


  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch('/api/prompt/get/' + search);
        if (response.ok) {
          const data = await response.json();
          setPrompt(data.prompt)
          setTag(data.tag)
        } else {
          console.error('Error fetching prompt:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    };
  
    fetchPrompt();
  }, [search]);
  
    const handleEdit = async (event) =>{
      event.preventDefault();
      
      const options = {
        method: "PATCH",
        body: JSON.stringify({
          prompt,
          tag
        })
      }
      const response = await fetch('/api/prompt/update/'+search, options)
      const data = await response.json()
      router.push('/')
    }
  

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };


  return (
    <>
      {
        session &&  <> 
        <div className="container-fluid flex justify-center">
        <div className="container px-4 mt-10 mx-auto">
          <h1 className="font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-500 to-orange-200 mb-5">
            Edit Prompt
          </h1>
          <span>
            Create and share amazing prompts with the world, and let your
            imagination run wild with any AI-powered platform
          </span>
          <form className="mt-5" onSubmit={handleEdit}>
            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Your Prompt"
              value={prompt}
              onChange={handlePromptChange}
            ></textarea>
            <br />
            <input
              type="text"
              className="input input-bordered mt-5 w-full"
              placeholder="Tag"
              value={tag}
              onChange={handleTagChange}
            />
            <br />
            <button type="submit" className="btn btn-primary w-full mt-5">
              Edit
            </button>
          </form>
        </div>
      </div></>
      }
    </>
  );
}
