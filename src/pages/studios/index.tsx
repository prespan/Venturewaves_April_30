import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function StudiosDirectory() {
  const { data: studios, error } = useSWR('/api/studios', fetcher)

  if (error) return <p className="p-4 text-red-500">Failed to load studios.</p>
  if (!studios) return <p className="p-4">Loading studios...</p>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Studios Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio: any) => (
          <div key={studio.id} className="bg-white dark:bg-gray-800 rounded shadow p-6 space-y-3 border border-gray-200 dark:border-gray-700">
            <div className="text-xl font-semibold">{studio.name}</div>
            <p className="text-sm text-gray-500 dark:text-gray-300">{studio.description}</p>
            {studio.website && (
              <a href={studio.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                Visit Website
              </a>
            )}
            <Link href={`/studios/${studio.id}`}>
              <button className="mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                Learn More →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}