
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
        
    }
    res.json(nextRace)
})

app.get('/api/next-qualifying', async(req, res) =>{
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
    const data = await response.json()
    const race = data.MRData.RaceTable.Races[0]
    const nextRace = {
        qualifyingDate: race.Qualifying.date,
        qualifyingTime: race.Qualifying.time, 
        
        
    }

})

app.listen(PORT, () =>{
    console.log(`Backend running on http://localhost:${PORT}`)
})

