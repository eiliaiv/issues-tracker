'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import Spinner from "../components/Spinner"
import Notification from "../(client)/components/Notification"
import { useNotif } from "../(client)/hook/useNotif"
import Link from "next/link"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [spinner, setSpinner] = useState(false)
  const isVisible = useNotif(error, setError, 2000);

  const handleCredentialsLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !name.trim() || !password.trim()) {
      setError("some input is empty")
      return
    }


    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      name,
      password,
      redirect: true,
      callbackUrl: "/"
    })

    if (res?.error) {
      setError("Login failed")
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      setSpinner(true)
      await signIn("google", {
        callbackUrl: "/"
      })
    } catch (err) {
      console.log("error");
      setSpinner(false)
    }
  }

  return (
    <>
      {error && <Notification isVisible={isVisible} color="red">{error}</Notification>}
      <div className=" h-140 flex flex-col justify-center items-center">
        <div className=" w-80 h-120 md:w-96 lg:w-25rem  transition-all duration-700 ease-out rounded flex flex-col space-y-10 px-10 justify-center ">
          <h1 className="text-3xl font-bold text-center">Sign In</h1>

          {/* Credentials Login */}
          <form onSubmit={handleCredentialsLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 w-full rounded h-10 mb-2 border-gray-300 pl-2"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 w-full rounded h-10 mb-2 border-gray-300 pl-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-10 border-2 w-full rounded h-10 border-gray-300 pl-2"
            />

            <button type="submit" disabled={loading} className=" bg-blue-600 text-white h-12 rounded w-full flex justify-center items-center">
              {loading ? <Spinner /> : "Sign in"}
            </button>
          </form>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button onClick={handleGoogleLogin} className=" bg-blue-600 text-white h-12 rounded ">
            {spinner ? <Spinner /> : <div className="flex items-center justify-center h-12" ><img width="30" height="30" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" className="mr-3" /><span>sign in with google</span></div>}
          </button>
        </div>
        <p className="text-sm">I already have account, <span><Link href="/login" className="text-blue-600 underline">Log in</Link></span></p>
      </div>
    </>
  )
}