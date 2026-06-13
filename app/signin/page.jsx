'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCredentialsLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
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
    await signIn("google", {
      callbackUrl: "/"
    })
  }

  return (
    <div className=" h-150 flex justify-center items-center">
      <div className=" w-80 h-100 md:w-96 lg:w-25rem  transition-all duration-700 ease-out rounded flex flex-col space-y-10 px-10 justify-center ">
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-10 border-2 w-full rounded h-10 border-gray-300 pl-2"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading} className=" bg-blue-600 text-white h-12 rounded w-full">
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button onClick={handleGoogleLogin} className="flex items-center justify-center bg-blue-600 text-white h-12 rounded ">
          <img width="30" height="30" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" className="mr-3" />
          sign in with google
        </button>
      </div>
    </div>
  )
}