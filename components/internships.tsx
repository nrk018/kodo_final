"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Internship {
  id: string
  company: string
  logo: string
  position: string
  description: string
  location: string
  duration: string
  type: "Remote" | "On-site" | "Hybrid"
  requiredSkills: {
    [key: string]: number // skill: minimum level required
  }
  preferredSkills: string[]
  benefits: string[]
  applicationDeadline: string
  status: "Open" | "Applied" | "Under Review" | "Accepted" | "Rejected"
  difficulty: "Entry Level" | "Mid Level" | "Senior Level"
  stipend: string
  companyRating: number
  applicants: number
  maxApplicants: number
}

interface InternshipsProps {
  onBackToDashboard: () => void
  userStats: {
    languageStats: {
      [key: string]: {
        level: number
      }
    }
    canApplyInternships: boolean
  }
}

export function Internships({ onBackToDashboard, userStats }: InternshipsProps) {
  const [currentTab, setCurrentTab] = useState<"available" | "my-applications">("available")
  const [showApplicationForm, setShowApplicationForm] = useState<string | null>(null)

  const [internships, setInternships] = useState<Internship[]>([
    {
      id: "1",
      company: "TechCorp Solutions",
      logo: "🏢",
      position: "Frontend Developer Intern",
      description:
        "Join our dynamic frontend team to build cutting-edge web applications using React, TypeScript, and modern CSS frameworks. You'll work on real projects that impact thousands of users.",
      location: "San Francisco, CA",
      duration: "3 months",
      type: "Hybrid",
      requiredSkills: {
        JavaScript: 4,
        HTML: 3,
        CSS: 3,
      },
      preferredSkills: ["React", "TypeScript", "Git", "Responsive Design"],
      benefits: ["Mentorship Program", "Tech Stipend", "Flexible Hours", "Team Events"],
      applicationDeadline: "2024-02-15",
      status: "Open",
      difficulty: "Entry Level",
      stipend: "$2,000/month",
      companyRating: 4.5,
      applicants: 45,
      maxApplicants: 100,
    },
    {
      id: "2",
      company: "DataFlow Analytics",
      logo: "📊",
      position: "Full Stack Developer Intern",
      description:
        "Work with our engineering team to develop data visualization tools and APIs. Experience with both frontend and backend technologies required.",
      location: "Austin, TX",
      duration: "4 months",
      type: "Remote",
      requiredSkills: {
        JavaScript: 5,
        Python: 4,
        HTML: 4,
        CSS: 3,
      },
      preferredSkills: ["Node.js", "React", "PostgreSQL", "Docker"],
      benefits: ["Remote Work", "Learning Budget", "1:1 Mentoring", "Open Source Contributions"],
      applicationDeadline: "2024-02-20",
      status: "Open",
      difficulty: "Mid Level",
      stipend: "$2,500/month",
      companyRating: 4.8,
      applicants: 23,
      maxApplicants: 50,
    },
    {
      id: "3",
      company: "GameStudio Pro",
      logo: "🎮",
      position: "Game Developer Intern",
      description:
        "Create immersive gaming experiences using modern web technologies. Work on browser-based games and interactive applications.",
      location: "Seattle, WA",
      duration: "6 months",
      type: "On-site",
      requiredSkills: {
        JavaScript: 6,
        HTML: 4,
        CSS: 4,
      },
      preferredSkills: ["WebGL", "Three.js", "Game Physics", "Animation"],
      benefits: ["Game Library Access", "Hardware Allowance", "Conference Tickets", "Team Lunch"],
      applicationDeadline: "2024-02-10",
      status: "Applied",
      difficulty: "Mid Level",
      stipend: "$3,000/month",
      companyRating: 4.3,
      applicants: 67,
      maxApplicants: 80,
    },
    {
      id: "4",
      company: "AI Innovations Lab",
      logo: "🤖",
      position: "Machine Learning Intern",
      description:
        "Research and develop AI solutions using Python and modern ML frameworks. Work on cutting-edge projects in natural language processing.",
      location: "Boston, MA",
      duration: "5 months",
      type: "Hybrid",
      requiredSkills: {
        Python: 6,
        JavaScript: 3,
      },
      preferredSkills: ["TensorFlow", "PyTorch", "Data Analysis", "Statistics"],
      benefits: ["Research Publications", "GPU Access", "Conference Presentations", "Networking Events"],
      applicationDeadline: "2024-01-30",
      status: "Open",
      difficulty: "Senior Level",
      stipend: "$3,500/month",
      companyRating: 4.9,
      applicants: 12,
      maxApplicants: 25,
    },
    {
      id: "5",
      company: "StartupHub Inc",
      logo: "🚀",
      position: "Web Developer Intern",
      description:
        "Fast-paced startup environment where you'll wear multiple hats. Build features from conception to deployment using modern web stack.",
      location: "New York, NY",
      duration: "3 months",
      type: "Remote",
      requiredSkills: {
        JavaScript: 4,
        HTML: 4,
        CSS: 4,
      },
      preferredSkills: ["React", "Node.js", "MongoDB", "AWS"],
      benefits: ["Equity Options", "Flexible Schedule", "Startup Experience", "Direct CEO Access"],
      applicationDeadline: "2024-02-25",
      status: "Under Review",
      difficulty: "Entry Level",
      stipend: "$1,800/month",
      companyRating: 4.2,
      applicants: 89,
      maxApplicants: 120,
    },
  ])

  const availableInternships = internships.filter((internship) => internship.status === "Open")
  const myApplications = internships.filter((internship) => internship.status !== "Open")

  const canApplyForInternship = (internship: Internship) => {
    if (!userStats.canApplyInternships) return false

    return Object.entries(internship.requiredSkills).every(([skill, requiredLevel]) => {
      const userSkill = userStats.languageStats[skill]
      return userSkill && userSkill.level >= requiredLevel
    })
  }

  const getSkillMatchPercentage = (internship: Internship) => {
    const totalSkills = Object.keys(internship.requiredSkills).length
    const matchedSkills = Object.entries(internship.requiredSkills).filter(([skill, requiredLevel]) => {
      const userSkill = userStats.languageStats[skill]
      return userSkill && userSkill.level >= requiredLevel
    }).length

    return Math.round((matchedSkills / totalSkills) * 100)
  }

  const handleApplyForInternship = (internshipId: string) => {
    setInternships((prev) =>
      prev.map((internship) =>
        internship.id === internshipId
          ? { ...internship, status: "Applied" as const, applicants: internship.applicants + 1 }
          : internship,
      ),
    )
    setShowApplicationForm(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Entry Level":
        return "bg-green-100 text-green-800 border-green-300"
      case "Mid Level":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Senior Level":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Applied":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Under Review":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-300"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Remote":
        return "🏠"
      case "On-site":
        return "🏢"
      case "Hybrid":
        return "🔄"
      default:
        return "📍"
    }
  }

  if (!userStats.canApplyInternships) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
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
                  <span className="text-3xl">💼</span>
                  Internship Portal
                </h1>
                <p className="text-sm text-muted-foreground">Professional opportunities await</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="text-8xl mb-6">🔒</div>
              <h2 className="text-3xl font-bold mb-4">Internships Locked</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Reach Level 6 in any programming language to unlock internship opportunities!
              </p>
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200 mb-6">
                <h3 className="font-bold text-yellow-800 mb-2">Your Current Progress:</h3>
                <div className="space-y-2">
                  {Object.entries(userStats.languageStats).map(([language, stats]) => (
                    <div key={language} className="flex items-center justify-between">
                      <span className="font-medium">{language}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Level {stats.level}</span>
                        <Progress value={(stats.level / 6) * 100} className="w-24 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={onBackToDashboard} className="bg-primary hover:bg-primary/90 text-white">
                Continue Learning
              </Button>
            </CardContent>
          </Card>
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
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="text-3xl">💼</span>
                Internship Portal
              </h1>
              <p className="text-sm text-muted-foreground">Launch your professional career</p>
            </div>
          </div>
          <Badge variant="default" className="text-lg px-4 py-2 bg-purple-600">
            Expert Level Unlocked
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={currentTab === "available" ? "default" : "outline"}
            onClick={() => setCurrentTab("available")}
            className="border-2 border-stone-400"
          >
            Available Internships ({availableInternships.length})
          </Button>
          <Button
            variant={currentTab === "my-applications" ? "default" : "outline"}
            onClick={() => setCurrentTab("my-applications")}
            className="border-2 border-stone-400"
          >
            My Applications ({myApplications.length})
          </Button>
        </div>

        {/* Internships Grid */}
        <div className="grid gap-6">
          {currentTab === "available" &&
            availableInternships.map((internship) => {
              const skillMatch = getSkillMatchPercentage(internship)
              const canApply = canApplyForInternship(internship)

              return (
                <Card key={internship.id} className="border-4 border-stone-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{internship.logo}</div>
                        <div>
                          <CardTitle className="text-xl">{internship.position}</CardTitle>
                          <CardDescription className="text-lg font-semibold text-primary">
                            {internship.company}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">{internship.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getDifficultyColor(internship.difficulty)}>{internship.difficulty}</Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-300">{internship.stipend}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{getTypeIcon(internship.type)}</span>
                          <span>{internship.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{internship.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>⏰</span>
                          <span>{internship.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>⭐</span>
                          <span>{internship.companyRating}/5.0</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(internship.requiredSkills).map(([skill, level]) => {
                            const userSkill = userStats.languageStats[skill]
                            const hasSkill = userSkill && userSkill.level >= level
                            return (
                              <Badge
                                key={skill}
                                variant={hasSkill ? "default" : "secondary"}
                                className={hasSkill ? "bg-green-600" : "bg-red-100 text-red-800"}
                              >
                                {skill} Lv.{level}
                                {hasSkill ? " ✓" : " ✗"}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {internship.benefits.map((benefit) => (
                            <Badge key={benefit} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Skill Match</span>
                          <span>{skillMatch}%</span>
                        </div>
                        <Progress value={skillMatch} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <div>
                            Applications: {internship.applicants}/{internship.maxApplicants}
                          </div>
                          <div>Deadline: {internship.applicationDeadline}</div>
                        </div>
                        <Button
                          onClick={() => setShowApplicationForm(internship.id)}
                          disabled={!canApply || internship.applicants >= internship.maxApplicants}
                          className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                        >
                          {!canApply
                            ? "Skills Required"
                            : internship.applicants >= internship.maxApplicants
                              ? "Applications Closed"
                              : "Apply Now"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

          {currentTab === "my-applications" &&
            myApplications.map((internship) => (
              <Card key={internship.id} className="border-4 border-stone-600 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{internship.logo}</div>
                      <div>
                        <CardTitle className="text-xl">{internship.position}</CardTitle>
                        <CardDescription className="text-lg font-semibold text-primary">
                          {internship.company}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">{internship.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(internship.status)}>{internship.status}</Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-300">{internship.stipend}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{getTypeIcon(internship.type)}</span>
                        <span>{internship.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⭐</span>
                        <span>{internship.companyRating}/5.0</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Application Status</h4>
                      <p className="text-sm text-blue-700">
                        {internship.status === "Applied" && "Your application has been submitted successfully!"}
                        {internship.status === "Under Review" &&
                          "Your application is being reviewed by the hiring team."}
                        {internship.status === "Accepted" &&
                          "Congratulations! You've been accepted for this internship."}
                        {internship.status === "Rejected" &&
                          "Unfortunately, your application was not selected this time."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Empty States */}
        {currentTab === "available" && availableInternships.length === 0 && (
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No Available Internships</h3>
              <p className="text-muted-foreground">Check back later for new opportunities!</p>
            </CardContent>
          </Card>
        )}

        {currentTab === "my-applications" && myApplications.length === 0 && (
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-4">Apply to internships from the available tab to get started!</p>
              <Button
                onClick={() => setCurrentTab("available")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Browse Internships
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Application Confirmation Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="border-4 border-purple-600 shadow-2xl bg-white max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-center">Confirm Application</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl">💼</div>
              <p>Are you sure you want to apply for this internship?</p>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. Make sure you meet all the requirements.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleApplyForInternship(showApplicationForm)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowApplicationForm(null)}
                  className="flex-1 border-2 border-stone-400"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
