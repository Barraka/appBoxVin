import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import { calculatePuzzleScore } from './ScoreDisplay'
import LanguageToggle from './LanguageToggle'
import SoundToggle from './SoundToggle'
import Timer from './Timer'

export default function Layout({ children, showTimer = false, showLanguage = true, title, subtitle }) {
  const { language } = useLanguage()
  const { getPuzzleProgress } = useSession()

  // Calculate total score from completed puzzles only
  const totalScore = gameData.puzzles.reduce((sum, puzzle) => {
    const progress = getPuzzleProgress(puzzle.id)
    // Only count score for completed puzzles
    if (progress.completed) {
      return sum + calculatePuzzleScore(progress.hintsRevealed, progress.solutionRevealed)
    }
    return sum
  }, 0)
  const maxScore = gameData.puzzles.length * 5

  return (
    <div className="min-h-[100dvh] flex flex-col items-stretch sm:items-center sm:p-4 bg-wine-dark sm:bg-transparent">
      {/* Wine bottle container */}
      <div className="flex-1 w-full sm:max-w-md relative flex flex-col">
        {/* Sticky header section */}
        <div className="sticky top-0 z-50 bg-header sm:rounded-t-3xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Score display (left side when timer is shown) */}
            <div className="flex items-center gap-1 text-gold">
              {showTimer && (
                <>
                  <span className="text-sm font-mono">{totalScore}</span>
                  <span className="text-xs text-cream/50">/</span>
                  <span className="text-xs text-cream/50">{maxScore}</span>
                  <span className="text-gold ml-0.5">★</span>
                </>
              )}
            </div>

            {/* Sound and Language toggles */}
            <div className="flex items-center gap-2 justify-end">
              <SoundToggle />
              {showLanguage && <LanguageToggle />}
            </div>
          </div>

          {/* Big Timer (sticky with header) */}
          {showTimer && (
            <div className="text-center pt-2">
              <Timer large />
            </div>
          )}
        </div>

        {/* Title section (scrolls with content) */}
        <div className="bg-header px-4 sm:px-6 pb-8 sm:pb-12 relative">
          {/* Title (when no timer) */}
          {!showTimer && title && (
            <div className="text-center pt-2">
              <h1 className="font-script text-5xl text-cream">{title}</h1>
              {subtitle && (
                <p className="text-gold text-sm mt-2 italic">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        {/* Curved transition */}
        <div className="relative h-12 bg-header">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <path
              d="M0,0 L0,30 Q50,100 100,30 L100,0 Z"
              fill="#3D3D3D"
            />
            <path
              d="M0,30 Q50,100 100,30 L100,100 L0,100 Z"
              fill="#722F37"
            />
          </svg>
        </div>

        {/* Body section (bottle body) */}
        <div className="flex-1 bg-wine-dark sm:rounded-b-3xl px-4 sm:px-6 pt-4 pb-6 sm:pb-8 flex flex-col">
          <div className="flex-1">
            {children}
          </div>

          {/* Attribution - pushed to bottom */}
          <a
            href="https://www.escapeyourself.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/60 hover:text-cream/80 text-xs py-3 mt-4 text-center block transition-colors"
          >
            Une aventure signée Escape Yourself
          </a>
        </div>
      </div>
    </div>
  )
}
