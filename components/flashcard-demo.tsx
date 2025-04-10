"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"

// Define the flashcard type
type Flashcard = {
  front: string
  back: string
  difficulty: string
}

export function FlashcardDemo({ 
  flashcards = [
    { front: "akpe", back: "thank you", difficulty: "easy" },
    { front: "abale", back: "hello", difficulty: "easy" },
    { front: "oyiwala dɔnn", back: "good morning", difficulty: "medium" },
    { front: "manyɛ oyiwala", back: "good evening", difficulty: "medium" },
    { front: "wo dzin?", back: "what is your name?", difficulty: "hard" },
  ],
  setName = "Common Ga Words"
}: { 
  flashcards?: Flashcard[]
  setName?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])

  const currentCard = flashcards[currentIndex]

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }

  const markAsKnown = () => {
    if (!knownCards.includes(currentIndex)) {
      setKnownCards([...knownCards, currentIndex])
    }
    nextCard()
  }

  const markAsUnknown = () => {
    setKnownCards(knownCards.filter((index) => index !== currentIndex))
    nextCard()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flashcards</CardTitle>
        <CardDescription>Ga vocabulary - Tap card to flip</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Badge variant="outline" className="bg-primary/10">
            Set: {setName}
          </Badge>
          <Badge variant="outline" className="bg-primary/10">
            {currentIndex + 1}/{flashcards.length}
          </Badge>
        </div>

        <div className="relative h-48 cursor-pointer perspective-1000" onClick={() => setFlipped(!flipped)}>
          <div
            className={`absolute inset-0 transition-transform duration-500 preserve-3d ${flipped ? "rotate-y-180" : ""}`}
          >
            <div className="absolute inset-0 backface-hidden flex items-center justify-center p-6 text-center text-2xl font-bold border-2 border-primary rounded-lg">
              {currentCard.front}
            </div>
            <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-6 text-center text-2xl font-bold border-2 border-primary rounded-lg bg-primary/5">
              {currentCard.back}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevCard} disabled={currentIndex === 0}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextCard}
            disabled={currentIndex === flashcards.length - 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="destructive" size="icon" onClick={markAsUnknown}>
            <X className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" onClick={markAsKnown}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
