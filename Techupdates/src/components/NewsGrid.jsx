import NewsCard from './NewsCard'

function NewsGrid({ updates, bookmarks, onToggleBookmark, compact = false }) {
  if (!updates.length) {
    return (
      <section className="empty-state">
        <h2>No updates here yet</h2>
        <p>Try another category or clear the search field.</p>
      </section>
    )
  }

  return (
    <div className={compact ? 'news-grid compact' : 'news-grid'} aria-label="Daily tech updates">
      {updates.map((update) => (
        <NewsCard
          key={update.id}
          update={update}
          bookmarked={bookmarks.includes(update.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  )
}

export default NewsGrid
