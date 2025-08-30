"use client"

import { useState } from "react"
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

interface QuestDetailProps {
  quest: Quest
  onCompleteLesson: (questId: string, lessonId: string) => void
  onBackToDashboard: () => void
}

export function QuestDetail({ quest, onCompleteLesson, onBackToDashboard }: QuestDetailProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)

  const currentLesson = quest.lessons[currentLessonIndex]
  const completedLessons = quest.lessons.filter((lesson) => lesson.completed).length
  const progressPercent = (completedLessons / quest.lessons.length) * 100
  const isQuestComplete = completedLessons === quest.lessons.length

  const handleCompleteLesson = () => {
    onCompleteLesson(quest.id, currentLesson.id)
    setShowCompletion(true)

    setTimeout(() => {
      setShowCompletion(false)
      if (currentLessonIndex < quest.lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1)
      }
    }, 2000)
  }

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

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="border-4 border-stone-600 shadow-lg max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Lesson Complete!</h2>
            <p className="text-muted-foreground mb-4">You earned {currentLesson.xpReward} XP!</p>
            <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20">
              <div className="text-3xl text-primary font-bold">+{currentLesson.xpReward} XP</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-card border-b-4 border-stone-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onBackToDashboard}
              className="border-2 border-stone-400 hover:border-primary bg-transparent"
            >
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-4">
              <Badge className={`${getDifficultyColor(quest.difficulty)} border-2`}>{quest.difficulty}</Badge>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getBiomeEmoji(quest.biome)}</span>
                <span className="font-medium">{quest.biome}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quest Header */}
        <Card className="border-4 border-stone-600 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{quest.title}</CardTitle>
            <CardDescription className="text-base">{quest.storyline}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Quest Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedLessons} / {quest.lessons.length} lessons
              </span>
            </div>
            <Progress value={progressPercent} className="h-3 mb-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                Total XP: {quest.totalXP}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg">🪙</span>
                Reward: {quest.coinReward} coins
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Current Lesson */}
        {!isQuestComplete ? (
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Lesson {currentLessonIndex + 1}: {currentLesson.title}
                </CardTitle>
                <Badge variant="secondary">+{currentLesson.xpReward} XP</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg border-2 border-muted">
                <p className="text-base leading-relaxed">{currentLesson.content}</p>
              </div>

              {!currentLesson.completed ? (
                <Button
                  onClick={handleCompleteLesson}
                  className="w-full h-12 text-lg font-bold border-2 border-stone-600 shadow-md hover:shadow-lg transition-all"
                >
                  Complete Lesson 🚀
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <p className="text-muted-foreground">Lesson completed!</p>
                  {currentLessonIndex < quest.lessons.length - 1 && (
                    <Button
                      onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}
                      variant="outline"
                      className="mt-4 border-2 border-stone-400 hover:border-primary bg-transparent"
                    >
                      Next Lesson →
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-4 border-stone-600 shadow-lg text-center">
            <CardContent className="pt-8 pb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-primary mb-2">Quest Complete!</h2>
              <p className="text-muted-foreground mb-4">You've mastered {quest.title} and unlocked new adventures!</p>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20">
                  <div className="text-2xl text-primary font-bold">+{quest.totalXP}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border-2 border-secondary/20">
                  <div className="text-2xl text-secondary font-bold">+{quest.coinReward}</div>
                  <div className="text-sm text-muted-foreground">Coins</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lesson Navigation */}
        <Card className="border-4 border-stone-600 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-lg">All Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {quest.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors text-left ${
                    index === currentLessonIndex
                      ? "border-primary bg-primary/5"
                      : lesson.completed
                        ? "border-green-200 bg-green-50 hover:border-green-300"
                        : "border-stone-300 bg-background hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{lesson.completed ? "✅" : index === currentLessonIndex ? "▶️" : "⭕"}</div>
                    <span className="font-medium">{lesson.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +{lesson.xpReward} XP
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
