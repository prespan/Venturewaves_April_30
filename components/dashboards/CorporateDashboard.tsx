'use client'

import Link from 'next/link'

type CorporateDashboardProps = {
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
      milestones: any[] // Update if you know exact type
    }[]
  }
}

export default function CorporateDashboard({ corporate }: CorporateDashboardProps) {
  return (
    <div className="px-10 py-8 space-y-14 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold tracking-tight mb-6">🚀 Corporate Dashboard</h1>

      {/* Challenges */}
      <section>
        <h2 className="text-xl font-semibold mb-4">📌 My Challenges</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {corporate.challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-lg font-semibold">{challenge.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">{challenge.description}</p>
              <p className="text-xs text-gray-400 mt-2">Deadline: {new Date(challenge.deadline).toLocaleDateString()}</p>
              <Link href={`/challenges/${challenge.id}`} className="inline-block mt-4 text-blue-600 hover:underline text-sm">
                Manage Challenge
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Proposals */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🔥 Incoming Proposals</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {corporate.challenges.flatMap((c) => c.proposals)?.map((proposal) => (
            <div key={proposal.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl">
              <h3 className="text-lg font-semibold">{proposal.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Status: {proposal.status}</p>
              <Link href={`/proposals/${proposal.id}`} className="inline-block mt-4 text-blue-600 hover:underline text-sm">
                Review Proposal
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xl font-semibold mb-4">📁 Projects</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {corporate.projects?.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl">
              <h3 className="text-lg font-semibold">Project #{project.id}</h3>
              <p className="text-sm text-gray-500 mt-1">Investment: ${project.investment}</p>
              <p className="text-xs text-gray-400 mt-2">Milestones: {project.milestones?.length}</p>
              <Link href={`/projects/${project.id}`} className="inline-block mt-4 text-blue-600 hover:underline text-sm">
                View Project
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
