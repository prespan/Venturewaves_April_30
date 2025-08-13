import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  FileText,
  MessageSquare,
  AlertCircle,
  Target,
  Briefcase
} from 'lucide-react';

interface Project {
  id: number;
  challengeId: number;
  proposalId: number;
  investment: number;
  milestones: string[];
  createdAt: string | Date;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  progress: number;
  nextMilestone?: string;
  challenge?: {
    title: string;
    description: string;
  };
  proposal?: {
    title: string;
    submittedBy: string;
    description: string;
  };
  team?: {
    lead: string;
    members: string[];
  };
  updates?: {
    id: number;
    date: string;
    title: string;
    description: string;
    type: 'milestone' | 'update' | 'issue';
  }[];
}

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'updates' | 'team'>('overview');

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        setProject({
          id: parseInt(id as string),
          challengeId: 1,
          proposalId: 1,
          investment: 50000000,
          milestones: [
            "Prototype Development - Completed",
            "Pilot Testing - In Progress", 
            "Market Validation - Pending",
            "Full Deployment - Pending"
          ],
          createdAt: "2025-01-20",
          status: 'ACTIVE',
          progress: 65,
          nextMilestone: "Complete pilot testing phase",
          challenge: { 
            title: "Smart Energy Grid Optimization",
            description: "Enhance grid efficiency using AI and IoT."
          },
          proposal: { 
            title: "GridIQ - AI-Powered Energy Optimization",
            submittedBy: "Energy Innovation Studio",
            description: "Advanced machine learning algorithms for real-time grid optimization."
          },
          team: {
            lead: "Dr. Sarah Chen",
            members: ["Alex Rodriguez", "Maria Kim", "James Wilson", "Lisa Zhang"]
          },
          updates: [
            {
              id: 1,
              date: "2025-02-01",
              title: "Prototype Testing Complete",
              description: "Successfully completed initial prototype testing with 15% efficiency improvement.",
              type: 'milestone'
            },
            {
              id: 2,
              date: "2025-01-28",
              title: "Weekly Progress Update",
              description: "Team made significant progress on AI algorithm optimization.",
              type: 'update'
            },
            {
              id: 3,
              date: "2025-01-25",
              title: "Minor Delay in Hardware Delivery",
              description: "IoT sensors delivery delayed by 1 week due to supply chain issues.",
              type: 'issue'
            }
          ]
        });
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const formatCurrency = (cents: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'issue': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.proposal?.title}</h1>
              <p className="text-gray-600 mb-4">{project.proposal?.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Project ID: #{project.id}</span>
                <span>Started: {new Date(project.createdAt).toLocaleDateString()}</span>
                <span>Team Lead: {project.team?.lead}</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)} mb-2`}>
                {project.status}
              </span>
              <div className="text-2xl font-bold text-emerald-600">
                {formatCurrency(project.investment)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Project Progress</h3>
            <span className="text-lg font-bold text-blue-600">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          {project.nextMilestone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span className="font-medium">Next Milestone:</span> {project.nextMilestone}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <nav className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: Briefcase },
              { id: 'milestones', label: 'Milestones', icon: CheckCircle },
              { id: 'updates', label: 'Updates', icon: Clock },
              { id: 'team', label: 'Team', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-700">{project.challenge?.title}</p>
                      <p className="text-gray-600 text-sm mt-1">{project.challenge?.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-700">{project.proposal?.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Team Lead</h4>
                      <p className="text-gray-700">{project.team?.lead}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-600">Investment</span>
                      </div>
                      <p className="text-xl font-bold text-emerald-600">{formatCurrency(project.investment)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-600">Progress</span>
                      </div>
                      <p className="text-xl font-bold text-blue-600">{project.progress}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-600">Duration</span>
                      </div>
                      <p className="text-xl font-bold text-purple-600">
                        {Math.ceil((Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-600">Team Size</span>
                      </div>
                      <p className="text-xl font-bold text-indigo-600">{(project.team?.members?.length || 0) + 1}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Milestones</h3>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => {
                    const isCompleted = milestone.toLowerCase().includes('completed');
                    const isInProgress = milestone.toLowerCase().includes('in progress');
                    
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-100 text-green-600' :
                          isInProgress ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : 
                           isInProgress ? <Clock className="w-4 h-4" /> :
                           <span className="text-sm font-medium">{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isCompleted ? 'text-green-900' :
                            isInProgress ? 'text-blue-900' :
                            'text-gray-500'
                          }`}>
                            {milestone}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isCompleted ? 'bg-green-100 text-green-800' :
                          isInProgress ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'updates' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Updates</h3>
                <div className="space-y-4">
                  {project.updates?.map((update) => (
                    <div key={update.id} className="border-l-4 border-gray-200 pl-4 py-2">
                      <div className="flex items-start gap-3">
                        {getUpdateIcon(update.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{update.title}</h4>
                            <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{update.description}</p>
                        </div>
                      </div>
                      </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'team' && (
             <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Team</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                       {project.team?.lead?.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">{project.team?.lead}</h4>
                       <p className="text-sm text-blue-600 font-medium">Team Lead</p>
                     </div>
                   </div>
                 </div>
                 
                 {project.team?.members?.map((member, index) => (
                   <div key={index} className="bg-gray-50 p-4 rounded-lg">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                         {member.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900">{member}</h4>
                         <p className="text-sm text-gray-600">Team Member</p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Actions</h3>
         <div className="flex flex-wrap gap-3">
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
             <MessageSquare className="w-4 h-4" />
             Contact Team
           </button>
           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
             <FileText className="w-4 h-4" />
             View Proposal
           </button>
           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
             <Calendar className="w-4 h-4" />
             Schedule Review
           </button>
           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
             <TrendingUp className="w-4 h-4" />
             View Analytics
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}