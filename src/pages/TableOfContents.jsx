import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'
import PuzzleCard from '../components/PuzzleCard'

export default function TableOfContents() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { session, isPuzzleUnlocked, getPuzzleProgress } = useSession()

  const getPuzzleStatus = (puzzle, index) => {
    const progress = getPuzzleProgress(puzzle.id)
    if (progress.completed) return 'completed'
    if (isPuzzleUnlocked(index)) return 'available'
    return 'locked'
  }

  const boxOpeningStatus = session.boxOpeningCompleted
    ? 'completed'
    : 'available'

  return (
    <Layout
      title={t('tableOfContents.title')}
      showTimer={true}
    >
      <div className="space-y-3">
        {/* Box Opening Section */}
        <button
          onClick={() => navigate('/box-opening')}
          className={`w-full p-4 rounded-xl flex items-center justify-between
                     transition-all duration-200
                     ${boxOpeningStatus === 'completed'
                       ? 'bg-header/60 text-cream/80 hover:bg-header/80'
                       : 'bg-gold/20 text-cream hover:bg-gold/30'
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
            {boxOpeningStatus === 'completed' ? '✓' : '→'}
          </span>
        </button>

        {/* Divider */}
        <div className="border-t border-cream/10 my-4" />

        {/* Puzzles */}
        {gameData.puzzles.map((puzzle, index) => (
          <PuzzleCard
            key={puzzle.id}
            puzzle={puzzle}
            index={index}
            status={getPuzzleStatus(puzzle, index)}
          />
        ))}

        {/* Check for victory */}
        {session.gameCompleted && (
          <button
            onClick={() => navigate('/victory')}
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
