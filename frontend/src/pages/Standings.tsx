import { useState, useEffect } from 'react'


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
    

{/* Standings + Next Race */}
<div className="grid  border-t border-white/10">

  {/* Standings */}
  <section className="space-y-10 lg:col-span-1 bg-carbon p-8">
    <h2 className="text-6xl md:text-8xl font-extrabold uppercase italic tracking-tighter leading-none">
      Championship Standings
    </h2>

    <div className="space-y-3">
      
      {drivers.map((driver, i) => (
        <div key={driver.id} className="flex items-center full-w justify-between border-b border-white/5 pb-4 last:border-0">
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
</div>

)
}

export default App