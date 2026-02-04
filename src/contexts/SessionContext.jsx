import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getFromStorage, saveToStorage, removeFromStorage } from '../utils/storage'
import { gameData } from '../data/gameData'

const SessionContext = createContext()

// Fallback for non-secure contexts (HTTP)
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID()
    } catch {
      // Falls through to fallback
    }
  }
  // Fallback: generate a simple unique ID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const createInitialState = () => ({
  sessionId: generateId(),
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

  const uncompleteBoxOpening = useCallback(() => {
    setSession(prev => ({
      ...prev,
      boxOpeningCompleted: false,
      gameCompleted: false
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

  const uncompletePuzzle = useCallback((puzzleId) => {
    setSession(prev => {
      const currentProgress = prev.puzzleProgress[puzzleId] || {
        hintsRevealed: 0,
        solutionRevealed: false,
        completed: false
      }

      return {
        ...prev,
        puzzleProgress: {
          ...prev.puzzleProgress,
          [puzzleId]: {
            ...currentProgress,
            completed: false
          }
        },
        gameCompleted: false // If uncompleting, game is no longer complete
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
    // Puzzle 0 (Le Labyrinthe) is always available from the start
    if (puzzleIndex === 0) {
      return true
    }
    // Puzzles 1+ require: Box Opening completed AND previous puzzle completed
    if (!session.boxOpeningCompleted) {
      return false
    }
    const previousPuzzle = gameData.puzzles[puzzleIndex - 1]
    return session.puzzleProgress[previousPuzzle?.id]?.completed || false
  }, [session.boxOpeningCompleted, session.puzzleProgress])

  const isBoxOpeningUnlocked = useCallback(() => {
    // Box Opening is unlocked after Puzzle 1 (Le Labyrinthe) is completed
    const firstPuzzle = gameData.puzzles[0]
    return session.puzzleProgress[firstPuzzle?.id]?.completed || false
  }, [session.puzzleProgress])

  const hasExistingSession = useCallback(() => {
    return session.startTime !== null
  }, [session.startTime])

  const value = {
    session,
    startSession,
    pauseSession,
    resetSession,
    completeBoxOpening,
    uncompleteBoxOpening,
    advanceBoxStep,
    revealHint,
    revealSolution,
    completePuzzle,
    uncompletePuzzle,
    getPuzzleProgress,
    isPuzzleUnlocked,
    isBoxOpeningUnlocked,
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
