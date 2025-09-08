"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Dashboard } from "@/components/dashboard"
import { Toaster } from "@/components/ui/toaster"

interface User {
  id: string
  username: string
  email: string
  xp: number
  level: number
  coins: number
  streak: number
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [showSignup, setShowSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in by checking cookies
    const checkAuth = async () => {
      const authToken = getCookie('auth-token')
      const userId = getCookie('user-id')

      if (authToken && userId) {
        try {
          // Fetch user profile
          const response = await fetch('/api/user/profile', {
            headers: {
              'x-user-id': userId,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            // Clear cookies if authentication failed
            document.cookie = 'auth-token=; path=/; max-age=0'
            document.cookie = 'user-id=; path=/; max-age=0'
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Helper function to get cookie value
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return undefined
  }

  const handleLogin = (email: string, password: string) => {
    // The actual login is handled in the LoginForm component
    // This function is called after successful login
    // We'll fetch the user profile again to get the latest data
    const userId = getCookie('user-id')
    if (userId) {
      fetch('/api/user/profile', {
        headers: {
          'x-user-id': userId,
        },
      })
        .then(response => response.json())
        .then(data => setUser(data.user))
        .catch(error => console.error('Error fetching user profile:', error))
    }
  }

  const handleSignup = (email: string, password: string, username: string) => {
    // The actual signup is handled in the SignupForm component
    // This function is called after successful signup
    // We'll fetch the user profile again to get the latest data
    const userId = getCookie('user-id')
    if (userId) {
      fetch('/api/user/profile', {
        headers: {
          'x-user-id': userId,
        },
      })
        .then(response => response.json())
        .then(data => setUser(data.user))
        .catch(error => console.error('Error fetching user profile:', error))
    }
  }

  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'auth-token=; path=/; max-age=0'
    document.cookie = 'user-id=; path=/; max-age=0'
    setUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-2xl text-blue-300 pixel-font">Loading Kōdo...</div>
      </div>
    )
  }

  if (user) {
    return (
      <>
        <Dashboard user={user} onLogout={handleLogout} />
        <Toaster />
      </>
    )
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
