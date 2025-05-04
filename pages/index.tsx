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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16 flex flex-col justify-between">
      <header className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Where Corporates, Governments & Studios Co-Build the Future of Innovation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The platform where real problems meet scalable ventures.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-center">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Select Organization Type
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full max-w-xs mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded shadow-sm"
        >
          <option value="">Choose a role...</option>
          <option value="studio">Studio</option>
          <option value="corporate">Corporate</option>
          <option value="government">Government</option>
          <option value="research">Research Organization</option>
          <option value="investor">Investor</option>
        </select>

        <button
          onClick={handleStart}
          disabled={!role}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
        >
          Get Started →
        </button>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center pt-12 max-w-4xl mx-auto">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/logos/${logo}`}
            alt="Logo"
            className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </section>
    </div>
  );
}
