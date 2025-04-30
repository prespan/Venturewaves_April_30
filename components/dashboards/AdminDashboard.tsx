import { useState } from 'react'
import useSWR from 'swr'
import { LayoutDashboard, BarChart2, Users, FileText, Flame, FolderOpen, Download } from 'lucide-react'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function AdminDashboard() {
  const { data: metrics } = useSWR('/api/admin/metrics', fetcher)
  const [filter, setFilter] = useState<'all' | 'studio' | 'corporate' | 'gov' | 'research' | 'investor'>('all')

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-2 text-3xl font-bold text-gray-800">
        <LayoutDashboard className="text-purple-600 w-7 h-7" /> Admin Dashboard
      </div>

      <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-600">
        <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-purple-600 underline' : ''}`}>All Roles</button>
        <button onClick={() => setFilter('studio')} className={`${filter === 'studio' ? 'text-purple-600 underline' : ''}`}>Studios</button>
        <button onClick={() => setFilter('corporate')} className={`${filter === 'corporate' ? 'text-purple-600 underline' : ''}`}>Corporates</button>
        <button onClick={() => setFilter('gov')} className={`${filter === 'gov' ? 'text-purple-600 underline' : ''}`}>Governments</button>
        <button onClick={() => setFilter('research')} className={`${filter === 'research' ? 'text-purple-600 underline' : ''}`}>Research</button>
        <button onClick={() => setFilter('investor')} className={`${filter === 'investor' ? 'text-purple-600 underline' : ''}`}>Investors</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 text-center">
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600">
          <Users className="mx-auto text-purple-600" />
          <p className="mt-2 font-semibold text-lg">{metrics?.users}</p>
          <p>Members</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600">
          <FileText className="mx-auto text-purple-600" />
          <p className="mt-2 font-semibold text-lg">{metrics?.challenges}</p>
          <p>Challenges</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600">
          <Flame className="mx-auto text-purple-600" />
          <p className="mt-2 font-semibold text-lg">{metrics?.proposals}</p>
          <p>Proposals</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600">
          <FolderOpen className="mx-auto text-purple-600" />
          <p className="mt-2 font-semibold text-lg">{metrics?.projects}</p>
          <p>Projects</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600">
          <BarChart2 className="mx-auto text-purple-600" />
          <p className="mt-2 font-semibold text-lg">{metrics?.growthRate}%</p>
          <p>Growth</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-sm text-gray-600">
          <Download className="mx-auto text-purple-600" />
          <p className="mt-2 font-semibold text-lg">CSV</p>
          <p>
            <Link href="/api/admin/export" className="text-purple-600 underline">Export</Link>
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-700">
        <h2 className="font-semibold text-lg mb-2">AI Insights & Trends</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>🔥 Top performing studios by win rate</li>
          <li>🚀 Challenge categories with highest engagement</li>
          <li>📈 Funding velocity trends (last 60 days)</li>
        </ul>
      </div>
    </div>
  )
}
