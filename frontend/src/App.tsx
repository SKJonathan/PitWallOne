import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Standings from './pages/Standings'

function App() {

return (
  <div className="min-h-screen bg-carbon text-white">
    {/* Block 1: Nav */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <span className="text-2xl font-extrabold uppercase italic tracking-tighter">
        PitWall<span className="text-f1-red">One</span>
        </span>
    </div>
    <nav className="flex items-center justify-start px-6 py-4 border-b border-white/10">
      
      <div className="flex gap-6 ">
        <a href="/" className="text-xs font-bold uppercase tracking-widest text-white">Schedule</a>
        <a href="/standings" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Standings</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Teams</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Drivers</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Stats</a>
      </div>
    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
  </div>
)
}
export default App