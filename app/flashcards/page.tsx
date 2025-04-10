"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Search, FileSpreadsheet } from "lucide-react"
import { FlashcardDemo } from "@/components/flashcard-demo"
import Link from "next/link"

// Sample flashcard sets with Ga vocabulary from the original implementation
const flashcardSets = [
  { 
    id: 1, 
    name: "Basic Greetings", 
    count: 15, 
    level: "beginner",
    cards: [
      { front: "akpe", back: "thank you", difficulty: "easy" },
      { front: "abale", back: "hello", difficulty: "easy" },
      { front: "oyiwala dɔnn", back: "good morning", difficulty: "medium" },
      { front: "manyɛ oyiwala", back: "good evening", difficulty: "medium" },
      { front: "wo dzin?", back: "what is your name?", difficulty: "hard" },
    ]
  },
  { 
    id: 2, 
    name: "Common Ga Words", 
    count: 10, 
    level: "beginner",
    cards: [
      { front: "ye", back: "eat", difficulty: "easy" },
      { front: "nu", back: "water", difficulty: "easy" },
      { front: "aloo", back: "or", difficulty: "easy" },
      { front: "le", back: "know", difficulty: "medium" },
      { front: "mli", back: "inside", difficulty: "medium" },
      { front: "ke", back: "take", difficulty: "medium" },
      { front: "na", back: "see", difficulty: "easy" },
    ]
  },
  { 
    id: 3, 
    name: "Food & Dining", 
    count: 20, 
    level: "beginner",
    cards: [
      { front: "niyenii", back: "food", difficulty: "easy" },
      { front: "fufu", back: "fufu (cassava dish)", difficulty: "easy" },
      { front: "abɛnkwan", back: "palm nut soup", difficulty: "medium" },
      { front: "banku", back: "fermented corn dough", difficulty: "medium" },
      { front: "okro", back: "okra", difficulty: "easy" },
    ]
  },
  { 
    id: 4, 
    name: "Urban Slang", 
    count: 30, 
    level: "advanced",
    cards: []
  },
  { 
    id: 5, 
    name: "Daily Conversations", 
    count: 18, 
    level: "intermediate",
    cards: []
  },
]

export default function FlashcardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSet, setSelectedSet] = useState<(typeof flashcardSets)[0] | null>(null)

  const filteredSets = flashcardSets.filter(
    (set) =>
      set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Flashcards</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Build your Ga vocabulary with interactive flashcards
        </p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="browse">Browse Sets</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search flashcard sets..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link href="/admin">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Import
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSets.map((set) => (
              <Card key={set.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{set.name}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10">
                      {set.level}
                    </Badge>
                  </div>
                  <CardDescription>{set.count} cards</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i < 3 ? "bg-primary" : "bg-muted"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">3/5 practice sessions completed</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full" onClick={() => setSelectedSet(set)}>
                    Practice Now
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardHeader className="pb-3">
                <CardTitle>Create New Set</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="text-center text-muted-foreground">
                  Create a custom flashcard set with your own vocabulary
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/flashcards/create">Create Custom Set</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="mt-6">
          {selectedSet ? (
            <FlashcardDemo flashcards={selectedSet.cards} setName={selectedSet.name} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Select a Flashcard Set</CardTitle>
                <CardDescription>Choose a set from the Browse tab to start practicing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No flashcard set selected. Please select a set to practice.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/flashcards?tab=browse">Browse Sets</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Flashcard Set</CardTitle>
              <CardDescription>Add your own custom flashcards to practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="set-name">Set Name</Label>
                <Input id="set-name" placeholder="Enter a name for your flashcard set" />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="set-description">Description (Optional)</Label>
                <Input id="set-description" placeholder="Brief description of this set" />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="set-level">Difficulty Level</Label>
                <select
                  id="set-level"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Cards</h3>

                {[1, 2, 3].map((index) => (
                  <div key={index} className="grid gap-4 pt-4 border-t first:border-t-0 first:pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`front-${index}`}>Front (Ga)</Label>
                        <Input id={`front-${index}`} placeholder="Ga word or phrase" />
                      </div>
                      <div>
                        <Label htmlFor={`back-${index}`}>Back (English)</Label>
                        <Input id={`back-${index}`} placeholder="English translation" />
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" type="button" className="w-full mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Flashcard Set</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
