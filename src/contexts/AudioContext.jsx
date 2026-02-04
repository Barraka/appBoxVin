import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { getFromStorage, saveToStorage } from '../utils/storage'
import soundtrackSrc from '../assets/soundtrack.mp3'

const AudioContext = createContext()

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(() => {
    return getFromStorage('audioMuted') ?? false
  })

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(soundtrackSrc)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Handle mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
    saveToStorage('audioMuted', isMuted)
  }, [isMuted])

  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        // Autoplay was prevented, user needs to interact first
        console.log('Audio play prevented:', err)
      })
    }
  }, [isPlaying])

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const value = {
    isPlaying,
    isMuted,
    play,
    pause,
    toggleMute
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
