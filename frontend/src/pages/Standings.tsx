import { useState, useEffect } from 'react'

interface Driver {
  id: number
  position: number
  name: string
  team: string
  points: number
  driverNumber: string
  teamid: string
}

interface Constructor{
  id: number,
  position: number,
  name: string, 
  points: number,
  wins: string,
  teamid: string,
}


const API_URL = import.meta.env.VITE_API_URL || ''

const ConstructorColour: Record<string, string> = {
  mercedes: '#27F4D2 ',
  mclaren: '#FF8000',
  red_bull: '#3671C6',
  ferrari: '#E8002D ',
  rb: '#6692FF',
  williams: '#64C4FF',
  aston_martin: '#229971',
  alpine: '#0093CC',
  cadillac: '#000000',
  audi: '#BB0A30',
  haas: '#B6BABD',
}

export function getTeamColour(team: string){
  return ConstructorColour[team] || '#888888'
}



function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [constructor, setConstructor] = useState<Constructor[]>([])


  useEffect(() => {
    fetch(`${API_URL}/api/drivers`)
      .then((res) => res.json())
      .then((data) => setDrivers(data))
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/constructors`)
      .then((res) => res.json())
      .then((data) => setConstructor(data))
      .catch((err) => console.error('constructors fetch failed', err))
      
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
  
  {/* Constructor Standings */}
  <section className="space-y-10 lg:col-span-1 bg-carbon p-8">
    <h2 className="text-6xl md:text-8xl h-50 font-extrabold uppercase italic tracking-tighter leading-none">
      Constructors Standings
    </h2>   

    <div className="space-y-3">
      
      {constructor.map((constructor, i) => (
        <div key={constructor.id} className="flex items-center full-w justify-between border-b border-white/5 pb-4 last:border-0">
          <div className="flex items-center gap-4">
            <span className={`font-mono font-bold w-6 text-right ${i === 0 ? 'text-f1-red' : 'text-white/40'}`}>
                      
              {constructor.position} {' '}
            </span>
            <span  className="w-0.75 h-8 rounded-sm shrink-0" style= {{ backgroundColor: getTeamColour(constructor.teamid)}}>
                        
            </span>
                      
            <div>
                <p className="font-extrabold uppercase text-l">{constructor.name}</p>
                
            </div>
          </div>
            <div className="text-right">
              <p className="font-mono font-bold">{constructor.points}</p>
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