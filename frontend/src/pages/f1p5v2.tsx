import { useState, useEffect } from 'react'
import { getTeamColour} from '../teamColours'
import type {Driver} from '../types'
import f1p5 from '../assets/f1p5.jpg'

const API_URL = import.meta.env.VITE_API_URL || ''


function Standingsv2() {

  const [drivers, setDrivers] = useState<Driver[]>([])
  


  
    useEffect(() => {
      fetch(`${API_URL}/api/f1p5`)
        .then((res) => res.json())
        .then((data) => setDrivers(data))
    }, [])
  


const top3 = drivers.slice(0,3)
const top3Podium = top3.length === 3 ? [top3[1], top3[0], top3[2]] : []
 
return (
  <div className='min-h-screen bg-carbon text-white' > {/* Page */}
    <section className="lg:col-span-1" > {/* Hero: badege title description */}
   <div className="px-10 pt-30 pb-24  bg-cover bg-center" style={{ backgroundImage: `url(${f1p5})` }}>
    <div className="absolute inset-0" style={{ backgroundImage: 
        'linear-gradient(to bottom, rgba(12,13,18,0.85) 0%, rgba(12,13,18,0.35) 30%, rgb(12, 13, 18) 70%)' }}/>
        <div className='relative'>
            <span className='inline-block bg-f1-red px-2 py-1 text-s font-bold uppercase tracking-widest'>
                Midfield Championship 2026 - Round 12
            </span>
            <h1 className='mt-4 text-6x1 md:text-8x1 text-9xl font-extrabold uppercase italic tracking-tighter leading-none'>
                F 1.5 <br /> Standings
            </h1>
            <p className='mt-4 max-w-md text-s text-white/40 leading-relaxed'>
                Every driver, every point, from the current season.
            </p>
        </div>
    </div>
    </section>

    <section className='grid md:grid-cols-3 gap-px bg-white/5 border-b border-white/5'>  {/* top 3 cards, side by side */}
        {top3Podium.map((driver) => (
            <div key={driver.id} className='relative overflow-hidden bg-carbon p-8'>
                <span className='absolute right-17 top-1/3 -translate-y-1/2 text-[140px] font-extrabold italic leading-none
                 text-white/5 select-none pointer-events-none'> {driver.position}</span>
                
                <div className='w-10 h-1 rounded-sm' style={{backgroundColor: getTeamColour(driver.teamid) }}/>
                    <p className='mt-6 text-[12px] uppercase tracking-widest text-white/40'> {driver.code}</p>
                    <p className='mt-1 text-3xl font-extrabold uppercase -italic'> {driver.name}</p>
                    <p className='mt-1 text-xs uppercase tracking-widest text-white/40'> {driver.team}</p>
                    
                     
                    <div className='mt-6 flex items-end gap-12'>
                        <div>
                            <p className='font-mono font-bold text-4xl italic leading-none'> {driver.points} </p>
                            <p className='mt-1 text-xs   uppercase tracking-widest text-white/40'> Points</p>
                        </div>
                        <div>
                            <p className='font-mono  text-2xl leading-none'>{driver.wins}</p>
                            <p className='mt-1 text-xs uppercase tracking-widest text-white/40'> Wins</p>
                        </div>
                        <div>
                            <p className='font-mono  text-2xl leading-none'>{driver.wins} {/* TODO: fix this to podiums */}</p>
                            <p className='mt-1 text-xs uppercase tracking-widest text-white/40'> pudiums</p>
                        </div>
                    </div>
                </div>
        ))}
    </section>


    <section className='px-8 py-12'> {/* full classification */}
        <h2 className="flex items-center gap-3 text-s font-bold uppercase tracking-widest text-white/40">
        <span className='w-0.5 h-4 bg-f1-red'/>
        Full classification
        </h2>
        <div className='mt-6 grid grid-cols-[60px_1fr_1fr_80px_100px] gap-4 items-center border-b border-white/10 
        pb-3 text-xs uppercase tracking-widest text-white/40'>
            <span>Pos</span>
            <span>Driver</span>
            <span>Team</span>
            <span className='text-right'>Wins</span>
            <span className='text-right'> Points</span>
        </div>
        {drivers.map((driver, i) => (
            <div key={driver.id} className='grid grid-cols-[60px_1fr_1fr_80px_100px] gap-4 items-center border-b
             border-white/5 py-4 hover:bg-white/5 transition-color'>
            <span className={`font-mono font-bold ${i === 0 ? 'text-f1-red' : 'text-white/40'}`}>
                {String(driver.position).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-4">
                <span className="w-0.5 h-5 rounded-sm shrink-0" style={{ backgroundColor: getTeamColour(driver.teamid) }} />
                <span className="font-extrabold uppercase text-sm">{driver.name}</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40">{driver.team}</span>
            <span className='font-mono font-bold text-right'>{driver.wins}</span>
            <span className="font-mono font-bold text-right">{driver.points}</span>
            
            </div>
        )) }
        
    </section>
    <footer></footer>
  </div>


)
}

export default Standingsv2