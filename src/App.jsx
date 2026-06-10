import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [appdata, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/randomusers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setData(data?.data?.data ?? [])
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setError('Unable to load users. Please try again later.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Free API user showcase</p>
        <h1>Beautifully styled random users</h1>
       
      </header>

      {loading && <p className="status-message">Loading users…</p>}
      {error && <p className="status-message status-error">{error}</p>}

      {!loading && !error && (
        <section className="user-grid">
          {appdata.map((user, index) => (
            <article key={index} className="user-card">
              <img
                className="avatar"
                src={user.picture.large}
                alt={`Avatar of ${user.name.first} ${user.name.last}`}
              />
              <div className="user-details">
                <h2>
                  {user.name.first} {user.name.last}
                </h2>
                <p className="user-role">{user.location.city}, {user.location.country}</p>
                <p className="user-meta">{user.email}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
