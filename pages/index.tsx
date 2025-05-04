import { useRouter } from 'next/router';
import { useState } from 'react';

const logos = [
  'catapult.png',
  'innovateuk.png',
  'amrc.png',
  'cpi.png',
  'temasek.png',
  'bcgdv.png',
  'fraunhofer.png',
  'antler.png',
  'byld.png',
  'coplex.png',
  'boomerang.png',
];

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('');

  const handleStart = () => {
    if (role) {
      router.push(`/register/${role}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center px-6 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Co-Build the Future of Innovation
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Where Corporates, Governments & Studios tackle real-world problems and scale ventures.
        </p>
      </div>

      {/* Dropdown & CTA */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 rounded text-base text-gray-800 dark:text-white shadow focus:outline-none"
        >
          <option value="">Select Organization Type</option>
          <option value="studio">Studio</option>
          <option value="corporate">Corporate</option>
          <option value="government">Government</option>
          <option value="research">Research Org</option>
          <option value="investor">Investor</option>
        </select>
        <button
          onClick={handleStart}
          disabled={!role}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded font-medium transition shadow"
        >
          Get Started →
        </button>
      </div>

      {/* Logos Section */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 pt-10">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/logos/${logo}`}
            alt="Logo"
            className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </div>
  );
}
