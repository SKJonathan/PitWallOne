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