"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QuestBrowser } from "@/components/quest-browser"
import { QuestDetail } from "@/components/quest-detail"
import { InteractiveMap } from "@/components/interactive-map"
import { Leaderboard } from "@/components/leaderboard"
import { CommunityChat } from "@/components/community-chat"
import { Achievements } from "@/components/achievements"
import { Inventory } from "@/components/inventory"
import { LootChest } from "@/components/loot-chest"
import { Codesk } from "@/components/codesk"
import { CodeStats } from "@/components/code-stats"
import { Projects } from "@/components/projects"
import { Internships } from "@/components/internships"
import { Mentors } from "@/components/mentors"
import { Competition } from "@/components/competition"

interface User {
  username: string
  email: string
}

interface Lesson {
  id: string
  title: string
  content: string
  xpReward: number
  completed: boolean
}

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

interface DashboardProps {
  user: User
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [xp, setXp] = useState(1250)
  const [level, setLevel] = useState(5)
  const [coins, setCoins] = useState(340)
  const [streak] = useState(7)
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "quests"
    | "quest-detail"
    | "map"
    | "leaderboard"
    | "chat"
    | "achievements"
    | "inventory"
    | "codesk"
    | "code-stats"
    | "projects"
    | "internships"
    | "mentors"
    | "competition"
  >("dashboard")
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [showLootChest, setShowLootChest] = useState(false)

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "js-fundamentals",
      title: "🏰 JavaScript Fundamentals",
      description: "Master the basics of JavaScript programming",
      storyline:
        "In the ancient kingdom of CodeCraft, you must learn the mystical language of JavaScript to unlock the secrets of web development.",
      lessons: [
        {
          id: "variables",
          title: "Variables and Data Types",
          content:
            "Learn how to store and manipulate data using variables. In JavaScript, you can use let, const, and var to declare variables. Understanding data types like strings, numbers, and booleans is crucial for building applications.",
          xpReward: 50,
          completed: true,
        },
        {
          id: "functions",
          title: "Functions and Scope",
          content:
            "Functions are reusable blocks of code that perform specific tasks. Learn how to create functions, pass parameters, and understand scope in JavaScript. Functions are the building blocks of any JavaScript application.",
          xpReward: 75,
          completed: true,
        },
        {
          id: "arrays",
          title: "Arrays and Objects",
          content:
            "Discover how to work with arrays and objects to organize and manipulate complex data structures. Arrays store lists of items, while objects store key-value pairs.",
          xpReward: 60,
          completed: false,
        },
        {
          id: "dom",
          title: "DOM Manipulation",
          content:
            "Learn how to interact with HTML elements using JavaScript. The Document Object Model (DOM) allows you to dynamically change web page content and respond to user interactions.",
          xpReward: 85,
          completed: false,
        },
      ],
      totalXP: 270,
      coinReward: 150,
      biome: "Forest",
      difficulty: "Beginner",
      isUnlocked: true,
      mapPosition: { x: 25, y: 60 },
    },
    {
      id: "css-styling",
      title: "🎨 CSS Styling Quest",
      description: "Learn to style beautiful web pages",
      storyline:
        "The realm of visual design awaits! Master the art of CSS to transform plain HTML into stunning, responsive web experiences.",
      lessons: [
        {
          id: "selectors",
          title: "CSS Selectors",
          content:
            "Learn how to target HTML elements using CSS selectors. Master class selectors, ID selectors, and element selectors to apply styles precisely where needed.",
          xpReward: 40,
          completed: false,
        },
        {
          id: "layout",
          title: "Layout with Flexbox",
          content:
            "Discover the power of Flexbox for creating flexible, responsive layouts. Learn how to align items, distribute space, and create complex layouts with ease.",
          xpReward: 70,
          completed: false,
        },
        {
          id: "responsive",
          title: "Responsive Design",
          content:
            "Make your websites look great on all devices using media queries and responsive design principles. Learn mobile-first design and breakpoint strategies.",
          xpReward: 80,
          completed: false,
        },
        {
          id: "animations",
          title: "CSS Animations",
          content:
            "Bring your designs to life with CSS transitions and animations. Learn how to create smooth, engaging user experiences through motion design.",
          xpReward: 90,
          completed: false,
        },
      ],
      totalXP: 280,
      coinReward: 200,
      biome: "Desert",
      difficulty: "Intermediate",
      isUnlocked: true,
      mapPosition: { x: 70, y: 40 },
    },
    {
      id: "react-basics",
      title: "⚛️ React Component Quest",
      description: "Build interactive user interfaces with React",
      storyline:
        "Enter the component kingdom where everything is built from reusable pieces. Learn React to create dynamic, interactive web applications.",
      lessons: [
        {
          id: "components",
          title: "Creating Components",
          content:
            "Learn how to create reusable React components. Understand JSX syntax and how to compose components to build complex user interfaces.",
          xpReward: 60,
          completed: false,
        },
        {
          id: "props",
          title: "Props and State",
          content:
            "Master the flow of data in React applications. Learn how to pass data between components using props and manage component state.",
          xpReward: 80,
          completed: false,
        },
        {
          id: "hooks",
          title: "React Hooks",
          content:
            "Discover the power of React Hooks like useState and useEffect. Learn how to manage state and side effects in functional components.",
          xpReward: 100,
          completed: false,
        },
      ],
      totalXP: 240,
      coinReward: 180,
      biome: "Mountain",
      difficulty: "Advanced",
      isUnlocked: false,
      mapPosition: { x: 50, y: 20 },
    },
    {
      id: "node-backend",
      title: "🔧 Node.js Backend Quest",
      description: "Build powerful server-side applications",
      storyline:
        "Venture into the server realm where data flows and APIs reign supreme. Master Node.js to create robust backend systems.",
      lessons: [
        {
          id: "express",
          title: "Express.js Fundamentals",
          content:
            "Learn how to create web servers using Express.js. Understand routing, middleware, and how to handle HTTP requests and responses.",
          xpReward: 70,
          completed: false,
        },
        {
          id: "databases",
          title: "Database Integration",
          content:
            "Connect your applications to databases. Learn about SQL and NoSQL databases, and how to perform CRUD operations.",
          xpReward: 90,
          completed: false,
        },
      ],
      totalXP: 160,
      coinReward: 120,
      biome: "Cave",
      difficulty: "Advanced",
      isUnlocked: false,
      mapPosition: { x: 80, y: 75 },
    },
    {
      id: "web-apis",
      title: "🌐 Web APIs Adventure",
      description: "Master modern web APIs and integrations",
      storyline:
        "Sail the digital seas and discover the power of web APIs. Learn to connect different services and create amazing integrations.",
      lessons: [
        {
          id: "fetch",
          title: "Fetch API",
          content:
            "Learn how to make HTTP requests using the Fetch API. Understand promises, async/await, and how to handle API responses.",
          xpReward: 60,
          completed: false,
        },
        {
          id: "rest",
          title: "REST APIs",
          content:
            "Understand RESTful API design principles. Learn about HTTP methods, status codes, and how to design clean API endpoints.",
          xpReward: 80,
          completed: false,
        },
      ],
      totalXP: 140,
      coinReward: 100,
      biome: "Ocean",
      difficulty: "Intermediate",
      isUnlocked: true,
      mapPosition: { x: 30, y: 30 },
    },
  ])

  const [codeStats, setCodeStats] = useState({
    totalLinesWritten: 2847,
    languageStats: {
      JavaScript: { lines: 1250, level: 3, xp: 850, maxXp: 1000 },
      HTML: { lines: 890, level: 2, xp: 650, maxXp: 800 },
      CSS: { lines: 567, level: 2, xp: 400, maxXp: 800 },
      Python: { lines: 140, level: 1, xp: 140, maxXp: 300 },
    },
    projectsCompleted: 8,
    skillLevel: "Intermediate Developer",
    canStartProjects: true,
    canApplyInternships: false,
  })

  const nextLevelXP = level * 500
  const currentLevelXP = (level - 1) * 500
  const progressPercent = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  const handleCompleteLesson = (questId: string, lessonId: string) => {
    setQuests((prevQuests) => {
      const updatedQuests = prevQuests.map((quest) => {
        if (quest.id === questId) {
          const updatedLessons = quest.lessons.map((lesson) => {
            if (lesson.id === lessonId && !lesson.completed) {
              // Award XP and coins for completing lesson
              setXp((prevXp) => prevXp + lesson.xpReward)
              setCoins((prevCoins) => prevCoins + Math.floor(lesson.xpReward / 2))

              // Check if level up
              const newXP = xp + lesson.xpReward
              const newLevel = Math.floor(newXP / 500) + 1
              if (newLevel > level) {
                setLevel(newLevel)
              }

              return { ...lesson, completed: true }
            }
            return lesson
          })

          // Check if quest is complete and unlock next quest
          const allCompleted = updatedLessons.every((lesson) => lesson.completed)
          if (allCompleted) {
            setCoins((prevCoins) => prevCoins + quest.coinReward)
            // Unlock next quest logic could go here
          }

          return { ...quest, lessons: updatedLessons }
        }
        return quest
      })
      return updatedQuests
    })

    setTimeout(() => {
      setShowLootChest(true)
    }, 1000)
  }

  const handleSelectQuest = (quest: Quest) => {
    setSelectedQuest(quest)
    setCurrentView("quest-detail")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedQuest(null)
  }

  const handleLootReward = (reward: any) => {
    if (reward.type === "coins") {
      setCoins((prev) => prev + reward.value)
    } else if (reward.type === "xp") {
      setXp((prev) => prev + reward.value)
      const newXP = xp + reward.value
      const newLevel = Math.floor(newXP / 500) + 1
      if (newLevel > level) {
        setLevel(newLevel)
      }
    }
    // Handle other reward types (items, skins, etc.)
  }

  const handlePointsEarned = (points: number) => {
    setCoins((prev) => prev + points)
  }

  const handleCodeWritten = (language: string, lines: number) => {
    setCodeStats((prev) => {
      const newStats = { ...prev }
      if (newStats.languageStats[language]) {
        newStats.languageStats[language].lines += lines
        newStats.languageStats[language].xp += lines * 2

        // Level up logic
        const currentLang = newStats.languageStats[language]
        if (currentLang.xp >= currentLang.maxXp) {
          currentLang.level += 1
          currentLang.xp = currentLang.xp - currentLang.maxXp
          currentLang.maxXp = currentLang.maxXp * 1.5

          // Check for senior developer status
          if (currentLang.level >= 4) {
            newStats.canStartProjects = true
          }

          // Check for internship eligibility (level 6+ in any language)
          if (currentLang.level >= 6) {
            newStats.canApplyInternships = true
          }
        }
      }
      newStats.totalLinesWritten += lines
      return newStats
    })
  }

  const handlePointsSpent = (points: number) => {
    setCoins((prev) => prev - points)
  }

  if (currentView === "leaderboard") {
    return (
      <Leaderboard onBackToDashboard={handleBackToDashboard} currentUser={{ username: user.username, level, xp }} />
    )
  }

  if (currentView === "chat") {
    return <CommunityChat onBackToDashboard={handleBackToDashboard} currentUser={{ username: user.username, level }} />
  }

  if (currentView === "map") {
    return (
      <InteractiveMap
        quests={quests}
        onSelectQuest={handleSelectQuest}
        onBackToDashboard={handleBackToDashboard}
        userLevel={level}
      />
    )
  }

  if (currentView === "quests") {
    return <QuestBrowser quests={quests} onSelectQuest={handleSelectQuest} onBackToDashboard={handleBackToDashboard} />
  }

  if (currentView === "quest-detail" && selectedQuest) {
    return (
      <QuestDetail
        quest={selectedQuest}
        onCompleteLesson={handleCompleteLesson}
        onBackToDashboard={handleBackToDashboard}
      />
    )
  }

  if (currentView === "achievements") {
    return (
      <Achievements onBackToDashboard={handleBackToDashboard} userStats={{ level, xp, completedQuests: 1, streak }} />
    )
  }

  if (currentView === "inventory") {
    return <Inventory onBackToDashboard={handleBackToDashboard} userCoins={coins} />
  }

  if (currentView === "codesk") {
    return (
      <Codesk
        onBackToDashboard={handleBackToDashboard}
        onPointsEarned={handlePointsEarned}
        userCoins={coins}
        onCodeWritten={handleCodeWritten}
      />
    )
  }

  if (currentView === "code-stats") {
    return <CodeStats codeStats={codeStats} onBackToDashboard={handleBackToDashboard} />
  }

  if (currentView === "projects") {
    return <Projects onBackToDashboard={handleBackToDashboard} userStats={codeStats} />
  }

  if (currentView === "internships") {
    return <Internships onBackToDashboard={handleBackToDashboard} userStats={codeStats} />
  }

  if (currentView === "mentors") {
    return <Mentors onBackToDashboard={handleBackToDashboard} userCoins={coins} onPointsSpent={handlePointsSpent} />
  }

  if (currentView === "competition") {
    return (
      <Competition
        onBackToDashboard={handleBackToDashboard}
        userCoins={coins}
        onPointsEarned={handlePointsEarned}
        onPointsSpent={handlePointsSpent}
        userLevel={level}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black dotted-bg">
      <header className="curved-navbar sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">⚡</div>
            <div>
              <h1 className="text-2xl font-bold minecraft-font text-white">Kōdo Academy</h1>
              <p className="text-sm text-blue-300">Welcome back, {user.username}!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg">
              <span className="text-lg">🪙</span>
              <span className="font-bold text-cyan-400">{coins}</span>
            </div>
            <Button
              variant="outline"
              onClick={onLogout}
              className="glass-button glass-border hover:neon-glow text-white bg-transparent border-blue-500/30"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card glass-border glass-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 minecraft-font text-white">
                <span className="text-2xl">👤</span>
                Player Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl font-bold minecraft-font text-white">Level {level}</div>
                <div className="text-sm text-blue-300">
                  {xp} / {nextLevelXP} XP
                </div>
              </div>
              <div className="neon-progress rounded-full h-3">
                <div
                  className="neon-progress-fill h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="glass-bg glass-border p-3 rounded-lg">
                  <div className="text-lg">🔥</div>
                  <div className="font-bold text-cyan-400">{streak}</div>
                  <div className="text-xs text-blue-300">Day Streak</div>
                </div>
                <div className="glass-bg glass-border p-3 rounded-lg">
                  <div className="text-lg">⭐</div>
                  <div className="font-bold text-blue-400">12</div>
                  <div className="text-xs text-blue-300">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card glass-border glass-shadow lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 minecraft-font text-white">
                <span className="text-2xl">🗺️</span>
                Active Quests
              </CardTitle>
              <CardDescription className="text-blue-300">Continue your learning adventure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {quests
                  .filter((quest) => quest.isUnlocked)
                  .slice(0, 2)
                  .map((quest) => {
                    const completedLessons = quest.lessons.filter((lesson) => lesson.completed).length
                    const progressPercent = (completedLessons / quest.lessons.length) * 100

                    return (
                      <div
                        key={quest.id}
                        className="glass-bg glass-border p-4 rounded-lg glass-hover cursor-pointer"
                        onClick={() => handleSelectQuest(quest)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold minecraft-font text-white">{quest.title}</h3>
                          <Badge className="neon-badge">
                            {completedLessons === quest.lessons.length ? "Complete" : "In Progress"}
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-300 mb-3">{quest.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="neon-progress rounded-full h-2 flex-1 mr-4">
                            <div
                              className="neon-progress-fill h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-cyan-400">{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-blue-300">
                          <span>
                            Lesson {completedLessons + 1} of {quest.lessons.length}
                          </span>
                          <span>+{quest.totalXP} XP</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card
            className="glass-card glass-border glass-shadow cursor-pointer glass-hover"
            onClick={() => setCurrentView("code-stats")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 minecraft-font text-white">
                <span className="text-2xl">📊</span>
                Code Statistics
                <Badge className="neon-badge ml-auto">{codeStats.skillLevel}</Badge>
              </CardTitle>
              <CardDescription className="text-blue-300">
                Track your coding progress and skill development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center glass-bg glass-border p-3 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">{codeStats.totalLinesWritten.toLocaleString()}</div>
                  <div className="text-sm text-cyan-300">Lines Written</div>
                </div>
                <div className="text-center glass-bg glass-border p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{Object.keys(codeStats.languageStats).length}</div>
                  <div className="text-sm text-blue-300">Languages</div>
                </div>
                <div className="text-center glass-bg glass-border p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{codeStats.projectsCompleted}</div>
                  <div className="text-sm text-blue-300">Projects</div>
                </div>
                <div className="text-center glass-bg glass-border p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.max(...Object.values(codeStats.languageStats).map((lang) => lang.level))}
                  </div>
                  <div className="text-sm text-blue-300">Max Level</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(codeStats.languageStats).map(([lang, stats]) => (
                  <Badge key={lang} className="neon-badge text-xs">
                    {lang} Lv.{stats.level}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 minecraft-font text-white">
            <span className="text-2xl">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button
              onClick={() => setCurrentView("map")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">🗺️</span>
              <span className="text-sm font-medium">Adventure Map</span>
            </Button>
            <Button
              onClick={() => setCurrentView("quests")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium">Browse Quests</span>
            </Button>
            <Button
              onClick={() => setCurrentView("leaderboard")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium">Leaderboard</span>
            </Button>
            <Button
              onClick={() => setCurrentView("chat")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">💬</span>
              <span className="text-sm font-medium">Community Chat</span>
            </Button>
            <Button
              onClick={() => setCurrentView("achievements")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">🎖️</span>
              <span className="text-sm font-medium">Achievements</span>
            </Button>
            <Button
              onClick={() => setCurrentView("inventory")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">🎒</span>
              <span className="text-sm font-medium">Inventory</span>
            </Button>
            <Button
              onClick={() => setCurrentView("codesk")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">💻</span>
              <span className="text-sm font-medium">CoDesk™</span>
            </Button>
            <Button
              onClick={() => setCurrentView("projects")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">🚀</span>
              <span className="text-sm font-medium">Projects</span>
            </Button>
            <Button
              onClick={() => setCurrentView("internships")}
              className={`glass-button glass-border h-20 flex-col gap-2 text-white transition-all duration-300 ${
                codeStats.canApplyInternships ? "hover:bg-blue-500/20" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!codeStats.canApplyInternships}
            >
              <span className="text-2xl">💼</span>
              <span className="text-sm font-medium">Internships</span>
              {!codeStats.canApplyInternships && <span className="text-xs text-red-400">Locked</span>}
            </Button>
            <Button
              onClick={() => setCurrentView("mentors")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">👨‍🏫</span>
              <span className="text-sm font-medium">Mentors</span>
            </Button>
            <Button
              onClick={() => setCurrentView("competition")}
              className="glass-button glass-border h-20 flex-col gap-2 text-white hover:bg-blue-500/20 transition-all duration-300"
            >
              <span className="text-2xl">⚔️</span>
              <span className="text-sm font-medium">Competition</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Loot Chest Component */}
      <LootChest isOpen={showLootChest} onClose={() => setShowLootChest(false)} onRewardClaimed={handleLootReward} />
    </div>
  )
}
