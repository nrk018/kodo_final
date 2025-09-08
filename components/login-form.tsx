"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
  onSwitchToSignup: () => void
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      try {
        setIsLoading(true)
        
        // For debugging - log the attempt
        console.log('Attempting login with:', { email })
        
        // Call the API
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        
        // For debugging - log the response status
        console.log('Login response status:', response.status)
        
        const data = await response.json()
        console.log('Login response data:', data)
        
        if (!response.ok) {
          throw new Error(data.error || 'Login failed')
        }
        
        // Set cookies for authentication
        document.cookie = `auth-token=authenticated; path=/; max-age=${60 * 60 * 24 * 7}` // 1 week
        document.cookie = `user-id=${data.user.id}; path=/; max-age=${60 * 60 * 24 * 7}` // 1 week
        
        // For debugging - verify cookies were set
        console.log('Cookies after login:', document.cookie)
        
        // Call the onLogin callback with the user data
        onLogin(email, password)
        
        toast({
          title: "Login successful",
          description: "Welcome back to Kōdo!",
        })
      } catch (error) {
        console.error('Login error:', error)
        toast({
          title: "Login failed",
          description: error instanceof Error ? error.message : 'Something went wrong',
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className="glass-card glass-border glass-shadow rounded-2xl overflow-hidden">
      <CardHeader className="text-center space-y-4 bg-gradient-to-r from-blue-600/80 to-cyan-500/80 backdrop-blur-md text-white rounded-t-2xl border-b border-blue-400/30">
        <div className="flex justify-center">
          <img src="/kodo-logo.png" alt="Kōdo Logo" className="w-16 h-16 filter drop-shadow-lg" />
        </div>
        <CardTitle className="text-3xl font-black tracking-wider pixel-font text-neon-blue">KŌDO</CardTitle>
        <CardDescription className="text-cyan-100 font-bold text-lg">Power up your learning adventure!</CardDescription>
      </CardHeader>
      <CardContent className="p-8 glass-bg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-black text-blue-200 pixel-font">
              PLAYER EMAIL
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="player@kodo.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input rounded-xl h-14 text-lg font-bold text-white placeholder:text-blue-300/70 pixel-font"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-lg font-black text-blue-200 pixel-font">
              SECRET CODE
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your power-up code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input rounded-xl h-14 text-lg font-bold text-white placeholder:text-blue-300/70 pixel-font"
              required
            />
          </div>
          <Button
            type="submit"
            className="glass-button w-full h-16 text-xl font-black rounded-xl bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-400/90 hover:to-cyan-400/90 text-white pixel-font neon-glow"
          >
            ⚡ START QUEST!
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-lg text-blue-200 font-bold pixel-font">
            New Player?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-cyan-400 hover:text-cyan-300 font-black underline decoration-2 underline-offset-4 hover:decoration-cyan-300 transition-colors neon-glow-cyan"
            >
              JOIN THE ADVENTURE!
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
