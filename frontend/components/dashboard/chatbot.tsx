"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your ResistAI assistant. I can help you interpret resistance patterns, suggest treatment protocols, or answer questions about antibiotic resistance. How can I help you today?"
  }
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))

    const responses = [
      "Based on the resistance patterns you mentioned, I would recommend considering a beta-lactam/beta-lactamase inhibitor combination. However, local antibiogram data should always be consulted.",
      "For MRSA infections, vancomycin remains a first-line option, but alternatives like daptomycin or linezolid may be considered based on the infection site and patient factors.",
      "The rising resistance to fluoroquinolones in E. coli is indeed concerning. Current guidelines suggest limiting their empiric use for uncomplicated UTIs.",
      "I'd be happy to help you interpret those culture results. Could you share the specific antibiotics tested and their MIC values?"
    ]

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)]
    }

    setIsTyping(false)
    setMessages(prev => [...prev, assistantMessage])
  }

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 z-50",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border-border rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between py-4 px-4 border-b border-border bg-card">
            <CardTitle className="flex items-center gap-2 text-base text-foreground">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              ResistAI Assistant
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-foreground rounded-bl-md border border-border"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3 border border-border">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about resistance patterns..."
                className="flex-1 h-10 bg-muted border-border rounded-xl"
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
