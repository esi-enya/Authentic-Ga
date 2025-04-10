"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlashcardImport } from "@/components/flashcard-import"
import { AudioImport } from "@/components/audio-import"
import { FileSpreadsheet, FileAudio, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminPage() {
  const [flashcardImportSuccess, setFlashcardImportSuccess] = useState(false)
  const [audioImportSuccess, setAudioImportSuccess] = useState(false)

  const handleFlashcardImport = (data: any) => {
    console.log("Imported flashcard data:", data)
    // In a real app, you would save this data to your database
    setFlashcardImportSuccess(true)
    setTimeout(() => setFlashcardImportSuccess(false), 5000)
  }

  const handleAudioImport = (data: any) => {
    console.log("Imported audio data:", data)
    // In a real app, you would save this data to your database
    setAudioImportSuccess(true)
    setTimeout(() => setAudioImportSuccess(false), 5000)
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Admin Dashboard</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">Import and manage content for Authentic Ga</p>
      </div>

      {flashcardImportSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">Flashcards have been successfully imported.</AlertDescription>
        </Alert>
      )}

      {audioImportSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">Audio content has been successfully imported.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Flashcards</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <FileAudio className="h-4 w-4" />
            <span>Audio</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FlashcardImport onImport={handleFlashcardImport} />

            <Card>
              <CardHeader>
                <CardTitle>Flashcard Format Guide</CardTitle>
                <CardDescription>How to prepare your flashcard data for import</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Your spreadsheet should have the following columns:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>front</strong> or <strong>term</strong>: The Ga word or phrase
                  </li>
                  <li>
                    <strong>back</strong> or <strong>definition</strong>: The English translation
                  </li>
                  <li>
                    <strong>difficulty</strong> (optional): easy, medium, or hard
                  </li>
                  <li>
                    <strong>audioUrl</strong> (optional): URL to audio pronunciation
                  </li>
                </ul>

                <div className="border rounded-md overflow-hidden mt-4">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left">front</th>
                        <th className="p-2 text-left">back</th>
                        <th className="p-2 text-left">difficulty</th>
                        <th className="p-2 text-left">audioUrl</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2">akpe</td>
                        <td className="p-2">thank you</td>
                        <td className="p-2">easy</td>
                        <td className="p-2">audio/akpe.mp3</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">abale</td>
                        <td className="p-2">hello</td>
                        <td className="p-2">easy</td>
                        <td className="p-2">audio/abale.mp3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AudioImport onImport={handleAudioImport} />

            <Card>
              <CardHeader>
                <CardTitle>Audio & Transcript Guide</CardTitle>
                <CardDescription>How to prepare your audio content for import</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>For the best experience, prepare your content as follows:</p>

                <div className="space-y-2">
                  <h3 className="font-medium">Audio Files</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use MP3 or WAV format for best compatibility</li>
                    <li>Keep file sizes under 10MB for better performance</li>
                    <li>Ensure clear audio quality with minimal background noise</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Transcript Files</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>JSON format with timestamps (preferred)</li>
                    <li>SRT subtitle format (also supported)</li>
                    <li>Or enter transcript text manually</li>
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium mb-2">Example JSON transcript format:</p>
                  <pre className="text-xs overflow-auto p-2 bg-black/5 rounded">
                    {`[
  {
    "id": 1,
    "start": 0,
    "end": 3.5,
    "text": "Abale, ete sen?"
  },
  {
    "id": 2,
    "start": 3.5,
    "end": 7.2,
    "text": "Midzi Kofi ni mijɛ Accra."
  }
]`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Management</CardTitle>
              <CardDescription>Upload and manage downloadable resources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Resource management functionality coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
