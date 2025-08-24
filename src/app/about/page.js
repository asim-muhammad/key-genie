"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LucideArrowLeft, LucideGithub, LucideShield, LucideZap, LucideHistory, LucideDownload, LucideMoon, LucideSun } from "lucide-react";
import { FaReddit, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import BuyMeCoffeeButton from "@/components/BuyMeCoffeeButton";
import { useEffect, useState } from "react";

export default function About() {
  const [theme, setTheme] = useState("white")

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) setTheme(savedTheme)
  }, [])
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm">
              <LucideArrowLeft className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline ml-2">Back to Generator</span>
              <span className="sm:hidden ml-1">Back</span>
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => {
            const value = theme === "white" ? "dark" : "white"
            setTheme(value)
            localStorage.setItem("theme", value)
          }}>
            {theme === "white" ? <LucideMoon className="h-4 w-4" /> : <LucideSun className="h-4 w-4" />}
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold">About Key Genie</h1>
          <p className="text-base sm:text-xl text-muted-foreground px-4">Your trusted password generation companion</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideShield className="h-5 w-5" />
                Security First
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Key Genie uses the `secure-random-password` npm library, which provides cryptographically secure 
                random number generation through Node.js&apos;s crypto module or the browser&apos;s Web Crypto API. 
                All password generation happens locally in your browser - no data is ever sent to external servers.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Client-side only</Badge>
                <Badge variant="secondary">No tracking</Badge>
                <Badge variant="secondary">Open source</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideZap className="h-5 w-5" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Multiple password types (Random, Memorable, PIN)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Real-time strength indicator
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Customizable character sets
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Password history with export
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Dark/Light theme support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Key Genie?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              In today&apos;s digital world, password security is more important than ever. Key Genie was built to make 
              generating strong, unique passwords as easy as possible while maintaining the highest security standards.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center space-y-2">
                <LucideShield className="h-8 w-8 mx-auto text-green-500" />
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Uses cryptographically secure random number generation
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <LucideHistory className="h-8 w-8 mx-auto text-blue-500" />
                <h3 className="font-semibold">Convenient</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of generated passwords with built-in history
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <LucideDownload className="h-8 w-8 mx-auto text-purple-500" />
                <h3 className="font-semibold">Exportable</h3>
                <p className="text-sm text-muted-foreground">
                  Export your password history in CSV or JSON format
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-center sm:text-left">Built With</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Next.js 15 with React 19</li>
                  <li>• shadcn/ui component library</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Lucide React icons</li>
                  <li>• secure-random-password library</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-center sm:text-left">Password Generation</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Uses secure-random-password v0.2.3 library</li>
                  <li>• CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)</li>
                  <li>• Custom strength calculation algorithm</li>
                  <li>• Three generation modes: Random, Memorable, PIN</li>
                  <li>• No external API dependencies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support This Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Key Genie is a free, open-source project. If you find it useful, consider supporting its development!
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                <BuyMeCoffeeButton username="asimdevprov" className="w-full sm:w-auto" />
                
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <a 
                    href="https://github.com/asim-muhammad/key-genie" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <LucideGithub className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <p className="text-sm font-semibold text-center">Connect with the Developer</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-sm">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a 
                      href="https://www.reddit.com/user/Round-Surround6409/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FaReddit className="h-4 w-4" />
                      Reddit
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a 
                      href="https://www.instagram.com/dev_muhammad_asim/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FaInstagram className="h-4 w-4" />
                      Instagram
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a 
                      href="https://www.linkedin.com/in/muhammad-asim-63057535a/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Your support helps maintain and improve Key Genie for everyone!
            </p>
          </CardContent>
        </Card>

        <Separator />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Key Genie. Built with ❤️ by Asim for password security.</p>
          <p className="mt-1">
            This is a client-side application - your passwords never leave your device.
          </p>
         
        </div>
      </div>
    </div>
  );
}
