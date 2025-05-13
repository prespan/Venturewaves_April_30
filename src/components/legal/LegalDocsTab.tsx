import { useState } from 'react'

export default function SendMessageForm() {
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSend = async () => {
    if (!recipient || !message.trim()) {
      setStatus('Please fill in both fields.')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/messaging/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipient, message })
      })

      const data = await res.json()
      if (res.ok) {
        setStatus('Message sent successfully!')
        setMessage('')
        setRecipient('')
      } else {
        setStatus(data.error || 'Failed to send message.')
      }
    } catch (err) {
      setStatus('An unexpected error occurred.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Send a Message</h3>

      <input
        type="email"
        placeholder="Recipient email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded"
      />

      <textarea
        placeholder="Your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="block w-full p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleSend}
        disabled={sending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {sending ? 'Sending...' : 'Send Message'}
      </button>

      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  )
}
