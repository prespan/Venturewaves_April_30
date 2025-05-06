export default function CorporateForm({ corporate }) {
  if (!corporate) {
    return <p className="text-red-600">No corporate data found.</p>
  }

  return (
    <form className="space-y-4 w-full max-w-xl">
      <input
        type="text"
        name="name"
        defaultValue={corporate.name}
        placeholder="Company Name"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="website"
        defaultValue={corporate.website}
        placeholder="Website"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        defaultValue={corporate.description}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="address"
        defaultValue={corporate.address}
        placeholder="Address"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {/* You can add more fields like industryTags, logo, etc. here */}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        Submit
      </button>
    </form>
  )
}
