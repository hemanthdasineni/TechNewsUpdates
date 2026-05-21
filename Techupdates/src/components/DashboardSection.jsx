import NewsGrid from './NewsGrid'

function DashboardSection({ title, eyebrow, updates, bookmarks, onToggleBookmark, compact = false }) {
  if (!updates.length) return null

  return (
    <section className="dashboard-section" aria-labelledby={`${title.replace(/\W+/g, '-').toLowerCase()}-title`}>
      <div className="section-heading">
        <div>
          <span>{eyebrow}</span>
          <h2 id={`${title.replace(/\W+/g, '-').toLowerCase()}-title`}>{title}</h2>
        </div>
        <strong>{updates.length}</strong>
      </div>
      <NewsGrid
        updates={updates}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        compact={compact}
      />
    </section>
  )
}

export default DashboardSection
