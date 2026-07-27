import { useState, useEffect } from 'react'
import { getTeamColour} from '../teamColours'
import type {Driver} from '../types'

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
    <div className="grid lg:grid-cols-2 border-b">

  {/* Drivers Standings */}
  <section className="space-y-10 lg:col-span-1 bg-carbon p-8 ">
    <h2 className="text-6xl md:text-8xl h-50 font-extrabold uppercase italic tracking-tighter leading-none ">
      Drivers Standings
    </h2>

    <div className="space-y-3">
      
      {drivers.map((driver, i) => (
        <div key={driver.id} className="flex items-center full-w justify-between border-b border-white/5 pb-4 last:border-0">
          <div className="flex items-center gap-4">
            <span className={`font-mono font-bold w-6 text-right ${i === 0 ? 'text-f1-red' : 'text-white/40'}`}>
                      
              {driver.position} {' '}
            </span>
            <span  className="w-0.75 h-8 rounded-sm shrink-0" style= {{ backgroundColor: getTeamColour(driver.teamid)}}>
                        
            </span>
                      
            <div>
                <p className="font-extrabold uppercase text-sm">{driver.name}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">
                  {driver.team} · {' '}
                <span style={{ fontSize: 14,color: getTeamColour(driver.teamid)}}>
                  #{driver.driverNumber}  
                </span>
              </p>
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