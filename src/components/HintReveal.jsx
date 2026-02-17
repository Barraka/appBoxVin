import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function FullscreenImage({ src, alt, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold
                   w-10 h-10 flex items-center justify-center
                   bg-black/50 rounded-full hover:bg-black/70 transition-colors"
      >
        ×
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

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
  const [showFullscreen, setShowFullscreen] = useState(false)

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
          {solution.image && (
            <>
              <img
                src={solution.image}
                alt={t('puzzle.solution')}
                className="mt-3 w-full rounded-lg cursor-pointer
                           border border-cream/20 hover:border-gold/50 transition-colors"
                onClick={() => setShowFullscreen(true)}
              />
              <p
                className="text-cream/50 text-xs text-center mt-1 cursor-pointer"
                onClick={() => setShowFullscreen(true)}
              >
                {language === 'fr' ? 'Appuyez pour agrandir' : 'Tap to enlarge'}
              </p>
            </>
          )}
        </div>
      )}

      {/* Fullscreen image overlay */}
      {showFullscreen && solution.image && (
        <FullscreenImage
          src={solution.image}
          alt={t('puzzle.solution')}
          onClose={() => setShowFullscreen(false)}
        />
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
