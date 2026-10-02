import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './tracker.css'

const sections = [
  { label: 'Activities', path: '/activities', number: '01' },
  { label: 'Leaderboard', path: '/leaderboard', number: '02' },
  { label: 'Teams', path: '/teams', number: '03' },
  { label: 'Athletes', path: '/users', number: '04' },
  { label: 'Workouts', path: '/workouts', number: '05' },
]

function App() {
  return (
    <div className="tracker-shell">
      <aside className="sidebar">
        <NavLink className="brand-lockup" to="/activities" aria-label="OctoFit Tracker home">
          <img src={octofitLogo} alt="" width="42" height="42" />
          <span><strong>OctoFit</strong><small>TRACKER</small></span>
        </NavLink>

        <div className="sidebar-section-label">Your workspace</div>
        <nav className="section-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <NavLink className={({ isActive }) => `section-link${isActive ? ' active' : ''}`} to={section.path} key={section.path}>
              <span className="section-number">{section.number}</span>
              <span>{section.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footnote">
          <span className="footnote-rule" />
          <span>Move well.<br />Move together.</span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <span className="topbar-context">COMMUNITY FITNESS</span>
          <span className="season-label"><span className="season-dot" />Live tracker</span>
        </header>
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App