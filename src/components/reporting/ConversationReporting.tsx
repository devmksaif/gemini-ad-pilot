
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Brain } from "lucide-react";
import { useState } from "react";

export const ConversationReporting = () => {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([
    {
      type: "assistant",
      message: "Hi! I'm your AI reporting assistant. Ask me anything about your campaign performance.",
      timestamp: "2 minutes ago"
    },
    {
      type: "user", 
      message: "How are my Facebook campaigns performing this week?",
      timestamp: "1 minute ago"
    },
    {
      type: "assistant",
      message: "Your Facebook campaigns are performing well! Here's the summary:\n\n• 23% increase in conversions vs last week\n• ROAS improved from 3.2x to 4.1x\n• Best performing ad: Summer Dress Collection (ROAS: 5.2x)\n• Recommendation: Increase budget on top performer by 25%",
      timestamp: "1 minute ago"
    }
  ]);

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    // Add user question
    const newConversation = [
      ...conversation,
      {
        type: "user",
        message: question,
        timestamp: "Just now"
      }
    ];
    
    setConversation(newConversation);
    setQuestion("");
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        {
          type: "assistant",
          message: "Based on your latest data, I can see that... [AI would generate contextual response here]",
          timestamp: "Just now"
        }
      ]);
    }, 1000);
  };

  const quickQuestions = [
    "What's my best performing campaign?",
    "Why did my CPA increase yesterday?",
    "Show me audience insights",
    "Generate weekly report"
  ];

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          AI Reporting Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about your performance in natural language
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.type === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-3 h-3" />
                    <span className="text-xs font-medium">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {quickQuestions.map((q, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer text-xs"
                onClick={() => setQuestion(q)}
              >
                {q}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your campaigns..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <Button size="sm" onClick={handleAskQuestion}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
