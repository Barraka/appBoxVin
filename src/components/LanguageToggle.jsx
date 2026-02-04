import { useLanguage } from '../contexts/LanguageContext'
import flagFr from '../assets/flag-fr.png'
import flagEn from '../assets/flag-en.png'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 bg-wine-dark/50 px-2 py-1 rounded-full
                 hover:bg-wine-dark transition-colors duration-200"
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      <img
        src={flagFr}
        alt="Français"
        className={`w-5 h-4 rounded-sm object-cover ${language === 'fr' ? 'ring-2 ring-gold' : 'opacity-40'}`}
      />
      <img
        src={flagEn}
        alt="English"
        className={`w-5 h-4 rounded-sm object-cover ${language === 'en' ? 'ring-2 ring-gold' : 'opacity-40'}`}
      />
    </button>
  )
}
