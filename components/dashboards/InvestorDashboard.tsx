import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, Star, Search, MessageSquare, Calendar } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function InvestorDashboard() {
  const { data: projects } = useSWR('/api/projects', fetcher)
  const [tab, setTab] = useState<'projects' | 'portfolio' | 'discover' | 'messages' | 'calendar'>('projects')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-3xl font-bold text-gray-800">
        <LayoutDashboard className="text-indigo-600 w-7 h-7" /> Investor Dashboard
      </div>

      <div className="flex flex-wrap gap-6 border-b pb-2 text-sm font-medium text-gray-600">
        <button onClick={() => setTab('projects')} className={`flex items-center gap-1 ${tab === 'projects' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}><FolderOpen className="w-4 h-4" /> Public Projects</button>
        <button onClick={() => setTab('portfolio')} className={`flex items-center gap-1 ${tab === 'portfolio' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}><Star className="w-4 h-4" /> My Portfolio</button>
        <button onClick={() => setTab('discover')} className={`flex items-center gap-1 ${tab === 'discover' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}><Search className="w-4 h-4" /> Discover Ventures</button>
        <button onClick={() => setTab('messages')} className={`flex items-center gap-1 ${tab === 'messages' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}><MessageSquare className="w-4 h-4" /> Messaging</button>
        <button onClick={() => setTab('calendar')} className={`flex items-center gap-1 ${tab === 'calendar' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}><Calendar className="w-4 h-4" /> Calendar</button>
      </div>

      {tab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects?.map((project: any) => (
            <div key={project.id} className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Project #{project.id}</h2>
              <p className="text-sm text-gray-600 mb-1">Challenge: {project.challengeId}</p>
              <p className="text-xs text-gray-500 mb-3">Investment: ${project.investment}</p>
              <Link href={`/projects/${project.id}`} className="text-indigo-600 text-sm font-medium hover:underline">View Opportunity</Link>
            </div>
          ))}
        </div>
      )}

      {tab === 'portfolio' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          📊 Your funded ventures will show here...
        </div>
      )}

      {tab === 'discover' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          🚀 AI-curated venture discovery launching soon...
        </div>
      )}

      {tab === 'messages' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          💬 Investor-Startup messaging threads launching soon...
        </div>
      )}

      {tab === 'calendar' && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-700">
          📅 Deal flow and event calendar coming soon...
        </div>
      )}
    </div>
  )
}
