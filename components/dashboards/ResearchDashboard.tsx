import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { LayoutDashboard, FilePlus, Flame, FolderOpen, Users, MessageSquare, Calendar } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ResearchDashboard() {
  const { data: challenges } = useSWR('/api/challenges', fetcher)
  const { data: proposals } = useSWR('/api/proposals', fetcher)
  const { data: projects } = useSWR('/api/projects', fetcher)

  const [tab, setTab] = useState<'challenges' | 'proposals' | 'projects' | 'partners' | 'messages' | 'calendar'>('challenges')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-3xl font-bold text-gray-800">
        <LayoutDashboard className="text-green-600 w-7 h-7" /> Research Organization Dashboard
      </div>

      <div className="flex flex-wrap gap-6 border-b pb-2 text-sm font-medium text-gray-600">
        <button onClick={() => setTab('challenges')} className={`flex items-center gap-1 ${tab === 'challenges' ? 'text-green-600 border-b-2 border-green-600' : ''}`}><FilePlus className="w-4 h-4" /> Challenges</button>
        <button onClick={() => setTab('proposals')} className={`flex items-center gap-1 ${tab === 'proposals' ? 'text-green-600 border-b-2 border-green-600' : ''}`}><Flame className="w-4 h-4" /> Proposals</button>
        <button onClick={() => setTab('projects')} className={`flex items-center gap-1 ${tab === 'projects' ? 'text-green-600 border-b-2 border-green-600' : ''}`}><FolderOpen className="w-4 h-4" /> Projects</button>
        <button onClick={() => setTab('partners')} className={`flex items-center gap-1 ${tab === 'partners' ? 'text-green-600 border-b-2 border-green-600' : ''}`}><Users className="w-4 h-4" /> Partner Matching</button>
        <button onClick={() => setTab('messages')} className={`flex items-center gap-1 ${tab === 'messages' ? 'text-green-600 border-b-2 border-green-600' : ''}`}><MessageSquare className="w-4 h-4" /> Messaging</button>
        <button onClick={() => setTab('calendar')} className={`flex items-center gap-1 ${tab === 'calendar' ? 'text-green-600 border-b-2 border-green-600' : ''}`}><Calendar className="w-4 h-4" /> Calendar</button>
      </div>

      {tab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {challenges?.map((challenge: any) => (
            <div key={challenge.id} className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{challenge.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{challenge.description}</p>
              <p className="text-xs text-gray-500 mb-3">Equity: {challenge.equityOffered}% · Budget: ${challenge.phase1Budget}</p>
              <Link href={`/challenges/${challenge.id}`} className="text-green-600 text-sm font-medium hover:underline">Manage Challenge</Link>
            </div>
          ))}
        </div>
      )}

      {tab === 'proposals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {proposals?.map((proposal: any) => (
            <div key={proposal.id} className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{proposal.title}</h2>
              <p className="text-sm text-gray-600 mb-1">Challenge ID: {proposal.challengeId}</p>
              <p className="text-xs text-gray-500 mb-3">Status: {proposal.status}</p>
              <Link href={`/proposals/${proposal.id}`} className="text-green-600 text-sm font-medium hover:underline">Review Proposal</Link>
            </div>
          ))}
        </div>
      )}

      {tab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects?.map((project: any) => (
            <div key={project.id} className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Project #{project.id}</h2>
              <p className="text-sm text-gray-600 mb-1">Investment: ${project.investment}</p>
              <p className="text-xs text-gray-500 mb-3">Milestones: {project.milestones?.length}</p>
              <Link href={`/projects/${project.id}`} className="text-green-600 text-sm font-medium hover:underline">View Project</Link>
            </div>
          ))}
        </div>
      )}

      {tab === 'partners' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          🧪 Matching Researchers to Challenges and Startups soon...
        </div>
      )}

      {tab === 'messages' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          💬 Messaging with Partners & Studios...
        </div>
      )}

      {tab === 'calendar' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          📅 Project Milestone Calendar View launching soon...
        </div>
      )}
    </div>
  )
}
