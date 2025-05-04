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
    <div className="min-h-screen bg-white text-gray-900 px-6 py-16 flex flex-col items-center text-center space-y-10">
      <header>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Where Corporates, Governments & Studios Co-Build the Future of Innovation
        </h1>
        <p className="text-lg text-gray-600">
          The platform where real problems meet scalable ventures.
        </p>
      </header>

      <section className="w-full max-w-md space-y-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Select Organization Type
        </label>
        <select
          id="role"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
          className="w-full bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Get Started →
        </button>
      </section>

      <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 pt-12">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`/logos/${logo}`}
            alt="Logo"
            className="w-20 h-auto object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </section>
    </div>
  );
}
