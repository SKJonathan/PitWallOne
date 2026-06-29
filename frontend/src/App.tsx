import { useState, useEffect } from 'react'
import './App.css'

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
    <div>
      <h1>Championship Standings</h1>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.position}</td>
              <td>{driver.name}</td>
              <td>{driver.team}</td>
              <td>{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App