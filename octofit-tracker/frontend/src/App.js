import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiUrl } from './utils/api';
import './App.css';

const apiRoot = getApiUrl('').replace(/\/$/, '/');

const sections = [
  { to: '/users', label: 'Users', summary: 'People and team assignments' },
  { to: '/teams', label: 'Teams', summary: 'Group structure and roster buckets' },
  { to: '/activities', label: 'Activities', summary: 'Workout sessions and durations' },
  { to: '/workouts', label: 'Workouts', summary: 'Suggested training plans' },
  { to: '/leaderboard', label: 'Leaderboard', summary: 'Competitive team standings' },
];

function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top shadow-sm">
        <div className="container py-2">
          <span className="navbar-brand fw-semibold mb-0">OctoFit Tracker</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="octofit-nav">
            <div className="navbar-nav ms-auto gap-lg-2">
              {sections.map((section) => (
                <NavLink
                  key={section.to}
                  to={section.to}
                  className={({ isActive }) => `nav-link rounded-pill px-3${isActive ? ' active fw-semibold' : ''}`}
                >
                  {section.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="hero-card card border-0 shadow-lg mb-4 overflow-hidden">
              <div className="card-body p-4 p-lg-5">
                <p className="text-uppercase text-primary-emphasis small fw-semibold mb-2">Frontend Dashboard</p>
                <h1 className="display-5 fw-bold mb-3">A cleaner Bootstrap interface for OctoFit data</h1>
                <p className="lead text-body-secondary mb-4">
                  Each section fetches from the backend REST API using the Codespaces URL when
                  REACT_APP_CODESPACE_NAME is available, with a localhost fallback for local runs.
                </p>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <a className="btn btn-primary btn-lg" href={apiRoot} target="_blank" rel="noreferrer">
                    Open API Root
                  </a>
                  <NavLink className="btn btn-outline-primary btn-lg" to="/users">
                    Browse Dashboard
                  </NavLink>
                </div>

                <div className="row g-3">
                  {sections.map((section) => (
                    <div key={section.to} className="col-12 col-md-6 col-xl-4">
                      <div className="card h-100 border-0 section-card shadow-sm">
                        <div className="card-body">
                          <h2 className="h5 fw-semibold mb-2">{section.label}</h2>
                          <p className="text-body-secondary mb-3">{section.summary}</p>
                          <NavLink className="btn btn-sm btn-outline-dark" to={section.to}>
                            Open {section.label}
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
