import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useSession } from '../contexts/SessionContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'
import Timer from '../components/Timer'

export default function Victory() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const { session, pauseSession } = useSession()

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

        {/* Stats */}
        <div className="bg-header/60 rounded-xl p-4 mt-4 animate-fadeIn">
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

        {/* Feedback prompt */}
        <p className="text-cream/70 text-sm animate-fadeIn">
          {victory.feedbackPrompt}
        </p>

        {/* QR Code placeholder - in real app, replace with actual QR */}
        <div className="bg-white rounded-xl p-4 mx-auto w-32 h-32 flex items-center justify-center animate-fadeIn">
          <div className="text-header text-xs text-center">
            [QR Code]
          </div>
        </div>

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
          onClick={() => navigate('/puzzles')}
          className="w-full py-3 rounded-lg text-cream/50 hover:text-cream/70
                     transition-colors duration-200 mt-4 text-sm"
        >
          ← {t('puzzle.backToMenu')}
        </button>
      </div>
    </Layout>
  )
}
