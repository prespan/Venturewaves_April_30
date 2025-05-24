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
      <h1 className="text-3xl font-bold tracking-tight">Studios Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studios.map((studio: any) => (
          <Card
            key={studio.id}
            className="flex flex-col justify-between h-full p-6 shadow-md hover:shadow-lg transition rounded-2xl"
          >
            <CardHeader className="items-center text-center p-0 pb-4">
              {studio.logo && (
                <img
                  src={`/logos/${studio.logo}`}
                  alt={`${studio.name} logo`}
                  className="h-16 object-contain mx-auto mb-2"
                />
              )}
              <CardTitle className="text-lg font-semibold">{studio.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {studio.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm space-y-2 text-gray-700">
              {studio.address && (
                <p>
                  <span className="font-semibold text-gray-600">Location:</span>{' '}
                  {studio.address}
                </p>
              )}
              {studio.keyStartups?.length > 0 && (
                <div>
                  <p className="font-semibold text-gray-600 mb-1">Key Startups:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                    {studio.keyStartups.map((startup: string, idx: number) => (
                      <li key={idx}>{startup}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>

            <CardFooter className="mt-auto pt-4">
              <Button
                variant="outline"
                className="text-sm border border-gray-400 text-gray-700 hover:bg-gray-900 hover:text-white"
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
