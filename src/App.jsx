import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Welcome from './pages/Welcome'
import Introduction from './pages/Introduction'
import TableOfContents from './pages/TableOfContents'
import BoxOpening from './pages/BoxOpening'
import Puzzle from './pages/Puzzle'
import Victory from './pages/Victory'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main landing page - box selection */}
        <Route path="/" element={<HomePage />} />

        {/* Le Dernier Millésime - Wine Box */}
        <Route path="/derniermillesime" element={<Welcome />} />
        <Route path="/derniermillesime/introduction" element={<Introduction />} />
        <Route path="/derniermillesime/puzzles" element={<TableOfContents />} />
        <Route path="/derniermillesime/box-opening" element={<BoxOpening />} />
        <Route path="/derniermillesime/puzzle/:id" element={<Puzzle />} />
        <Route path="/derniermillesime/victory" element={<Victory />} />

        {/* Future boxes can be added here */}
        {/* <Route path="/anotherbox/*" element={...} /> */}
      </Routes>
    </>
  )
}

export default App
