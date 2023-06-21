import Head from "next/head"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"

import { api } from "~/utils/api"

export default function Home() {
  const user = useUser()
  const { data, isLoading, error } = api.posts.getAll.useQuery()

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className=" border-b border-slate-400 p-4">
            {!user.isSignedIn && <SignInButton />}
            {user.isSignedIn && <SignOutButton />}
          </div>
          <div className=" border-b border-slate-400 p-8">
            {isLoading && "Loading..."}
            {error && "Something went wrong"}
            {data && data.map((post) => <div key={post.id}>{post.title}</div>)}
          </div>
        </div>
      </main>
    </>
  )
}
