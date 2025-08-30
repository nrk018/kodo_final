"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Trophy, Users, Zap, Target, Code, Timer } from "lucide-react"

interface CompetitionProps {
  onBackToDashboard: () => void
  userCoins: number
  onPointsEarned: (points: number) => void
  onPointsSpent: (points: number) => void
  userLevel: number
}

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeLimit: number
  points: number
  language: string
  problem: string
  testCases: Array<{ input: string; output: string }>
}

interface Match {
  id: string
  type: "1v1" | "2v2"
  status: "waiting" | "active" | "completed"
  players: Array<{ name: string; level: number; avatar: string }>
  challenge: Challenge
  timeRemaining: number
  entryFee: number
  prizePool: number
}

const sampleChallenges: Challenge[] = [
  {
    id: "two-sum",
    title: "Two Sum Problem",
    description: "Find two numbers in array that add up to target",
    difficulty: "Easy",
    timeLimit: 300,
    points: 50,
    language: "JavaScript",
    problem: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Because nums[0] + nums[1] = 2 + 7 = 9`,
    testCases: [
      { input: "[2,7,11,15], 9", output: "[0,1]" },
      { input: "[3,2,4], 6", output: "[1,2]" },
    ],
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description: "Reverse a string in-place with O(1) extra memory",
    difficulty: "Easy",
    timeLimit: 180,
    points: 30,
    language: "JavaScript",
    problem: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]`,
    testCases: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Implement binary search algorithm",
    difficulty: "Medium",
    timeLimit: 450,
    points: 100,
    language: "JavaScript",
    problem: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4`,
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", output: "4" },
      { input: "[-1,0,3,5,9,12], 2", output: "-1" },
    ],
  },
]

export function Competition({
  onBackToDashboard,
  userCoins,
  onPointsEarned,
  onPointsSpent,
  userLevel,
}: CompetitionProps) {
  const [currentView, setCurrentView] = useState<"lobby" | "match" | "active-competition">("lobby")
  const [activeMatches, setActiveMatches] = useState<Match[]>([])
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null)
  const [userCode, setUserCode] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [matchResult, setMatchResult] = useState<"win" | "lose" | "draw" | null>(null)

  // Initialize sample matches
  useEffect(() => {
    const sampleMatches: Match[] = [
      {
        id: "match-1",
        type: "1v1",
        status: "waiting",
        players: [
          { name: "CodeNinja42", level: userLevel, avatar: "🥷" },
          { name: "Waiting...", level: 0, avatar: "⏳" },
        ],
        challenge: sampleChallenges[0],
        timeRemaining: 300,
        entryFee: 0,
        prizePool: 100,
      },
      {
        id: "match-2",
        type: "1v1",
        status: "waiting",
        players: [
          { name: "JSMaster", level: userLevel + 1, avatar: "⚡" },
          { name: "Waiting...", level: 0, avatar: "⏳" },
        ],
        challenge: sampleChallenges[1],
        timeRemaining: 180,
        entryFee: 50,
        prizePool: 150,
      },
      {
        id: "match-3",
        type: "2v2",
        status: "waiting",
        players: [
          { name: "TeamAlpha1", level: userLevel, avatar: "🔥" },
          { name: "TeamAlpha2", level: userLevel - 1, avatar: "💎" },
          { name: "Waiting...", level: 0, avatar: "⏳" },
          { name: "Waiting...", level: 0, avatar: "⏳" },
        ],
        challenge: sampleChallenges[2],
        timeRemaining: 450,
        entryFee: 100,
        prizePool: 400,
      },
    ]
    setActiveMatches(sampleMatches)
  }, [userLevel])

  const handleJoinMatch = (match: Match) => {
    if (match.entryFee > 0 && userCoins < match.entryFee) {
      alert("Insufficient coins to join this match!")
      return
    }

    if (match.entryFee > 0) {
      onPointsSpent(match.entryFee)
    }

    // Simulate joining match
    const updatedMatch = {
      ...match,
      status: "active" as const,
      players: match.players.map((player, index) =>
        player.name === "Waiting..." && index === 1 ? { name: "You", level: userLevel, avatar: "👤" } : player,
      ),
    }

    setCurrentMatch(updatedMatch)
    setTimeRemaining(match.challenge.timeLimit)
    setCurrentView("active-competition")
    setUserCode(
      `// ${match.challenge.title}\n// ${match.challenge.description}\n\nfunction solution() {\n    // Write your code here\n    \n}`,
    )
  }

  const handleSubmitCode = () => {
    setIsSubmitting(true)

    // Simulate code evaluation
    setTimeout(() => {
      const isWin = Math.random() > 0.4 // 60% win rate for demo
      setMatchResult(isWin ? "win" : "lose")

      if (isWin && currentMatch) {
        const reward = Math.floor(currentMatch.prizePool * 0.7) // Winner gets 70% of prize pool
        onPointsEarned(reward)
      }

      setIsSubmitting(false)
    }, 2000)
  }

  const handleNewMatch = () => {
    setCurrentMatch(null)
    setMatchResult(null)
    setUserCode("")
    setTimeRemaining(0)
    setCurrentView("lobby")
  }

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && currentView === "active-competition" && !matchResult) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && currentView === "active-competition" && !matchResult) {
      // Time's up - auto submit
      handleSubmitCode()
    }
  }, [timeRemaining, currentView, matchResult])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (currentView === "active-competition" && currentMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Competition Header */}
          <div className="bg-card border-4 border-red-600 rounded-lg p-4 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">⚔️</div>
                <div>
                  <h1 className="text-2xl font-bold text-red-600 pixel-font">
                    {currentMatch.type.toUpperCase()} BATTLE
                  </h1>
                  <p className="text-sm text-muted-foreground">{currentMatch.challenge.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                    timeRemaining < 60
                      ? "bg-red-100 border-red-400 text-red-700"
                      : "bg-blue-100 border-blue-400 text-blue-700"
                  }`}
                >
                  <Timer className="w-5 h-5" />
                  <span className="font-bold pixel-font text-lg">{formatTime(timeRemaining)}</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-lg border-2 border-yellow-400">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-700">{currentMatch.prizePool} coins</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problem Statement */}
            <Card className="border-4 border-stone-600 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Problem
                </CardTitle>
                <Badge
                  variant={
                    currentMatch.challenge.difficulty === "Easy"
                      ? "secondary"
                      : currentMatch.challenge.difficulty === "Medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {currentMatch.challenge.difficulty}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg border-2 border-muted-foreground/20">
                  <pre className="text-sm whitespace-pre-wrap font-mono">{currentMatch.challenge.problem}</pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Test Cases:</h4>
                  {currentMatch.challenge.testCases.map((test, index) => (
                    <div key={index} className="bg-secondary/10 p-2 rounded border text-sm font-mono mb-2">
                      <div>
                        <strong>Input:</strong> {test.input}
                      </div>
                      <div>
                        <strong>Output:</strong> {test.output}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className="border-4 border-stone-600 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code Editor - {currentMatch.challenge.language}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm border-2 border-stone-400 rounded-lg bg-stone-50 focus:border-primary focus:outline-none resize-none"
                  placeholder="Write your solution here..."
                  disabled={isSubmitting || matchResult !== null}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Lines: {userCode.split("\n").length}</Badge>
                    <Badge variant="outline">Characters: {userCode.length}</Badge>
                  </div>
                  <Button
                    onClick={handleSubmitCode}
                    disabled={isSubmitting || matchResult !== null || timeRemaining === 0}
                    className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-700 pixel-font"
                  >
                    {isSubmitting ? "Evaluating..." : "Submit Solution"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Players */}
          <Card className="border-4 border-stone-600 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentMatch.players.map((player, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-lg border-2 ${
                      player.name === "You" ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-400"
                    }`}
                  >
                    <div className="text-3xl mb-2">{player.avatar}</div>
                    <div className="font-bold">{player.name}</div>
                    <div className="text-sm text-muted-foreground">Level {player.level}</div>
                    {player.name === "You" && matchResult && (
                      <Badge className={`mt-2 ${matchResult === "win" ? "bg-green-500" : "bg-red-500"}`}>
                        {matchResult === "win" ? "Winner!" : "Try Again!"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Result Modal */}
          {matchResult && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="border-4 border-stone-600 shadow-xl max-w-md w-full mx-4">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{matchResult === "win" ? "🏆" : "💪"}</div>
                  <CardTitle
                    className={`text-2xl pixel-font ${matchResult === "win" ? "text-green-600" : "text-red-600"}`}
                  >
                    {matchResult === "win" ? "Victory!" : "Keep Practicing!"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {matchResult === "win" && (
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                      <div className="text-2xl font-bold text-green-600">
                        +{Math.floor(currentMatch.prizePool * 0.7)} coins
                      </div>
                      <div className="text-sm text-green-700">Prize money earned!</div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Button onClick={handleNewMatch} className="w-full">
                      Find New Match
                    </Button>
                    <Button variant="outline" onClick={onBackToDashboard} className="w-full bg-transparent">
                      Back to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={onBackToDashboard}
            className="flex items-center gap-2 border-2 border-stone-400 hover:border-primary bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border-2 border-stone-400">
            <span className="text-lg">🪙</span>
            <span className="font-bold">{userCoins} coins</span>
          </div>
        </div>

        {/* Competition Header */}
        <Card className="border-4 border-red-600 shadow-lg mb-8">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">⚔️</div>
            <CardTitle className="text-4xl pixel-font text-red-600">CODE ARENA</CardTitle>
            <CardDescription className="text-lg">
              Battle other developers in real-time coding competitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-bold text-blue-600">Fast-Paced</div>
                <div className="text-sm text-blue-700">Timed coding challenges</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-green-600">Earn Coins</div>
                <div className="text-sm text-green-700">Win matches to earn rewards</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                <div className="text-3xl mb-2">👥</div>
                <div className="font-bold text-purple-600">Fair Matches</div>
                <div className="text-sm text-purple-700">Matched by skill level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Matches */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Available Matches
          </h2>

          <div className="grid gap-6">
            {activeMatches.map((match) => (
              <Card
                key={match.id}
                className="border-4 border-stone-600 shadow-lg hover:border-red-400 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{match.type === "1v1" ? "⚔️" : "🛡️"}</div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {match.type.toUpperCase()} - {match.challenge.title}
                          <Badge
                            variant={
                              match.challenge.difficulty === "Easy"
                                ? "secondary"
                                : match.challenge.difficulty === "Medium"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {match.challenge.difficulty}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{match.challenge.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-lg font-bold text-yellow-600">
                        <Trophy className="w-5 h-5" />
                        {match.prizePool} coins
                      </div>
                      {match.entryFee > 0 && (
                        <div className="text-sm text-muted-foreground">Entry: {match.entryFee} coins</div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">
                        {Math.floor(match.challenge.timeLimit / 60)}:
                        {(match.challenge.timeLimit % 60).toString().padStart(2, "0")} time limit
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{match.challenge.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{match.challenge.points} XP reward</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Players:</span>
                      <div className="flex gap-1">
                        {match.players.map((player, index) => (
                          <span key={index} className="text-lg" title={`${player.name} (Level ${player.level})`}>
                            {player.avatar}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleJoinMatch(match)}
                      disabled={match.entryFee > userCoins}
                      className="bg-red-600 hover:bg-red-700 text-white border-2 border-red-700 pixel-font"
                    >
                      {match.entryFee === 0 ? "Join Free Match" : `Join (${match.entryFee} coins)`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competition Stats */}
        <Card className="border-4 border-stone-600 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Your Competition Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-green-700">Matches Won</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <div className="text-2xl font-bold text-red-600">8</div>
                <div className="text-sm text-red-700">Matches Lost</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <div className="text-2xl font-bold text-blue-600">60%</div>
                <div className="text-sm text-blue-700">Win Rate</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">1,240</div>
                <div className="text-sm text-yellow-700">Coins Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
