import { useState, useEffect } from 'react'
import heroImg from "../assets/hero.png"
import { Link } from 'react-router-dom'
import type { Driver, Race, Schedule} from '../types'
import {getTeamColour} from '../teamColours'

interface RawSession{
  label: string
  date?: string
  time?: string
  colour: string
  span?: number
}

type Session = {
  label: string
  colour: string
  span: number
  day: string
  hour: number
  time: string
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

const ScheduleColours = {
  practice:     'bg-white/10 text-white/60',
  sprintQuali:  'bg-white/20 text-white/80',
  sprint:       'bg-white/25 text-white',
  quali:        'bg-white text-black',          
  race:         'bg-f1-red text-white',
}



function buildSessions(schedule: Schedule | null, race: Race | null){
  if(!schedule || !race) return []

  const raw: RawSession[] = race.isSprint === true
  ? [
    { label: 'Free Practice 1', date: schedule.firstSessionDate, time: schedule.firstSessionTime, colour: ScheduleColours.practice, span: 2},
    { label: 'Sprint Qualifying', date: schedule.sprintQualiyingDate, time: schedule.sprintQualiyingTime, colour: ScheduleColours.sprintQuali, span: 2},
    { label: 'Sprint Race', date: schedule.sprintDate, time: schedule.sprintTime, colour: ScheduleColours.sprint, span: 2},
    { label: 'Qualifying', date: schedule.qualifyingDate, time: schedule.qualifyingTime, colour: ScheduleColours.quali, span: 2},
    { label: 'Race', date: race.date, time: race.time, colour: ScheduleColours.race, span: 2}, 
  ] :
    [
    { label: 'Free Practice 1', date: schedule.firstSessionDate, time: schedule.firstSessionTime, colour: ScheduleColours.practice, span: 2},
    { label: 'Free Practice 2', date: schedule.secondSessionDate, time: schedule.secondSessionTime, colour: ScheduleColours.practice, span: 2},
    { label: 'Free Practice 3', date: schedule.thirdSessionDate, time: schedule.thirdSessionTime, colour: ScheduleColours.practice, span: 2},
    { label: 'Qualifying', date: schedule.qualifyingDate, time: schedule.qualifyingTime, colour: ScheduleColours.quali, span: 2},
    { label: 'Race', date: race.date, time: race.time, colour: ScheduleColours.race, span: 2}, 
  
    ]

    return raw
      .filter((s)=> s.date && s.time)
      .map((s) => {
        const d = new Date(`${s.date}T${s.time}`)
        return {
          label: s.label,
          colour: s.colour,
          span: s.span || 1,
          day: d.toLocaleDateString('en-GB', {weekday: 'short'}), //This should make it Fri, Sat, Sun
          hour: d.getHours(),
          time: d.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}),
        }
      })
}

function ScheduleGrid({ sessions }: {sessions: Session[] }){
  const Hours = [8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ]
  const Days = ['Fri', 'Sat', 'Sun']
  const skip: Record<string, boolean> = {} 

  return(
    <table className="w-full table-fixed border-collapse text-sm">
      <thead>
        <tr>
          <th className="w-16 bg/5 p-2 text-white/40 text-xs uppercase">Time</th>
          {Days.map((d) => (
            <th key={d} className="bg/5 p-2 uppercase font-bold">{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Hours.map((h) => (
          <tr key={h}>
            <td className="bg/[0.02] text-white/40 font-mono text-xs p-2 text-center">
              {String(h).padStart(2, '0')}:00
            </td>
            {Days.map((day) => {
              const key = day + h
              if (skip[key]) return null
              const s = sessions.find((x) => x.day === day && x.hour === h)
              if (!s) return <td key={key} className="border-l border-white/10" />
              for (let i = 1; i < s.span; i++) skip[day + (h + i)] = true
              return (
                <td key={key} rowSpan={s.span} className="border-l border-white/10 p-1 align-top">
                  <div className={`rounded p-2 font-bold ${s.colour}`}>
                    {s.label}
                    <span className="block font-normal text-xs opacity-90">{s.time}</span>
                  </div>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()))
  const [nextRace, setNextRace] = useState<Race | null>(null)
  // const [weather, setWeather] = useState<Weather | null>(null)
  const top5 = drivers.slice(0,10)
  const [weekendSchedule, setSchedule] = useState<Schedule| null>(null)
  


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
      if (!nextRace) return
      const url = nextRace.isSprint 
      ? "/api/sprint-weekend-schedule"
      : "/api/normal-weekend-schedule"
    fetch(`${API_URL}${url}`).then(r => r.json()).then(setSchedule)
  }, [nextRace])


 
 
  // useEffect(() => {
  //   const getWeather = () => {
  //     fetch(`${API_URL}/api/weather`)
  //       .then((res) => res.json())
  //       .then((data) => setWeather(data))
  //   }
  //   getWeather()
  //   const id = setInterval(getWeather, 30000)
  //   return () => clearInterval(id)
  // }, [])


return (
  <div className="min-h-screen bg-carbon text-white">
    {/* Block 1: Nav */}
    
    
    <header className="relative h-[79vh] min-h-[500px] flex flex-col justify-end p-12 overflow-hidden">
  <img src={heroImg} alt="Mclaren F1 car" className="absolute  inset-0 size-full object-cover" />
  {/* <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" /> */}
{/* bottom scrim */}
<div
  className="absolute inset-x-0 bottom-0 h-2/3"
  style={{ backgroundImage: 'linear-gradient(to top, rgba(12,13,18,1) 0%, rgba(12,13,18,0.5) 50%, rgba(12,13,18,0) 100%)' }}
/>
{/* top scrim */}
<div
  className="absolute inset-x-0 top-0 h-1/3"
  style={{ backgroundImage: 'linear-gradient(to bottom, rgba(12,13,18,0.9) 0%, rgba(12,13,18,0) 100%)' }}
/>

  <div className="relative z-10 max-w-2xl">
    <h1 className="text-6xl md:text-8xl font-extrabold uppercase italic tracking-tighter leading-none">
      {nextRace?.raceName} 
      {/* <br /> Grand Prix */}
    </h1>
    <p className="mt-4 text-white/60 font-mono text-sm">
      72  laps under the floodlights.
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
      <Link
  to="/standings"
  className='mt-4 block text-center w-full border border-white/10 py-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30'
>
  Show all
    </Link>
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
        <span className="font-mono font-bold text-sm">72 </span>
      </div>
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-[10px] uppercase tracking-wider text-white/40">Length</span>
        <span className="font-mono font-bold text-sm">4.259 km</span>
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

  {/* Gird Serction*/}
  <section className="bg-carbon p-8 border-t border-white/10 border-b border-white/10 lg:border-l rounded">
  <ScheduleGrid sessions={buildSessions(weekendSchedule, nextRace)} />
</section>

  {/* <section className="bg-carbon p-8 border-t border-white/10 border-b border-white/10 lg:border-l rounded">
      <div className='flex flex-row gap-40'>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Air-Temp
    </h2>
      <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-white">
        {weather?.airTemp != null ? `${weather.airTemp}`: '-'}&deg;C 
    </h2>
    </div>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Track-Temp
    </h2>
      <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-white">
        {weather?.trackTemp != null ? `${weather.trackTemp}`: '-' }&deg;C 
    </h2>
    </div>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Humidity
    </h2>
      <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-white">
        {weather?.humidity != null ? `${weather.humidity}`: '-'  }%
    </h2>
    </div>
    <div>
      <h2 className="mt-3 text-white/40 font-mono text-xs uppercase tracking-wider">
      Wind-Speed
    </h2>
      <h2 className="text-3xl font-extrabold lowercase tracking-tighter text-white">
        {weather?.windSpeed != null ? `${weather.windSpeed}`: '-'  }m/s
    </h2>
    </div>
  </div>
  </section>     */}

  </div>
  
</div>

  </div>
)
}

export default App