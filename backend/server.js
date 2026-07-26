
// Will connect to a real database later
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3001

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
        teamid: d.Constructors[0].constructorId

    }))
    res.json(drivers)
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

