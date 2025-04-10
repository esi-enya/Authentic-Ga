import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Lock } from "lucide-react"
import Link from "next/link"

// Sample resources
const sampleResources = [
  {
    id: 1,
    title: "Beginner's Guide to Spanish Slang",
    description: "Learn the most common street expressions used in Spanish-speaking countries.",
    type: "PDF",
    size: "2.4 MB",
    isPremium: false,
  },
  {
    id: 2,
    title: "Urban Spanish Vocabulary List",
    description: "A comprehensive list of urban and street vocabulary with examples.",
    type: "PDF",
    size: "1.8 MB",
    isPremium: false,
  },
  {
    id: 3,
    title: "Street Art Vocabulary Workbook",
    description: "Practice exercises focused on graffiti and street art terminology.",
    type: "PDF",
    size: "4.2 MB",
    isPremium: true,
  },
  {
    id: 4,
    title: "Spanish Music Lyrics Analysis",
    description: "Breakdown of popular Spanish songs with cultural context.",
    type: "PDF",
    size: "3.5 MB",
    isPremium: true,
  },
]

export function ResourcesDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Downloadable Resources</CardTitle>
        <CardDescription>Enhance your learning with these supplementary materials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sampleResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center justify-center bg-primary/10 p-4 sm:w-24">
                  <span className="text-lg font-bold">{resource.type}</span>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    </div>
                    {resource.isPremium && (
                      <Badge variant="outline" className="bg-primary/10 flex gap-1 items-center">
                        <Lock className="h-3 w-3" /> Premium
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">{resource.size}</span>
                    <Button
                      variant={resource.isPremium ? "outline" : "default"}
                      size="sm"
                      className="gap-1"
                      disabled={resource.isPremium}
                    >
                      <Download className="h-4 w-4" />
                      {resource.isPremium ? "Upgrade to Download" : "Download"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/resources">View All Resources</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
