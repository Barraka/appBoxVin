# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A customer-facing webapp for "Escape Yourself" escape room business. The app serves as a **hint manager** for the "Box Vin - Le Dernier Millésime" mobile escape box game, enabling autonomous play sessions where players can pick up the box, play at home without a Game Master, and return it later.

## Tech Stack

- **Frontend**: React 18 with Vite 6
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6
- **State Management**: React Context API
- **Persistence**: localStorage
- **Hosting**: Self-hosted on dedicated URL

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── main.jsx                    # Entry point with providers
├── App.jsx                     # Router configuration
├── index.css                   # Global styles + Tailwind
├── data/
│   └── gameData.js             # All puzzle content (FR + EN)
├── i18n/
│   ├── fr.json                 # French UI strings
│   └── en.json                 # English UI strings
├── contexts/
│   ├── LanguageContext.jsx     # Bilingual support (FR/EN)
│   └── SessionContext.jsx      # Game state management
├── components/
│   ├── Layout.jsx              # Wine bottle container UI
│   ├── Timer.jsx               # Elapsed time display
│   ├── LanguageToggle.jsx      # FR/EN switcher
│   ├── HintReveal.jsx          # Progressive hint system
│   └── PuzzleCard.jsx          # Puzzle list item
├── pages/
│   ├── Welcome.jsx             # Start/resume screen
│   ├── Introduction.jsx        # Avant-propos / rules
│   ├── TableOfContents.jsx     # Puzzle navigation
│   ├── BoxOpening.jsx          # Box opening instructions
│   ├── Puzzle.jsx              # Individual puzzle view
│   └── Victory.jsx             # Congratulations screen
└── utils/
    └── storage.js              # localStorage helpers
```

## Core Features

### Session Management
- Session state persisted in localStorage
- Resume existing session or start new
- Timer tracks elapsed time (informational, no limit)

### Puzzle Progression
- **Linear unlock**: Puzzles unlock sequentially (must complete puzzle N to access N+1)
- **Box Opening**: First step before puzzles unlock
- **9 Puzzles**: Le Labyrinthe, Le niveau des bouteilles, Les étiquettes, Le poème du vignoble, Les cépages, Les verres, Les fiches de dégustation, Les tire-bouchons, Les arômes

### Progressive Hint System
- Each puzzle has 3 hints + 1 solution
- Hints revealed progressively (tap to reveal next)
- Solution only available after viewing all hints
- Players can complete puzzles without using any hints

### Bilingual Support
- French (default) and English
- UI strings in `/src/i18n/*.json`
- Game content (puzzles, hints) in `/src/data/gameData.js`
- Language preference saved to localStorage

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/data/gameData.js` | All puzzle content, hints, solutions (FR + EN) |
| `src/contexts/SessionContext.jsx` | Game state, progress tracking, persistence |
| `src/pages/Puzzle.jsx` | Main puzzle interaction logic |
| `src/components/HintReveal.jsx` | Progressive hint reveal UI |

## Design System

### Colors (Tailwind classes)
- `wine-dark` (#722F37) - Main burgundy
- `wine` (#8B3A42) - Accent wine
- `header` (#3D3D3D) - Dark charcoal
- `cream` (#D4C4A8) - Light text
- `gold` (#C9A962) - Accent/highlight

### Typography
- Titles: Tangerine (Google Font, script)
- Body: System font stack

## Architecture Notes

- **Offline-first**: All content embedded, no API calls needed
- **No authentication**: Session-based via localStorage
- **Mobile-first**: Designed for phone screens (players use their devices)
- **Wine bottle UI**: Layout mimics the physical hint booklet design
