import { Bookmark, BookmarkCheck, BriefcaseBusiness, ExternalLink, Flame, Timer } from 'lucide-react'

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateValue))
}

function NewsCard({ update, bookmarked, onToggleBookmark }) {
  return (
    <article className="news-card">
      <img className="news-image" src={update.imageUrl} alt="" loading="lazy" />

      <div className="card-topline">
        <span className="source">{update.source}</span>
        <span className={`impact impact-${update.impact.toLowerCase()}`}>
          <Flame size={14} aria-hidden="true" />
          {update.impact}
        </span>
      </div>

      <span className="category-pill">{update.category}</span>
      <h3>{update.title}</h3>
      <p>{update.summary}</p>

      {update.career && (
        <dl className="career-details">
          <div>
            <dt>Company</dt>
            <dd>{update.career.company}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{update.career.roleType}</dd>
          </div>
          <div>
            <dt>Eligibility</dt>
            <dd>{update.career.eligibility}</dd>
          </div>
          <div>
            <dt>Deadline</dt>
            <dd>{update.career.deadline}</dd>
          </div>
        </dl>
      )}

      <div className="why-matters">
        <strong>Why this matters</strong>
        <span>{update.whyMatters}</span>
      </div>

      <div className="card-meta">
        <span>{formatDate(update.publishedAt)}</span>
        <span>
          <Timer size={14} aria-hidden="true" />
          {update.readTime} min
        </span>
      </div>

      <div className="card-actions">
        <a href={update.url} target="_blank" rel="noreferrer" aria-label={`Open ${update.title}`}>
          {update.career ? (
            <BriefcaseBusiness size={15} aria-hidden="true" />
          ) : (
            <ExternalLink size={15} aria-hidden="true" />
          )}
          {update.career?.applyLabel || 'Read more'}
        </a>
        <button
          type="button"
          className={bookmarked ? 'saved' : ''}
          onClick={() => onToggleBookmark(update.id)}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark update'}
          title={bookmarked ? 'Saved' : 'Save'}
        >
          {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
    </article>
  )
}

export default NewsCard
