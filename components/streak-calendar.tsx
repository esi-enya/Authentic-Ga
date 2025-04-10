"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Generate sample data for the last 90 days
const generateSampleData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random activity level: 0 = none, 1-4 = activity levels
    let activityLevel = 0

    // Create a pattern with a 7-day streak for the last week
    if (i < 7) {
      activityLevel = Math.floor(Math.random() * 4) + 1
    } else if (Math.random() > 0.6) {
      activityLevel = Math.floor(Math.random() * 4) + 1
    }

    data.push({
      date,
      level: activityLevel,
    })
  }

  return data
}

export function StreakCalendar() {
  const [data] = useState(generateSampleData)

  // Group by week
  const weeks = []
  let currentWeek = []

  data.forEach((day, index) => {
    currentWeek.push(day)

    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  })

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <span className="w-3 h-3 rounded-sm bg-muted"></span>
          <span className="w-3 h-3 rounded-sm bg-primary/25"></span>
          <span className="w-3 h-3 rounded-sm bg-primary/50"></span>
          <span className="w-3 h-3 rounded-sm bg-primary/75"></span>
          <span className="w-3 h-3 rounded-sm bg-primary"></span>
        </div>
        <span>More</span>
      </div>

      <div className="grid grid-flow-col gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-flow-row gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={cn(
                  "w-3 h-3 rounded-sm",
                  day.level === 0 && "bg-muted",
                  day.level === 1 && "bg-primary/25",
                  day.level === 2 && "bg-primary/50",
                  day.level === 3 && "bg-primary/75",
                  day.level === 4 && "bg-primary",
                )}
                title={`${day.date.toLocaleDateString()}: ${day.level > 0 ? day.level * 15 : 0} minutes`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
