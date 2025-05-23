// ✅ src/pages/studios/index.tsx
'use client'

import { useStudios } from "@/hooks/useStudios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudiosDirectory() {
  const { data: studios = [] } = useStudios();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Studios Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studios.map((studio: any) => (
          <Card key={studio.id} className="flex flex-col justify-between h-full">
            <CardHeader>
              {studio.logo && (
                <img
                  src={`/logos/${studio.logo}`}
                  alt={`${studio.name} logo`}
                  className="h-20 w-full mb-4 object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/logos/default.png';
                  }}
                />
              )}
              <CardTitle>{studio.name}</CardTitle>
              <CardDescription>{studio.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              {studio.industry && (
                <p>
                  <strong>Industry:</strong> {studio.industry}
                </p>
              )}
              {studio.location && (
                <p>
                  <strong>Location:</strong> {studio.location}
                </p>
              )}
              {studio.country && (
                <p>
                  <strong>Country:</strong> {studio.country}
                </p>
              )}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                variant="outline"
                className="w-full border hover:bg-black hover:text-white"
                onClick={() => alert(`Learn more about ${studio.name}`)}
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
