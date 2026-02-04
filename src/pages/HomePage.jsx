import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function HomePage() {
  const navigate = useNavigate()

  const escapeBoxes = [
    {
      id: 'derniermillesime',
      title: 'Le Dernier Millésime',
      emoji: '🍷',
      available: true
    }
    // Future boxes can be added here
    // {
    //   id: 'another-box',
    //   title: 'Another Adventure',
    //   emoji: '🎭',
    //   available: false
    // }
  ]

  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-header py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <img
            src={logo}
            alt="Escape Yourself"
            className="h-16 sm:h-20 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h1 className="text-header text-2xl sm:text-3xl font-bold mb-2">
            Escape Box
          </h1>
          <p className="text-header/60 text-sm">
            Choisissez votre aventure
          </p>
        </div>

        {/* Box Cards */}
        <div className="w-full max-w-lg space-y-4">
          {escapeBoxes.map((box) => (
            <button
              key={box.id}
              onClick={() => box.available && navigate(`/${box.id}`)}
              disabled={!box.available}
              className={`w-full rounded-2xl transition-all duration-300
                         overflow-hidden shadow-lg hover:shadow-xl
                         ${box.available
                           ? 'cursor-pointer transform hover:-translate-y-1'
                           : 'cursor-not-allowed opacity-50'
                         }`}
            >
              {/* Card Header - Wine colored */}
              <div className="bg-wine-dark px-6 py-8 text-center">
                <span className="text-5xl mb-4 block">{box.emoji}</span>
                <h2 className="text-cream font-script text-4xl sm:text-5xl">
                  {box.title}
                </h2>
              </div>

              {/* Card Footer */}
              <div className="bg-header px-6 py-4 flex items-center justify-between">
                {box.available ? (
                  <>
                    <span className="text-gold text-sm font-medium">
                      Jouer maintenant
                    </span>
                    <span className="text-gold text-xl">→</span>
                  </>
                ) : (
                  <span className="text-cream/50 text-sm">Bientôt disponible</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-header py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cream/40 text-xs">
            © Escape Yourself - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  )
}
