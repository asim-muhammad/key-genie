"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LucideCheck, LucideCopy, LucideMoon, LucideSun, LucideRefreshCw, LucideDownload, LucideHistory, LucideTrash2, LucideInfo } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import BuyMeCoffeeButton from "@/components/BuyMeCoffeeButton";
import Link from "next/link";
const ps = require('secure-random-password');

export default function Home() {

  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [config, setConfig] = useState({
    includeNumbers: false,
    includeSymbols: false,
    excludeSimilar: true,
    autoGenerate: true
  })
  const [length, setLength] = useState(12)
  const [theme, setTheme] = useState("white")
  const [passwordHistory, setPasswordHistory] = useState([])
  const [activeTab, setActiveTab] = useState('random')
  const [strength, setStrength] = useState(0)
  const [strengthLabel, setStrengthLabel] = useState('Weak')

  const copyInterval = useRef(null);

  const generateRandomPassword = () => {
    const configuration = {
      length,
      characters: [ps.upper, ps.lower]
    }

    if (config.includeNumbers) configuration.characters.push(ps.digits)
    if (config.includeSymbols) configuration.characters.push(ps.copyableSymbols)
    if (config.excludeSimilar) {
      configuration.characters = configuration.characters.map(charset => 
        charset.replace(/[0O1lI]/g, '')
      )
    }

    return ps.randomPassword(configuration)
  }

  const generateMemorablePassword = () => {
    const words = ['apple', 'brave', 'cloud', 'dance', 'eagle', 'flame', 'grace', 'happy', 'ivory', 'jokes', 'knife', 'light', 'magic', 'noble', 'ocean', 'peace', 'quick', 'river', 'smile', 'trust']
    const separators = ['-', '_', '.', '!']
    const numWords = Math.max(2, Math.floor(length / 6))
    
    let memorable = []
    for (let i = 0; i < numWords; i++) {
      memorable.push(words[Math.floor(Math.random() * words.length)])
    }
    
    let result = memorable.join(separators[Math.floor(Math.random() * separators.length)])
    
    if (config.includeNumbers) {
      result += Math.floor(Math.random() * 999)
    }
    
    return result.slice(0, length)
  }

  const generatePIN = () => {
    return Array.from({ length: Math.min(length, 20) }, () => 
      Math.floor(Math.random() * 10)
    ).join('')
  }

  const calculateStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 10
    if (/[a-z]/.test(pwd)) score += 20
    if (/[A-Z]/.test(pwd)) score += 20
    if (/[0-9]/.test(pwd)) score += 15
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 15
    
    return Math.min(100, score)
  }

  const getStrengthLabel = (score) => {
    if (score < 30) return 'Weak'
    if (score < 60) return 'Fair'
    if (score < 80) return 'Good'
    return 'Strong'
  }

  const generatePassword = useCallback(() => {
    let newPassword
    
    switch (activeTab) {
      case 'memorable':
        newPassword = generateMemorablePassword()
        break
      case 'pin':
        newPassword = generatePIN()
        break
      default:
        newPassword = generateRandomPassword()
    }
    
    const strengthScore = calculateStrength(newPassword)
    setStrength(strengthScore)
    setStrengthLabel(getStrengthLabel(strengthScore))
    
    return newPassword
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, length, config.includeNumbers, config.includeSymbols, config.excludeSimilar])

  const handlePasswordGenerate = useCallback(() => {
    const newPassword = generatePassword()
    setPassword(newPassword)
    
    setPasswordHistory(prev => {
      const newHistory = [{ password: newPassword, timestamp: new Date().toLocaleString(), type: activeTab }, ...prev]
      return newHistory.slice(0, 10) // Keep only last 10
    })
  }, [generatePassword, activeTab])

  const copyPassword = async (e) => {
    try {
      await navigator.clipboard.writeText(password)
      toast.success("Password copied")

      setCopied(true)

      if (copyInterval) {
        clearTimeout(copyInterval.current)
      }

      copyInterval.current = setTimeout(() => {
        setCopied(false)
        copyInterval.current = null
      }, 4000);


    } catch (err) {
      console.log(err);
      toast.warning("Failed to copy")
    }
  }

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const exportPasswords = (format) => {
    if (passwordHistory.length === 0) {
      toast.warning('No passwords to export')
      return
    }
    
    let content, filename
    
    if (format === 'csv') {
      content = 'Password,Type,Generated At\n' + 
        passwordHistory.map(p => `"${p.password}","${p.type}","${p.timestamp}"`).join('\n')
      filename = 'passwords.csv'
    } else {
      content = JSON.stringify(passwordHistory, null, 2)
      filename = 'passwords.json'
    }
    
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success(`Exported ${passwordHistory.length} passwords as ${format.toUpperCase()}`)
  }

  const clearHistory = () => {
    setPasswordHistory([])
    toast.success('Password history cleared')
  }

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const savedHistory = localStorage.getItem("passwordHistory")
    const savedConfig = localStorage.getItem("passwordConfig")
    
    if (savedTheme) setTheme(savedTheme)
    if (savedHistory) setPasswordHistory(JSON.parse(savedHistory))
    if (savedConfig) setConfig(JSON.parse(savedConfig))
    
    // Generate initial password only once on mount
    const generateInitialPassword = () => {
      let newPassword
      switch ('random') { // Default to random
        case 'memorable':
          const words = ['apple', 'brave', 'cloud', 'dance', 'eagle']
          newPassword = words.slice(0, 2).join('-')
          break
        case 'pin':
          newPassword = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('')
          break
        default:
          newPassword = ps.randomPassword({ length: 12, characters: [ps.upper, ps.lower] })
      }
      
      setPassword(newPassword)
      const strengthScore = calculateStrength(newPassword)
      setStrength(strengthScore)
      setStrengthLabel(getStrengthLabel(strengthScore))
    }
    
    setTimeout(generateInitialPassword, 100)
  }, []) // Only run once on mount

  useEffect(() => {
    localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory))
  }, [passwordHistory])

  useEffect(() => {
    localStorage.setItem("passwordConfig", JSON.stringify(config))
  }, [config])

  useEffect(() => {
    if (config.autoGenerate) {
      const newPassword = generatePassword()
      setPassword(newPassword)
    }
  }, [length, config.includeNumbers, config.includeSymbols, config.excludeSimilar, activeTab, config.autoGenerate, generatePassword])

  useEffect(() => {
    if (password) {
      const strengthScore = calculateStrength(password)
      setStrength(strengthScore)
      setStrengthLabel(getStrengthLabel(strengthScore))
    }
  }, [password])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex justify-end items-center p-3 sm:p-4 gap-3">
          <div className="flex items-end">
            <Link href="/about">
              <Button variant="outline">
                <LucideInfo className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <Button variant="outline" onClick={() => {
            const value = theme === "white" ? "dark" : "white"
            setTheme(value)
            localStorage.setItem("theme", value)
          }}>
            {theme === "white" ? <LucideMoon className="h-4 w-4" /> : <LucideSun className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Key Genie</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">Generate secure passwords with advanced customization</p>
        </div>
        
        <div className="sm:hidden flex justify-center">
          <BuyMeCoffeeButton size="sm" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="random" className="text-xs sm:text-sm py-2">
              <span className="hidden sm:inline">Random Password</span>
              <span className="sm:hidden">Random</span>
            </TabsTrigger>
            <TabsTrigger value="memorable" className="text-xs sm:text-sm py-2">
              <span className="hidden sm:inline">Memorable</span>
              <span className="sm:hidden">Words</span>
            </TabsTrigger>
            <TabsTrigger value="pin" className="text-xs sm:text-sm py-2">PIN</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-4 sm:pt-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    className="flex-1 font-mono text-sm sm:text-lg break-all" 
                    readOnly 
                    placeholder="Generated password will appear here" 
                    value={password} 
                  />
                  <div className="flex gap-2 sm:flex-col lg:flex-row">
                    <Button onClick={copyPassword} variant="outline" size="sm" className="flex-1 sm:flex-none">
                      {copied ? <LucideCheck className="h-4 w-4" /> : <LucideCopy className="h-4 w-4" />}
                      <span className="ml-2 sm:hidden">Copy</span>
                    </Button>
                    <Button onClick={handlePasswordGenerate} variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <LucideRefreshCw className="h-4 w-4" />
                      <span className="ml-2 sm:hidden">Generate</span>
                    </Button>
                  </div>
                </div>

                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Password Strength</Label>
                      <Badge variant={strength < 30 ? 'destructive' : strength < 60 ? 'secondary' : strength < 80 ? 'default' : 'success'}>
                        {strengthLabel}
                      </Badge>
                    </div>
                    <Progress value={strength} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <TabsContent value="random" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="length">Length: {length}</Label>
                  </div>
                  <Slider
                    id="length"
                    min={4}
                    max={128}
                    value={[length]}
                    step={1}
                    onValueChange={(val) => setLength(val[0])}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="numbers" 
                      checked={config.includeNumbers}
                      onCheckedChange={(checked) => handleConfigChange('includeNumbers', checked)}
                    />
                    <Label htmlFor="numbers" className="text-sm sm:text-base">Include Numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="symbols" 
                      checked={config.includeSymbols}
                      onCheckedChange={(checked) => handleConfigChange('includeSymbols', checked)}
                    />
                    <Label htmlFor="symbols" className="text-sm sm:text-base">Include Symbols</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="excludeSimilar" 
                      checked={config.excludeSimilar}
                      onCheckedChange={(checked) => handleConfigChange('excludeSimilar', checked)}
                    />
                    <Label htmlFor="excludeSimilar" className="text-sm sm:text-base">
                      <span className="hidden sm:inline">Exclude Similar (0, O, 1, l)</span>
                      <span className="sm:hidden">Exclude Similar Chars</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="autoGenerate" 
                      checked={config.autoGenerate}
                      onCheckedChange={(checked) => handleConfigChange('autoGenerate', checked)}
                    />
                    <Label htmlFor="autoGenerate" className="text-sm sm:text-base">
                      <span className="hidden sm:inline">Auto-generate on change</span>
                      <span className="sm:hidden">Auto-generate</span>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memorable" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Memorable Password Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="length-memorable">Approximate Length: {length}</Label>
                  </div>
                  <Slider
                    id="length-memorable"
                    min={8}
                    max={50}
                    value={[length]}
                    step={1}
                    onValueChange={(val) => setLength(val[0])}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="numbers-memorable" 
                    checked={config.includeNumbers}
                    onCheckedChange={(checked) => handleConfigChange('includeNumbers', checked)}
                  />
                  <Label htmlFor="numbers-memorable">Add numbers at end</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PIN Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="length-pin">PIN Length: {length}</Label>
                  </div>
                  <Slider
                    id="length-pin"
                    min={4}
                    max={20}
                    value={[length]}
                    step={1}
                    onValueChange={(val) => setLength(val[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {passwordHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <LucideHistory className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-base sm:text-lg">Password History</span>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <Button variant="outline" size="sm" onClick={() => exportPasswords('csv')}>
                    <LucideDownload className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">CSV</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportPasswords('json')}>
                    <LucideDownload className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">JSON</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearHistory}>
                    <LucideTrash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline ml-2">Clear</span>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {passwordHistory.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border rounded text-sm">
                    <div className="font-mono flex-1 break-all text-xs sm:text-sm">{item.password}</div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                        <span className="text-xs text-muted-foreground hidden sm:inline">{item.timestamp}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          navigator.clipboard.writeText(item.password)
                          toast.success('Password copied')
                        }}
                      >
                        <LucideCopy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}