"use client"

import { useState, useEffect } from "react"
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

  // Cycle day/night every 30 seconds for immersion
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

  const getBiomeColor = (biome: string) => {
    switch (biome) {
      case "Forest":
        return "bg-green-500 hover:bg-green-600 border-green-700"
      case "Desert":
        return "bg-yellow-500 hover:bg-yellow-600 border-yellow-700"
      case "Ocean":
        return "bg-blue-500 hover:bg-blue-600 border-blue-700"
      case "Mountain":
        return "bg-gray-500 hover:bg-gray-600 border-gray-700"
      case "Cave":
        return "bg-stone-600 hover:bg-stone-700 border-stone-800"
      default:
        return "bg-primary hover:bg-primary/90 border-primary"
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="border-4 border-stone-600 shadow-lg bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  Kōdo World Map
                </CardTitle>
                <CardDescription>Click on biomes to explore available quests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-4 border-stone-400 p-8 min-h-[500px] overflow-hidden">
                  {/* Grid background for blocky feel */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
                      {Array.from({ length: 400 }).map((_, i) => (
                        <div key={i} className="border border-stone-300"></div>
                      ))}
                    </div>
                  </div>

                  {/* Quest Blocks */}
                  <div className="relative z-10">
                    {quests.map((quest) => {
                      const status = getQuestStatus(quest)
                      const completedLessons = quest.lessons.filter((lesson) => lesson.completed).length
                      const progressPercent = (completedLessons / quest.lessons.length) * 100

                      return (
                        <div
                          key={quest.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                          style={{
                            left: `${quest.mapPosition.x}%`,
                            top: `${quest.mapPosition.y}%`,
                          }}
                          onClick={() => quest.isUnlocked && onSelectQuest(quest)}
                          onMouseEnter={() => setSelectedBiome(quest.biome)}
                          onMouseLeave={() => setSelectedBiome(null)}
                        >
                          {/* Quest Block */}
                          <div
                            className={`w-20 h-20 rounded-lg border-4 shadow-lg transition-all duration-200 flex flex-col items-center justify-center text-white font-bold text-sm ${getBiomeColor(
                              quest.biome,
                            )} ${
                              quest.isUnlocked ? "hover:scale-110 hover:shadow-xl" : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            <div className="text-2xl">{getBiomeEmoji(quest.biome)}</div>
                            <div className="text-xs">{getStatusEmoji(status)}</div>
                          </div>

                          {/* Progress Ring */}
                          {quest.isUnlocked && progressPercent > 0 && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                              {Math.round(progressPercent)}
                            </div>
                          )}

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-card border-2 border-stone-400 rounded-lg p-3 shadow-lg min-w-48">
                              <h3 className="font-bold text-primary text-sm">{quest.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{quest.description}</p>
                              <div className="flex items-center justify-between mt-2 text-xs">
                                <span className="flex items-center gap-1">
                                  <span>⭐</span>
                                  {quest.totalXP} XP
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {quest.difficulty}
                                </Badge>
                              </div>
                              {quest.isUnlocked && progressPercent > 0 && (
                                <div className="mt-2">
                                  <Progress value={progressPercent} className="h-1" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 text-4xl animate-bounce">
                      {timeOfDay === "day" ? "☀️" : "⭐"}
                    </div>
                    <div className="absolute bottom-4 left-4 text-2xl">🏰</div>
                    <div className="absolute top-1/2 left-4 text-2xl">🌳</div>
                    <div className="absolute bottom-1/3 right-1/4 text-2xl">🏔️</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Biome Info Panel */}
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
