import { useNavigate, useParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'
import HintReveal from '../components/HintReveal'
import ScoreDisplay, { calculatePuzzleScore } from '../components/ScoreDisplay'

export default function Puzzle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { getPuzzleProgress, revealHint, revealSolution, completePuzzle, uncompletePuzzle } = useSession()

  const puzzleIndex = gameData.puzzles.findIndex(p => p.id === id)
  const puzzle = gameData.puzzles[puzzleIndex]
  const nextPuzzle = gameData.puzzles[puzzleIndex + 1]

  if (!puzzle) {
    return (
      <Layout title="Error" showTimer={true}>
        <p className="text-cream text-center">Puzzle not found</p>
        <button
          onClick={() => navigate('/derniermillesime/puzzles')}
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

  const handleUncomplete = () => {
    uncompletePuzzle(id)
  }

  const handleNext = () => {
    // After puzzle 1, go to box opening first
    if (puzzle.id === 'enigme-1') {
      navigate('/derniermillesime/box-opening')
    } else if (nextPuzzle) {
      navigate(`/derniermillesime/puzzle/${nextPuzzle.id}`)
    } else {
      navigate('/derniermillesime/victory')
    }
  }

  const handleBack = () => {
    navigate('/derniermillesime/puzzles')
  }

  return (
    <Layout
      title={`${t('tableOfContents.puzzle')} ${puzzle.number}`}
      subtitle={puzzle.title[language]}
      showTimer={true}
    >
      <div className="space-y-4">
        {/* Puzzle title */}
        <div className="text-center pb-2">
          <h2 className="text-gold font-script text-5xl font-bold">{puzzle.title[language]}</h2>
        </div>

        {/* Score display + Mark as complete button */}
        {!isCompleted && (
          <div className="bg-gold/20 border-2 border-gold border-dashed rounded-xl p-4
                         hover:bg-gold/30 hover:border-solid transition-all duration-200">
            {/* Score at top */}
            <div className="flex justify-center mb-3">
              <ScoreDisplay
                hintsRevealed={progress.hintsRevealed}
                solutionRevealed={progress.solutionRevealed}
                size="large"
              />
            </div>

            {/* Complete button */}
            <button
              onClick={handleComplete}
              className="w-full py-3 bg-gold text-header font-medium rounded-lg
                         hover:bg-gold/90 transition-all duration-200
                         flex items-center justify-center gap-2"
            >
              <span>✓</span>
              <span>{t('puzzle.completed')}</span>
            </button>
          </div>
        )}

        {/* Already completed state */}
        {isCompleted && (
          <div className="text-center py-4 bg-gold/20 rounded-xl animate-fadeIn">
            <p className="text-gold font-script text-3xl mb-2">
              ✓ {t('puzzle.alreadyCompleted')}
            </p>

            {/* Show earned score */}
            <div className="flex justify-center mb-3">
              <ScoreDisplay
                hintsRevealed={progress.hintsRevealed}
                solutionRevealed={progress.solutionRevealed}
                showLabel={false}
                size="large"
              />
            </div>

            {/* Next step button */}
            {(puzzle.id === 'enigme-1' || nextPuzzle) && (
              <button
                onClick={handleNext}
                className="btn-primary mt-2 animate-glow"
              >
                {puzzle.id === 'enigme-1' ? t('boxOpening.title') : t('puzzle.nextPuzzle')} →
              </button>
            )}

            {/* Victory button if last puzzle */}
            {!nextPuzzle && (
              <button
                onClick={() => navigate('/derniermillesime/victory')}
                className="btn-primary mt-2 animate-glow"
              >
                {t('victory.title')} 🎉
              </button>
            )}

            {/* Undo completion */}
            <button
              onClick={handleUncomplete}
              className="mt-4 block mx-auto px-4 py-2 text-cream/50 text-xs
                         border border-cream/30 rounded-lg
                         hover:text-cream/70 hover:border-cream/50 transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        )}

        {/* Divider */}
        {!isCompleted && (
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 border-t border-cream/20"></div>
            <span className="text-cream/40 text-xs uppercase">{t('puzzle.needHelp')}</span>
            <div className="flex-1 border-t border-cream/20"></div>
          </div>
        )}

        {/* Hint reveal system */}
        {!isCompleted && (
          <HintReveal
            hints={puzzle.hints}
            solution={puzzle.solution}
            hintsRevealed={progress.hintsRevealed}
            solutionRevealed={progress.solutionRevealed}
            onRevealHint={handleRevealHint}
            onRevealSolution={handleRevealSolution}
          />
        )}

        {/* Show hints summary if completed but hints were used */}
        {isCompleted && progress.hintsRevealed > 0 && (
          <div className="mt-4 pt-4 border-t border-cream/10">
            <p className="text-cream/50 text-xs mb-2">{t('puzzle.hintsUsedSummary')}</p>
            <HintReveal
              hints={puzzle.hints}
              solution={puzzle.solution}
              hintsRevealed={progress.hintsRevealed}
              solutionRevealed={progress.solutionRevealed}
              onRevealHint={() => {}}
              onRevealSolution={() => {}}
            />
          </div>
        )}

        {/* Back to menu */}
        <button
          onClick={handleBack}
          className="w-full py-3 rounded-lg text-cream/50
                     border border-cream/30
                     hover:text-cream/70 hover:border-cream/50
                     transition-colors duration-200 mt-4"
        >
          ← {t('puzzle.backToMenu')}
        </button>
      </div>
    </Layout>
  )
}
