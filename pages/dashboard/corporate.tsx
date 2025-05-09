'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LucideBriefcase, LucideRocket, LucideMessagesSquare } from 'lucide-react'

export default function CorporateDashboard() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [corporate, setCorporate] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    const fetchCorporate = async () => {
      try {
        const res = await fetch(`/api/dashboard/corporate?id=${id}`)
        const data = await res.json()
        setCorporate(data)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCorporate()
  }, [id])

  if (loading) return <p className="text-center p-8">Loading dashboard...</p>
  if (!corporate) return <p className="text-center p-8 text-red-500">Corporate not found.</p>

  const totalProposals = corporate.challenges.reduce(
    (acc, c) => acc + c.proposals.length,
    0
  )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Welcome, {corporate.name} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="p-6 flex flex-col items-start">
            <LucideBriefcase className="h-8 w-8 mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold">Challenges Posted</h2>
            <p className="text-3xl font-bold mt-2">{corporate.challenges.length}</p>
            <Button className="mt-4" variant="outline">View Challenges</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-start">
            <LucideRocket className="h-8 w-8 mb-4 text-green-600" />
            <h2 className="text-xl font-semibold">Proposals Received</h2>
            <p className="text-3xl font-bold mt-2">{totalProposals}</p>
            <Button className="mt-4" variant="outline">View Proposals</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-start">
            <LucideMessagesSquare className="h-8 w-8 mb-4 text-purple-600" />
            <h2 className="text-xl font-semibold">Messages</h2>
            <p className="text-3xl font-bold mt-2">12</p>
            <Button className="mt-4" variant="outline">Open Inbox</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corporate.challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <Button variant="secondary">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <p>Proposal view coming soon...</p>
        </TabsContent>

        <TabsContent value="partners">
          <p>AI-based partner recommendations coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}