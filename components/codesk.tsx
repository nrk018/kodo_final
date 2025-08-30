"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Upload, Download, Terminal, Code } from "lucide-react"

interface CodeskProps {
  onBackToDashboard: () => void
  onPointsEarned: (points: number) => void
  userCoins: number
  onCodeWritten: (language: string, lines: number) => void
}

export function Codesk({ onBackToDashboard, onPointsEarned, userCoins, onCodeWritten }: CodeskProps) {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Project</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        .btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #ff5252;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Hello Kōdo!</h1>
        <p>Welcome to my awesome web project!</p>
        <button class="btn" onclick="celebrate()">Click me!</button>
    </div>
    
    <script>
        function celebrate() {
            alert('🎉 Congratulations! You just ran your first code in CoDesk!');
            document.body.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
    </script>
</body>
</html>`)

  const [output, setOutput] = useState("Ready to run your code! 🚀")
  const [isRunning, setIsRunning] = useState(false)
  const [showUploadSuccess, setShowUploadSuccess] = useState(false)
  const [showSkillUpgrade, setShowSkillUpgrade] = useState(false)
  const [skillUpgradeInfo, setSkillUpgradeInfo] = useState({ language: "", level: 0 })
  const [language, setLanguage] = useState("html")
  const [previousCodeLength, setPreviousCodeLength] = useState(0)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const outputFrameRef = useRef<HTMLIFrameElement>(null)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)

    // Calculate lines written (only count increases)
    const newLines = newCode.split("\n").length
    const previousLines = code.split("\n").length

    if (newLines > previousLines) {
      const linesAdded = newLines - previousLines
      // Award XP for writing code (2 XP per line)
      onCodeWritten(getLanguageForXP(language), linesAdded)
    }
  }

  const getLanguageForXP = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      html: "HTML",
      javascript: "JavaScript",
      css: "CSS",
    }
    return languageMap[lang] || lang
  }

  const runCode = () => {
    setIsRunning(true)
    setOutput("🔄 Running your code...")

    const codeLines = code.split("\n").filter((line) => line.trim().length > 0).length
    onCodeWritten(getLanguageForXP(language), Math.max(1, Math.floor(codeLines / 10)))

    setTimeout(() => {
      try {
        if (language === "html") {
          // Run HTML code in iframe
          const iframe = outputFrameRef.current
          if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow?.document
            if (doc) {
              doc.open()
              doc.write(code)
              doc.close()
            }
          }
          setOutput("✅ HTML code executed successfully! Check the preview below.")
        } else if (language === "javascript") {
          // Simple JavaScript execution (limited for security)
          try {
            const result = eval(code)
            setOutput(`✅ JavaScript executed!\nResult: ${result}`)
          } catch (error) {
            setOutput(`❌ JavaScript Error: ${error}`)
          }
        } else if (language === "css") {
          setOutput("✅ CSS code ready! Add some HTML to see the styling in action.")
        }
      } catch (error) {
        setOutput(`❌ Error running code: ${error}`)
      }
      setIsRunning(false)
    }, 1500)
  }

  const uploadToGitHub = () => {
    // Simulate GitHub upload
    setOutput("📤 Uploading to GitHub...")

    setTimeout(() => {
      setOutput("✅ Successfully uploaded to GitHub! 🎉")
      setShowUploadSuccess(true)
      onPointsEarned(100) // Award 100 points for upload

      const codeLines = code.split("\n").filter((line) => line.trim().length > 0).length
      onCodeWritten(getLanguageForXP(language), Math.max(10, Math.floor(codeLines / 5)))

      // Hide success popup after 3 seconds
      setTimeout(() => {
        setShowUploadSuccess(false)
      }, 3000)
    }, 2000)
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `my-project.${language === "html" ? "html" : language === "javascript" ? "js" : "css"}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setOutput("📥 Code downloaded successfully!")
  }

  const codeTemplates = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
    javascript: `// Welcome to JavaScript!
console.log("Hello, Kōdo!");

function greet(name) {
    return \`Hello, \${name}! Welcome to coding!\`;
}

const message = greet("Crafter");
console.log(message);`,
    css: `/* Welcome to CSS! */
body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3em;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}`,
  }

  const switchLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(codeTemplates[newLanguage as keyof typeof codeTemplates])
    setOutput(`Switched to ${newLanguage.toUpperCase()} mode! 🔄`)
  }

  useEffect(() => {
    // Load Chatbase script
    const loadChatbase = () => {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = []
          }
          window.chatbase.q.push(args)
        }
        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: string) {
            if (prop === "q") {
              return target.q
            }
            return (...args: any[]) => target(prop, ...args)
          },
        })
      }

      const onLoad = () => {
        const script = document.createElement("script")
        script.src = "https://www.chatbase.co/embed.min.js"
        script.id = "NAdqFDXYYZS_HJ3vkQFhP"
        script.setAttribute("domain", "www.chatbase.co")
        document.body.appendChild(script)
      }

      if (document.readyState === "complete") {
        onLoad()
      } else {
        window.addEventListener("load", onLoad)
      }
    }

    loadChatbase()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900">
      {/* Header */}
      <header className="glass-card border-b-4 border-blue-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBackToDashboard}
              className="glass-button text-white border-blue-400 hover:border-blue-300 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <div className="text-3xl">💻</div>
              <div>
                <h1 className="text-2xl font-bold text-white font-minecraft">KODO™</h1>
                <p className="text-sm text-blue-200">Your coding workspace in KODO</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg border-2 border-blue-400">
            <span className="text-lg">🪙</span>
            <span className="font-bold text-white">{userCoins}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Tools & Templates */}
          <Card className="glass-card border-4 border-blue-500 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-minecraft">
                <Code className="w-5 h-5" />
                Coding Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language Selector */}
              <div>
                <h3 className="font-bold mb-2 text-white font-minecraft">Language</h3>
                <div className="grid gap-2">
                  {["html", "javascript", "css"].map((lang) => (
                    <Button
                      key={lang}
                      variant={language === lang ? "default" : "outline"}
                      onClick={() => switchLanguage(lang)}
                      className={`justify-start glass-button text-white ${
                        language === lang ? "bg-blue-600 border-blue-400" : "border-blue-400 hover:border-blue-300"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-bold mb-2 text-white font-minecraft">Actions</h3>
                <div className="grid gap-2">
                  <Button
                    onClick={runCode}
                    disabled={isRunning}
                    className="justify-start bg-green-600 hover:bg-green-700 border-2 border-green-400 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button
                    onClick={uploadToGitHub}
                    className="justify-start bg-purple-600 hover:bg-purple-700 border-2 border-purple-400 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload to GitHub
                  </Button>
                  <Button
                    onClick={downloadCode}
                    variant="outline"
                    className="justify-start glass-button text-white border-blue-400 hover:border-blue-300 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Code
                  </Button>
                </div>
              </div>

              {/* Chatbase AI Assistant widget below Download Code */}
              <div>
                <h3 className="font-bold mb-2 flex items-center gap-2 text-white font-minecraft">
                  <span className="text-lg">🤖</span>
                  AI Assistant
                </h3>
                <div className="glass-card p-3 rounded-lg border-2 border-blue-400">
                  <div className="text-center mb-2">
                    <div className="text-2xl mb-1">🧠</div>
                    <p className="text-xs font-bold text-white font-minecraft">KODO AI</p>
                    <p className="text-xs text-blue-200">Ask me anything about coding!</p>
                  </div>
                  {/* Chatbase widget container */}
                  <div
                    id="chatbase-widget-container"
                    className="min-h-[200px] rounded border border-blue-400 bg-black/20"
                  >
                    {/* Chatbase widget will be injected here */}
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="glass-card p-3 rounded-lg border-2 border-blue-400">
                <h4 className="font-bold text-white mb-1 font-minecraft">💡 Pro Tip</h4>
                <p className="text-xs text-blue-200">
                  Write code to gain XP and level up your skills! Upload to GitHub for bonus rewards! 🪙
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Main Editor Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Code Editor */}
            <Card className="glass-card border-4 border-blue-500 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white font-minecraft">
                    <Terminal className="w-5 h-5" />
                    Code Editor
                  </CardTitle>
                  <Badge variant="secondary" className="font-minecraft bg-blue-600 text-white border-blue-400">
                    {language.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm bg-black text-green-300 border-2 border-blue-500 rounded-lg resize-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Start coding here..."
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Terminal Output */}
            <Card className="glass-card border-4 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white font-minecraft">
                  <Terminal className="w-5 h-5" />
                  Terminal Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-300 p-4 rounded-lg border-2 border-blue-500 font-mono text-sm min-h-24">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-400">kodo@codesk:~$</span>
                    <span className="animate-pulse text-white">|</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-green-300">{output}</pre>
                </div>
              </CardContent>
            </Card>

            {/* HTML Preview */}
            {language === "html" && (
              <Card className="glass-card border-4 border-blue-500 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white font-minecraft">
                    <span className="text-xl">🌐</span>
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    ref={outputFrameRef}
                    className="w-full h-96 border-2 border-blue-500 rounded-lg bg-white"
                    title="Code Preview"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Upload Success Popup */}
      {showUploadSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="border-4 border-green-400 shadow-2xl glass-card animate-bounce">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2 font-minecraft">Points Received!</h2>
              <p className="text-blue-200 mb-4">
                Congratulations! You earned <strong className="text-white">100 coins</strong> for uploading your code to
                GitHub!
              </p>
              <div className="flex items-center justify-center gap-2 text-2xl">
                <span>🪙</span>
                <span className="font-bold text-green-400">+100</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

declare global {
  interface Window {
    chatbase: any
  }
}
