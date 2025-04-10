"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Headphones, Award } from "lucide-react"

export default function HomePage() {
  const [streak, setStreak] = useState(7)
  const [totalHours, setTotalHours] = useState(12.5)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [dates, setDates] = useState<Date[]>([])

  // Generate some sample dates for the streak calendar
  useEffect(() => {
    const today = new Date()
    const pastDates = []
    for (let i = 1; i <= 30; i++) {
      // Add dates with 80% probability to simulate a realistic streak
      if (Math.random() < 0.8) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        pastDates.push(date)
      }
    }
    setDates(pastDates)
  }, [])

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to Authentic Ga
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Your interactive platform for learning the Ga language
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Streak</CardTitle>
            <CardDescription>Keep learning daily to maintain your streak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">{streak} days</div>
                <p className="text-sm text-muted-foreground">Your current learning streak</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Learning Time</CardTitle>
            <CardDescription>Track your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">{totalHours} hours</div>
                <p className="text-sm text-muted-foreground">Total time spent learning</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Details</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <a href="/listening">
                <Headphones className="mr-2 h-4 w-4" />
                Continue Listening Practice
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="/flashcards">
                <BookOpen className="mr-2 h-4 w-4" />
                Review Flashcards
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your progress across different areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Listening</div>
                  <div className="text-sm text-muted-foreground">65%</div>
                </div>
                <Progress value={65} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Vocabulary</div>
                  <div className="text-sm text-muted-foreground">42%</div>
                </div>
                <Progress value={42} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Reading</div>
                  <div className="text-sm text-muted-foreground">28%</div>
                </div>
                <Progress value={28} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Calendar</CardTitle>
              <CardDescription>Track your daily learning activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="multiple"
                selected={dates}
                onSelect={setDates}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 rounded-sm bg-primary"></div>
                <div>Days with learning activity</div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
