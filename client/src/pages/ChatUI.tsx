import { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AGENTS, AGENT_PROFILES, routeMessage, analyzeMessage } from '@/lib/utils';

// Message type definition
interface Message {
  role: string;
  content: string;
  status: 'processing' | 'verified';
  timestamp: string;
}

// Sanitization Layer
const cleanMessage = (content: string) => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    FORBID_ATTR: ['style', 'onerror']
  });
};

// Icon components
const Loader = () => (
  <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const CheckCircle = () => (
  <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Agent Card Component
const AgentCard = ({ 
  active, 
  onClick, 
  avatar, 
  name, 
  specialty 
}: { 
  active: boolean; 
  onClick: () => void; 
  avatar: string; 
  name: string; 
  specialty?: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors transform hover:-translate-y-0.5 ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-gray-100 hover:bg-gray-200'
    }`}
  >
    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
      active
        ? 'bg-white text-blue-600' 
        : name === 'Dr. Neuro' 
          ? 'bg-blue-500 text-white'
          : 'bg-green-500 text-white'
    }`}>
      {avatar}
    </div>
    <div>
      <div className="text-sm font-medium">{name}</div>
      {specialty && <div className="text-xs opacity-80">{specialty}</div>}
    </div>
  </button>
);

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeAgent, setActiveAgent] = useState<string | null>('doctor');
  const [activeTyping, setActiveTyping] = useState<Record<string, boolean>>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  // Analytics tracking (simple)
  const analytics = useRef({
    responseTimes: {
      doctor: [] as number[],
      analyst: [] as number[]
    },
    messageLengths: {
      user: 0,
      doctor: 0,
      analyst: 0
    },
    satisfactionRatings: [] as number[]
  });

  // Track interaction helper
  function trackInteraction(message: Message) {
    if (message.role in analytics.current.messageLengths) {
      analytics.current.messageLengths[message.role as keyof typeof analytics.current.messageLengths] += message.content.length;
    }
    // In production, would send analytics event to server here
  }

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim()) return;
    const cleaned = cleanMessage(input);
    const newUserMessage = {
      role: 'user',
      content: cleaned,
      status: 'verified' as const,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);
    trackInteraction(newUserMessage);
    setInput('');

    // Show typing indicators for all agents during processing
    const agentKeys = Object.keys(AGENT_PROFILES) as Array<keyof typeof AGENT_PROFILES>;
    setActiveTyping(agentKeys.reduce((acc, a) => ({ ...acc, [a]: true }), {}));

    // Use routeMessage to classify
    const analysis = await routeMessage(cleaned);

    // Simulate agent analysis
    const workerResult = await analyzeMessage({
      text: cleaned,
      context: {}, // Could pass context data here
      agents: agentKeys
    });

    // Hide typing indicators
    setActiveTyping({});

    // Append responses from agents
    setMessages(prev => [...prev, ...workerResult.responses]);

    // Track analytics for responses
    workerResult.responses.forEach(trackInteraction);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col max-w-4xl mx-auto p-4 h-screen gap-4">
        {/* Header with title and agent selection */}
        <header className="bg-white rounded-lg shadow p-4">
          <h1 className="text-lg font-semibold text-gray-800 mb-3">Multi-Agent Chat</h1>
          
          {/* Interactive Agent Cards */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(AGENTS).filter(([id]) => id !== 'user').map(([id, agent]) => (
              <AgentCard
                key={id}
                active={activeAgent === id}
                onClick={() => setActiveAgent(id)}
                avatar={agent.avatar}
                name={agent.name}
                specialty={AGENT_PROFILES[id as keyof typeof AGENT_PROFILES]?.specialty}
              />
            ))}
          </div>
        </header>

        {/* Message List */}
        <div 
          ref={chatContainerRef} 
          className="h-[400px] overflow-auto relative border rounded-lg bg-white shadow-inner"
        >
          <div className="p-4 space-y-4">
            {messages.map((msg, index) => {
              const agent = AGENTS[msg.role as keyof typeof AGENTS] || AGENTS.user;
              const isUser = msg.role === 'user';
              
              return (
                <div key={index} className="px-4 py-2">
                  <div className={`flex ${isUser ? '' : 'justify-end'}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`flex max-w-[80%] gap-3 p-3 rounded-lg ${agent.color} hover:shadow-lg transition-shadow`}>
                          <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                            isUser 
                              ? 'bg-gray-300 text-gray-700' 
                              : msg.role === 'doctor'
                                ? 'bg-white text-blue-600'
                                : 'bg-white text-green-500'
                          } text-xl`}>
                            {agent.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex gap-2 items-baseline">
                              <span className="font-semibold">{agent.name}</span>
                              {!isUser && (
                                <span className={`text-xs ${
                                  msg.role === 'doctor' ? 'text-blue-100' : 'text-green-100'
                                }`}>
                                  {AGENT_PROFILES[msg.role as keyof typeof AGENT_PROFILES]?.specialty}
                                </span>
                              )}
                            </div>
                            <div 
                              className="mt-1 whitespace-pre-wrap break-words" 
                              dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                          </div>
                          
                          {/* Message Status Badge */}
                          {!isUser && (
                            <div className="absolute top-2 right-2">
                              {msg.status === 'processing' && (
                                <Badge variant="processing" className="flex items-center">
                                  <Loader /> กำลังประมวลผล
                                </Badge>
                              )}
                              {msg.status === 'verified' && (
                                <Badge variant="verified" className="flex items-center">
                                  <CheckCircle /> ยืนยันแล้ว
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      {!isUser && (
                        <TooltipContent side="left">
                          <p>ลักษณะการตอบกลับ: {AGENT_PROFILES[msg.role as keyof typeof AGENT_PROFILES]?.tone}</p>
                          <p>เวลาตอบกลับเฉลี่ย: {AGENT_PROFILES[msg.role as keyof typeof AGENT_PROFILES]?.responseTime}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Typing indicators */}
        <div className="flex gap-2 h-6">
          {Object.entries(activeTyping).map(([agentId, isTyping]) => (
            isTyping && (
              <div key={agentId} className="flex items-center gap-1 text-sm text-gray-500">
                <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  agentId === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {AGENTS[agentId as keyof typeof AGENTS]?.avatar}
                </span>
                <span>
                  กำลังพิมพ์
                  <span className="inline-flex ml-1">
                    <span className="dot-flashing"></span>
                  </span>
                </span>
              </div>
            )
          ))}
        </div>

        {/* Input area */}
        <div className="bg-white rounded-lg shadow p-3">
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="พิมพ์ข้อความที่นี่..."
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="กรอกข้อความ"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50"
              disabled={!input.trim()}
            >
              ส่ง
            </button>
          </form>
        </div>

        {/* Additional context information */}
        <div className="mt-1 text-xs text-gray-500 px-2">
          <div className="flex justify-between">
            <span>เวลาตอบกลับเฉลี่ย: 2-3 วินาที</span>
            <span>สถานะ: ออนไลน์</span>
          </div>
        </div>
      </div>
    </div>
  );
}
