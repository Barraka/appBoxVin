import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { gameData } from '../data/gameData'
import Layout from '../components/Layout'

export default function Introduction() {
  const navigate = useNavigate()
  const { language, t } = useLanguage()

  const intro = gameData.introduction[language]

  const handleContinue = () => {
    navigate('/derniermillesime/puzzles')
  }

  return (
    <Layout
      title={intro.title}
      subtitle={intro.subtitle}
      showTimer={false}
    >
      <div className="space-y-4 text-cream/90 text-sm leading-relaxed">
        {intro.paragraphs.map((paragraph, index) => (
          <p key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
            {paragraph}
          </p>
        ))}

        {/* Closing message */}
        <p className="text-gold text-center font-script text-2xl mt-6 animate-fadeIn">
          {intro.closing}
        </p>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="btn-primary w-full mt-6"
        >
          {t('introduction.continueButton')}
        </button>
      </div>
    </Layout>
  )
}
