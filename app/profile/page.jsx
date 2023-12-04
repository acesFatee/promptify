'use client'

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const {data: session} = useSession();
  const router = useRouter();
  useEffect(() => {
    if(!session){
      router.push('/')
    }
  }, [])
  
  return (
    <div>
      <Profile userId={session?.user.id}/>
    </div>
  );

}
