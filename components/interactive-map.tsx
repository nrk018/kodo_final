"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  mapPosition: { x: number; y: number }
}

interface Lesson {
  id: string
  title: string
  content: string
  xpReward: number
  completed: boolean
}

interface InteractiveMapProps {
  quests: Quest[]
  onSelectQuest: (quest: Quest) => void
  onBackToDashboard: () => void
  userLevel: number
}

export function InteractiveMap({ quests, onSelectQuest, onBackToDashboard, userLevel }: InteractiveMapProps) {
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day")
  const [selectedBiome, setSelectedBiome] = useState<string | null>(null)

  // Cycle day/night every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay((prev) => (prev === "day" ? "night" : "day"))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

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

  const getQuestStatus = (quest: Quest) => {
    const completedLessons = quest.lessons.filter((lesson) => lesson.completed).length
    const totalLessons = quest.lessons.length

    if (!quest.isUnlocked) return "locked"
    if (completedLessons === totalLessons) return "completed"
    if (completedLessons > 0) return "in-progress"
    return "available"
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "locked":
        return "🔒"
      case "completed":
        return "✅"
      case "in-progress":
        return "⚡"
      case "available":
        return "🚀"
      default:
        return "❓"
    }
  }

  const backgroundClass =
    timeOfDay === "day"
      ? "bg-gradient-to-b from-sky-300 via-sky-200 to-green-200"
      : "bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800"

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgroundClass}`}>
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-sm border-b-4 border-stone-600 shadow-lg">
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
                <h1 className="text-2xl font-bold text-primary">Adventure Map</h1>
                <p className="text-sm text-muted-foreground">Explore different biomes and unlock new quests</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-card/80 px-3 py-2 rounded-lg border-2 border-primary/20">
                <span className="text-lg">{timeOfDay === "day" ? "☀️" : "🌙"}</span>
                <span className="text-sm font-medium capitalize">{timeOfDay}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                Level {userLevel}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* World Map Section with WorkAdventure */}
          <div className="lg:col-span-3">
            <Card className="border-4 border-stone-600 shadow-lg bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  Kōdo World Map
                </CardTitle>
                <CardDescription>Now powered by WorkAdventure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border-4 border-stone-400 overflow-hidden min-h-[500px]">
                  <iframe
                    src="https://play.staging.workadventu.re/@/tcm/workadventure/wa-village"
                    className="w-full h-[600px] rounded-lg border-0"
                    allow="camera; microphone; fullscreen; display-capture"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side Panels */}
          <div className="space-y-6">
            <Card className="border-4 border-stone-600 shadow-lg bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Biome Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBiome ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{getBiomeEmoji(selectedBiome)}</div>
                      <h3 className="font-bold text-primary">{selectedBiome}</h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedBiome === "Forest" && "A lush environment perfect for learning the fundamentals."}
                      {selectedBiome === "Desert" && "A challenging landscape where styling skills are forged."}
                      {selectedBiome === "Ocean" && "Deep waters where advanced concepts flow freely."}
                      {selectedBiome === "Mountain" &&
                        "High peaks where only the most skilled adventurers dare to climb."}
                      {selectedBiome === "Cave" && "Dark depths hiding the most valuable treasures of knowledge."}
                    </div>
                    <div className="space-y-2">
                      {quests
                        .filter((quest) => quest.biome === selectedBiome)
                        .map((quest) => {
                          const status = getQuestStatus(quest)
                          return (
                            <div
                              key={quest.id}
                              className="flex items-center justify-between p-2 bg-muted/50 rounded border"
                            >
                              <span className="text-sm font-medium">{quest.title}</span>
                              <span className="text-lg">{getStatusEmoji(status)}</span>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-sm">Hover over biomes to explore</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-4 border-stone-600 shadow-lg bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">🚀</span>
                  <span>Available Quest</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">⚡</span>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">✅</span>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">🔒</span>
                  <span>Locked</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}