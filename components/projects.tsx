"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Project {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  requiredSkills: string[]
  teamSize: number
  currentMembers: number
  leader: string
  status: "Open" | "In Progress" | "Completed"
  progress: number
  duration: string
  rewards: {
    xp: number
    coins: number
    skills: string[]
  }
  isJoined: boolean
}

interface ProjectsProps {
  onBackToDashboard: () => void
  userStats: {
    languageStats: {
      [key: string]: {
        level: number
      }
    }
    canStartProjects: boolean
  }
}

export function Projects({ onBackToDashboard, userStats }: ProjectsProps) {
  const [currentTab, setCurrentTab] = useState<"browse" | "my-projects" | "create">("browse")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "Web Development",
    difficulty: "Beginner" as const,
    requiredSkills: [] as string[],
    teamSize: 3,
    duration: "2 weeks",
  })

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "🌟 E-commerce Website",
      description:
        "Build a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      category: "Web Development",
      difficulty: "Advanced",
      requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
      teamSize: 5,
      currentMembers: 3,
      leader: "CodeMaster_Alex",
      status: "Open",
      progress: 25,
      duration: "8 weeks",
      rewards: {
        xp: 500,
        coins: 300,
        skills: ["Full-Stack Development", "Database Design", "API Development"],
      },
      isJoined: false,
    },
    {
      id: "2",
      title: "🎮 Minecraft Clone Game",
      description:
        "Create a simplified Minecraft-style game using JavaScript and WebGL. Learn 3D graphics, game physics, and procedural generation.",
      category: "Game Development",
      difficulty: "Advanced",
      requiredSkills: ["JavaScript", "WebGL", "3D Graphics"],
      teamSize: 4,
      currentMembers: 2,
      leader: "GameDev_Sarah",
      status: "Open",
      progress: 10,
      duration: "12 weeks",
      rewards: {
        xp: 800,
        coins: 500,
        skills: ["Game Development", "3D Graphics", "Physics Programming"],
      },
      isJoined: false,
    },
    {
      id: "3",
      title: "📱 Mobile Task Manager",
      description:
        "Develop a cross-platform mobile app for task management using React Native. Include features like notifications, offline sync, and team collaboration.",
      category: "Mobile Development",
      difficulty: "Intermediate",
      requiredSkills: ["JavaScript", "React", "React Native"],
      teamSize: 3,
      currentMembers: 1,
      leader: "MobileDev_Mike",
      status: "Open",
      progress: 0,
      duration: "6 weeks",
      rewards: {
        xp: 400,
        coins: 250,
        skills: ["Mobile Development", "Cross-Platform Development", "UI/UX Design"],
      },
      isJoined: true,
    },
    {
      id: "4",
      title: "🤖 AI Chatbot Assistant",
      description:
        "Build an intelligent chatbot using Python, natural language processing, and machine learning. Integrate with popular messaging platforms.",
      category: "AI/ML",
      difficulty: "Advanced",
      requiredSkills: ["Python", "Machine Learning", "NLP"],
      teamSize: 4,
      currentMembers: 4,
      leader: "AI_Researcher_Emma",
      status: "In Progress",
      progress: 60,
      duration: "10 weeks",
      rewards: {
        xp: 700,
        coins: 400,
        skills: ["Artificial Intelligence", "Natural Language Processing", "Machine Learning"],
      },
      isJoined: false,
    },
    {
      id: "5",
      title: "🎨 Digital Art Portfolio",
      description:
        "Create a stunning portfolio website for digital artists with image galleries, animations, and interactive elements using modern web technologies.",
      category: "Web Development",
      difficulty: "Beginner",
      requiredSkills: ["HTML", "CSS", "JavaScript"],
      teamSize: 2,
      currentMembers: 2,
      leader: "WebDesigner_Luna",
      status: "Completed",
      progress: 100,
      duration: "4 weeks",
      rewards: {
        xp: 200,
        coins: 150,
        skills: ["Web Design", "CSS Animations", "Portfolio Development"],
      },
      isJoined: true,
    },
  ])

  const myProjects = projects.filter((project) => project.isJoined)
  const availableProjects = projects.filter((project) => !project.isJoined && project.status === "Open")

  const handleJoinProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, isJoined: true, currentMembers: project.currentMembers + 1 } : project,
      ),
    )
  }

  const handleLeaveProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, isJoined: false, currentMembers: Math.max(1, project.currentMembers - 1) }
          : project,
      ),
    )
  }

  const handleCreateProject = () => {
    if (!newProject.title || !newProject.description) return

    const project: Project = {
      id: Date.now().toString(),
      title: `🚀 ${newProject.title}`,
      description: newProject.description,
      category: newProject.category,
      difficulty: newProject.difficulty,
      requiredSkills: newProject.requiredSkills,
      teamSize: newProject.teamSize,
      currentMembers: 1,
      leader: "You",
      status: "Open",
      progress: 0,
      duration: newProject.duration,
      rewards: {
        xp: newProject.difficulty === "Advanced" ? 600 : newProject.difficulty === "Intermediate" ? 400 : 200,
        coins: newProject.difficulty === "Advanced" ? 350 : newProject.difficulty === "Intermediate" ? 250 : 150,
        skills: ["Project Leadership", "Team Management"],
      },
      isJoined: true,
    }

    setProjects((prev) => [project, ...prev])
    setNewProject({
      title: "",
      description: "",
      category: "Web Development",
      difficulty: "Beginner",
      requiredSkills: [],
      teamSize: 3,
      duration: "2 weeks",
    })
    setShowCreateForm(false)
    setCurrentTab("my-projects")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const canJoinProject = (project: Project) => {
    return project.requiredSkills.every((skill) => {
      const userSkill = userStats.languageStats[skill]
      return (
        userSkill &&
        userSkill.level >= (project.difficulty === "Advanced" ? 3 : project.difficulty === "Intermediate" ? 2 : 1)
      )
    })
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
                <span className="text-3xl">🚀</span>
                Projects Hub
              </h1>
              <p className="text-sm text-muted-foreground">Collaborate on exciting coding projects</p>
            </div>
          </div>
          {userStats.canStartProjects && (
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-700"
            >
              + Start New Project
            </Button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={currentTab === "browse" ? "default" : "outline"}
            onClick={() => setCurrentTab("browse")}
            className="border-2 border-stone-400"
          >
            Browse Projects ({availableProjects.length})
          </Button>
          <Button
            variant={currentTab === "my-projects" ? "default" : "outline"}
            onClick={() => setCurrentTab("my-projects")}
            className="border-2 border-stone-400"
          >
            My Projects ({myProjects.length})
          </Button>
        </div>

        {/* Create Project Form */}
        {showCreateForm && (
          <Card className="border-4 border-stone-600 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Create New Project
              </CardTitle>
              <CardDescription>Start your own coding project and lead a team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Enter project title"
                    className="border-2 border-stone-300"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full p-2 border-2 border-stone-300 rounded-md"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Game Development">Game Development</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe your project in detail"
                  className="w-full p-2 border-2 border-stone-300 rounded-md h-24 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    value={newProject.difficulty}
                    onChange={(e) => setNewProject({ ...newProject, difficulty: e.target.value as any })}
                    className="w-full p-2 border-2 border-stone-300 rounded-md"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="2"
                    max="10"
                    value={newProject.teamSize}
                    onChange={(e) => setNewProject({ ...newProject, teamSize: Number.parseInt(e.target.value) })}
                    className="border-2 border-stone-300"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <select
                    id="duration"
                    value={newProject.duration}
                    onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                    className="w-full p-2 border-2 border-stone-300 rounded-md"
                  >
                    <option value="2 weeks">2 weeks</option>
                    <option value="4 weeks">4 weeks</option>
                    <option value="6 weeks">6 weeks</option>
                    <option value="8 weeks">8 weeks</option>
                    <option value="12 weeks">12 weeks</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleCreateProject} className="bg-green-600 hover:bg-green-700 text-white">
                  Create Project
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="border-2 border-stone-400"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Projects Grid */}
        <div className="grid gap-6">
          {currentTab === "browse" &&
            availableProjects.map((project) => (
              <Card key={project.id} className="border-4 border-stone-600 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-2">{project.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Team:</span> {project.currentMembers}/{project.teamSize}
                      </div>
                      <div>
                        <span className="font-semibold">Duration:</span> {project.duration}
                      </div>
                      <div>
                        <span className="font-semibold">Leader:</span> {project.leader}
                      </div>
                      <div>
                        <span className="font-semibold">Category:</span> {project.category}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Rewards: +{project.rewards.xp} XP, +{project.rewards.coins} coins
                      </div>
                      <Button
                        onClick={() => handleJoinProject(project.id)}
                        disabled={!canJoinProject(project) || project.currentMembers >= project.teamSize}
                        className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                      >
                        {!canJoinProject(project)
                          ? "Skills Required"
                          : project.currentMembers >= project.teamSize
                            ? "Team Full"
                            : "Join Project"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {currentTab === "my-projects" &&
            myProjects.map((project) => (
              <Card key={project.id} className="border-4 border-stone-600 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-2">{project.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      {project.leader === "You" && (
                        <Badge variant="default" className="bg-purple-600">
                          Leader
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Team:</span> {project.currentMembers}/{project.teamSize}
                      </div>
                      <div>
                        <span className="font-semibold">Duration:</span> {project.duration}
                      </div>
                      <div>
                        <span className="font-semibold">Leader:</span> {project.leader}
                      </div>
                      <div>
                        <span className="font-semibold">Category:</span> {project.category}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Rewards: +{project.rewards.xp} XP, +{project.rewards.coins} coins
                      </div>
                      <div className="flex gap-2">
                        {project.status === "Open" && project.leader !== "You" && (
                          <Button
                            variant="outline"
                            onClick={() => handleLeaveProject(project.id)}
                            className="border-2 border-red-400 text-red-600 hover:bg-red-50"
                          >
                            Leave Project
                          </Button>
                        )}
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          {project.leader === "You" ? "Manage Project" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Empty States */}
        {currentTab === "browse" && availableProjects.length === 0 && (
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No Available Projects</h3>
              <p className="text-muted-foreground">Check back later for new project opportunities!</p>
            </CardContent>
          </Card>
        )}

        {currentTab === "my-projects" && myProjects.length === 0 && (
          <Card className="border-4 border-stone-600 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">
                Join a project from the browse tab or create your own to get started!
              </p>
              <Button onClick={() => setCurrentTab("browse")} className="bg-blue-600 hover:bg-blue-700 text-white">
                Browse Projects
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
