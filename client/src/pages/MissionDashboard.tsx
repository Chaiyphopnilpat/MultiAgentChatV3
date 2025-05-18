import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Types for our mission statistics
interface MissionStats {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'planned';
  successRate: number;
  teamEfficiency: number;
  timeframe: string;
  riskLevel: 'low' | 'medium' | 'high';
  resources: number;
  objectives: {
    total: number;
    completed: number;
  };
  teamComposition: {
    name: string;
    count: number;
    color: string;
  }[];
  performanceMetrics: {
    date: string;
    success: number;
    failure: number;
  }[];
}

// Demo data
const missionsData: MissionStats[] = [
  {
    id: "mission-001",
    name: "Silent Trap",
    status: "completed",
    successRate: 92,
    teamEfficiency: 87,
    timeframe: "2025-04-15 to 2025-04-30",
    riskLevel: "medium",
    resources: 85,
    objectives: {
      total: 12,
      completed: 11
    },
    teamComposition: [
      { name: "AI Developers", count: 3, color: "#3498db" },
      { name: "Cyber Experts", count: 2, color: "#e74c3c" },
      { name: "Social Engineers", count: 1, color: "#2ecc71" },
      { name: "Intel Analysts", count: 2, color: "#f39c12" }
    ],
    performanceMetrics: [
      { date: "Week 1", success: 75, failure: 25 },
      { date: "Week 2", success: 85, failure: 15 },
      { date: "Week 3", success: 95, failure: 5 },
      { date: "Week 4", success: 92, failure: 8 }
    ]
  },
  {
    id: "mission-002",
    name: "Money Flow Tracking",
    status: "in-progress",
    successRate: 74,
    teamEfficiency: 81,
    timeframe: "2025-05-01 to 2025-05-20",
    riskLevel: "high",
    resources: 65,
    objectives: {
      total: 10,
      completed: 6
    },
    teamComposition: [
      { name: "AI Developers", count: 2, color: "#3498db" },
      { name: "Cyber Experts", count: 3, color: "#e74c3c" },
      { name: "Social Engineers", count: 1, color: "#2ecc71" },
      { name: "Intel Analysts", count: 3, color: "#f39c12" }
    ],
    performanceMetrics: [
      { date: "Week 1", success: 68, failure: 32 },
      { date: "Week 2", success: 72, failure: 28 },
      { date: "Week 3", success: 74, failure: 26 }
    ]
  },
  {
    id: "mission-003",
    name: "Digital Fortress",
    status: "planned",
    successRate: 0,
    teamEfficiency: 0,
    timeframe: "2025-06-01 to 2025-06-30",
    riskLevel: "low",
    resources: 50,
    objectives: {
      total: 15,
      completed: 0
    },
    teamComposition: [
      { name: "AI Developers", count: 4, color: "#3498db" },
      { name: "Cyber Experts", count: 4, color: "#e74c3c" },
      { name: "Social Engineers", count: 2, color: "#2ecc71" },
      { name: "Intel Analysts", count: 1, color: "#f39c12" }
    ],
    performanceMetrics: []
  }
];

// Helper components
const StatusBadge: React.FC<{ status: MissionStats['status'] }> = ({ status }) => {
  const colorMap = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'planned': 'bg-gray-100 text-gray-800'
  };
  
  const labelMap = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'planned': 'Planned'
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[status]}`}>
      {labelMap[status]}
    </span>
  );
};

const RiskBadge: React.FC<{ risk: MissionStats['riskLevel'] }> = ({ risk }) => {
  const colorMap = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[risk]}`}>
      {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
    </span>
  );
};

const MissionDashboard: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<string>(missionsData[0].id);
  
  const currentMission = missionsData.find(m => m.id === selectedMission) || missionsData[0];
  
  // Aggregated stats for overview
  const overviewStats = {
    totalMissions: missionsData.length,
    completedMissions: missionsData.filter(m => m.status === 'completed').length,
    avgSuccessRate: missionsData
      .filter(m => m.status === 'completed')
      .reduce((acc, curr) => acc + curr.successRate, 0) / 
      (missionsData.filter(m => m.status === 'completed').length || 1),
    highRiskMissions: missionsData.filter(m => m.riskLevel === 'high').length
  };
  
  const missionStatusData = [
    { name: 'Completed', value: missionsData.filter(m => m.status === 'completed').length, color: '#10b981' },
    { name: 'In Progress', value: missionsData.filter(m => m.status === 'in-progress').length, color: '#3b82f6' },
    { name: 'Planned', value: missionsData.filter(m => m.status === 'planned').length, color: '#6b7280' }
  ];
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Mission Statistics Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{overviewStats.totalMissions}</div>
            <p className="text-sm text-gray-500">Total Missions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{overviewStats.completedMissions}</div>
            <p className="text-sm text-gray-500">Completed Missions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{overviewStats.avgSuccessRate.toFixed(1)}%</div>
            <p className="text-sm text-gray-500">Avg. Success Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{overviewStats.highRiskMissions}</div>
            <p className="text-sm text-gray-500">High Risk Missions</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Mission Status Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Mission Status Overview</CardTitle>
            <CardDescription>Current status distribution of all missions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={missionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {missionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Missions']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Mission Selection and Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mission Selection</CardTitle>
            <CardDescription>Select a mission to view detailed statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {missionsData.map(mission => (
                <div 
                  key={mission.id}
                  onClick={() => setSelectedMission(mission.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMission === mission.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium mb-1">{mission.name}</h3>
                  <div className="flex space-x-2">
                    <StatusBadge status={mission.status} />
                    <RiskBadge risk={mission.riskLevel} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm font-medium">{currentMission.successRate}%</span>
              </div>
              <Progress value={currentMission.successRate} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">Team Efficiency</span>
                <span className="text-sm font-medium">{currentMission.teamEfficiency}%</span>
              </div>
              <Progress value={currentMission.teamEfficiency} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">Resources Utilization</span>
                <span className="text-sm font-medium">{currentMission.resources}%</span>
              </div>
              <Progress value={currentMission.resources} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">Objectives Completion</span>
                <span className="text-sm font-medium">
                  {currentMission.objectives.completed}/{currentMission.objectives.total}
                </span>
              </div>
              <Progress 
                value={(currentMission.objectives.completed / currentMission.objectives.total) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Mission Stats */}
      <Tabs defaultValue="performance" className="mb-8">
        <TabsList>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="team">Team Composition</TabsTrigger>
          <TabsTrigger value="details">Mission Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentMission.name} - Performance Over Time</CardTitle>
              {currentMission.status === 'planned' && (
                <CardDescription>This mission is planned and has no performance data yet</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {currentMission.performanceMetrics.length > 0 ? (
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={currentMission.performanceMetrics}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="success" 
                        stroke="#10b981" 
                        activeDot={{ r: 8 }} 
                        name="Success Rate (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="failure" 
                        stroke="#ef4444" 
                        name="Failure Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-500">
                  No performance data available for this mission yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentMission.name} - Team Composition</CardTitle>
              <CardDescription>Distribution of team members by role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentMission.teamComposition}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Team Members" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    >
                      {currentMission.teamComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentMission.name} - Mission Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-sm font-medium text-gray-500 truncate">Mission ID</dt>
                  <dd className="mt-1 text-lg font-semibold">{currentMission.id}</dd>
                </div>
                
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-sm font-medium text-gray-500 truncate">Status</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    <StatusBadge status={currentMission.status} />
                  </dd>
                </div>
                
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-sm font-medium text-gray-500 truncate">Timeframe</dt>
                  <dd className="mt-1 text-lg font-semibold">{currentMission.timeframe}</dd>
                </div>
                
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-sm font-medium text-gray-500 truncate">Risk Level</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    <RiskBadge risk={currentMission.riskLevel} />
                  </dd>
                </div>
                
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Team Members</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {currentMission.teamComposition.reduce((sum, item) => sum + item.count, 0)}
                  </dd>
                </div>
                
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-sm font-medium text-gray-500 truncate">Objectives Completion</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {currentMission.objectives.completed} / {currentMission.objectives.total}
                  </dd>
                </div>
              </dl>
              
              {currentMission.status === 'completed' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-medium text-green-800 mb-2">Mission Successful</h3>
                  <p className="text-green-700">
                    This mission was completed successfully with a {currentMission.successRate}% success rate.
                    The team achieved {currentMission.objectives.completed} out of {currentMission.objectives.total} objectives.
                  </p>
                </div>
              )}
              
              {currentMission.status === 'in-progress' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Mission In Progress</h3>
                  <p className="text-blue-700">
                    This mission is currently active with a current progress of {currentMission.successRate}%.
                    The team has completed {currentMission.objectives.completed} out of {currentMission.objectives.total} objectives so far.
                  </p>
                </div>
              )}
              
              {currentMission.status === 'planned' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Mission Planned</h3>
                  <p className="text-gray-700">
                    This mission is scheduled for {currentMission.timeframe}.
                    The team will work on achieving {currentMission.objectives.total} objectives.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MissionDashboard;