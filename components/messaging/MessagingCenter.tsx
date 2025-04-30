import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { MessageSquarePlus, Send } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function MessagingCenter() {
  const { data: threads } = useSWR('/api/messaging/threads', fetcher)
  const [selectedThread, setSelectedThread] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    await fetch(`/api/messaging/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        threadId: selectedThread.id,
        message: newMessage
      })
    })
    setNewMessage('')
    location.reload() // quick refresh - we can improve this later with SWR mutate
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      
      {/* THREADS LIST */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquarePlus className="text-orange-600" />
          <h2 className="text-lg font-bold text-gray-700">Threads</h2>
        </div>
        {threads?.map((thread: any) => (
          <div
            key={thread.id}
            onClick={() => setSelectedThread(thread)}
            className={`p-3 rounded-lg cursor-pointer ${selectedThread?.id === thread.id ? 'bg-orange-50' : 'hover:bg-gray-50'}`}
          >
            <p className="font-semibold text-gray-800">{thread.title}</p>
            <p className="text-xs text-gray-500 truncate">{thread.lastMessageSnippet}</p>
          </div>
        ))}
      </div>

      {/* MESSAGE THREAD */}
      <div className="flex-1 bg-white rounded-2xl shadow p-4 flex flex-col">
        {selectedThread ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-700">{selectedThread.title}</h3>
                <p className="text-sm text-gray-500">{selectedThread.participants.join(', ')}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {selectedThread.messages.map((msg: any) => (
                <div key={msg.id} className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-800">{msg.body}</p>
                  <p className="text-xs text-gray-500 text-right">{new Date(msg.sentAt).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border p-2"
              />
              <button onClick={sendMessage} className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-2 flex items-center">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a thread to start messaging!
          </div>
        )}
      </div>
    </div>
  )
}
