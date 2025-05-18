import React from 'react';

interface TeamMember {
  id: string;
  title: string;
  count?: number;
  fillColor?: string;
  textColor?: string;
}

interface TeamConnection {
  from: string;
  to: string;
}

const OrgChart: React.FC = () => {
  const members: TeamMember[] = [
    { id: 'leader', title: 'Team Leader', fillColor: '#000', textColor: '#fff' },
    { id: 'tech', title: 'Technical Director', fillColor: '#222', textColor: '#fff' },
    { id: 'ops', title: 'Operations Manager', fillColor: '#222', textColor: '#fff' },
    { id: 'ai', title: 'AI Developers', count: 3, fillColor: '#333', textColor: '#fff' },
    { id: 'cyber', title: 'Cyber Warfare Experts', count: 2, fillColor: '#333', textColor: '#fff' },
    { id: 'social', title: 'Social Engineers', count: 2, fillColor: '#333', textColor: '#fff' },
    { id: 'intel', title: 'Intel Analysts', count: 2, fillColor: '#333', textColor: '#fff' },
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
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center">Organizational Structure</h2>
      
      <div className="flex flex-col items-center">
        {/* Top Level */}
        <div className="flex justify-center mb-8">
          <NodeCard member={members[0]} />
        </div>
        
        {/* Second Level - Directors */}
        <div className="flex justify-center gap-20 mb-8 relative">
          <div className="absolute top-[-40px] w-1 h-[40px] bg-gray-400 left-1/2 transform -translate-x-1/2"></div>
          <div className="relative">
            <div className="absolute top-[-40px] w-[150px] h-1 bg-gray-400 left-1/2"></div>
            <NodeCard member={members[1]} />
          </div>
          <div className="relative">
            <div className="absolute top-[-40px] w-[150px] h-1 bg-gray-400 right-1/2"></div>
            <NodeCard member={members[2]} />
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
          
          <NodeCard member={members[3]} />
          <NodeCard member={members[4]} />
          <NodeCard member={members[5]} />
          <NodeCard member={members[6]} />
        </div>
      </div>
    </div>
  );
};

// Node component for each team member
const NodeCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div 
      className="w-[180px] p-3 rounded-lg shadow-md flex flex-col items-center justify-center text-center"
      style={{ 
        backgroundColor: member.fillColor || '#f3f4f6',
        color: member.textColor || 'black'
      }}
    >
      <div className="font-semibold">{member.title}</div>
      {member.count && <div className="text-sm mt-1">x{member.count}</div>}
    </div>
  );
};

export default OrgChart;