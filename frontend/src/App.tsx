import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Standings from './pages/Standings'
import DriverStandings from './pages/DriverStandings'
import ConstructorStandings from './pages/ConstructorStandings'

function App() {

return (
  <div className="min-h-screen bg-carbon text-white">
    {/* Block 1: Nav */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <span className="text-2xl font-extrabold uppercase italic tracking-tighter">
        PitWall<span className="text-f1-red">One</span>
        </span>
    </div>
    <nav className="flex items-center justify-start px-6 py-4  border-b border-white/10">
      
      <div className="flex gap-6 ">
         <NavLink to="/" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
        ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Schedule </NavLink> 

        <div className="flex gap-6 relative group  ">
       

        <NavLink to="/standings" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
        ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} > Standings </NavLink>
        
        <div className='absolute left-0 top-full pt-4 hidden group-hover:block z-50'>
          <div className='bg-carbon border border-white/10 min-w-40'>
            <NavLink to="/driverstandings" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5"> 
            Drivers </NavLink>

            <NavLink to="/constructorstandings" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5">
            Constructors </NavLink>
            </div>
          </div>
        </div>

        <NavLink to="/teams" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
        ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Teams </NavLink>

        <NavLink to="/drivers" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
        ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Drivers </NavLink>

        <NavLink to="/stats" className={({isActive}) => `text-xs font-bold uppercase tracking-widest 
        ${ isActive ? "text-white" : "text-white/50 hover:text-white" }`} >Stats </NavLink>

        {/* <a href="/" className="text-xs font-bold uppercase tracking-widest text-white">Schedule</a>
        <a href="/standings" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Standings</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Teams</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Drivers</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white">Stats</a> */}
      </div>

    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/driverstandings" element={<DriverStandings />} />
        <Route path="/constructorstandings" element={<ConstructorStandings />} />
      </Routes>
  </div>
)
}
export default App