
// Will connect to a real database later
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3001

// Mock data for now
const drivers = [ 
    {id: 1, position: 1, name: 'Lando Norris', team: 'McLaren', points: 437},
    {id: 2, position: 2, name: 'Max Verstappen', team: 'Red Bull Racing', points: 374},
    {id: 3, position: 3, name: 'Oscar Piastri', team: 'McLaren', points: 356},
    {id: 4, position: 4, name: 'Lewis Hamilton', team: 'Ferrari', points: 300},
]

// Routing 
app.get('/api/drivers', (req, res) => {
    res.json(drivers)
})


app.listen(PORT, () =>{
    console.log(`Backend running on http://localhost:${PORT}`)
})

