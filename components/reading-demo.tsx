"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BookOpen, ChevronLeft, ChevronRight, Bookmark } from "lucide-react"

// Sample text with vocabulary
const sampleText = {
  title: "Life in Accra",
  level: "Beginner",
  content: [
    {
      paragraph: "Accra ji Ghana maŋtiasei. Emaŋ wulu ni ehefɛo. Gbɔmɛi pii yɛ Accra.",
      vocabulary: {
        maŋtiasei: "capital city",
        wulu: "big",
        ehefɛo: "beautiful",
        gbɔmɛi: "people",
        pii: "many",
        yɛ: "in",
        ji: "is",
      },
    },
    {
      paragraph: "Odɔŋ ji gbɔmɔ ni yɔɔ Accra. Amɛsumɔɔ yara yɛ Kooliŋ gbɛkɛ.",
      vocabulary: {
        Odɔŋ: "Someone",
        gbɔmɔ: "person",
        yɔɔ: "is in",
        amɛsumɔɔ: "they like",
        yara: "walk",
        Kooliŋ: "Evening",
        gbɛkɛ: "time",
        ni: "who",
      },
    },
    {
      paragraph: "Accra yɛ shikpon wulu nɔ. Yɛ jɛmɛ lɛ, okɛ gbɔmɛi pii baakpe.",
      vocabulary: {
        shikpon: "land",
        nɔ: "on",
        jɛmɛ: "there",
        lɛ: "the",
        okɛ: "you will",
        baakpe: "meet",
      },
    },
  ],
}

export function ReadingDemo() {
  const [currentPage, setCurrentPage] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{sampleText.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setBookmarked(!bookmarked)}>
            <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-primary" : ""}`} />
          </Button>
        </div>
        <CardDescription className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Reading Practice</span>
          <Badge variant="outline" className="bg-primary/10 ml-2">
            {sampleText.level}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            {sampleText.content[currentPage].paragraph.split(" ").map((word, index) => {
              const cleanWord = word.replace(/[.,!?;:]/g, "")
              const punctuation = word.match(/[.,!?;:]/g)?.[0] || ""

              if (sampleText.content[currentPage].vocabulary[cleanWord]) {
                return (
                  <span key={index}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <span className="underline decoration-dotted decoration-primary cursor-help">{cleanWord}</span>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2">
                        <div className="text-sm">
                          <strong>{cleanWord}</strong>: {sampleText.content[currentPage].vocabulary[cleanWord]}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {punctuation}{" "}
                  </span>
                )
              }

              return <span key={index}>{word} </span>
            })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {sampleText.content.length}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(sampleText.content.length - 1, currentPage + 1))}
          disabled={currentPage === sampleText.content.length - 1}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
