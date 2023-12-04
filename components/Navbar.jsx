
'use client'

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react"; 

export default function Navbar() {
  const {data: session} = useSession();
  const [providers, setproviders] = useState(null)

  useEffect(() => {
    const setProviders = async () =>{
      const response = await getProviders();
      setproviders(response)
    }
    setProviders();
  }, [])
  

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={'/'} className="btn btn-ghost text-xl">Home</Link>
          <Link className="btn btn-ghost text-xl" href={'/create-prompt'}>Create Prompt</Link>
        </div>
        {
          session?.user ? <>
          <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                <img
                  src={session?.user.image}
                  alt={session?.user.name}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={'/profile'} className="justify-between">
                  Profile
                </Link>
              </li>
              <li onClick={() =>{
                signOut()
              }}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
          </>: <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='btn btn-primary'
                >
                  Sign in
                </button>
              ))}
          </>
        }
      </div>
    </>
  );
}
