import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'
import { calculatePuzzleScore } from '../components/ScoreDisplay'

export default function Victory() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { session, pauseSession, getPuzzleProgress } = useSession()

  // Pause timer when reaching victory
  if (session.isRunning) {
    pauseSession()
  }

  const victory = gameData.victory[language]

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    }
    return `${minutes}m ${seconds}s`
  }

  // Calculate scores for all puzzles
  const puzzleScores = gameData.puzzles.map(puzzle => {
    const progress = getPuzzleProgress(puzzle.id)
    return {
      puzzle,
      score: calculatePuzzleScore(progress.hintsRevealed, progress.solutionRevealed),
      hintsRevealed: progress.hintsRevealed,
      solutionRevealed: progress.solutionRevealed
    }
  })

  const totalScore = puzzleScores.reduce((sum, ps) => sum + ps.score, 0)
  const maxPossibleScore = gameData.puzzles.length * 5

  // Get performance message based on total score
  const getPerformanceMessage = () => {
    const percentage = totalScore / maxPossibleScore
    if (percentage === 1) return t('score.perfect')
    if (percentage >= 0.8) return t('score.great')
    if (percentage >= 0.5) return t('score.good')
    return t('score.completed')
  }

  // Render stars for a given score
  const renderStars = (score, maxStars = 5) => {
    return [...Array(maxStars)].map((_, i) => (
      <span
        key={i}
        className={`${i < score ? 'text-gold' : 'text-cream/20'}`}
      >
        ★
      </span>
    ))
  }

  return (
    <Layout
      title={victory.title}
      showTimer={false}
      showLanguage={true}
    >
      <div className="space-y-4 text-center">
        {/* Congratulations */}
        <p className="text-gold font-script text-4xl animate-fadeIn">
          {victory.congratulations}
        </p>

        {/* Message */}
        <p className="text-cream/90 text-sm leading-relaxed animate-fadeIn">
          {victory.message}
        </p>

        <p className="text-cream/80 text-sm animate-fadeIn">
          {victory.tastingTime}
        </p>

        {/* Total Score */}
        <div className="bg-header/60 rounded-xl p-4 mt-4 animate-fadeIn">
          <p className="text-cream/60 text-xs mb-2">{t('score.total')}</p>
          <p className="text-gold font-mono text-3xl flex items-center justify-center gap-2">
            <span>{totalScore}</span>
            <span className="text-2xl">★</span>
          </p>
          <p className="text-cream/50 text-sm">
            / {maxPossibleScore}
          </p>
          <p className="text-cream/80 text-sm mt-2 font-medium">
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Per-puzzle breakdown */}
        <div className="bg-header/40 rounded-xl p-4 animate-fadeIn">
          <p className="text-cream/60 text-xs mb-3">{t('score.earned')}</p>
          <div className="space-y-2">
            {puzzleScores.map(({ puzzle, score }) => (
              <div key={puzzle.id} className="flex justify-between items-center">
                <span className="text-cream/70 text-sm">
                  {t('tableOfContents.puzzle')} {puzzle.number}
                </span>
                <div className="flex gap-0.5 text-lg">
                  {renderStars(score)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-header/40 rounded-xl p-4 animate-fadeIn">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gold font-mono text-xl">
                {formatTime(session.elapsedTime)}
              </p>
              <p className="text-cream/60 text-xs">
                {t('victory.stats.time')}
              </p>
            </div>
            <div>
              <p className="text-gold font-mono text-xl">
                {session.hintsUsedTotal}
              </p>
              <p className="text-cream/60 text-xs">
                {t('victory.stats.hintsUsed')}
              </p>
            </div>
            <div>
              <p className="text-gold font-mono text-xl">
                {session.solutionsUsedTotal}
              </p>
              <p className="text-cream/60 text-xs">
                {t('victory.stats.solutionsUsed')}
              </p>
            </div>
          </div>
        </div>

        {/* Enjoy message */}
        <p className="text-cream/80 text-sm animate-fadeIn">
          {victory.enjoyMessage}
        </p>

        {/* Transport note */}
        <p className="text-cream/60 text-xs leading-relaxed animate-fadeIn">
          {victory.transportNote}
        </p>

        {/* Farewell */}
        <div className="mt-6 animate-fadeIn">
          <p className="text-cream/80 text-sm">
            {victory.farewell}
          </p>
          <p className="text-gold font-script text-4xl mt-2">
            {victory.bonAppetit}
          </p>
        </div>

        {/* Back to menu */}
        <button
          onClick={() => navigate('/derniermillesime/puzzles')}
          className="w-full py-3 rounded-lg text-cream/50 hover:text-cream/70
                     transition-colors duration-200 mt-4 text-sm"
        >
          ← {t('puzzle.backToMenu')}
        </button>
      </div>
    </Layout>
  )
}
