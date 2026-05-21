import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import './App.css'
import Category from './components/Category'
import DashboardSection from './components/DashboardSection'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import { fetchDailyUpdates, getDigestMeta } from './services/api'

const BOOKMARKS_KEY = 'tech-pulse-bookmarks'
const AUTO_REFRESH_MS = 30 * 60 * 1000
const SECTION_ORDER = [
  'Today in Tech',
  'Career Opportunities',
  'Important Announcements',
  'Trending',
]

function formatRefreshTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function App() {
  const digestMeta = getDigestMeta()
  const [updates, setUpdates] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]')
  })
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('Refreshing your daily feed')

  const applyUpdates = useCallback(
    (dailyUpdates) => {
      setUpdates(dailyUpdates)
      setStatus(`Updated for ${digestMeta.label} at ${formatRefreshTime()}`)
      setLoading(false)
    },
    [digestMeta.label],
  )

  const refreshUpdates = useCallback(async () => {
    setLoading(true)
    setStatus('Checking software company news')
    const dailyUpdates = await fetchDailyUpdates()
    applyUpdates(dailyUpdates)
  }, [applyUpdates])

  useEffect(() => {
    let active = true

    fetchDailyUpdates().then((dailyUpdates) => {
      if (active) {
        applyUpdates(dailyUpdates)
      }
    })

    return () => {
      active = false
    }
  }, [applyUpdates])

  useEffect(() => {
    const refreshTimer = window.setInterval(refreshUpdates, AUTO_REFRESH_MS)

    function refreshWhenVisible() {
      if (document.visibilityState === 'visible') {
        refreshUpdates()
      }
    }

    document.addEventListener('visibilitychange', refreshWhenVisible)

    return () => {
      window.clearInterval(refreshTimer)
      document.removeEventListener('visibilitychange', refreshWhenVisible)
    }
  }, [refreshUpdates])

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  const categoryCounts = useMemo(() => {
    return updates.reduce(
      (counts, update) => ({
        ...counts,
        [update.category]: (counts[update.category] || 0) + 1,
      }),
      { All: updates.length },
    )
  }, [updates])

  const categories = Object.keys(categoryCounts).sort((a, b) => {
    if (a === 'All') return -1
    if (b === 'All') return 1
    return categoryCounts[b] - categoryCounts[a]
  })

  const filteredUpdates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return updates.filter((update) => {
      const matchesCategory = activeCategory === 'All' || update.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        `${update.title} ${update.summary} ${update.source} ${update.category}`
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query, updates])

  const dashboardSections = useMemo(() => {
    const usedIds = new Set()
    const take = (items, limit) => {
      const selected = items
        .filter((update) => !usedIds.has(update.id))
        .sort((a, b) => b.qualityScore - a.qualityScore)
        .slice(0, limit)

      selected.forEach((update) => usedIds.add(update.id))
      return selected
    }

    return {
      'Today in Tech': take(
        updates.filter((update) => update.category !== 'Career & Opportunities'),
        6,
      ),
      'Career Opportunities': take(
        updates.filter((update) => update.section === 'Career Opportunities'),
        4,
      ),
      'Important Announcements': take(
        updates.filter((update) => update.section === 'Important Announcements'),
        3,
      ),
      Trending: take(
        updates.filter((update) => update.section === 'Trending'),
        3,
      ),
    }
  }, [updates])

  const topCategory = categories.find((category) => category !== 'All')
  const focusedView = activeCategory !== 'All' || query.trim().length > 0

  function toggleBookmark(id) {
    setBookmarks((current) =>
      current.includes(id) ? current.filter((bookmark) => bookmark !== id) : [...current, id],
    )
  }

  return (
    <main className="app-shell">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        onRefresh={refreshUpdates}
        refreshing={loading}
      />

      <HeroSection
        digestLabel={digestMeta.label}
        totalUpdates={updates.length}
        savedCount={bookmarks.length}
        topCategory={topCategory}
      />

      <section className="toolbar" aria-label="Digest controls">
        <div className="categories">
          {categories.map((category) => (
            <Category
              key={category}
              name={category}
              count={categoryCounts[category]}
              active={category === activeCategory}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
        <div className={loading ? 'feed-status loading' : 'feed-status'}>
          {loading ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
          <span>{status}</span>
        </div>
      </section>

      {focusedView ? (
        <DashboardSection
          title="Filtered Updates"
          eyebrow="Focused view"
          updates={filteredUpdates}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
        />
      ) : (
        SECTION_ORDER.map((section) => (
          <DashboardSection
            key={section}
            title={section}
            eyebrow={
              {
                'Today in Tech': 'Daily signal',
                'Career Opportunities': 'For students and developers',
                'Important Announcements': 'Company and platform moves',
                Trending: 'Launches and startup signals',
              }[section]
            }
            updates={dashboardSections[section]}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            compact={section !== 'Today in Tech'}
          />
        ))
      )}
    </main>
  )
}

export default App
