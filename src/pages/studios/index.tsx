'use client'

import { useStudios } from '@/hooks/useStudios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function StudiosDirectory() {
  const { data: studios = [] } = useStudios()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Studios Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studios.map((studio: any) => (
          <Card key={studio.id} className="flex flex-col h-full justify-between">
            <CardHeader>
              <img
                src={`/logos/${studio.logo || 'default.png'}`}
                onError={(e) => (e.currentTarget.src = '/logos/default.png')}
                alt={`${studio.name} logo`}
                className="h-20 w-full object-contain mb-2"
              />
              <CardTitle>{studio.name}</CardTitle>
              <CardDescription>{studio.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              {studio.address && <p className="text-muted-foreground"><strong>Location:</strong> {studio.address}</p>}
              {studio.keyStartups?.length > 0 && (
                <div className="text-muted-foreground">
                  <strong>Key Startups:</strong>
                  <ul className="list-disc list-inside pl-2">
                    {studio.keyStartups.map((startup: string, index: number) => (
                      <li key={index}>{startup}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <Button
                variant="outline"
                className="text-gray-700 border border-gray-300 hover:bg-black hover:text-white ml-0"
              >
                Learn More →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}