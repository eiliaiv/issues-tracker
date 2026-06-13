"use client"

import { useSession } from "next-auth/react";


export default function Home() {
  const { status, data: session } = useSession()
  return (
    <>
      <div className="font-bold text-3xl">Hello, {session?.user?.name} </div>
    </>

  );
}
