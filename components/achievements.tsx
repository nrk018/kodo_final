"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "Learning" | "Social" | "Progress" | "Special"
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
}

interface AchievementsProps {
  onBackToDashboard: () => void
  userStats: {
    level: number
    xp: number
    completedQuests: number
    streak: number
  }
}

export function Achievements({ onBackToDashboard, userStats }: AchievementsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const achievements: Achievement[] = [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "👶",
      category: "Learning",
      rarity: "Common",
      earned: true,
      earnedDate: "2024-01-15",
    },
    {
      id: "code-warrior",
      title: "Code Warrior",
      description: "Complete 5 JavaScript lessons",
      icon: "⚔️",
      category: "Learning",
      rarity: "Rare",
      earned: true,
      earnedDate: "2024-01-20",
    },
    {
      id: "streak-master",
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      category: "Progress",
      rarity: "Epic",
      earned: true,
      earnedDate: "2024-01-25",
    },
    {
      id: "level-up",
      title: "Level Up!",
      description: "Reach level 5",
      icon: "📈",
      category: "Progress",
      rarity: "Common",
      earned: true,
      earnedDate: "2024-01-22",
    },
    {
      id: "quest-master",
      title: "Quest Master",
      description: "Complete 3 full quests",
      icon: "🏆",
      category: "Learning",
      rarity: "Epic",
      earned: false,
      progress: 1,
      maxProgress: 3,
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Send 10 messages in community chat",
      icon: "🦋",
      category: "Social",
      rarity: "Rare",
      earned: false,
      progress: 3,
      maxProgress: 10,
    },
    {
      id: "explorer",
      title: "Explorer",
      description: "Visit all biomes on the adventure map",
      icon: "🗺️",
      category: "Special",
      rarity: "Epic",
      earned: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: "legendary-learner",
      title: "Legendary Learner",
      description: "Reach level 10 and complete all available quests",
      icon: "👑",
      category: "Special",
      rarity: "Legendary",
      earned: false,
      progress: userStats.level,
      maxProgress: 10,
    },
    {
      id: "speed-runner",
      title: "Speed Runner",
      description: "Complete a quest in under 30 minutes",
      icon: "⚡",
      category: "Special",
      rarity: "Rare",
      earned: false,
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Get 100% on 5 different lessons",
      icon: "💯",
      category: "Learning",
      rarity: "Epic",
      earned: false,
      progress: 2,
      maxProgress: 5,
    },
  ]

  const categories = ["All", "Learning", "Social", "Progress", "Special"]

  const filteredAchievements =
    selectedCategory === "All"
      ? achievements
      : achievements.filter((achievement) => achievement.category === selectedCategory)

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalCount = achievements.length

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-stone-100 text-stone-800 border-stone-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-card border-b-4 border-stone-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBackToDashboard}
              className="border-2 border-stone-400 hover:border-primary bg-transparent"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-3xl">🎖️</span>
                Achievements
              </h1>
              <p className="text-sm text-muted-foreground">
                {earnedCount} of {totalCount} achievements unlocked
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round((earnedCount / totalCount) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="border-4 border-stone-600 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {earnedCount}/{totalCount}
                  </span>
                </div>
                <Progress value={(earnedCount / totalCount) * 100} className="h-3" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(1).map((category) => {
                  const categoryAchievements = achievements.filter((a) => a.category === category)
                  const categoryEarned = categoryAchievements.filter((a) => a.earned).length
                  return (
                    <div
                      key={category}
                      className="text-center bg-secondary/10 p-3 rounded-lg border-2 border-secondary/20"
                    >
                      <div className="font-bold text-secondary">
                        {categoryEarned}/{categoryAchievements.length}
                      </div>
                      <div className="text-xs text-muted-foreground">{category}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`border-2 ${
                selectedCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-stone-400 hover:border-primary bg-transparent"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`border-4 shadow-lg transition-all hover:scale-105 ${
                achievement.earned ? "border-primary bg-primary/5" : "border-stone-400 bg-stone-50 opacity-75"
              }`}
            >
              <CardHeader className="text-center">
                <div className={`text-6xl mb-2 ${achievement.earned ? "" : "grayscale"}`}>{achievement.icon}</div>
                <CardTitle className={`text-lg ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}>
                  {achievement.title}
                </CardTitle>
                <div className="flex justify-center gap-2">
                  <Badge className={`border-2 ${getRarityColor(achievement.rarity)}`}>{achievement.rarity}</Badge>
                  <Badge variant="outline" className="border-2 border-stone-300">
                    {achievement.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">{achievement.description}</CardDescription>

                {achievement.earned ? (
                  <div className="text-sm text-primary font-medium">✅ Earned on {achievement.earnedDate}</div>
                ) : achievement.progress !== undefined && achievement.maxProgress !== undefined ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">🔒 Not yet earned</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
