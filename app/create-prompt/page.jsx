"use client";

import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const {data: session} = useSession();
  const [prompt, setPrompt] = useState("");
  const [tag, setTag] = useState("");
  const [isopen, setisopen] = useState(false)
  const [message, setmessage] = useState("")
  const [title, settitle] = useState("")

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!session){
      settitle("Login needed")
      setmessage("Please login to add a post")
      setisopen(true)
      return;
    }
    if(tag.includes('#')){
      settitle("Symbol error")
      setmessage("Cannot include # in tag")
      setisopen(true)
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          prompt,
          tag,
          userId: session?.user.id,
        }),
      };
      const response = await fetch("/api/prompt/new", options);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        <> 
        <div className="container-fluid flex justify-center">
        <div className="container px-3 mt-10 mx-auto">
          <h1 className="font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-200 mb-5">
            Create Prompt
          </h1>
          <span>
            Create and share amazing prompts with the world, and let your
            imagination run wild with any AI-powered platform
          </span>
          <form className="mt-5" onSubmit={handleSubmit}>
            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Your Prompt"
              value={prompt}
              onChange={handlePromptChange}
              required
            ></textarea>
            <br />
            <input
              type="text"
              className="input input-bordered mt-5 w-full"
              placeholder="Tag"
              value={tag}
              onChange={handleTagChange}
              required
            />
            <br />
            <button type="submit" className="btn btn-primary w-full mt-5">
              Create
            </button>
          </form>
        </div>
      </div></>
      }
      <Modal isopen={isopen} setisopen={setisopen} message={message} title={title}/>
    </>
  );
}
