"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: string
  level: number
  avatar: string
  isSystem?: boolean
}

interface CommunityChatProps {
  onBackToDashboard: () => void
  currentUser: { username: string; level: number }
}

export function CommunityChat({ onBackToDashboard, currentUser }: CommunityChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "System",
      message: "Welcome to Kōdo Academy chat! Share your learning journey with fellow adventurers.",
      timestamp: "10:00 AM",
      level: 0,
      avatar: "/minecraft-book.png",
      isSystem: true,
    },
    {
      id: "2",
      username: "CodeMaster_Alex",
      message:
        "Just completed the JavaScript Fundamentals quest! The DOM manipulation lesson was challenging but fun 🎉",
      timestamp: "10:15 AM",
      level: 12,
      avatar: "/minecraft-steve.png",
    },
    {
      id: "3",
      username: "PixelWizard_Sam",
      message: "Nice work Alex! I'm working on CSS animations right now. The transitions are so smooth!",
      timestamp: "10:18 AM",
      level: 11,
      avatar: "/minecraft-alex.png",
    },
    {
      id: "4",
      username: "KodoLearner_Maya",
      message: "Has anyone tried the React Component Quest yet? I'm thinking of starting it next week.",
      timestamp: "10:22 AM",
      level: 10,
      avatar: "/minecraft-villager.png",
    },
    {
      id: "5",
      username: "BlockBuster_Jake",
      message: "React is awesome Maya! The hooks lesson really clicked for me. Take your time with the concepts.",
      timestamp: "10:25 AM",
      level: 9,
      avatar: "/minecraft-enderman.png",
    },
    {
      id: "6",
      username: "RedstoneGuru_Lin",
      message: "Pro tip: Practice building small components first before jumping into complex state management!",
      timestamp: "10:28 AM",
      level: 8,
      avatar: "/minecraft-witch.png",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: currentUser.username,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        level: currentUser.level,
        avatar: "/minecraft-player.png",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-card border-b-4 border-stone-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onBackToDashboard}
                className="border-2 border-stone-400 hover:border-primary bg-transparent"
              >
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Community Chat</h1>
                <p className="text-sm text-muted-foreground">Connect with fellow learners</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">24 online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-4 border-stone-600 shadow-lg h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              General Chat
            </CardTitle>
            <CardDescription>Share tips, ask questions, and celebrate achievements!</CardDescription>
          </CardHeader>

          {/* Chat Messages */}
          <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isSystem ? "justify-center" : ""}`}>
                {msg.isSystem ? (
                  <div className="bg-muted/50 px-4 py-2 rounded-lg border border-muted text-center text-sm text-muted-foreground">
                    <span className="text-lg mr-2">📢</span>
                    {msg.message}
                  </div>
                ) : (
                  <>
                    <Avatar className="border-2 border-stone-400 w-8 h-8">
                      <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{msg.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary text-sm">{msg.username}</span>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          Lv.{msg.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div className="bg-card border-2 border-stone-300 rounded-lg px-3 py-2 text-sm shadow-sm">
                        {msg.message}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t-2 border-stone-300 pt-4 px-6 pb-6">
            <div className="flex gap-3">
              <Avatar className="border-2 border-stone-400 w-8 h-8">
                <AvatarImage src="/minecraft-player.png" />
                <AvatarFallback className="text-xs">{currentUser.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Type your message... (This is a demo - messages won't be saved)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-2 border-stone-400 focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="border-2 border-stone-600 shadow-md hover:shadow-lg transition-all"
                >
                  Send 📤
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              💡 This is a demo chat interface. Messages are not persistent and only visible to you.
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
