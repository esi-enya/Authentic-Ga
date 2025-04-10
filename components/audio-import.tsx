"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, FileAudio, AlertCircle } from "lucide-react"

type AudioData = {
  id: string
  title: string
  description: string
  level: string
  language: string
  audioUrl: string
  transcript: {
    id: number
    start: number
    end: number
    text: string
  }[]
}

export function AudioImport({ onImport }: { onImport: (data: AudioData) => void }) {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null)
  const [manualTranscript, setManualTranscript] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [level, setLevel] = useState("beginner")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setAudioFile(selectedFile)
      setError(null)
    }
  }

  const handleTranscriptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setTranscriptFile(selectedFile)
      setError(null)
    }
  }

  const handleImport = async () => {
    if (!audioFile) {
      setError("Please select an audio file to import")
      return
    }

    if (!transcriptFile && !manualTranscript) {
      setError("Please provide a transcript file or enter a manual transcript")
      return
    }

    if (!title) {
      setError("Please enter a title for the audio content")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, you would upload the audio file to a storage service
      // and process the transcript file

      // For this demo, we'll create a simulated audio URL and transcript data
      const simulatedAudioUrl = URL.createObjectURL(audioFile)

      let transcriptData = []

      if (transcriptFile) {
        // Process transcript file (JSON or SRT format)
        if (transcriptFile.type === "application/json") {
          const text = await transcriptFile.text()
          transcriptData = JSON.parse(text)
        } else {
          // Simple SRT parsing (in a real app, use a proper SRT parser)
          const text = await transcriptFile.text()
          const segments = text.split("\n\n")

          transcriptData = segments
            .map((segment, index) => {
              const lines = segment.split("\n")
              if (lines.length >= 3) {
                const timeCode = lines[1]
                const text = lines.slice(2).join(" ")

                // Extract start and end times from timecode (00:00:00,000 --> 00:00:00,000)
                const times = timeCode.split(" --> ")
                const startTime = convertSrtTimeToSeconds(times[0])
                const endTime = convertSrtTimeToSeconds(times[1])

                return {
                  id: index + 1,
                  start: startTime,
                  end: endTime,
                  text,
                }
              }
              return null
            })
            .filter(Boolean)
        }
      } else if (manualTranscript) {
        // Create a simple transcript with the entire text
        transcriptData = [
          {
            id: 1,
            start: 0,
            end: 30, // Assume 30 seconds for demo
            text: manualTranscript,
          },
        ]
      }

      const audioData: AudioData = {
        id: Date.now().toString(),
        title,
        description,
        level,
        language: "Ga",
        audioUrl: simulatedAudioUrl,
        transcript: transcriptData,
      }

      onImport(audioData)
    } catch (err) {
      setError("Error processing files. Please check the format and try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to convert SRT time format to seconds
  const convertSrtTimeToSeconds = (timeString: string) => {
    const [hours, minutes, secondsMs] = timeString.split(":")
    const [seconds, ms] = secondsMs.split(",")

    return (
      Number.parseInt(hours) * 3600 +
      Number.parseInt(minutes) * 60 +
      Number.parseInt(seconds) +
      Number.parseInt(ms) / 1000
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Audio Content</CardTitle>
        <CardDescription>Upload audio files with transcripts for the listening section</CardDescription>
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
          <Label htmlFor="audio-title">Title</Label>
          <Input
            id="audio-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this audio content"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="audio-description">Description</Label>
          <Input
            id="audio-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the content"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="audio-level">Difficulty Level</Label>
          <select
            id="audio-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="audio-file">Audio File</Label>
          <Input id="audio-file" type="file" accept="audio/*" onChange={handleAudioFileChange} />
        </div>

        {audioFile && (
          <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
            <FileAudio className="h-5 w-5 text-primary" />
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">{audioFile.name}</p>
              <p className="text-xs text-muted-foreground">{(audioFile.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="transcript-file">Transcript File (JSON or SRT)</Label>
          <Input id="transcript-file" type="file" accept=".json,.srt,.txt" onChange={handleTranscriptFileChange} />
          <p className="text-xs text-muted-foreground">Optional if you enter a manual transcript below</p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="manual-transcript">Or Enter Transcript Manually</Label>
          <Textarea
            id="manual-transcript"
            value={manualTranscript}
            onChange={(e) => setManualTranscript(e.target.value)}
            placeholder="Enter the transcript text here if you don't have a transcript file"
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleImport}
          disabled={!audioFile || isLoading || (!transcriptFile && !manualTranscript) || !title}
          className="w-full"
        >
          {isLoading ? "Importing..." : "Import Audio Content"}
          {!isLoading && <Upload className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
