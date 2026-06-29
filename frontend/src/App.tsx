import { useState, useEffect } from 'react'
import heroImg from "./assets/hero.png"


interface Driver {
  id: number
  position: number
  name: string
  team: string
  points: number
}

const API_URL = import.meta.env.VITE_API_URL || ''

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/drivers`)
      .then((res) => res.json())
      .then((data) => setDrivers(data))
  }, [])

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
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white">Schedule</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Standings</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Teams</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Drivers</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Stats</a>
      </div>
    </nav>

    <header className="relative h-[70vh] min-h-[500px] flex flex-col justify-end p-12 overflow-hidden">
  <img src={heroImg} alt="Ferrari F1 car" className="absolute inset-0 size-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />

  <div className="relative z-10 max-w-2xl">
    <h1 className="text-6xl md:text-8xl font-extrabold uppercase italic tracking-tighter leading-none">
      Silverstone <br /> Grand Prix
    </h1>
    <p className="mt-4 text-white/60 font-mono text-sm">
      52 laps under the floodlights.
    </p>
  </div>
</header>

{/* Standings */}
<section className="bg-carbon p-8 border-t border-white/10">
  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] mb-8 text-white/40 border-l-2 border-f1-red pl-4">
    Championship Standings
  </h2>

  <div className="space-y-5">
    {drivers.map((driver, i) => (
      <div key={driver.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
        <div className="flex items-center gap-4">
          <span className={`font-mono font-bold ${i === 0 ? 'text-f1-red' : 'text-white/40'}`}>
            {driver.position}
          </span>
          <div>
            <p className="font-extrabold uppercase text-sm">{driver.name}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{driver.team}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono font-bold">{driver.points}</p>
          <p className="text-[10px] uppercase text-white/20">PTS</p>
        </div>
      </div>
    ))}
  </div>
</section>

  </div>
)
}

export default App