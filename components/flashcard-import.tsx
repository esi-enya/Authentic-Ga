"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react"

type FlashcardData = {
  id: number
  front: string
  back: string
  difficulty: string
  audioUrl?: string
}

export function FlashcardImport({ onImport }: { onImport: (data: FlashcardData[]) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file to import")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // For CSV files
      if (file.type === "text/csv") {
        const text = await file.text()
        const rows = text.split("\n")
        const headers = rows[0].split(",")

        const data: FlashcardData[] = []

        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue

          const values = rows[i].split(",")
          const item: Record<string, any> = {}

          headers.forEach((header, index) => {
            item[header.trim()] = values[index]?.trim()
          })

          data.push({
            id: i,
            front: item.front || item.term || "",
            back: item.back || item.definition || "",
            difficulty: item.difficulty || "medium",
            audioUrl: item.audioUrl || item.audio || undefined,
          })
        }

        onImport(data)
      }
      // For Excel/Google Sheets files
      else if (
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls")
      ) {
        // In a real implementation, you would use a library like SheetJS/xlsx
        // Since we can't import external libraries in this demo, we'll simulate the import

        // Simulated data
        const simulatedData: FlashcardData[] = [
          { id: 1, front: "Ojekoo", back: "thank you", difficulty: "easy" },
          { id: 2, front: "Hɛloo", back: "hello", difficulty: "easy" },
          { id: 3, front: "oyiwala dɔnn", back: "thank you", difficulty: "medium" },
          { id: 4, front: "oshwee", back: "good evening", difficulty: "medium" },
          { id: 5, front: "Te atsɔɔ bo teŋŋ?", back: "what is your name?", difficulty: "hard" },
        ]

        onImport(simulatedData)
      } else {
        setError("Unsupported file format. Please upload a CSV or Excel file.")
      }
    } catch (err) {
      setError("Error processing file. Please check the format and try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Flashcards</CardTitle>
        <CardDescription>Upload a CSV or Excel file with your flashcard data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="flashcard-file">Flashcard File</Label>
          <div className="flex items-center gap-2">
            <Input id="flashcard-file" type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Your file should have columns for: front/term, back/definition, difficulty (optional), and audioUrl
            (optional)
          </p>
        </div>

        {file && (
          <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleImport} disabled={!file || isLoading} className="w-full">
          {isLoading ? "Importing..." : "Import Flashcards"}
          {!isLoading && <Upload className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
