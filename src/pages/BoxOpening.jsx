import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'

export default function BoxOpening() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { session, advanceBoxStep, completeBoxOpening } = useSession()

  const currentStep = session.currentBoxStep
  const totalSteps = gameData.boxOpening.length
  const isCompleted = session.boxOpeningCompleted

  const handleNextStep = () => {
    if (currentStep >= totalSteps - 1) {
      completeBoxOpening()
    } else {
      advanceBoxStep()
    }
  }

  const handleBack = () => {
    navigate('/puzzles')
  }

  return (
    <Layout
      title={t('boxOpening.title')}
      showTimer={true}
    >
      <div className="space-y-4">
        {/* Steps revealed */}
        {gameData.boxOpening.slice(0, currentStep + (isCompleted ? totalSteps : 1)).map((step, index) => (
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

        {/* Complete button (on last step) */}
        {!isCompleted && currentStep === totalSteps - 1 && (
          <button
            onClick={handleNextStep}
            className="btn-primary w-full"
          >
            {t('boxOpening.done')}
          </button>
        )}

        {/* Back to menu */}
        <button
          onClick={handleBack}
          className="w-full py-3 rounded-lg text-cream/70 hover:text-cream
                     transition-colors duration-200"
        >
          ← {t('boxOpening.backToMenu')}
        </button>
      </div>
    </Layout>
  )
}
