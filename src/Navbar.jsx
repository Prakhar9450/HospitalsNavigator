import React from "react"
import { auth } from "./firebase"
import { Home, LogOut } from "lucide-react" 

const Navbar = ({ user }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut()
      window.location.reload()
    } catch (error) {
      console.error("Sign out failed:", error.message)
    }
  }

  return (
    <nav className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Home */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              <Home className="h-5 w-5" />
              <span className="font-bold text-lg">Hospitals Navigator</span>
            </a>
          </div>

          {/* Right side - User Info and Sign Out */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {user?.photoURL && (
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-emerald-400"
                />
              )}
              <span className="text-purple-200">
                Welcome, <span className="font-semibold text-white">{user?.displayName || "User"}</span>
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar