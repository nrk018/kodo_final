"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LeaderboardPlayer {
  id: string
  username: string
  level: number
  xp: number
  achievements: number
  streak: number
  avatar: string
  rank: number
  title: string
}

interface LeaderboardProps {
  onBackToDashboard: () => void
  currentUser: { username: string; level: number; xp: number }
}

export function Leaderboard({ onBackToDashboard, currentUser }: LeaderboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"weekly" | "monthly" | "all-time">("weekly")

  // Mock leaderboard data
  const leaderboardData: LeaderboardPlayer[] = [
    {
      id: "1",
      username: "CodeMaster_Alex",
      level: 12,
      xp: 6750,
      achievements: 28,
      streak: 45,
      avatar: "/minecraft-steve.png",
      rank: 1,
      title: "Grand Architect",
    },
    {
      id: "2",
      username: "PixelWizard_Sam",
      level: 11,
      xp: 6200,
      achievements: 25,
      streak: 32,
      avatar: "/minecraft-alex.png",
      rank: 2,
      title: "Master Builder",
    },
    {
      id: "3",
      username: "KodoLearner_Maya",
      level: 10,
      xp: 5800,
      achievements: 22,
      streak: 28,
      avatar: "/minecraft-villager.png",
      rank: 3,
      title: "Expert Crafter",
    },
    {
      id: "4",
      username: "BlockBuster_Jake",
      level: 9,
      xp: 5200,
      achievements: 19,
      streak: 21,
      avatar: "/minecraft-enderman.png",
      rank: 4,
      title: "Skilled Miner",
    },
    {
      id: "5",
      username: currentUser.username,
      level: currentUser.level,
      xp: currentUser.xp,
      achievements: 12,
      streak: 7,
      avatar: "/minecraft-player.png",
      rank: 5,
      title: "Apprentice Builder",
    },
    {
      id: "6",
      username: "RedstoneGuru_Lin",
      level: 8,
      xp: 4800,
      achievements: 16,
      streak: 15,
      avatar: "/minecraft-witch.png",
      rank: 6,
      title: "Circuit Master",
    },
    {
      id: "7",
      username: "QuestSeeker_Tom",
      level: 7,
      xp: 4200,
      achievements: 14,
      streak: 12,
      avatar: "/minecraft-knight.png",
      rank: 7,
      title: "Adventure Seeker",
    },
    {
      id: "8",
      username: "CodeCrafter_Zoe",
      level: 6,
      xp: 3600,
      achievements: 11,
      streak: 9,
      avatar: "/minecraft-librarian.png",
      rank: 8,
      title: "Knowledge Seeker",
    },
  ]

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case 2:
        return "text-gray-600 bg-gray-50 border-gray-200"
      case 3:
        return "text-orange-600 bg-orange-50 border-orange-200"
      default:
        return "text-muted-foreground bg-muted border-muted"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-card border-b-4 border-stone-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
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
                <h1 className="text-2xl font-bold text-primary">Leaderboard</h1>
                <p className="text-sm text-muted-foreground">See how you rank against other learners</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedPeriod === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("weekly")}
                className="border-2 border-stone-400"
              >
                Weekly
              </Button>
              <Button
                variant={selectedPeriod === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("monthly")}
                className="border-2 border-stone-400"
              >
                Monthly
              </Button>
              <Button
                variant={selectedPeriod === "all-time" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("all-time")}
                className="border-2 border-stone-400"
              >
                All Time
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Top 3 Podium */}
        <Card className="border-4 border-stone-600 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">🏆 Top Champions 🏆</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-center gap-8 mb-6">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="bg-gray-100 border-4 border-gray-300 rounded-lg p-4 mb-2 h-24 flex flex-col justify-end">
                  <Avatar className="mx-auto mb-2 border-2 border-gray-400">
                    <AvatarImage src={leaderboardData[1].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{leaderboardData[1].username[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-4xl mb-1">🥈</div>
                <div className="font-bold text-sm">{leaderboardData[1].username}</div>
                <div className="text-xs text-muted-foreground">Level {leaderboardData[1].level}</div>
                <div className="text-xs font-medium">{leaderboardData[1].xp} XP</div>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="bg-yellow-100 border-4 border-yellow-300 rounded-lg p-4 mb-2 h-32 flex flex-col justify-end">
                  <Avatar className="mx-auto mb-2 border-2 border-yellow-400 w-12 h-12">
                    <AvatarImage src={leaderboardData[0].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{leaderboardData[0].username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs font-bold text-yellow-700">👑 CHAMPION</div>
                </div>
                <div className="text-5xl mb-1">🥇</div>
                <div className="font-bold">{leaderboardData[0].username}</div>
                <div className="text-sm text-muted-foreground">Level {leaderboardData[0].level}</div>
                <div className="text-sm font-medium text-primary">{leaderboardData[0].xp} XP</div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="bg-orange-100 border-4 border-orange-300 rounded-lg p-4 mb-2 h-20 flex flex-col justify-end">
                  <Avatar className="mx-auto mb-2 border-2 border-orange-400">
                    <AvatarImage src={leaderboardData[2].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{leaderboardData[2].username[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-4xl mb-1">🥉</div>
                <div className="font-bold text-sm">{leaderboardData[2].username}</div>
                <div className="text-xs text-muted-foreground">Level {leaderboardData[2].level}</div>
                <div className="text-xs font-medium">{leaderboardData[2].xp} XP</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card className="border-4 border-stone-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Full Rankings
            </CardTitle>
            <CardDescription>Complete leaderboard for {selectedPeriod.replace("-", " ")} period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-colors ${
                    player.username === currentUser.username
                      ? "bg-primary/10 border-primary/30 shadow-md"
                      : "bg-card hover:bg-muted/50 border-stone-300"
                  }`}
                >
                  {/* Rank */}
                  <div
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold ${getRankColor(player.rank)}`}
                  >
                    {getRankEmoji(player.rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className="border-2 border-stone-400">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{player.username[0]}</AvatarFallback>
                  </Avatar>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-primary">{player.username}</h3>
                      {player.username === currentUser.username && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{player.title}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">Lv.{player.level}</div>
                      <div className="text-xs text-muted-foreground">Level</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary">{player.xp}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent">{player.achievements}</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">{player.streak}</div>
                      <div className="text-xs text-muted-foreground">Streak</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
