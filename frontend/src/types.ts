export interface Driver {
  id: number
  position: number
  name: string
  team: string
  points: number
  driverNumber: string
  teamid: string
  wins: number
  code: string
  //pudiums: number
}

export interface Constructor{
  id: number,
  position: number,
  name: string, 
  points: number,
  wins: string,
  teamid: string,
}

export interface Race {
  raceName: string
  circuit: string
  locality: string
  country: string
  date: string
  time: string
  isSprint: boolean
}

// interface Weather{
//   trackTemp: number
//   airTemp: number
//   humidity: number
//   rainfall: number
//   windSpeed: number
//   date: string
// }

export interface Schedule{
  firstSessionDate: string
  firstSessionTime: string
  secondSessionDate?: string
  secondSessionTime?: string
  thirdSessionDate?: string
  thirdSessionTime?: string
  sprintQualiyingDate?: string
  sprintQualiyingTime?: string
  sprintDate?: string
  sprintTime?: string
  qualifyingDate: string
  qualifyingTime: string
}