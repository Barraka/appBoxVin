import { useLanguage } from '../contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import Timer from './Timer'

export default function Layout({ children, showTimer = false, showLanguage = true, title, subtitle }) {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Wine bottle container */}
      <div className="w-full max-w-md mx-auto relative">
        {/* Header section (bottle neck) */}
        <div className="bg-header rounded-t-3xl px-6 pt-6 pb-12 relative">
          {/* Language toggle */}
          {showLanguage && (
            <div className="absolute top-4 right-4">
              <LanguageToggle />
            </div>
          )}

          {/* Timer */}
          {showTimer && (
            <div className="absolute top-4 left-4">
              <Timer />
            </div>
          )}

          {/* Title */}
          {title && (
            <div className="text-center mt-8">
              <h1 className="font-script text-5xl text-cream">{title}</h1>
              {subtitle && (
                <p className="text-gold text-sm mt-2 italic">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        {/* Curved transition */}
        <div className="relative h-12 bg-header">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <path
              d="M0,0 L0,30 Q50,100 100,30 L100,0 Z"
              fill="#3D3D3D"
            />
            <path
              d="M0,30 Q50,100 100,30 L100,100 L0,100 Z"
              fill="#722F37"
            />
          </svg>
        </div>

        {/* Body section (bottle body) */}
        <div className="bg-wine-dark rounded-b-3xl px-6 pt-4 pb-8 min-h-[400px]">
          {children}
        </div>
      </div>

      {/* Attribution */}
      <p className="text-wood/60 text-xs mt-4 text-center">
        Une aventure signée Escape Yourself
      </p>
    </div>
  )
}
