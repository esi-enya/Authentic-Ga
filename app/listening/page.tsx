"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AudioPlayer } from "@/components/audio-player"
import { FileAudio, Search, Clock, Lock } from "lucide-react"
import Link from "next/link"

// Updated audio lessons with the provided audio files
const audioLessons = [
  {
    id: 1,
    title: "Ghana's Independence",
    description: "Learn about Ghana's independence history in Ga language",
    duration: "3:45",
    level: "intermediate",
    isPremium: false,
    audioFile: "/audio/Ghana independence.m4a",
    transcript: [
      { id: 1, start: 0, end: 5.5, text: "Ŋmɛnɛ, mikase Ghana heyeli lɛ he nii." },
      { id: 2, start: 5.5, end: 10.2, text: "Ghana ná heyeli yɛ March 6, 1957." },
      { id: 3, start: 10.2, end: 15.8, text: "Dani Ghana baná heyeli lɛ, no mli lɛ eji Britania maŋ." },
      { id: 4, start: 15.8, end: 20.5, text: "Ghana bi ɔmɛ suɔ nɛ a ná he yemi." },
      { id: 5, start: 20.5, end: 25.2, text: "Amɛmiisuɔ ni amɛye amɛ diɛŋtsɛ amɛhe nɔ." },
      { id: 6, start: 25.2, end: 30.0, text: "Yɛ March 6, afi 1957 lɛ, Ghana ye ehe." },
      { id: 7, start: 30.0, end: 35.5, text: "Ghana ji maŋ klɛŋklɛŋ ni ná heyeli kɛjɛ Britania dɛŋ yɛ Afrika." },
      { id: 8, start: 35.5, end: 40.8, text: "Ghana hiɛnyiɛlɔ klɛŋklɛŋ ji Kwame Nkrumah." },
      { id: 9, start: 40.8, end: 46.2, text: "Ekɛɛ, \"Ghana eye ehe kɛya naanɔ.\"" },
      { id: 10, start: 46.2, end: 52.0, text: "Ghana ye ehe, shi ekaiɔ e yinɔsane lolo." },
    ]
  },
  {
    id: 2,
    title: "Accra - Ghana's Capital",
    description: "Discover Accra, the capital city of Ghana, through Ga language",
    duration: "4:20",
    level: "intermediate",
    isPremium: false,
    audioFile: "/audio/Accra.m4a",
    transcript: [
      { id: 1, start: 0, end: 5.5, text: "Accra ji Ghana maŋtiase." },
      { id: 2, start: 5.5, end: 10.2, text: "Eyɛ hei fɛfɛo babaoo ni obaanyɛ okwɛ." },
      { id: 3, start: 10.2, end: 15.8, text: "Ákɛ nɔkwɛmɔnɔ lɛ, Independence Square ji yinjiŋhei ni gbɔmɛi buɔ amɛhe naa." },
      { id: 4, start: 15.8, end: 20.5, text: "Wɔyɛɔ Aburi Botanical Gardens hu, ni hi jogbaŋŋ kɛha hejɔɔmɔ." },
      { id: 5, start: 20.5, end: 25.2, text: "Niyenii yɛ Accra yɛ ŋɔɔ waa." },
      { id: 6, start: 25.2, end: 30.0, text: "Misumɔɔ akɛ mikɛ minaanyo yeɔ fufu." },
      { id: 7, start: 30.0, end: 35.5, text: "Fufu ji niyenii ni gbɔmɛi fɛɛ yeɔ." },
      { id: 8, start: 35.5, end: 40.8, text: "Mi fufu ni misumɔɔ ji fufu kɛ abɛnkwan, ni afeeɔ kɛ banku kɛ okro." },
      { id: 9, start: 40.8, end: 46.2, text: "Te ooofee tɛŋŋ okɛɛ \"maŋtiase\" yɛ Ga wiemɔ mli?" },
    ]
  },
  {
    id: 3,
    title: "Cocoa in Ghana",
    description: "Learn about Ghana's cocoa industry in Ga language",
    duration: "3:55",
    level: "intermediate",
    isPremium: false,
    audioFile: "/audio/Cocoa.m4a",
    transcript: [
      { id: 1, start: 0, end: 5.5, text: "Ani osuɔɔ tsokolate?" },
      { id: 2, start: 5.5, end: 10.2, text: "Mɛni hewɔ loo mɛni hewɔ?" },
      { id: 3, start: 10.2, end: 15.8, text: "Sanebimɔi ni kɔɔ shishinumɔ he:" },
      { id: 4, start: 15.8, end: 20.5, text: "Mɛni Ghana woɔ babaoo?" },
      { id: 5, start: 20.5, end: 25.2, text: "Mɛni akɛ kookoo feɔ?" },
      { id: 6, start: 25.2, end: 30.0, text: "Ani kookoo ŋɔɔ?" },
      { id: 7, start: 30.0, end: 35.5, text: "Te afeɔ tɛŋŋ akɛɔ \"tsokolate\" yɛ Ga wiemɔ mli?" },
    ]
  },
  {
    id: 4,
    title: "Street Conversations",
    description: "Common phrases used in everyday street conversations",
    duration: "4:30",
    level: "intermediate",
    isPremium: true,
    audioFile: "/placeholder.mp3",
    transcript: []
  },
  {
    id: 5,
    title: "Shopping at the Market",
    description: "Essential vocabulary for shopping at local markets",
    duration: "3:45",
    level: "beginner",
    isPremium: false,
    audioFile: "/placeholder.mp3",
    transcript: []
  },
]

export default function ListeningPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLesson, setSelectedLesson] = useState<(typeof audioLessons)[0] | null>(null)

  const filteredLessons = audioLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Listening Practice</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Improve your Ga comprehension with authentic audio content
        </p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search audio lessons..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link href="/admin">
                <FileAudio className="mr-2 h-4 w-4" />
                Import
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card key={lesson.id} className={lesson.isPremium ? "border-primary/30" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex-1">{lesson.title}</CardTitle>
                    {lesson.isPremium && (
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Premium
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">
                      {lesson.level}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full"
                    variant={lesson.isPremium ? "outline" : "default"}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    {lesson.isPremium ? "Upgrade to Listen" : "Listen Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedLesson && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedLesson.title}</CardTitle>
                <CardDescription>{selectedLesson.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <AudioPlayer lesson={selectedLesson} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Favorite Lessons</CardTitle>
              <CardDescription>Quick access to your saved audio content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't saved any favorites yet.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/listening?tab=browse">Browse Lessons</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Played</CardTitle>
              <CardDescription>Your listening history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your listening history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
