import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Standings from './pages/Standings'
import DriverStandings from './pages/DriverStandings'
import ConstructorStandings from './pages/ConstructorStandings'

import Standingsv2 from './pages/Standingsv2'
import F1p5v2 from './pages/f1p5v2'

function App() {

return (
  <div className="releative min-h-screen bg-carbon text-white">
    {/* Block 1: Nav */}
    <header className='absolute top-0 left-0 right-0 z-50'>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-extrabold uppercase italic tracking-tighter">
          PitWall<span className="text-f1-red">One</span>
          </span>
      </div>
      <nav className="flex items-center justify-center px-6 py-4  ">
        
        <div className="flex gap-15 ">
          <NavLink to="/" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
          ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Schedule </NavLink> 

          <div className="flex gap-6 relative group  ">
        

          <NavLink to="/standings" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
          ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} > Standings </NavLink>
          
          <div className='absolute left-0 top-full pt-4 hidden group-hover:block z-50'>
            <div className=''>
              <NavLink to="/driverstandingsv2" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5"> 
              Drivers </NavLink>

              <NavLink to="/constructorstandings" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5">
              Constructors </NavLink>

              <NavLink to="/F1p5v2" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5">
              F1.5 </NavLink>
              </div>
            </div>
          </div>

          <NavLink to="/teams" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
          ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Teams </NavLink>

          <NavLink to="/drivers" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
          ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Drivers </NavLink>

          <NavLink to="/stats" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
          ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Stats </NavLink>

          
        </div>

      </nav>
    </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/driverstandings" element={<DriverStandings />} />
        <Route path="/constructorstandings" element={<ConstructorStandings />} />

        <Route path="/driverstandingsv2" element={<Standingsv2 />} />
        <Route path="/F1p5v2" element={<F1p5v2/>} />
      </Routes>
  </div>
)
}
export default App