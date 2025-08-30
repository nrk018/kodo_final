"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface CodeStatsProps {
  codeStats: {
    totalLinesWritten: number
    languageStats: {
      [key: string]: {
        lines: number
        level: number
        xp: number
        maxXp: number
      }
    }
    projectsCompleted: number
    skillLevel: string
    canStartProjects: boolean
    canApplyInternships: boolean
  }
  onBackToDashboard: () => void
}

export function CodeStats({ codeStats, onBackToDashboard }: CodeStatsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  // Mock activity data for heatmap (last 365 days)
  const generateActivityData = () => {
    const data = []
    const today = new Date()
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const activity = Math.floor(Math.random() * 5) // 0-4 activity level
      data.push({
        date: date.toISOString().split("T")[0],
        count: activity,
        level: activity,
      })
    }
    return data
  }

  const activityData = generateActivityData()

  // Mock recent sessions
  const recentSessions = [
    { date: "2024-01-15", language: "JavaScript", lines: 127, duration: "2h 15m", project: "Todo App" },
    { date: "2024-01-14", language: "CSS", lines: 89, duration: "1h 30m", project: "Portfolio Site" },
    { date: "2024-01-13", language: "HTML", lines: 156, duration: "1h 45m", project: "Landing Page" },
    { date: "2024-01-12", language: "JavaScript", lines: 203, duration: "3h 20m", project: "React Components" },
    { date: "2024-01-11", language: "Python", lines: 78, duration: "1h 10m", project: "Data Analysis" },
  ]

  const getActivityColor = (level: number) => {
    const colors = [
      "bg-gray-100", // 0 - no activity
      "bg-green-200", // 1 - low activity
      "bg-green-400", // 2 - medium activity
      "bg-green-600", // 3 - high activity
      "bg-green-800", // 4 - very high activity
    ]
    return colors[level] || colors[0]
  }

  const getLanguageIcon = (language: string) => {
    const icons: { [key: string]: string } = {
      JavaScript: "🟨",
      HTML: "🟧",
      CSS: "🟦",
      Python: "🐍",
      React: "⚛️",
      Node: "🟢",
    }
    return icons[language] || "💻"
  }

  const getSkillTitle = (level: number) => {
    if (level >= 6) return "Expert"
    if (level >= 4) return "Senior"
    if (level >= 2) return "Intermediate"
    return "Beginner"
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
                <span className="text-3xl">📊</span>
                Code Statistics
              </h1>
              <p className="text-sm text-muted-foreground">Track your coding journey and skill development</p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {codeStats.skillLevel}
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-2xl font-bold text-green-600">{codeStats.totalLinesWritten.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Lines</div>
            </CardContent>
          </Card>
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🔤</div>
              <div className="text-2xl font-bold text-blue-600">{Object.keys(codeStats.languageStats).length}</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </CardContent>
          </Card>
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-purple-600">{codeStats.projectsCompleted}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </CardContent>
          </Card>
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.max(...Object.values(codeStats.languageStats).map((lang) => lang.level))}
              </div>
              <div className="text-sm text-muted-foreground">Highest Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Language Proficiency */}
        <Card className="border-4 border-stone-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Language Proficiency
            </CardTitle>
            <CardDescription>Your skill level in different programming languages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {Object.entries(codeStats.languageStats).map(([language, stats]) => (
                <div
                  key={language}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedLanguage === language
                      ? "border-primary bg-primary/5"
                      : "border-stone-300 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getLanguageIcon(language)}</span>
                      <div>
                        <h3 className="font-bold text-lg">{language}</h3>
                        <p className="text-sm text-muted-foreground">
                          Level {stats.level} • {getSkillTitle(stats.level)} • {stats.lines.toLocaleString()} lines
                        </p>
                      </div>
                    </div>
                    <Badge variant={stats.level >= 4 ? "default" : "secondary"}>
                      {stats.level >= 6 ? "🏆 Expert" : stats.level >= 4 ? "⭐ Senior" : "📚 Learning"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Level {stats.level + 1}</span>
                      <span>
                        {stats.xp} / {stats.maxXp} XP
                      </span>
                    </div>
                    <Progress value={(stats.xp / stats.maxXp) * 100} className="h-3" />
                  </div>
                  {selectedLanguage === language && (
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-green-600">{stats.lines}</div>
                          <div className="text-muted-foreground">Lines Written</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{Math.floor(stats.lines / 50)}</div>
                          <div className="text-muted-foreground">Sessions</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-purple-600">{Math.floor(stats.xp / 100)}</div>
                          <div className="text-muted-foreground">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-orange-600">{stats.level * 20}%</div>
                          <div className="text-muted-foreground">Mastery</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card className="border-4 border-stone-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              Coding Activity
            </CardTitle>
            <CardDescription>Your coding activity over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                {activityData.map((day, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(day.level)} border border-stone-200`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-sm ${getActivityColor(level)} border border-stone-200`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="border-4 border-stone-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              Recent Coding Sessions
            </CardTitle>
            <CardDescription>Your latest coding activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border-2 border-secondary/20"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{getLanguageIcon(session.language)}</span>
                    <div>
                      <h4 className="font-bold">{session.project}</h4>
                      <p className="text-sm text-muted-foreground">
                        {session.language} • {session.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{session.lines} lines</div>
                    <div className="text-sm text-muted-foreground">{session.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Progression Milestones */}
        <Card className="border-4 border-stone-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎖️</span>
              Skill Milestones
            </CardTitle>
            <CardDescription>Unlock new opportunities as you level up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 ${codeStats.canStartProjects ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{codeStats.canStartProjects ? "✅" : "🔒"}</span>
                  <div>
                    <h4 className="font-bold">Senior Developer Status</h4>
                    <p className="text-sm text-muted-foreground">
                      Reach Level 4 in any language to start your own projects
                    </p>
                  </div>
                  {codeStats.canStartProjects && (
                    <Badge variant="default" className="ml-auto">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
              <div
                className={`p-4 rounded-lg border-2 ${codeStats.canApplyInternships ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-gray-50"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{codeStats.canApplyInternships ? "✅" : "🔒"}</span>
                  <div>
                    <h4 className="font-bold">Internship Eligibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Reach Level 6 in any language to apply for internships
                    </p>
                  </div>
                  {codeStats.canApplyInternships && (
                    <Badge variant="default" className="ml-auto">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
