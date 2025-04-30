import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">Where Corporates, Governments & Studios Co-Build the Future of Innovation</h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl">The platform where real problems meet scalable ventures.</p>

      <div className="relative">
        <select className="border p-3 rounded-lg text-gray-700">
          <option>Select Organization Type</option>
          <option>Studio</option>
          <option>Corporate</option>
          <option>Government</option>
          <option>Research Organization</option>
          <option>Investor</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 grayscale mt-10">
        {/* Example partner logos */}
        <img src="/logos/catapult.png" className="h-12" />
        <img src="/logos/amrc.png" className="h-12" />
        <img src="/logos/innovateuk.png" className="h-12" />
        <img src="/logos/cpi.png" className="h-12" />
        <img src="/logos/byld.png" className="h-12" />
        {/* Add more logos here */}
      </div>
    </main>
  )
}
