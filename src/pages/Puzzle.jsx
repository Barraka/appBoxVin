import { useNavigate, useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'
import HintReveal from '../components/HintReveal'

export default function Puzzle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { getPuzzleProgress, revealHint, revealSolution, completePuzzle, isPuzzleUnlocked } = useSession()

  const puzzleIndex = gameData.puzzles.findIndex(p => p.id === id)
  const puzzle = gameData.puzzles[puzzleIndex]
  const nextPuzzle = gameData.puzzles[puzzleIndex + 1]

  if (!puzzle) {
    return (
      <Layout title="Error" showTimer={true}>
        <p className="text-cream text-center">Puzzle not found</p>
        <button
          onClick={() => navigate('/puzzles')}
          className="btn-primary w-full mt-4"
        >
          {t('puzzle.backToMenu')}
        </button>
      </Layout>
    )
  }

  const progress = getPuzzleProgress(id)
  const isCompleted = progress.completed

  const handleRevealHint = () => {
    revealHint(id)
  }

  const handleRevealSolution = () => {
    revealSolution(id)
  }

  const handleComplete = () => {
    completePuzzle(id)
  }

  const handleNext = () => {
    if (nextPuzzle) {
      navigate(`/puzzle/${nextPuzzle.id}`)
    } else {
      navigate('/victory')
    }
  }

  const handleBack = () => {
    navigate('/puzzles')
  }

  return (
    <Layout
      title={`${t('tableOfContents.puzzle')} ${puzzle.number}`}
      subtitle={puzzle.title[language]}
      showTimer={true}
    >
      <div className="space-y-4">
        {/* Hint reveal system */}
        <HintReveal
          hints={puzzle.hints}
          solution={puzzle.solution}
          hintsRevealed={progress.hintsRevealed}
          solutionRevealed={progress.solutionRevealed}
          onRevealHint={handleRevealHint}
          onRevealSolution={handleRevealSolution}
        />

        {/* Mark as complete button */}
        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="btn-primary w-full mt-6"
          >
            {t('puzzle.completed')}
          </button>
        )}

        {/* Already completed state */}
        {isCompleted && (
          <div className="text-center py-4 animate-fadeIn">
            <p className="text-gold font-script text-3xl">
              ✓ {t('puzzle.alreadyCompleted')}
            </p>

            {/* Next puzzle button */}
            {nextPuzzle && isPuzzleUnlocked(puzzleIndex + 1) && (
              <button
                onClick={handleNext}
                className="btn-primary w-full mt-4"
              >
                {t('puzzle.nextPuzzle')} →
              </button>
            )}

            {/* Victory button if last puzzle */}
            {!nextPuzzle && (
              <button
                onClick={() => navigate('/victory')}
                className="btn-primary w-full mt-4"
              >
                {t('victory.title')} 🎉
              </button>
            )}
          </div>
        )}

        {/* Back to menu */}
        <button
          onClick={handleBack}
          className="w-full py-3 rounded-lg text-cream/70 hover:text-cream
                     transition-colors duration-200 mt-4"
        >
          ← {t('puzzle.backToMenu')}
        </button>
      </div>
    </Layout>
  )
}
