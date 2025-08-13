import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Building,
  FileText,
  MessageSquare,
  Star,
  Download
} from 'lucide-react';

interface Proposal {
  id: number;
  challengeId: number;
  title: string;
  description: string;
  actionPlan: {
    phases: string[];
    timeline?: string;
    resources?: string[];
  };
  submittedBy: string;
  submittedAt: string | Date;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  partOfProject: boolean;
  studioId?: number;
  challenge?: {
    title: string;
  };
  Studio?: {
    name: string;
    website: string;
  };
  score?: number;
  feedback?: string;
}

export default function ReviewProposal() {
  const router = useRouter();
  const { id } = router.query;
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

 useEffect(() => {
   if (id) {
     setTimeout(() => {
       setProposal({
         id: parseInt(id as string),
         challengeId: 1,
         title: "GridIQ - AI-Powered Energy Optimization",
         description: "Advanced machine learning algorithms for real-time grid optimization and predictive energy distribution. Our solution leverages cutting-edge AI technology to analyze energy consumption patterns, predict demand fluctuations, and automatically optimize grid distribution to reduce waste and improve efficiency.",
         actionPlan: {
           phases: [
             "Research & Development - 3 months",
             "Prototype Development - 6 months", 
             "Pilot Testing - 4 months",
             "Market Validation - 3 months"
           ],
           timeline: "16 months total",
           resources: ["AI/ML Engineers", "Grid Infrastructure Specialists", "Data Scientists"]
         },
         submittedBy: "Energy Innovation Studio",
         submittedAt: "2025-01-15",
         status: "UNDER_REVIEW",
         partOfProject: false,
         studioId: 1,
         challenge: { title: "Smart Energy Grid Optimization" },
         Studio: { 
           name: "Antler",
           website: "https://antler.co"
         },
         score: 0,
         feedback: ""
       });
       setLoading(false);
     }, 500);
   }
 }, [id]);

 const handleStatusChange = (newStatus: 'APPROVED' | 'REJECTED') => {
   if (proposal) {
     setProposal({ ...proposal, status: newStatus, score, feedback });
     console.log('Updating proposal status:', { id, status: newStatus, score, feedback });
   }
 };

 const getStatusColor = (status: string) => {
   switch (status) {
     case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
     case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
     case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-800 border-blue-200';
     case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
     default: return 'bg-gray-100 text-gray-800 border-gray-200';
   }
 };

 if (loading) {
   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
       <div className="text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
         <p className="mt-4 text-gray-600">Loading proposal...</p>
       </div>
     </div>
   );
 }

 if (!proposal) {
   return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
       <div className="text-center">
         <p className="text-gray-600">Proposal not found</p>
       </div>
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-gray-50">
     <div className="max-w-4xl mx-auto p-6">
       <div className="mb-6">
         <button
           onClick={() => router.back()}
           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
         >
           <ArrowLeft className="w-4 h-4" />
           Back to Dashboard
         </button>
         
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Review Proposal</h1>
             <p className="text-gray-600">Proposal ID: #{proposal.id}</p>
           </div>
           <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
             {proposal.status.replace('_', ' ')}
           </span>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">{proposal.title}</h2>
             
             <div className="space-y-4">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                 <p className="text-gray-700 leading-relaxed">{proposal.description}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-t border-gray-100">
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                   <Building className="w-4 h-4" />
                   <span className="font-medium">Challenge:</span> {proposal.challenge?.title}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                   <User className="w-4 h-4" />
                   <span className="font-medium">Submitted by:</span> {proposal.submittedBy}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                   <Clock className="w-4 h-4" />
                   <span className="font-medium">Submitted:</span> {new Date(proposal.submittedAt).toLocaleDateString()}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                   <Building className="w-4 h-4" />
                   <span className="font-medium">Studio:</span> {proposal.Studio?.name}
                 </div>
               </div>
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="text-xl font-semibold text-gray-900 mb-4">Action Plan</h3>
             
             <div className="space-y-4">
               <div>
                 <h4 className="font-medium text-gray-900 mb-2">Project Phases</h4>
                 <div className="space-y-2">
                   {proposal.actionPlan.phases.map((phase, index) => (
                     <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                       <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                         {index + 1}
                       </span>
                       <span className="text-gray-700">{phase}</span>
                     </div>
                   ))}
                 </div>
               </div>

               {proposal.actionPlan.timeline && (
                 <div>
                   <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                   <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{proposal.actionPlan.timeline}</p>
                 </div>
               )}

               {proposal.actionPlan.resources && (
                 <div>
                   <h4 className="font-medium text-gray-900 mb-2">Required Resources</h4>
                   <div className="flex flex-wrap gap-2">
                     {proposal.actionPlan.resources.map((resource, index) => (
                       <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                         {resource}
                       </span>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>

           {proposal.status === 'UNDER_REVIEW' && (
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Review</h3>
               
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Score (1-5)</label>
                   <div className="flex gap-1">
                     {[1, 2, 3, 4, 5].map((rating) => (
                       <button
                         key={rating}
                         onClick={() => setScore(rating)}
                         className={`p-1 ${score >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                       >
                         <Star className="w-6 h-6 fill-current" />
                       </button>
                     ))}
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                   <textarea
                     value={feedback}
                     onChange={(e) => setFeedback(e.target.value)}
                     rows={4}
                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Provide detailed feedback on the proposal..."
                   />
                 </div>

                 <div className="flex gap-3 pt-4">
                   <button
                     onClick={() => handleStatusChange('APPROVED')}
                     className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 justify-center"
                   >
                     <CheckCircle className="w-4 h-4" />
                     Approve Proposal
                   </button>
                   <button
                     onClick={() => handleStatusChange('REJECTED')}
                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 justify-center"
                   >
                     <XCircle className="w-4 h-4" />
                     Reject Proposal
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>

         <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Studio Information</h3>
             <div className="space-y-3">
               <div>
                 <h4 className="font-medium text-gray-900">{proposal.Studio?.name}</h4>
                 <p className="text-sm text-gray-600">Startup Studio</p>
               </div>
               {proposal.Studio?.website && (
                 <a
                   href={proposal.Studio.website}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                 >
                   <Building className="w-4 h-4" />
                   Visit Website
                 </a>
               )}
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
             <div className="space-y-3">
               <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center">
                 <MessageSquare className="w-4 h-4" />
                 Message Studio
               </button>
               <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center">
                 <Download className="w-4 h-4" />
                 Download Proposal
               </button>
               <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 justify-center">
                 <FileText className="w-4 h-4" />
                 View Challenge
               </button>
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
             <div className="space-y-3">
               <div className="flex gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Proposal Submitted</p>
                   <p className="text-xs text-gray-500">{new Date(proposal.submittedAt).toLocaleDateString()}</p>
                 </div>
               </div>
               <div className="flex gap-3">
                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Under Review</p>
                   <p className="text-xs text-gray-500">In progress</p>
                 </div>
               </div>
               <div className="flex gap-3">
                 <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                 <div>
                   <p className="text-sm font-medium text-gray-400">Decision Pending</p>
                   <p className="text-xs text-gray-400">Awaiting review</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}