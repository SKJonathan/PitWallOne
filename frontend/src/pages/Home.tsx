import { useState, useEffect } from 'react'
import heroImg from "../assets/hero.png"


interface Driver {
  id: number
  position: number
  name: string
  team: string
  points: number
}

interface Race {
  raceName: string
  circuit: string
  locality: string
  country: string
  date: string
  time: string
}

interface Weather{
  trackTemp: number
  airTemp: number
  humidity: number
  rainfall: number
  windSpeed: number
  date: string
}

const API_URL = import.meta.env.VITE_API_URL || ''


function getMonthDate(stringDate: string){
  const dateStr = stringDate
  const date = new Date(dateStr)

  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-GB', {month: 'short'}).toUpperCase();

  const formattedDate = `${day} ${month}`

  return formattedDate
}

function getTimeLeft(target: Date) {
  const total = target.getTime() - Date.now()
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { total, days, hours, minutes, seconds }
}

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()))
  const [nextRace, setNextRace] = useState<Race | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)
  const top5 = drivers.slice(0,5)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/drivers`)
      .then((res) => res.json())
      .then((data) => setDrivers(data))
  }, [])

  useEffect(() => {
    if(!nextRace) return
    const target = new Date(`${nextRace.date}T${nextRace.time}`)
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [nextRace])

    useEffect(() => {
    fetch(`${API_URL}/api/next-race`)
      .then((res) => res.json())
      .then((data) => setNextRace(data))
  }, [])
 
  useEffect(() => {
    const getWeather = () => {
      fetch(`${API_URL}/api/weather`)
        .then((res) => res.json())
        .then((data) => setWeather(data))
    }
    getWeather()
    const id = setInterval(getWeather, 30000)
    return () => clearInterval(id)
  }, [])


return (
  <div className="min-h-screen bg-carbon text-white">
    {/* Block 1: Nav */}
    
    
    <header className="relative h-[70vh] min-h-[500px] flex flex-col justify-end p-12 overflow-hidden">
  <img src={heroImg} alt="Ferrari F1 car" className="absolute inset-0 size-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />

  <div className="relative z-10 max-w-2xl">
    <h1 className="text-6xl md:text-8xl font-extrabold uppercase italic tracking-tighter leading-none">
      {nextRace?.raceName} 
      {/* <br /> Grand Prix */}
    </h1>
    <p className="mt-4 text-white/60 font-mono text-sm">
      52 laps under the floodlights.
    </p>
  </div>
</header>

{/* Standings + Next Race */}
<div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/10">

  {/* Standings */}
  <section className="lg:col-span-1 bg-carbon p-8">
    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] mb-8 text-white/40 border-l-2 border-f1-red pl-4">
      Championship Standings
    </h2>

    <div className="space-y-1">
      
      {top5.map((driver, i) => (
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
      <button onClick={() => setShowAll(!showAll)} className='mt-4 w-full border border-white/10 py-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30'> 
        {showAll ? 'Show less' : 'Show all'}
      </button>
    </div>
    
  </section>

  {/* Right column: Circut + Race Window on top, new div below */}
  <div className="lg:col-span-2 flex flex-col">

  <div className="grid grid-cols-1 lg:grid-cols-2">

  {/* Next Race */}
  <section className="bg-carbon p-8 border-t border-white/10 lg:border-t-0 lg:border-l">
    <h2 className="text-3xl font-extrabold uppercase italic tracking-tighter leading-none">
      The Circuit
    </h2>

    {/* <p className="text-3xl font-extrabold uppercase italic tracking-tighter leading-none">
      Silverstone <br /> Grand Prix
    </p> */}
    <p className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider/ 40 border-l-2 border-f1-red pl-4">
      {nextRace?.circuit}, {nextRace?.country}
    </p>

    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-[10px] uppercase tracking-wider text-white/40">Laps</span>
        <span className="font-mono font-bold text-sm">52</span>
      </div>
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-[10px] uppercase tracking-wider text-white/40">Length</span>
        <span className="font-mono font-bold text-sm">5.891 km</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-white/40">Date</span>
        <span className="font-mono font-bold text-sm">{nextRace? getMonthDate(nextRace.date) : ''}</span>
      </div>
    </div>
    
  </section>


  {/* COUNTDOWN TO NEXT RACE */}
  <section className="bg-carbon p-8 border-t border-white/10 lg:border-t-0 lg:border-l">
    <h2 className="text-3xl font-extrabold uppercase italic tracking-tighter leading-none">
      Race Window
    </h2>

    <div className="mt-8 grid grid-cols-4 gap-2 text-center border border-white/10 p-3 rounded">
      <div className="border border-white/10 rounded py-3">
        <p className="font-mono font-extrabold text-2xl">{timeLeft.days}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/40">Days</p>
      </div>
      <div className="border border-white/10 rounded py-3">
        <p className="font-mono font-extrabold text-2xl">{String(timeLeft.hours).padStart(2, '0')}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/40">Hrs</p>
      </div>
      <div className="border border-white/10 rounded py-3">
        <p className="font-mono font-extrabold text-2xl">{String(timeLeft.minutes).padStart(2, '0')}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/40">Min</p>
      </div>
      <div className="border border-white/10 rounded py-3">
        <p className="font-mono font-extrabold text-2xl text-f1-red">{String(timeLeft.seconds).padStart(2, '0')}</p>
        <p className="text-[10px] uppercase tracking-wider text-white/40">Sec</p>
      </div>
    </div>

    {timeLeft.total <= 0 && (
      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-f1-red">
        Lights out
      </p>
    )}
  </section>

  </div>

  {/* Weather stats*/}
  <section className="bg-carbon p-8 border-t border-white/10 border-b border-white/10 lg:border-l rounded">
  <div className='flex flex-row gap-40'>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Air-Temp
    </h2>
      <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-white">
        {weather?.airTemp}&deg;C 
    </h2>
    </div>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Track-Temp
    </h2>
      <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-white">
        {weather?.trackTemp}&deg;C 
    </h2>
    </div>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Humidity
    </h2>
      <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-white">
        {weather?.humidity}%
    </h2>
    </div>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Wind-Speed
    </h2>
      <h2 className="text-3xl font-extrabold lowercase tracking-tighter text-white">
        {weather?.windSpeed}m/s
    </h2>
    </div>
  </div>
    {/* <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/40 border-l-2 border-f1-red pl-4">
      New Section
    </h2> */}
  </section>

  </div>
</div>

  </div>
)
}

export default App