import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 bg-wine-dark/50 px-3 py-1 rounded-full
                 hover:bg-wine-dark transition-colors duration-200"
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      <span className={`text-sm font-medium ${language === 'fr' ? 'text-gold' : 'text-cream/50'}`}>
        FR
      </span>
      <span className="text-cream/30">|</span>
      <span className={`text-sm font-medium ${language === 'en' ? 'text-gold' : 'text-cream/50'}`}>
        EN
      </span>
    </button>
  )
}
