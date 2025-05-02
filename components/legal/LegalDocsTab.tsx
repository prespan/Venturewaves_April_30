import { useState } from 'react'
import useSWR from 'swr'
import { Upload, FileText, Download } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

// ✅ Define the LegalDoc type to help TypeScript understand doc structure
interface LegalDoc {
  id: number
  name: string
  url: string
}

export default function LegalDocsTab({ challengeId }: { challengeId: string }) {
  const { data: docs = [], mutate } = useSWR<LegalDoc[]>(
    `/api/challenges/${challengeId}/legal-docs`,
    fetcher
  )

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    await fetch(`/api/challenges/${challengeId}/legal-docs/upload`, {
      method: 'POST',
      body: formData
    })

    setFile(null)
    await mutate()
    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">📄 Legal Documents</h3>

      <div className="space-y-3">
        {docs.map(doc => (
          <div
            key={doc.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
          >
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FileText className="w-4 h-4 text-orange-600" />
              {doc.name}
            </div>
            <a
              href={doc.url}
              className="text-sm text-orange-600 flex items-center gap-1 hover:underline"
              download
            >
              <Download className="w-4 h-4" /> Download
            </a>
          </div>
        ))}
        {docs.length === 0 && (
          <p className="text-sm text-gray-500">
            No legal documents uploaded yet.
          </p>
        )}
      </div>

      <div className="border-t pt-4">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Attach Legal Document (PDF, max 5MB)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="block mb-3"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
        >
          <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  )
}
