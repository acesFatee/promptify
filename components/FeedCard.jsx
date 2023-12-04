import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FeedCard({ isMyProfile, post, username, image }) {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(post.prompt);
    setIsCopied(true);
    toast.success("Prompt copied to clipboard!");
  };

  const handleDelete = async (id) => {
    const options = {
      method: "DELETE",
    };
    await fetch("/api/prompt/delete/" + id, options);
    router.push("/");
  };

  useEffect(() => {
    if (isCopied === true) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center mb-4">
          <img
            src={image}
            alt={username}
            className="w-10 h-10 rounded-full mr-4"
          />
          <Link
            href={"/profile/" + post.creator._id}
            className="card-title font-bold hover:cursor-pointer hover:link"
          >
            {username}
          </Link>
        </div>
        <h1 className="text-xl ">{post.prompt}</h1>
        <img src={post.image} alt="" className="mb-4" />
        <p className="text-gray-500 link-primary cursor-pointer">
          <Link href={"/tags/" + post.tag}>#{post.tag}</Link>
        </p>
        <div className="card-actions mt-4">
          <button
            onClick={handleCopyToClipboard}
            className="btn btn-primary mr-2"
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
          {isMyProfile && (
            <>
              <Link
                href={"/profile/edit-post/" + post._id}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
