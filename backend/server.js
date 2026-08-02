
// Will connect to a real database later
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3001
const POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]

// Get all results for the current year
async function GetAllResults(){
    const all = []
    let offset = 0
    let total = 1
    while (offset < total){
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/current/results.json?limit=100&offset=${offset}`)
        const data = await response.json()
        total = Number(data.MRData.total)
        data.MRData.RaceTable.Races.forEach(race => {
            race.Results.forEach(r => {
                all.push({
                    round: Number(race.round),
                    position: Number(r.position),
                    driver: r.Driver.givenName + ' ' + r.Driver.familyName,
                    driverId: r.Driver.driverId,
                    team: r.Constructor.name,
                    teamid: r.Constructor.constructorId,
                    driverNumber: r.Driver.permanentNumber,
                })
            })
        })
        offset += 100
    }
    return all
}


// Routing 
app.get('/api/drivers', async(req, res) => {
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json')
    const data = await response.json()
    const list = data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    const drivers = list.map((d, i) => ({
        id: i+1,
        position: Number(d.position),
        name: d.Driver.givenName + ' ' + d.Driver.familyName,
        team: d.Constructors[0].name,
        points: Number(d.points),
        driverNumber: d.Driver.permanentNumber,
        teamid: d.Constructors[0].constructorId,
        wins: d.wins,
        code: d.Driver.code,

    }))
    res.json(drivers)
})

app.get('/api/constructors', async(req, res) => {
    const response = await fetch('https://api.jolpi.ca/ergast/f1/2026/constructorstandings.json')
    const data = await response.json()
    const list = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    const constructors = list.map((c, i) => ({
        id: i+1,
        position: Number(c.position),
        name: c.Constructor.name,
        points: Number(c.points),
        wins: c.wins,
        teamid: c.Constructor.constructorId

    }))
    res.json(constructors)
})

app.get('/api/next-race', async(req, res) =>{
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
    const data = await response.json()
    const race = data.MRData.RaceTable.Races[0]
    const nextRace = {
        raceName: race.raceName,
        circuit: race.Circuit.circuitName, 
        locality: race.Circuit.Location.locality,
        country: race.Circuit.Location.country,
        date: race.date,
        time: race.time,
        isSprint: "Sprint" in race, // This is to check if the weekend is a sprint weekend.
        
    }
    res.json(nextRace)
})

app.get('/api/normal-weekend-schedule', async(req, res) =>{
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
    const data = await response.json()
    const race = data.MRData.RaceTable.Races[0]
    const normalWeekend = {
        firstSessionDate: race.FirstPractice.date,
        firstSessionTime: race.FirstPractice.time,
        secondSessionDate: race.SecondPractice.date,
        secondSessionTime: race.SecondPractice.time,
        thirdSessionDate: race.ThirdPractice.date,
        thirdSessionTime: race.ThirdPractice.time,
        qualifyingDate: race.Qualifying.date,
        qualifyingTime: race.Qualifying.time, 
        
        
    }
    res.json(normalWeekend)
})

app.get('/api/sprint-weekend-schedule', async(req, res) =>{
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
    const data = await response.json()
    const race = data.MRData.RaceTable.Races[0]
    const sprintWeekend = {
        firstSessionDate: race.FirstPractice.date,
        firstSessionTime: race.FirstPractice.time,
        sprintQualiyingDate: race.SprintQualifying.date,
        sprintQualiyingTime: race.SprintQualifying.time,
        sprintDate: race.Sprint.date,
        sprintTime: race.Sprint.time,
        qualifyingDate: race.Qualifying.date,
        qualifyingTime: race.Qualifying.time, 
        
        
    }
    res.json(sprintWeekend)
})

app.get('/api/f1p5', async(req, res) =>{
    const all = await GetAllResults()
    const byRound = {}
    all.forEach(r => {
        if(!byRound[r.round]) byRound[r.round] = []
        byRound[r.round].push(r)
    })
    const totals = {}
    const top4 = ['mercedes', 'mclaren', 'ferrari', 'red_bull']
    Object.values(byRound).forEach(rows => {
        const midfield = rows
            .filter(r => !top4.includes(r.teamid))
            .sort((a, b) => a.position - b.position)
        midfield.forEach((r, i) => {
            const pts = POINTS[i] || 0
            if(!totals[r.driverId]){
                totals[r.driverId] = { name: r.driver, team: r.team, teamid: r.teamid, points: 0, driverNumber: r.driverNumber }
            }
            totals[r.driverId].points += pts
        })
    })
    const standings = Object.values(totals)
        .sort((a, b) => b.points - a.points)
        .map((d, i) => ({ id: i + 1, position: i + 1, ...d }))
    res.json(standings)
})
app.get('/api/weather', async(req, res) =>{
    
    const response = await fetch('https://api.openf1.org/v1/weather?session_key=latest')
    const data = await response.json()
    
    if (!data.length) return res.json(null)
        
    const latest = data[data.length - 1]
    const weather = {
        trackTemp: latest.track_temperature,
        airTemp: latest.air_temperature, 
        humidity: latest.humidity,
        rainfall: latest.rainfall,
        windSpeed: latest.wind_speed,
        date: latest.date
    }
    res.json(weather)
})

app.listen(PORT, () =>{
    console.log(`Backend running on http://localhost:${PORT}`)
})

