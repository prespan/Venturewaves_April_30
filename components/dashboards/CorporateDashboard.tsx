'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  FilePlus,
  Flame,
  FolderOpen,
  Users,
  MessageSquare,
  Calendar
} from 'lucide-react'

// Type definitions
interface CorporateDashboardProps {
  corporate: {
    challenges: {
      id: number
      title: string
      description: string
      deadline: string
      proposals: {
        id: number
        title: string
        status: string
      }[]
    }[]
    projects: {
      id: number
      investment: number
      milestones: {
        id: number
      }[]
    }[]
  }
}

export default function CorporateDashboard({ corporate }: CorporateDashboardProps) {
  const [tab, setTab] = useState<'challenges' | 'proposals' | 'projects' | 'partners' | 'messages' | 'calendar'>('challenges')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-3xl font-bold text-gray-800">
        <LayoutDashboard className="text-orange-600 w-7 h-7" /> Corporate Dashboard
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 border-b pb-2 text-sm font-medium text-gray-600">
        <button onClick={() => setTab('challenges')} className={`flex items-center gap-1 ${tab === 'challenges' ? 'text-orange-600 border-b-2 border-orange-600' : ''}`}>
          <FilePlus className="w-4 h-4" /> My Challenges
        </button>
        <button onClick={() => setTab('proposals')} className={`flex items-center gap-1 ${tab === 'proposals' ? 'text-orange-600 border-b-2 border-orange-600' : ''}`}>
          <Flame className="w-4 h-4" /> Incoming Proposals
        </button>
        <button onClick={() => setTab('projects')} className={`flex items-center gap-1 ${tab === 'projects' ? 'text-orange-600 border-b-2 border-orange-600' : ''}`}>
          <FolderOpen className="w-4 h-4" /> Projects
        </button>
        <button onClick={() => setTab('partners')} className={`flex items-center gap-1 ${tab === 'partners' ? 'text-orange-600 border-b-2 border-orange-600' : ''}`}>
          <Users className="w-4 h-4" /> Partner Matching
        </button>
        <button onClick={() => setTab('messages')} className={`flex items-center gap-1 ${tab === 'messages' ? 'text-orange-600 border-b-2 border-orange-600' : ''}`}>
          <MessageSquare className="w-4 h-4" /> Messaging
        </button>
        <button onClick={() => setTab('calendar')} className={`flex items-center gap-1 ${tab === 'calendar' ? 'text-orange-600 border-b-2 border-orange-600' : ''}`}>
          <Calendar className="w-4 h-4" /> Calendar
        </button>
      </div>

      {/* Challenges Tab */}
      {tab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {corporate?.challenges?.map((challenge) => (
            <div key={challenge.id} className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{challenge.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{challenge.description}</p>
              <p className="text-xs text-gray-500 mb-3">Deadline: {new Date(challenge.deadline).toLocaleDateString()}</p>
              <Link href={`/challenges/${challenge.id}`} className="inline-block bg-orange-600 text-white px-3 py-1 text-xs rounded hover:bg-orange-700 transition">Manage Challenge</Link>
            </div>
          ))}
        </div>
      )}

      {/* Proposals Tab */}
      {tab === 'proposals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {corporate?.challenges?.flatMap((c) => c.proposals)?.map((proposal) => (
            <div key={proposal.id} className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{proposal.title}</h2>
              <p className="text-sm text-gray-600 mb-1">Status: {proposal.status}</p>
              <Link href={`/proposals/${proposal.id}`} className="inline-block bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition">Review Proposal</Link>
            </div>
          ))}
        </div>
      )}

      {/* Projects Tab */}
      {tab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {corporate?.projects?.map((project) => (
            <div key={project.id} className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Project #{project.id}</h2>
              <p className="text-sm text-gray-600 mb-1">Investment: ${project.investment}</p>
              <p className="text-xs text-gray-500 mb-3">Milestones: {project.milestones?.length}</p>
              <Link href={`/projects/${project.id}`} className="inline-block bg-green-600 text-white px-3 py-1 text-xs rounded hover:bg-green-700 transition">View Project</Link>
            </div>
          ))}
        </div>
      )}

      {/* Coming Soon Tabs */}
      {tab === 'partners' && (
        <div className="bg-white rounded-xl p-6 shadow-md text-sm text-gray-700">
          🤝 Smart Partner Matching launching soon...
        </div>
      )}

      {tab === 'messages' && (
        <div className="bg-white rounded-xl p-6 shadow-md text-sm text-gray-700">
          💬 Secure Corporate Messaging launching soon...
        </div>
      )}

      {tab === 'calendar' && (
        <div className="bg-white rounded-xl p-6 shadow-md text-sm text-gray-700">
          📅 Corporate Calendar View coming soon...
        </div>
      )}
    </div>
  )
}