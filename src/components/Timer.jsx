import { useSession } from '../contexts/SessionContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Timer({ large = false }) {
  const { session } = useSession()
  const { t } = useLanguage()

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  if (large) {
    return (
      <div className="text-center">
        <p className="text-cream/70 text-sm mb-1">{t('timer.elapsed')}</p>
        <p className="font-mono text-4xl text-gold font-bold tracking-wider">
          {formatTime(session.elapsedTime)}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-wine-dark/50 px-3 py-1 rounded-full">
      <span className="font-mono text-sm text-gold">
        {formatTime(session.elapsedTime)}
      </span>
    </div>
  )
}
