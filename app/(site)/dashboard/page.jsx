"use client"
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Dashboard() {
  const { data: session } = useSession();
  console.log(session)
  const router = useRouter();
  useEffect(() => {
    if(session === undefined || session === null) {
      router.push('/login')
    }
  },[session, router]);
  return (
    <div>
      <p>{session?.user?.email}</p>
      <button onClick={() => {signOut()}}>Signout</button>
    </div>
  )
}

export default Dashboard
