'use client';

import { useStudios } from '@/hooks/useStudios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StudiosDirectory() {
  const { data: studios = [] } = useStudios();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Studios Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studios.map((studio: any) => (
          <Card
            key={studio.id}
            className="flex flex-col justify-between h-full relative"
          >
            <CardHeader>
              <img
                src={`/logos/${studio.logo || 'default.png'}`}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = '/logos/default.png')
                }
                alt={`${studio.name} logo`}
                className="h-20 w-full mb-4 object-contain mx-auto"
              />
              <CardTitle className="text-lg">{studio.name}</CardTitle>
              <CardDescription>{studio.description}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground space-y-1">
              {studio.address && (
                <p>
                  <strong>Location:</strong> {studio.address}
                </p>
              )}
              {studio.keyStartups?.length > 0 && (
                <p>
                  <strong>Key Startups:</strong>{' '}
                  {studio.keyStartups.join(', ')}
                </p>
              )}
            </CardContent>

            <CardFooter className="absolute bottom-0 left-0 w-full p-4">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-black hover:text-white"
                onClick={() =>
                  alert(`Learn more about ${studio.name}`)
                }
              >
                Learn More →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}