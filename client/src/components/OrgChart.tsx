import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TeamMember {
  id: string;
  title: string;
  count?: number;
  fillColor?: string;
  textColor?: string;
  description?: string;
  backupRoles?: string[];
}

interface TeamConnection {
  from: string;
  to: string;
}

const OrgChart: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  
  const members: TeamMember[] = [
    { 
      id: 'leader', 
      title: 'Team Leader', 
      fillColor: '#000', 
      textColor: '#fff',
      description: 'Oversees all operations and coordinates between technical and operational units',
      backupRoles: ['Technical Director', 'Operations Manager']
    },
    { 
      id: 'tech', 
      title: 'Technical Director', 
      fillColor: '#222', 
      textColor: '#fff',
      description: 'Manages technical implementation and development of AI systems',
      backupRoles: ['AI Generalist']
    },
    { 
      id: 'ops', 
      title: 'Operations Manager', 
      fillColor: '#222', 
      textColor: '#fff',
      description: 'Coordinates field operations and intelligence gathering',
      backupRoles: ['Cyber Tactician']
    },
    { 
      id: 'ai', 
      title: 'AI Developers', 
      count: 3, 
      fillColor: '#333', 
      textColor: '#fff',
      description: 'Design and implement advanced AI systems for team operations'
    },
    { 
      id: 'cyber', 
      title: 'Cyber Warfare Experts', 
      count: 2, 
      fillColor: '#333', 
      textColor: '#fff',
      description: 'Execute cyber operations and ensure digital security'
    },
    { 
      id: 'social', 
      title: 'Social Engineers', 
      count: 2, 
      fillColor: '#333', 
      textColor: '#fff',
      description: 'Specialized in human psychology and social manipulation techniques'
    },
    { 
      id: 'intel', 
      title: 'Intel Analysts', 
      count: 2, 
      fillColor: '#333', 
      textColor: '#fff',
      description: 'Process and analyze intelligence from various sources'
    },
  ];

  const connections: TeamConnection[] = [
    { from: 'leader', to: 'tech' },
    { from: 'leader', to: 'ops' },
    { from: 'tech', to: 'ai' },
    { from: 'tech', to: 'cyber' },
    { from: 'ops', to: 'social' },
    { from: 'ops', to: 'intel' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center">Organizational Structure</h2>
      
      {/* Security Protocol Section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Security Protocols</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium text-gray-800">Authentication</h4>
            <ul className="mt-2 text-sm">
              <li>• Multi-Sig Authorization</li>
              <li>• Identity Rotation</li>
              <li>• Biometric Verification</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium text-gray-800">Confidentiality</h4>
            <ul className="mt-2 text-sm">
              <li>• Zero-Knowledge Proofs</li>
              <li>• End-to-End Encryption</li>
              <li>• Secure Communication Channels</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium text-gray-800">Emergency Protocol</h4>
            <ul className="mt-2 text-sm">
              <li>• Auto Destruction</li>
              <li>• Escape Nodes</li>
              <li>• Contingency Planning</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Top Level */}
        <div className="flex justify-center mb-8">
          <NodeCard 
            member={members[0]} 
            isSelected={selectedMember === members[0].id} 
            onClick={() => setSelectedMember(selectedMember === members[0].id ? null : members[0].id)} 
          />
        </div>
        
        {/* Second Level - Directors */}
        <div className="flex justify-center gap-20 mb-8 relative">
          <div className="absolute top-[-40px] w-1 h-[40px] bg-gray-400 left-1/2 transform -translate-x-1/2"></div>
          <div className="relative">
            <div className="absolute top-[-40px] w-[150px] h-1 bg-gray-400 left-1/2"></div>
            <NodeCard 
              member={members[1]} 
              isSelected={selectedMember === members[1].id} 
              onClick={() => setSelectedMember(selectedMember === members[1].id ? null : members[1].id)}
            />
          </div>
          <div className="relative">
            <div className="absolute top-[-40px] w-[150px] h-1 bg-gray-400 right-1/2"></div>
            <NodeCard 
              member={members[2]} 
              isSelected={selectedMember === members[2].id} 
              onClick={() => setSelectedMember(selectedMember === members[2].id ? null : members[2].id)}
            />
          </div>
        </div>
        
        {/* Third Level - Teams */}
        <div className="grid grid-cols-4 gap-4 relative">
          {/* Vertical lines from second level */}
          <div className="absolute top-[-40px] left-[25%] w-1 h-[40px] bg-gray-400 transform -translate-x-1/2"></div>
          <div className="absolute top-[-40px] left-[75%] w-1 h-[40px] bg-gray-400 transform -translate-x-1/2"></div>
          
          {/* Horizontal lines connecting siblings */}
          <div className="absolute top-[-40px] left-[12.5%] w-[25%] h-1 bg-gray-400"></div>
          <div className="absolute top-[-40px] left-[62.5%] w-[25%] h-1 bg-gray-400"></div>
          
          <NodeCard 
            member={members[3]} 
            isSelected={selectedMember === members[3].id} 
            onClick={() => setSelectedMember(selectedMember === members[3].id ? null : members[3].id)}
          />
          <NodeCard 
            member={members[4]} 
            isSelected={selectedMember === members[4].id} 
            onClick={() => setSelectedMember(selectedMember === members[4].id ? null : members[4].id)}
          />
          <NodeCard 
            member={members[5]} 
            isSelected={selectedMember === members[5].id} 
            onClick={() => setSelectedMember(selectedMember === members[5].id ? null : members[5].id)}
          />
          <NodeCard 
            member={members[6]} 
            isSelected={selectedMember === members[6].id} 
            onClick={() => setSelectedMember(selectedMember === members[6].id ? null : members[6].id)}
          />
        </div>
      </div>
      
      {/* Redundancy Plan */}
      {selectedMember && (
        <div className="mt-8 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Team Member Details</h3>
          <p className="mb-2"><strong>Role:</strong> {members.find(m => m.id === selectedMember)?.title}</p>
          <p className="mb-2"><strong>Description:</strong> {members.find(m => m.id === selectedMember)?.description}</p>
          {members.find(m => m.id === selectedMember)?.backupRoles && (
            <div>
              <p className="font-medium">Backup Roles:</p>
              <ul className="list-disc pl-5">
                {members.find(m => m.id === selectedMember)?.backupRoles?.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Example Mission Code */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Example Mission Code</h3>
        <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-auto text-sm">
{`def execute_mission(self, target):
    for phase in self.operational_phases.values():
        try:
            log(f"Executing {phase} on {target}")
            apply_stealth_protocol(level=12)
            ai_attack_sequence(target)
            rotate_infrastructure()
        except Exception as e:
            log(f"Error during {phase}: {str(e)}")
            initiate_fail_safe()`}
        </pre>
      </div>
    </div>
  );
};

// Enhanced Node component for each team member with tooltip
const NodeCard: React.FC<{ 
  member: TeamMember;
  isSelected?: boolean;
  onClick?: () => void;
}> = ({ member, isSelected = false, onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={`w-[180px] p-3 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition-all cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:shadow-lg'}`}
          style={{ 
            backgroundColor: member.fillColor || '#f3f4f6',
            color: member.textColor || 'black'
          }}
          onClick={onClick}
        >
          <div className="font-semibold">{member.title}</div>
          {member.count && <div className="text-sm mt-1">x{member.count}</div>}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p className="font-medium">{member.title}</p>
        {member.description && <p className="text-sm">{member.description}</p>}
        <p className="text-xs mt-1">Click for more details</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default OrgChart;