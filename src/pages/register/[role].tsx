import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RegisterRole = () => {
  const router = useRouter();
  const { role } = router.query;
  const [organization, setOrganization] = useState<any>(null);

  useEffect(() => {
    if (!role) return;

    // Fetch the first organization for this role
    fetch(`/api/register/${role}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOrganization(data[0]); // Only use the first org
        }
      })
      .catch(() => alert('Failed to fetch organization'));
  }, [role]);

  if (!organization) {
    return <p className="p-6 text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 space-y-4">
      <h1 className="text-xl font-semibold text-center">Register as {role}</h1>
      <input className="w-full border px-4 py-2" value={organization.name} readOnly />
      <input className="w-full border px-4 py-2" value={organization.website} readOnly />
      <input className="w-full border px-4 py-2" value={organization.location} readOnly />
      <textarea className="w-full border px-4 py-2" value={organization.focusAreas} readOnly />
      <textarea className="w-full border px-4 py-2" value={organization.description} readOnly />
      <textarea className="w-full border px-4 py-2" value={organization.objectives} readOnly />
      <input className="w-full border px-4 py-2" value={organization.logo} readOnly />
      <button className="bg-blue-600 text-white w-full py-2 rounded">Register</button>
    </div>
  );
};

export default RegisterRole;
