import { Bell, RefreshCw, Search } from 'lucide-react'

function Navbar({ query, onQueryChange, onRefresh, refreshing }) {
  return (
    <header className="navbar">
      <a href="/" className="brand" aria-label="Tech Pulse home">
        <span>TP</span>
        <strong>Tech Pulse</strong>
      </a>

      <label className="search-box">
        <Search size={18} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search AI, launches, internships, companies..."
          type="search"
        />
      </label>

      <div className="nav-actions">
        <button type="button" onClick={onRefresh} disabled={refreshing} title="Refresh updates">
          <RefreshCw size={18} className={refreshing ? 'spinning' : ''} />
        </button>
        <button type="button" title="Daily reminder">
          <Bell size={18} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
