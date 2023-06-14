"use client"
import { useSession, signOut } from 'next-auth/react'

function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <p>{data?.user?.email}</p>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  )
}

export default Dashboard
