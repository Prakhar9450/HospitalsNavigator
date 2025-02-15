import React from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"

const SignIn = ({ setUser }) => {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.error("Sign in failed:", error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-between bg-gradient-to-tr from-purple-900 via-purple-800 to-indigo-900">
      {/* Left side content */}
      <div className="w-1/2 pl-16">
        <h1 className="text-6xl font-bold text-white mb-6">
          Get Hospitals
          <span className="block text-emerald-400">Around you</span>
        </h1>
        <p className="text-purple-200 text-xl max-w-md">
          powered by google maps
        </p>
        
        <div className="mt-12">
          <button
            onClick={handleSignIn}
            className="cursor-pointer group flex items-center gap-3 px-8 py-4 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-semibold text-lg">Continue with Google</span>
          </button>
        </div>
      </div>

      {/* Right side decorative elements */}
      <div className="w-1/2 h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-64 h-64 bg-purple-600/30 rounded-full absolute blur-3xl"></div>
          <div className="w-64 h-64 bg-indigo-600/30 rounded-full absolute -translate-x-1/2 blur-3xl"></div>
          <div className="w-64 h-64 bg-emerald-400/30 rounded-full absolute -translate-y-1/2 blur-3xl"></div>
        </div>
      </div>
     
    </div>
  )
}

export default SignIn