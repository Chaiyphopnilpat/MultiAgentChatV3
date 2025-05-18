import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock strategies database (would normally come from a server or AI API)
const STRATEGY_DATABASE = [
  {
    id: 'strat-001',
    name: 'Silent Observer',
    description: 'Low-profile intelligence gathering with minimal engagement. Focus on data collection and pattern recognition.',
    riskLevel: 'low',
    successRate: 92,
    recommendedTeam: [
      { role: 'Intel Analysts', count: 3 },
      { role: 'Cyber Experts', count: 1 }
    ],
    tactics: [
      'Passive network monitoring',
      'Public data harvesting',
      'Behavioral pattern analysis',
      'Stealth infrastructure deployment'
    ],
    timeline: '2-4 weeks',
    tags: ['intelligence', 'stealth', 'low-risk']
  },
  {
    id: 'strat-002',
    name: 'Digital Fortress',
    description: 'Comprehensive security hardening operation with active threat hunting and containment measures.',
    riskLevel: 'medium',
    successRate: 88,
    recommendedTeam: [
      { role: 'Cyber Experts', count: 3 },
      { role: 'AI Developers', count: 1 },
      { role: 'Intel Analysts', count: 1 }
    ],
    tactics: [
      'Infrastructure security audit',
      'Zero-day vulnerability patching',
      'Threat hunting campaigns',
      'Decoy system deployment'
    ],
    timeline: '3-6 weeks',
    tags: ['defense', 'security', 'containment']
  },
  {
    id: 'strat-003',
    name: 'Shadowhunter',
    description: 'Active counter-intelligence operation with adversary tracking and deception techniques.',
    riskLevel: 'high',
    successRate: 76,
    recommendedTeam: [
      { role: 'Cyber Experts', count: 2 },
      { role: 'Social Engineers', count: 2 },
      { role: 'Intel Analysts', count: 2 },
      { role: 'AI Developers', count: 1 }
    ],
    tactics: [
      'Adversary infrastructure identification',
      'Counter-intelligence operations',
      'Honeypot & honeytokens deployment',
      'Advanced attribution techniques'
    ],
    timeline: '4-8 weeks',
    tags: ['offensive', 'counter-intel', 'deception']
  },
  {
    id: 'strat-004',
    name: 'Financial Guardian',
    description: 'Specialized strategy for protecting financial systems and transactions with advanced fraud detection.',
    riskLevel: 'medium',
    successRate: 90,
    recommendedTeam: [
      { role: 'AI Developers', count: 3 },
      { role: 'Cyber Experts', count: 2 },
      { role: 'Intel Analysts', count: 1 }
    ],
    tactics: [
      'Transaction monitoring systems',
      'Behavioral analytics',
      'Anomaly detection algorithms',
      'Fraud pattern recognition'
    ],
    timeline: '2-5 weeks',
    tags: ['financial', 'protection', 'monitoring']
  },
  {
    id: 'strat-005',
    name: 'Deep Infiltration',
    description: 'High-risk deep cover operation requiring extensive social engineering and persistent access strategies.',
    riskLevel: 'high',
    successRate: 72,
    recommendedTeam: [
      { role: 'Social Engineers', count: 3 },
      { role: 'Cyber Experts', count: 2 },
      { role: 'Intel Analysts', count: 2 },
      { role: 'AI Developers', count: 1 }
    ],
    tactics: [
      'Deep cover identity creation',
      'Social network infiltration',
      'Trust building operations',
      'Persistent access mechanisms'
    ],
    timeline: '6-12 weeks',
    tags: ['infiltration', 'social-engineering', 'high-risk']
  }
];

// Mock AI analysis function (would normally be handled by API)
const simulateAIAnalysis = (
  objective: string,
  targetType: string,
  riskTolerance: number,
  resourcesAvailable: number,
  timeframe: string
): Promise<any[]> => {
  // Simulate processing time
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredStrategies = [...STRATEGY_DATABASE];
      
      // Filter by risk tolerance
      if (riskTolerance <= 33) {
        filteredStrategies = filteredStrategies.filter(s => s.riskLevel === 'low');
      } else if (riskTolerance <= 66) {
        filteredStrategies = filteredStrategies.filter(s => s.riskLevel !== 'high');
      }
      
      // Filter by keywords in objective
      const keywords = objective.toLowerCase().split(/\s+/);
      const keywordScore = filteredStrategies.map(strategy => {
        let score = 0;
        keywords.forEach(word => {
          if (strategy.description.toLowerCase().includes(word)) score += 3;
          if (strategy.tags.some(tag => tag.includes(word))) score += 2;
          strategy.tactics.forEach(tactic => {
            if (tactic.toLowerCase().includes(word)) score += 1;
          });
        });
        return { ...strategy, matchScore: score };
      });
      
      // Sort by match score and success rate
      const sortedStrategies = keywordScore
        .filter(s => s.matchScore > 0)
        .sort((a, b) => {
          // Primary sort by match score
          if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
          // Secondary sort by success rate
          return b.successRate - a.successRate;
        });
      
      // Return top 3 strategies or all if less than 3
      resolve(sortedStrategies.slice(0, 3));
      
    }, 1500); // Simulate AI processing time
  });
};

// AI processing simulation states
type ProcessingStatus = 'idle' | 'processing' | 'completed' | 'error';

const MissionStrategyRecommender: React.FC = () => {
  // Form state
  const [objective, setObjective] = useState('');
  const [targetType, setTargetType] = useState('');
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [resourcesAvailable, setResourcesAvailable] = useState(50);
  const [timeframe, setTimeframe] = useState('');
  
  // Results state
  const [recommendedStrategies, setRecommendedStrategies] = useState<any[]>([]);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  
  // Processing progress simulation
  const [processingProgress, setProcessingProgress] = useState(0);
  
  const handleGenerateRecommendations = async () => {
    setProcessingStatus('processing');
    setProcessingProgress(0);
    setRecommendedStrategies([]);
    setSelectedStrategy(null);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        const nextProgress = prev + Math.random() * 15;
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 300);
    
    try {
      // Call the simulated AI analysis function
      const strategies = await simulateAIAnalysis(
        objective,
        targetType,
        riskTolerance,
        resourcesAvailable,
        timeframe
      );
      
      clearInterval(progressInterval);
      setProcessingProgress(100);
      
      if (strategies.length === 0) {
        // No matching strategies found
        setProcessingStatus('error');
      } else {
        // Set the recommendations and update status
        setRecommendedStrategies(strategies);
        setProcessingStatus('completed');
        // Auto-select the first strategy
        setSelectedStrategy(strategies[0].id);
      }
    } catch (error) {
      clearInterval(progressInterval);
      setProcessingStatus('error');
      console.error('Error generating recommendations:', error);
    }
  };
  
  const currentStrategy = recommendedStrategies.find(s => s.id === selectedStrategy);
  
  // Function to map risk level to color
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">AI Mission Strategy Recommender</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Mission Parameters</CardTitle>
            <CardDescription>
              Provide details about your mission to receive AI-generated strategy recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mission Objective</label>
              <Textarea
                placeholder="Describe your mission objective in detail"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Target Type</label>
              <Select value={targetType} onValueChange={setTargetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cyber">Cyber Infrastructure</SelectItem>
                  <SelectItem value="financial">Financial System</SelectItem>
                  <SelectItem value="organization">Organization/Group</SelectItem>
                  <SelectItem value="individual">Individual Targets</SelectItem>
                  <SelectItem value="network">Network/Communication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Risk Tolerance: {riskTolerance <= 33 ? 'Low' : riskTolerance <= 66 ? 'Medium' : 'High'}
              </label>
              <Slider
                value={[riskTolerance]}
                onValueChange={(values) => setRiskTolerance(values[0])}
                max={100}
                step={1}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Resources Available: {resourcesAvailable}%
              </label>
              <Slider
                value={[resourcesAvailable]}
                onValueChange={(values) => setResourcesAvailable(values[0])}
                max={100}
                step={1}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mission Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                  <SelectItem value="short">Short-term (2-4 weeks)</SelectItem>
                  <SelectItem value="medium">Medium-term (1-3 months)</SelectItem>
                  <SelectItem value="long">Long-term (3+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleGenerateRecommendations} 
              className="w-full"
              disabled={!objective || !targetType || !timeframe || processingStatus === 'processing'}
            >
              {processingStatus === 'processing' ? 'Generating...' : 'Generate Strategy Recommendations'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Results Area */}
        <Card className="lg:col-span-2">
          {processingStatus === 'processing' && (
            <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium mb-1">AI Analysis in Progress</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Analyzing mission parameters and identifying optimal strategies...
                </p>
                <Progress value={processingProgress} className="w-full mb-4" />
                <div className="space-y-2 text-left text-sm">
                  {processingProgress > 10 && <p>✓ Analyzing mission objectives</p>}
                  {processingProgress > 30 && <p>✓ Evaluating risk parameters</p>}
                  {processingProgress > 50 && <p>✓ Matching with available strategies</p>}
                  {processingProgress > 70 && <p>✓ Checking resource requirements</p>}
                  {processingProgress > 90 && <p>✓ Ranking recommendations</p>}
                </div>
              </div>
            </CardContent>
          )}
          
          {processingStatus === 'error' && (
            <CardContent className="pt-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h3 className="text-lg font-medium text-red-600 mb-2">Analysis Failed</h3>
                <p className="text-gray-600 mb-4">
                  Unable to generate recommendations based on the provided parameters.
                  Please adjust your inputs and try again.
                </p>
                <Button variant="outline" onClick={() => setProcessingStatus('idle')}>
                  Back to Parameters
                </Button>
              </div>
            </CardContent>
          )}
          
          {processingStatus === 'completed' && recommendedStrategies.length > 0 && (
            <>
              <CardHeader>
                <CardTitle>Recommended Strategies</CardTitle>
                <CardDescription>
                  AI has analyzed your requirements and generated {recommendedStrategies.length} strategic recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {recommendedStrategies.map((strategy) => (
                    <Card 
                      key={strategy.id}
                      className={`cursor-pointer transition-all ${selectedStrategy === strategy.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedStrategy(strategy.id)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium">{strategy.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                            {strategy.riskLevel.charAt(0).toUpperCase() + strategy.riskLevel.slice(1)} Risk
                          </span>
                          <span className="ml-2 text-sm">{strategy.successRate}% Success</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {currentStrategy && (
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">{currentStrategy.name}</h2>
                        <p className="text-gray-600">{currentStrategy.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(currentStrategy.riskLevel)}`}>
                          {currentStrategy.riskLevel.charAt(0).toUpperCase() + currentStrategy.riskLevel.slice(1)} Risk
                        </span>
                        <span className="ml-2 text-sm font-medium">{currentStrategy.successRate}% Success Rate</span>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="tactics">
                      <TabsList>
                        <TabsTrigger value="tactics">Tactics</TabsTrigger>
                        <TabsTrigger value="team">Recommended Team</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="tactics" className="mt-4">
                        <h3 className="font-medium mb-2">Recommended Tactics</h3>
                        <ul className="space-y-2">
                          {currentStrategy.tactics.map((tactic: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 text-blue-500">•</span>
                              <span>{tactic}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      
                      <TabsContent value="team" className="mt-4">
                        <h3 className="font-medium mb-2">Recommended Team Composition</h3>
                        <div className="space-y-3">
                          {currentStrategy.recommendedTeam.map((member: any, index: number) => (
                            <div key={index} className="flex justify-between items-center">
                              <span>{member.role}</span>
                              <Badge variant="outline">{member.count} members</Badge>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details" className="mt-4">
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                            <dd>{currentStrategy.timeline}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Tags</dt>
                            <dd className="flex flex-wrap gap-1 mt-1">
                              {currentStrategy.tags.map((tag: string, i: number) => (
                                <Badge key={i} variant="secondary">{tag}</Badge>
                              ))}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Match Confidence</dt>
                            <dd className="flex items-center gap-2">
                              <Progress value={currentStrategy.matchScore * 10} className="w-full h-2" />
                              <span className="text-sm">{Math.min(currentStrategy.matchScore * 10, 100)}%</span>
                            </dd>
                          </div>
                        </dl>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6 pt-4 border-t">
                      <Button className="mr-2">
                        Adopt This Strategy
                      </Button>
                      <Button variant="outline">
                        Request Modifications
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </>
          )}
          
          {processingStatus === 'idle' && (
            <CardContent className="pt-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">AI Mission Strategy Advisor</h3>
                <p className="text-gray-500 mb-1 max-w-md mx-auto">
                  Fill in your mission parameters to receive AI-generated strategy recommendations
                  tailored to your specific objectives and constraints.
                </p>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Our AI analyzes your mission requirements against a comprehensive database of
                  tactical approaches to identify the optimal strategies for your team.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MissionStrategyRecommender;