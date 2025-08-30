"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignupFormProps {
  onSignup: (email: string, password: string, username: string) => void
  onSwitchToLogin: () => void
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && username) {
      onSignup(email, password, username)
    }
  }

  return (
    <Card className="glass-card glass-border glass-shadow rounded-2xl overflow-hidden">
      <CardHeader className="text-center space-y-4 bg-gradient-to-r from-cyan-600/80 to-blue-500/80 backdrop-blur-md text-white rounded-t-2xl border-b border-cyan-400/30">
        <div className="text-6xl filter drop-shadow-lg">⭐</div>
        <CardTitle className="text-3xl font-black tracking-wider pixel-font text-neon-cyan">NEW PLAYER</CardTitle>
        <CardDescription className="text-blue-100 font-bold text-lg">
          Join the ultimate learning adventure!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 glass-bg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="username" className="text-lg font-black text-cyan-200 pixel-font">
              PLAYER NAME
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="CyberCoder2024"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input rounded-xl h-14 text-lg font-bold text-white placeholder:text-cyan-300/70 pixel-font"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-lg font-black text-cyan-200 pixel-font">
              PLAYER EMAIL
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="newplayer@kodo.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input rounded-xl h-14 text-lg font-bold text-white placeholder:text-cyan-300/70 pixel-font"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-lg font-black text-cyan-200 pixel-font">
              SECRET CODE
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create your power-up code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input rounded-xl h-14 text-lg font-bold text-white placeholder:text-cyan-300/70 pixel-font"
              required
            />
          </div>
          <Button
            type="submit"
            className="glass-button w-full h-16 text-xl font-black rounded-xl bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-400/90 hover:to-blue-400/90 text-white pixel-font neon-glow-cyan"
          >
            🎯 CREATE PLAYER!
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-lg text-cyan-200 font-bold pixel-font">
            Already Playing?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-400 hover:text-blue-300 font-black underline decoration-2 underline-offset-4 hover:decoration-blue-300 transition-colors neon-glow"
            >
              CONTINUE QUEST!
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
