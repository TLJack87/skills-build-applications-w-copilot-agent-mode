import { Navigate, Link, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  return (
    <>
      <header className="border-bottom bg-white">
        <nav className="container navbar navbar-expand">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img src={octofitLogo} alt="" width="40" height="40" />
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </div>
        </nav>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<h1 className="h3 fw-semibold">Dashboard</h1>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
