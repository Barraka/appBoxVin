import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function PuzzleCard({
  puzzle,
  status = 'locked', // 'locked', 'available', 'completed'
  index
}) {
  const navigate = useNavigate()
  const { language, t } = useLanguage()

  const isClickable = status !== 'locked'

  const handleClick = () => {
    if (isClickable) {
      navigate(`/puzzle/${puzzle.id}`)
    }
  }

  const statusColors = {
    locked: 'bg-header/30 text-cream/30',
    available: 'bg-header/80 text-cream hover:bg-header cursor-pointer',
    completed: 'bg-header/60 text-cream/80 hover:bg-header/80 cursor-pointer'
  }

  const statusIcons = {
    locked: '🔒',
    available: '→',
    completed: '✓'
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isClickable}
      className={`w-full p-4 rounded-xl flex items-center justify-between
                 transition-all duration-200 ${statusColors[status]}
                 ${!isClickable ? 'cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gold font-script text-3xl">
          {puzzle.number}
        </span>
        <div className="text-left">
          <p className="font-medium">
            {puzzle.title[language]}
          </p>
          <p className="text-xs opacity-60">
            {t(`tableOfContents.${status}`)}
          </p>
        </div>
      </div>

      <span className={`text-xl ${status === 'completed' ? 'text-gold' : ''}`}>
        {statusIcons[status]}
      </span>
    </button>
  )
}
