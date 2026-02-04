import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'

export default function BoxOpening() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { session, advanceBoxStep, completeBoxOpening, uncompleteBoxOpening } = useSession()

  const currentStep = session.currentBoxStep
  const totalSteps = gameData.boxOpening.length
  const isCompleted = session.boxOpeningCompleted

  const handleComplete = () => {
    completeBoxOpening()
  }

  const handleUncomplete = () => {
    uncompleteBoxOpening()
  }

  const handleNextStep = () => {
    advanceBoxStep()
  }

  const handleGoToNextPuzzle = () => {
    // After box opening, go to puzzle 2 (enigme-2)
    navigate('/derniermillesime/puzzle/enigme-2')
  }

  const handleBack = () => {
    navigate('/derniermillesime/puzzles')
  }

  return (
    <Layout
      title={t('boxOpening.title')}
      showTimer={true}
    >
      <div className="space-y-4">
        {/* Mark as complete button - always visible at top when not completed */}
        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="w-full py-4 bg-gold/20 border-2 border-gold border-dashed rounded-xl
                       text-gold font-medium hover:bg-gold/30 hover:border-solid
                       transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✓</span>
            <span>{t('boxOpening.done')}</span>
          </button>
        )}

        {/* Already completed state */}
        {isCompleted && (
          <div className="text-center py-4 bg-gold/20 rounded-xl animate-fadeIn">
            <p className="text-gold font-script text-3xl">
              ✓ {t('boxOpening.completed')}
            </p>

            {/* Go to next puzzle button */}
            <button
              onClick={handleGoToNextPuzzle}
              className="btn-primary mt-4 animate-glow"
            >
              {t('tableOfContents.puzzle')} 2 →
            </button>

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

        {/* Steps revealed */}
        {!isCompleted && gameData.boxOpening.slice(0, currentStep + 1).map((step, index) => (
          <div
            key={index}
            className="bg-header/80 rounded-xl p-4 animate-fadeIn"
          >
            <p className="text-gold font-script text-2xl mb-2">
              {t('boxOpening.step')} {step.step}
            </p>
            <p className="text-cream text-sm leading-relaxed">
              {step[language]}
            </p>
          </div>
        ))}

        {/* Next step button */}
        {!isCompleted && currentStep < totalSteps - 1 && (
          <button
            onClick={handleNextStep}
            className="w-full py-4 bg-wine-light rounded-xl text-cream font-medium
                       hover:bg-wine transition-colors duration-200"
          >
            {t('boxOpening.step')} {currentStep + 2}
          </button>
        )}

        {/* Back to menu */}
        <button
          onClick={handleBack}
          className="w-full py-3 rounded-lg text-cream/50
                     border border-cream/30
                     hover:text-cream/70 hover:border-cream/50
                     transition-colors duration-200 mt-4"
        >
          ← {t('boxOpening.backToMenu')}
        </button>
      </div>
    </Layout>
  )
}
