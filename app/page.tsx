"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [showSignup, setShowSignup] = useState(false)

  const handleLogin = (email: string, password: string) => {
    // Mock login - store in local state
    const mockUser = { username: email.split("@")[0], email }
    setUser(mockUser)
  }

  const handleSignup = (email: string, password: string, username: string) => {
    // Mock signup - store in local state
    const mockUser = { username, email }
    setUser(mockUser)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 dotted-bg bg-black">
      <div className="relative z-10 w-full max-w-md">
        {showSignup ? (
          <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />
        )}
      </div>
    </div>
  )
}
