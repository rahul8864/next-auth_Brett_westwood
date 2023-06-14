import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import User from "./components/User"

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <section>
      <h1>Home</h1>
      <h1>Server Side Render</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Client Side</h1>
      <User />
    </section>
  )
}
