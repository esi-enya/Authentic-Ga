"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the lesson type
type Lesson = {
  id: number
  title: string
  description: string
  duration: string
  level: string
  isPremium: boolean
  audioFile: string
  transcript: {
    id: number
    start: number
    end: number
    text: string
  }[]
}

export function AudioPlayer({ lesson }: { lesson: Lesson }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [activeSegment, setActiveSegment] = useState(1)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Update current time and check which transcript segment is active
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)

        // Find active transcript segment
        const active = lesson.transcript.find(
          (segment) => audioRef.current!.currentTime >= segment.start && audioRef.current!.currentTime <= segment.end,
        )

        if (active) {
          setActiveSegment(active.id)
        }
      }
    }

    const interval = setInterval(updateTime, 100)
    return () => clearInterval(interval)
  }, [lesson.transcript])

  // Set duration when audio is loaded
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [])

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0]
      audioRef.current.volume = newVolume
      setVolume(newVolume)

      if (newVolume === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Jump to specific segment
  const jumpToSegment = (segment: (typeof lesson.transcript)[0]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = segment.start
      setCurrentTime(segment.start)
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // Calculate max duration for slider
  const maxDuration = duration || (lesson.transcript.length > 0 
    ? Math.max(...lesson.transcript.map(segment => segment.end)) 
    : parseFloat(lesson.duration.split(':')[0]) * 60 + parseFloat(lesson.duration.split(':')[1]))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-primary/10">
          {lesson.level}
        </Badge>
        <Badge variant="outline" className="bg-primary/10">
          Ga
        </Badge>
        <Badge variant="outline" className="bg-primary/10">
          {lesson.duration}
        </Badge>
      </div>

      {lesson.transcript.length > 0 && (
        <Card className="p-4 bg-black/5">
          <div className="space-y-4">
            {lesson.transcript.map((segment) => (
              <div
                key={segment.id}
                className={cn(
                  "p-2 rounded-md cursor-pointer transition-colors",
                  activeSegment === segment.id ? "bg-primary text-primary-foreground" : "hover:bg-primary/10",
                )}
                onClick={() => jumpToSegment(segment)}
              >
                {segment.text}
              </div>
            ))}
          </div>
        </Card>
      )}

      <audio
        ref={audioRef}
        src={lesson.audioFile}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={maxDuration}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <span className="text-xs">{formatTime(maxDuration)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, currentTime - 5)
                }
              }}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="bg-primary text-primary-foreground rounded-full h-10 w-10"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(maxDuration, currentTime + 5)
                }
              }}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
