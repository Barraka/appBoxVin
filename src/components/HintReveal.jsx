import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function HintReveal({
  hints,
  solution,
  hintsRevealed,
  solutionRevealed,
  onRevealHint,
  onRevealSolution
}) {
  const { language, t } = useLanguage()
  const [confirmSolution, setConfirmSolution] = useState(false)

  const allHintsRevealed = hintsRevealed >= hints.length
  const canRevealSolution = allHintsRevealed && !solutionRevealed

  const handleSolutionClick = () => {
    if (!confirmSolution) {
      setConfirmSolution(true)
      return
    }
    onRevealSolution()
    setConfirmSolution(false)
  }

  return (
    <div className="space-y-4">
      {/* Revealed hints */}
      {hints.slice(0, hintsRevealed).map((hint, index) => (
        <div
          key={index}
          className="bg-header/80 rounded-xl p-4 transition-all duration-300 animate-fadeIn"
        >
          <p className="text-gold font-script text-2xl mb-2">
            {t('puzzle.hint')} {index + 1}
          </p>
          <p className="text-cream text-sm leading-relaxed">
            {hint[language]}
          </p>
        </div>
      ))}

      {/* Next hint button */}
      {hintsRevealed < hints.length && (
        <button
          onClick={onRevealHint}
          className="w-full py-4 bg-wine-light rounded-xl text-cream font-medium
                     hover:bg-wine transition-colors duration-200
                     flex items-center justify-center gap-2"
        >
          <span className="text-2xl">?</span>
          <span>{t('puzzle.hint')} {hintsRevealed + 1}</span>
        </button>
      )}

      {/* Solution */}
      {solutionRevealed && (
        <div className="bg-gold/20 border-2 border-gold rounded-xl p-4 animate-fadeIn">
          <p className="text-gold font-script text-2xl mb-2">
            {t('puzzle.solution')}
          </p>
          <p
            className="text-cream text-sm leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: solution[language] }}
          />
        </div>
      )}

      {/* Solution button (only after all hints) */}
      {canRevealSolution && (
        <button
          onClick={handleSolutionClick}
          className={`w-full py-4 rounded-xl font-medium transition-all duration-200
                     flex items-center justify-center gap-2
                     ${confirmSolution
                       ? 'bg-gold text-header'
                       : 'bg-wine-light/50 text-cream/70 hover:bg-wine-light hover:text-cream'
                     }`}
        >
          {confirmSolution ? (
            <>
              <span>?</span>
              <span>{t('common.yes')}, {t('puzzle.revealSolution')}</span>
            </>
          ) : (
            <>
              <span>!</span>
              <span>{t('puzzle.solution')}</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
