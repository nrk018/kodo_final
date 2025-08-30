"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Problem {
  id: string
  type: string
  description: string
  language: string
  difficulty: "Easy" | "Medium" | "Hard"
  timestamp: string
  code: string
  error?: string
}

interface Mentor {
  id: string
  name: string
  avatar: string
  specialties: string[]
  rating: number
  experience: string
  hourlyRate: number
  availability: "Available" | "Busy" | "Offline"
  languages: string[]
  totalSessions: number
}

interface MentorsProps {
  onBackToDashboard: () => void
  userCoins: number
  onPointsSpent: (points: number) => void
}

export function Mentors({ onBackToDashboard, userCoins, onPointsSpent }: MentorsProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Mock problems detected from coding sessions
  const [detectedProblems] = useState<Problem[]>([
    {
      id: "1",
      type: "Syntax Error",
      description: "Missing semicolon in JavaScript function",
      language: "JavaScript",
      difficulty: "Easy",
      timestamp: "2 hours ago",
      code: "function greet(name) {\n  console.log('Hello ' + name)\n}",
      error: "SyntaxError: Unexpected token",
    },
    {
      id: "2",
      type: "Logic Error",
      description: "Infinite loop in for statement",
      language: "JavaScript",
      difficulty: "Medium",
      timestamp: "1 day ago",
      code: "for(let i = 0; i >= 0; i++) {\n  console.log(i)\n}",
    },
    {
      id: "3",
      type: "CSS Layout Issue",
      description: "Flexbox alignment not working as expected",
      language: "CSS",
      difficulty: "Medium",
      timestamp: "3 days ago",
      code: ".container {\n  display: flex;\n  align-items: center;\n}",
    },
    {
      id: "4",
      type: "React Hook Error",
      description: "useEffect dependency array causing infinite re-renders",
      language: "React",
      difficulty: "Hard",
      timestamp: "1 week ago",
      code: "useEffect(() => {\n  fetchData()\n}, [data])",
    },
  ])

  // Mock mentors with specialties matching problems
  const [mentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Alex Chen",
      avatar: "/minecraft-steve.png",
      specialties: ["JavaScript", "React", "Node.js"],
      rating: 4.9,
      experience: "5+ years",
      hourlyRate: 150,
      availability: "Available",
      languages: ["JavaScript", "TypeScript", "React"],
      totalSessions: 247,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/minecraft-alex.png",
      specialties: ["CSS", "UI/UX", "Frontend"],
      rating: 4.8,
      experience: "4+ years",
      hourlyRate: 120,
      availability: "Available",
      languages: ["CSS", "HTML", "JavaScript"],
      totalSessions: 189,
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      avatar: "/minecraft-villager.png",
      specialties: ["Python", "Backend", "Algorithms"],
      rating: 4.7,
      experience: "6+ years",
      hourlyRate: 180,
      availability: "Busy",
      languages: ["Python", "Java", "C++"],
      totalSessions: 312,
    },
    {
      id: "4",
      name: "Emma Wilson",
      avatar: "/minecraft-witch.png",
      specialties: ["React", "JavaScript", "Testing"],
      rating: 4.9,
      experience: "3+ years",
      hourlyRate: 130,
      availability: "Available",
      languages: ["JavaScript", "React", "Jest"],
      totalSessions: 156,
    },
  ])

  const getRecommendedMentors = (problem: Problem) => {
    return mentors
      .filter((mentor) =>
        mentor.specialties.some(
          (specialty) =>
            specialty.toLowerCase().includes(problem.language.toLowerCase()) ||
            problem.type.toLowerCase().includes(specialty.toLowerCase()),
        ),
      )
      .sort((a, b) => b.rating - a.rating)
  }

  const handleBookMentor = (mentor: Mentor, problem: Problem) => {
    setSelectedMentor(mentor)
    setSelectedProblem(problem)
    setShowConfirmation(true)
  }

  const confirmBooking = async () => {
    if (!selectedMentor || userCoins < selectedMentor.hourlyRate) return

    // Deduct points
    onPointsSpent(selectedMentor.hourlyRate)
    setShowConfirmation(false)

    // Start video call
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsVideoCallActive(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      // Fallback to mock video call
      setIsVideoCallActive(true)
    }
  }

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsVideoCallActive(false)
    setSelectedMentor(null)
    setSelectedProblem(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50 border-green-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Hard":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (isVideoCallActive && selectedMentor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Video Call Header */}
          <Card className="border-4 border-green-600 shadow-lg mb-6">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📹</span>
                  <div>
                    <div className="text-xl">Mentorship Session with {selectedMentor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Problem: {selectedProblem?.type} in {selectedProblem?.language}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                  🟢 Live
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Video Call Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Video Area */}
            <div className="lg:col-span-2">
              <Card className="border-4 border-stone-600 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    {/* Mentor's Video (Mock) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
                          <AvatarImage src={selectedMentor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedMentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xl font-bold">{selectedMentor.name}</div>
                        <div className="text-sm opacity-75">Senior Developer</div>
                      </div>
                    </div>

                    {/* User's Video */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                      <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                      {!stream && (
                        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-white text-sm">
                          Camera Off
                        </div>
                      )}
                    </div>

                    {/* Call Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        🎤 Mute
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        📹 Camera
                      </Button>
                      <Button variant="destructive" size="sm" onClick={endCall} className="bg-red-600 hover:bg-red-700">
                        📞 End Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Problem Details & Chat */}
            <div className="space-y-6">
              {/* Problem Code */}
              <Card className="border-4 border-stone-600 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Problem Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <pre>{selectedProblem?.code}</pre>
                  </div>
                  {selectedProblem?.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      {selectedProblem.error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Session Info */}
              <Card className="border-4 border-stone-600 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Session Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-bold">00:05:23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-bold text-orange-600">{selectedMentor.hourlyRate} coins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Balance:</span>
                    <span className="font-bold">{userCoins - selectedMentor.hourlyRate} coins</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
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
              ← Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">👨‍🏫</span>
              <div>
                <h1 className="text-2xl font-bold text-primary">Mentor Connect</h1>
                <p className="text-sm text-muted-foreground">Get expert help with your coding problems</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg border-2 border-primary/20">
            <span className="text-lg">🪙</span>
            <span className="font-bold text-primary">{userCoins}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Problems Analysis */}
        <Card className="border-4 border-stone-600 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              Detected Coding Problems
            </CardTitle>
            <CardDescription>
              Our AI has analyzed your coding sessions and identified areas where you might need help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {detectedProblems.map((problem) => (
                <Card
                  key={problem.id}
                  className={`border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedProblem?.id === problem.id ? "border-primary bg-primary/5" : "border-stone-300"
                  }`}
                  onClick={() => setSelectedProblem(problem)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="secondary">{problem.language}</Badge>
                          <span className="text-sm text-muted-foreground">{problem.timestamp}</span>
                        </div>
                        <h3 className="font-bold text-lg">{problem.type}</h3>
                        <p className="text-muted-foreground">{problem.description}</p>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                      <pre>{problem.code}</pre>
                    </div>
                    {problem.error && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                        <strong>Error:</strong> {problem.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Mentors */}
        {selectedProblem && (
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Recommended Mentors for "{selectedProblem.type}"
              </CardTitle>
              <CardDescription>
                Expert developers who specialize in {selectedProblem.language} and similar problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {getRecommendedMentors(selectedProblem).map((mentor) => (
                  <Card key={mentor.id} className="border-2 border-stone-300 hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16 border-2 border-stone-400">
                          <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{mentor.name}</h3>
                            <Badge
                              variant={mentor.availability === "Available" ? "default" : "secondary"}
                              className={mentor.availability === "Available" ? "bg-green-100 text-green-700" : ""}
                            >
                              {mentor.availability}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <span className="text-yellow-500">⭐</span>
                              <span className="font-bold ml-1">{mentor.rating}</span>
                            </div>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{mentor.experience}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{mentor.totalSessions} sessions</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {mentor.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-orange-600">{mentor.hourlyRate} coins/session</div>
                            <Button
                              onClick={() => handleBookMentor(mentor, selectedProblem)}
                              disabled={mentor.availability !== "Available" || userCoins < mentor.hourlyRate}
                              className="bg-primary hover:bg-primary/90"
                            >
                              {userCoins < mentor.hourlyRate ? "Insufficient Coins" : "Book Session"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedMentor && selectedProblem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="border-4 border-stone-600 shadow-xl max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Confirm Mentorship Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-stone-400">
                  <AvatarImage src={selectedMentor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedMentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{selectedMentor.name}</h3>
                <p className="text-muted-foreground">{selectedMentor.experience} experience</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <div className="flex justify-between items-center mb-2">
                  <span>Session Cost:</span>
                  <span className="font-bold text-orange-600">{selectedMentor.hourlyRate} coins</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Your Balance:</span>
                  <span className="font-bold">{userCoins} coins</span>
                </div>
                <hr className="my-2 border-orange-300" />
                <div className="flex justify-between items-center">
                  <span>After Session:</span>
                  <span className="font-bold">{userCoins - selectedMentor.hourlyRate} coins</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Problem:</strong> {selectedProblem.type} in {selectedProblem.language}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={confirmBooking} className="flex-1 bg-primary hover:bg-primary/90">
                  Start Video Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
