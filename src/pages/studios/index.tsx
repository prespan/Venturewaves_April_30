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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Studios Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studios.map((studio: any) => (
          <Card
            key={studio.id}
            className="flex flex-col justify-between h-full p-4 shadow-sm hover:shadow-md transition rounded-xl"
          >
            <CardHeader className="items-center text-center p-0 pb-2">
              {studio.logo && (
                <img
                  src={`/logos/${studio.logo}`}
                  alt={`${studio.name} logo`}
                  className="h-28 max-h-28 w-full object-contain mx-auto mb-2"
                />
              )}
              <CardTitle className="text-base font-semibold">{studio.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500 line-clamp-2">
                {studio.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-1 pt-2">
              {studio.address && (
                <p>
                  <span className="font-semibold text-gray-600">Location:</span>{' '}
                  {studio.address}
                </p>
              )}
              {studio.keyStartups?.length > 0 && (
                <p>
                  <span className="font-semibold text-gray-600">Key Startups:</span>{' '}
                  {studio.keyStartups.join('; ')}
                </p>
              )}
            </CardContent>

            <CardFooter className="pt-2">
              <Button
                variant="outline"
                className="text-sm px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white"
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