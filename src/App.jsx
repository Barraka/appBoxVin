import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Introduction from './pages/Introduction'
import TableOfContents from './pages/TableOfContents'
import BoxOpening from './pages/BoxOpening'
import Puzzle from './pages/Puzzle'
import Victory from './pages/Victory'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/introduction" element={<Introduction />} />
      <Route path="/puzzles" element={<TableOfContents />} />
      <Route path="/box-opening" element={<BoxOpening />} />
      <Route path="/puzzle/:id" element={<Puzzle />} />
      <Route path="/victory" element={<Victory />} />
    </Routes>
  )
}

export default App
