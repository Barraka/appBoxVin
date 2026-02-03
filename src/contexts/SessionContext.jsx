import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getFromStorage, saveToStorage, removeFromStorage } from '../utils/storage'
import { gameData } from '../data/gameData'

const SessionContext = createContext()

const createInitialState = () => ({
  sessionId: crypto.randomUUID(),
  startTime: null,
  elapsedTime: 0,
  isRunning: false,
  boxOpeningCompleted: false,
  currentBoxStep: 0,
  puzzleProgress: {},
  gameCompleted: false,
  hintsUsedTotal: 0,
  solutionsUsedTotal: 0,
})

export function SessionProvider({ children }) {
  const [session, setSession] = useState(() => {
    const saved = getFromStorage('session')
    return saved || createInitialState()
  })

  // Save session to localStorage whenever it changes
  useEffect(() => {
    saveToStorage('session', session)
  }, [session])

  // Timer effect
  useEffect(() => {
    let interval
    if (session.isRunning && session.startTime) {
      interval = setInterval(() => {
        setSession(prev => ({
          ...prev,
          elapsedTime: Date.now() - prev.startTime
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [session.isRunning, session.startTime])

  const startSession = useCallback(() => {
    setSession(prev => ({
      ...prev,
      startTime: Date.now() - prev.elapsedTime,
      isRunning: true
    }))
  }, [])

  const pauseSession = useCallback(() => {
    setSession(prev => ({
      ...prev,
      isRunning: false
    }))
  }, [])

  const resetSession = useCallback(() => {
    removeFromStorage('session')
    setSession(createInitialState())
  }, [])

  const completeBoxOpening = useCallback(() => {
    setSession(prev => ({
      ...prev,
      boxOpeningCompleted: true,
      currentBoxStep: gameData.boxOpening.length
    }))
  }, [])

  const advanceBoxStep = useCallback(() => {
    setSession(prev => {
      const nextStep = prev.currentBoxStep + 1
      const completed = nextStep >= gameData.boxOpening.length
      return {
        ...prev,
        currentBoxStep: nextStep,
        boxOpeningCompleted: completed
      }
    })
  }, [])

  const revealHint = useCallback((puzzleId) => {
    setSession(prev => {
      const currentProgress = prev.puzzleProgress[puzzleId] || {
        hintsRevealed: 0,
        solutionRevealed: false,
        completed: false
      }

      const puzzle = gameData.puzzles.find(p => p.id === puzzleId)
      const maxHints = puzzle?.hints?.length || 3

      if (currentProgress.hintsRevealed >= maxHints) {
        return prev
      }

      return {
        ...prev,
        hintsUsedTotal: prev.hintsUsedTotal + 1,
        puzzleProgress: {
          ...prev.puzzleProgress,
          [puzzleId]: {
            ...currentProgress,
            hintsRevealed: currentProgress.hintsRevealed + 1
          }
        }
      }
    })
  }, [])

  const revealSolution = useCallback((puzzleId) => {
    setSession(prev => {
      const currentProgress = prev.puzzleProgress[puzzleId] || {
        hintsRevealed: 0,
        solutionRevealed: false,
        completed: false
      }

      return {
        ...prev,
        solutionsUsedTotal: prev.solutionsUsedTotal + 1,
        puzzleProgress: {
          ...prev.puzzleProgress,
          [puzzleId]: {
            ...currentProgress,
            solutionRevealed: true
          }
        }
      }
    })
  }, [])

  const completePuzzle = useCallback((puzzleId) => {
    setSession(prev => {
      const currentProgress = prev.puzzleProgress[puzzleId] || {
        hintsRevealed: 0,
        solutionRevealed: false,
        completed: false
      }

      const updatedProgress = {
        ...prev.puzzleProgress,
        [puzzleId]: {
          ...currentProgress,
          completed: true
        }
      }

      // Check if all puzzles are completed
      const allCompleted = gameData.puzzles.every(
        puzzle => updatedProgress[puzzle.id]?.completed
      )

      return {
        ...prev,
        puzzleProgress: updatedProgress,
        gameCompleted: allCompleted
      }
    })
  }, [])

  const getPuzzleProgress = useCallback((puzzleId) => {
    return session.puzzleProgress[puzzleId] || {
      hintsRevealed: 0,
      solutionRevealed: false,
      completed: false
    }
  }, [session.puzzleProgress])

  const isPuzzleUnlocked = useCallback((puzzleIndex) => {
    if (puzzleIndex === 0) {
      return session.boxOpeningCompleted
    }
    const previousPuzzle = gameData.puzzles[puzzleIndex - 1]
    return session.puzzleProgress[previousPuzzle?.id]?.completed || false
  }, [session.boxOpeningCompleted, session.puzzleProgress])

  const hasExistingSession = useCallback(() => {
    return session.startTime !== null
  }, [session.startTime])

  const value = {
    session,
    startSession,
    pauseSession,
    resetSession,
    completeBoxOpening,
    advanceBoxStep,
    revealHint,
    revealSolution,
    completePuzzle,
    getPuzzleProgress,
    isPuzzleUnlocked,
    hasExistingSession,
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
