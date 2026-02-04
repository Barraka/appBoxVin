import { useLanguage } from '../contexts/LanguageContext'

export default function ScoreDisplay({
  hintsRevealed = 0,
  solutionRevealed = false,
  showLabel = true,
  size = 'normal' // 'small', 'normal', 'large'
}) {
  const { t } = useLanguage()

  // Calculate stars: 5 max, -1 per hint, 0 if solution viewed
  const calculateStars = () => {
    if (solutionRevealed) return 0
    return Math.max(0, 5 - hintsRevealed)
  }

  const stars = calculateStars()
  const maxStars = 5

  const sizeClasses = {
    small: 'text-sm gap-0.5',
    normal: 'text-lg gap-1',
    large: 'text-2xl gap-1'
  }

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      {showLabel && (
        <span className="text-cream/60 text-xs mr-2">{t('score.possible')}:</span>
      )}
      <div className="flex">
        {[...Array(maxStars)].map((_, i) => (
          <span
            key={i}
            className={`transition-all duration-300 ${
              i < stars
                ? 'text-gold'
                : 'text-cream/20'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  )
}

// Helper function to calculate score (can be used elsewhere)
export function calculatePuzzleScore(hintsRevealed, solutionRevealed) {
  if (solutionRevealed) return 0
  return Math.max(0, 5 - hintsRevealed)
}
