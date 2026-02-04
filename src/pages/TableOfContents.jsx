import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'
import PuzzleCard from '../components/PuzzleCard'

export default function TableOfContents() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { session, isPuzzleUnlocked, isBoxOpeningUnlocked, getPuzzleProgress } = useSession()

  const getPuzzleStatus = (puzzle, index) => {
    const progress = getPuzzleProgress(puzzle.id)
    if (progress.completed) return 'completed'
    if (isPuzzleUnlocked(index)) return 'available'
    return 'locked'
  }

  const boxOpeningUnlocked = isBoxOpeningUnlocked()
  const boxOpeningStatus = session.boxOpeningCompleted
    ? 'completed'
    : boxOpeningUnlocked
      ? 'available'
      : 'locked'

  // First puzzle (Le Labyrinthe)
  const firstPuzzle = gameData.puzzles[0]
  const firstPuzzleStatus = getPuzzleStatus(firstPuzzle, 0)

  // Remaining puzzles (index 1 onwards)
  const remainingPuzzles = gameData.puzzles.slice(1)

  return (
    <Layout
      title={t('tableOfContents.title')}
      showTimer={true}
    >
      <div className="space-y-3">
        {/* Puzzle 1: Le Labyrinthe (always first) */}
        <PuzzleCard
          puzzle={firstPuzzle}
          index={0}
          status={firstPuzzleStatus}
        />

        {/* Divider */}
        <div className="border-t border-cream/10 my-4" />

        {/* Box Opening Section (after Puzzle 1) */}
        <button
          onClick={() => boxOpeningStatus !== 'locked' && navigate('/derniermillesime/box-opening')}
          disabled={boxOpeningStatus === 'locked'}
          className={`w-full p-4 rounded-xl flex items-center justify-between
                     transition-all duration-200
                     ${boxOpeningStatus === 'completed'
                       ? 'bg-header/60 text-cream/80 hover:bg-header/80 cursor-pointer'
                       : boxOpeningStatus === 'available'
                         ? 'bg-gold/20 text-cream border-2 border-gold hover:bg-gold/30 cursor-pointer'
                         : 'bg-header/30 text-cream/30 cursor-not-allowed'
                     }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <div className="text-left">
              <p className="font-medium">
                {t('tableOfContents.boxOpening')}
              </p>
              <p className="text-xs opacity-60">
                {t(`tableOfContents.${boxOpeningStatus}`)}
              </p>
            </div>
          </div>
          <span className={`text-xl ${boxOpeningStatus === 'completed' ? 'text-gold' : ''}`}>
            {boxOpeningStatus === 'completed' ? '✓' : boxOpeningStatus === 'locked' ? '🔒' : '→'}
          </span>
        </button>

        {/* Divider */}
        <div className="border-t border-cream/10 my-4" />

        {/* Remaining Puzzles (2-8) */}
        {remainingPuzzles.map((puzzle, index) => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            index={index + 1}
            status={getPuzzleStatus(puzzle, index + 1)}
          />
        ))}

        {/* Check for victory */}
        {session.gameCompleted && (
          <button
            onClick={() => navigate('/derniermillesime/victory')}
            className="w-full p-4 rounded-xl bg-gold text-header font-bold
                       flex items-center justify-center gap-2 mt-4 animate-pulse-slow"
          >
            <span>🎉</span>
            <span>{t('victory.title')}</span>
            <span>🎉</span>
          </button>
        )}
      </div>
    </Layout>
  )
}
