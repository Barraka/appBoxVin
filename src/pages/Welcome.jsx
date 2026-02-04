import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { useAudio } from '../contexts/AudioContext'
import Layout from '../components/Layout'

export default function Welcome() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { hasExistingSession, resetSession, startSession } = useSession()
  const { play } = useAudio()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleStart = () => {
    play()
    startSession()
    navigate('/derniermillesime/introduction')
  }

  const handleResume = () => {
    play()
    startSession()
    navigate('/derniermillesime/puzzles')
  }

  const handleNewGame = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }
    play()
    resetSession()
    startSession()
    navigate('/derniermillesime/introduction')
  }

  const hasSession = hasExistingSession()

  return (
    <Layout
      title={t('welcome.title')}
      subtitle={t('welcome.subtitle')}
      showTimer={false}
    >
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 py-4 relative">
        {/* Wine stain decoration */}
        <div className="w-24 h-24 rounded-full bg-wine/30 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Tagline */}
        <p className="text-cream/70 text-center italic">
          {t('welcome.tagline')}
        </p>

        {/* Buttons */}
        <div className="w-full space-y-3 mt-4 sm:mt-8">
          {hasSession ? (
            <>
              <button
                onClick={handleResume}
                className="btn-primary w-full text-lg"
              >
                {t('welcome.resumeButton')}
              </button>

              <button
                onClick={handleNewGame}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200
                          ${showConfirm
                            ? 'bg-wine-light text-cream'
                            : 'bg-transparent border border-cream/30 text-cream/70 hover:border-cream/50'
                          }`}
              >
                {showConfirm ? t('common.yes') + '?' : t('welcome.newGameButton')}
              </button>

              {showConfirm && (
                <p className="text-cream/50 text-xs text-center animate-fadeIn">
                  {t('welcome.confirmReset')}
                </p>
              )}
            </>
          ) : (
            <button
              onClick={handleStart}
              className="btn-primary w-full text-lg"
            >
              {t('welcome.startButton')}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}
