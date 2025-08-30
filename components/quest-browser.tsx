"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Quest {
  id: string
  title: string
  description: string
  storyline: string
  lessons: Lesson[]
  totalXP: number
  coinReward: number
  biome: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  isUnlocked: boolean
}

interface Lesson {
  id: string
  title: string
  content: string
  xpReward: number
  completed: boolean
}

interface QuestBrowserProps {
  quests: Quest[]
  onSelectQuest: (quest: Quest) => void
  onBackToDashboard: () => void
}

export function QuestBrowser({ quests, onSelectQuest, onBackToDashboard }: QuestBrowserProps) {
  const getBiomeEmoji = (biome: string) => {
    switch (biome) {
      case "Forest":
        return "🌲"
      case "Desert":
        return "🏜️"
      case "Ocean":
        return "🌊"
      case "Mountain":
        return "⛰️"
      case "Cave":
        return "🕳️"
      default:
        return "🗺️"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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
                <h1 className="text-2xl font-bold text-primary">Quest Browser</h1>
                <p className="text-sm text-muted-foreground">Choose your next adventure</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => {
            const completedLessons = quest.lessons.filter((lesson) => lesson.completed).length
            const progressPercent = (completedLessons / quest.lessons.length) * 100
            const isComplete = completedLessons === quest.lessons.length

            return (
              <Card
                key={quest.id}
                className={`border-4 shadow-lg transition-all hover:shadow-xl cursor-pointer ${
                  quest.isUnlocked ? "border-stone-600 hover:border-primary" : "border-stone-300 opacity-60"
                }`}
                onClick={() => quest.isUnlocked && onSelectQuest(quest)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getBiomeEmoji(quest.biome)}</span>
                      <span className="text-sm font-medium text-muted-foreground">{quest.biome}</span>
                    </div>
                    <Badge className={`${getDifficultyColor(quest.difficulty)} border-2`}>{quest.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg text-primary">{quest.title}</CardTitle>
                  <CardDescription className="text-sm">{quest.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-3 rounded-lg border border-muted">
                    <p className="text-xs text-muted-foreground italic">"{quest.storyline}"</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground">
                        {completedLessons} / {quest.lessons.length}
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-base">⭐</span>
                      <span>{quest.totalXP} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-base">🪙</span>
                      <span>{quest.coinReward} coins</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    {!quest.isUnlocked ? (
                      <Button disabled className="w-full bg-transparent" variant="outline">
                        🔒 Locked
                      </Button>
                    ) : isComplete ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        ✅ Completed - Review
                      </Button>
                    ) : completedLessons > 0 ? (
                      <Button className="w-full">▶️ Continue Quest</Button>
                    ) : (
                      <Button className="w-full">🚀 Start Quest</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
